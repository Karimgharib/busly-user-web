// app/[locale]/booking/[id]/TripSummary.jsx
"use client";

import { useTranslations } from "next-intl";
import { useBooking } from "./BookingContext";
import PassengerForm from "./PassengerForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  MapPin,
  Armchair,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function TripSummary() {
  const t = useTranslations("booking");
  const {
    schedule,
    isLoading,
    selectedSeats,
    removeSeat,
    formatTime,
    getDuration,
    totalPrice,
    canSubmit,
    isSubmitting,
    error,
    handleConfirm,
  } = useBooking();

  if (isLoading) {
    return (
      <div className="h-96 bg-muted rounded-2xl animate-pulse sticky top-24" />
    );
  }

  if (!schedule) return null;

  return (
    <FadeIn delay={0.1} direction="left">
      <Card className="border-border/60 shadow-lg">
        <CardContent className="p-6 space-y-5">
          <PassengerForm />
          
          <Separator />

          <h3 className="font-bold text-lg">{t("tripSummary")}</h3>

          <div className="flex items-start gap-3">
            <MapPin
              className="w-5 h-5 text-brand mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div className="flex-1">
              <p className="font-semibold">
                {schedule.routes?.from_city} → {schedule.routes?.to_city}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {formatTime(schedule.departure_time)} —{" "}
                {formatTime(schedule.arrival_time)} ({getDuration()})
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {schedule.buses?.name}
            </span>
            <Badge variant="outline" className="text-[10px] uppercase">
              {schedule.buses?.bus_type}
            </Badge>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium mb-2">{t("seat")}:</p>
            {selectedSeats.length === 0 ? (
              <p className="text-sm text-muted-foreground">—</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {selectedSeats
                  .sort((a, b) => a - b)
                  .map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => removeSeat(num)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand/10 text-brand text-sm font-medium hover:bg-brand/20 transition-colors group"
                    >
                      <Armchair className="w-3.5 h-3.5" aria-hidden="true" />
                      {num}
                      <X
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
              </div>
            )}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("totalPrice")} ({selectedSeats.length}x)
            </span>
            <span className="text-2xl font-extrabold text-brand">
              {totalPrice.toLocaleString()} {t("egp")}
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <Button
            onClick={handleConfirm}
            disabled={!canSubmit || isSubmitting}
            className="w-full gap-2 bg-brand text-brand-secondary hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 active:scale-[0.98] transition-all font-semibold h-12 text-base disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-brand-secondary/30 border-t-brand-secondary rounded-full animate-spin" />
            ) : (
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            )}
            {t("confirmBooking")}
          </Button>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
