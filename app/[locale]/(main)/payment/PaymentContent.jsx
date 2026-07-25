// app/[locale]/payment/PaymentContent.jsx
"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useSupabaseMutate } from "@/hooks/useSupabaseMutate";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { useTenant } from "@/lib/TenantProvider";
import supabase from "@/lib/supabase";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Smartphone,
  Upload,
  CheckCircle2,
  Clock,
  MapPin,
  Armchair,
  Copy,
  ImageIcon,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Config ────────────────────────────────────────────────────────────────────
// TODO: move to tenant settings table later
const VF_CASH_NUMBER = "01017648667";

export default function PaymentContent({ bookingIds, amount }) {
  const t = useTranslations("payment");
  const tBooking = useTranslations("booking");
  const locale = useLocale();
  const router = useRouter();
  const { tenant } = useTenant();

  const [screenshot, setScreenshot] = useState(null); // File object
  const [preview, setPreview] = useState(null); // data URL for preview
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const fileRef = useRef();

  // Fetch bookings with schedule info so we can show trip summary
  const { data: bookings = [], isLoading } = useSupabaseQuery({
    table: "bookings",
    queryKey: ["payment-bookings", bookingIds.join(",")],
    select: "*, schedules(*, routes(*), buses(*))",
    enabled: bookingIds.length > 0,
  });

  const { mutate: updateBookings } = useSupabaseMutate({
    table: "bookings",
    method: "update",
    queryKeysToInvalidate: [["my-bookings"]],
  });

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const formatTime = (d) =>
    new Date(d).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  const copyNumber = () => {
    navigator.clipboard.writeText(VF_CASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(t("invalidFile"));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError(t("fileTooLarge"));
      return;
    }
    setError("");
    setScreenshot(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!screenshot || bookingIds.length === 0) return;
    setUploading(true);
    setError("");

    try {
      // 1. Upload screenshot to Supabase Storage
      const ext = screenshot.name.split(".").pop();
      const path = `${tenant?.id}/${bookingIds[0]}_${Date.now()}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("payment-screenshots")
        .upload(path, screenshot, { upsert: true });

      if (uploadErr) throw uploadErr;

      const { data: urlData } = supabase.storage
        .from("payment-screenshots")
        .getPublicUrl(path);

      const screenshotUrl = urlData?.publicUrl;

      // 2. Update all bookings with screenshot URL + submitted timestamp
      await Promise.all(
        bookingIds.map((id) =>
          updateBookings(
            {
              payment_screenshot_url: screenshotUrl,
              payment_submitted_at: new Date().toISOString(),
              status: "pending", // stays pending until operator confirms
            },
            { filters: { id } },
          ),
        ),
      );

      setDone(true);
    } catch (err) {
      console.error("Payment submission error:", err);
      setError(err?.message || t("uploadFailed"));
    } finally {
      setUploading(false);
    }
  };

  // ── Done state ───────────────────────────────────────────────────────────────
  if (done) {
    return (
      <FadeIn className="max-w-md mx-auto py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">{t("submitted")}</h1>
        <p className="text-muted-foreground mb-2">{t("submittedDesc")}</p>
        <p className="text-sm text-muted-foreground mb-8 flex items-center justify-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {t("confirmationTime")}
        </p>
        <Button
          onClick={() => router.push(`/${locale}/tickets`)}
          className="gap-2 bg-brand text-brand-secondary hover:bg-brand/90"
        >
          {t("viewTickets")}
        </Button>
      </FadeIn>
    );
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-10 space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-40 bg-muted rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const firstBooking = bookings[0];
  const schedule = firstBooking?.schedules;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <FadeIn>
        <h1 className="text-2xl font-extrabold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
      </FadeIn>

      {/* Trip Summary */}
      {schedule && (
        <FadeIn delay={0.05}>
          <Card className="border-border/50">
            <CardContent className="p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("tripSummary")}
              </p>
              <div className="flex items-center gap-2 font-bold text-lg">
                <MapPin className="w-4 h-4 text-brand shrink-0" />
                {schedule.routes?.from_city} → {schedule.routes?.to_city}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(schedule.departure_time)} —{" "}
                  {formatTime(schedule.arrival_time)}
                </span>
                <span>{formatDate(schedule.departure_time)}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {bookings.map((b) => (
                  <Badge key={b.id} variant="outline" className="gap-1 text-xs">
                    <Armchair className="w-3 h-3" />
                    {tBooking("seat")} {b.seat_number}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* VF Cash Instructions */}
      <FadeIn delay={0.1}>
        <Card className="border-brand/30 bg-brand/5">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E40D21] flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold">{t("vfCashTitle")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("vfCashDesc")}
                </p>
              </div>
            </div>

            <Separator />

            {/* Step 1: amount */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {t("step1")}
              </p>
              <p className="text-3xl font-extrabold text-brand">
                {amount.toLocaleString()}{" "}
                <span className="text-base font-semibold">
                  {tBooking("egp")}
                </span>
              </p>
            </div>

            {/* Step 2: number */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {t("step2")}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold tracking-widest font-mono">
                  {VF_CASH_NUMBER}
                </p>
                <button
                  onClick={copyNumber}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    copied
                      ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground",
                  )}
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? t("copied") : t("copy")}
                </button>
              </div>
            </div>

            {/* Step 3: screenshot */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {t("step3")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("screenshotHint")}
              </p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Screenshot Upload */}
      <FadeIn delay={0.15}>
        <div className="space-y-3">
          <p className="font-semibold">{t("uploadScreenshot")}</p>

          {!preview ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-brand/50 rounded-2xl p-10 text-center cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-brand/10 transition-colors">
                <ImageIcon className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-colors" />
              </div>
              <p className="font-medium mb-1">{t("dropHere")}</p>
              <p className="text-sm text-muted-foreground">{t("orBrowse")}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {t("maxSize")}
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Payment screenshot"
                className="w-full max-h-64 object-cover"
              />
              <button
                onClick={() => {
                  setScreenshot(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-sm font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {screenshot?.name}
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!screenshot || uploading}
            className="w-full h-12 text-base font-semibold gap-2 bg-brand text-brand-secondary hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {uploading ? (
              <div className="w-5 h-5 border-2 border-brand-secondary/30 border-t-brand-secondary rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
            {uploading ? t("uploading") : t("submitPayment")}
          </Button>

          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            {t("secureNote")}
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
