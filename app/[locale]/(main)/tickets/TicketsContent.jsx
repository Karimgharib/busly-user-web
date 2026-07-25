// app/[locale]/(main)/tickets/TicketsContent.jsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  MapPin,
  Armchair,
  Bus as BusIcon,
  Ticket,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const statusConfig = {
  confirmed: {
    label: "confirmed",
    className:
      "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40",
  },
  pending: {
    label: "pending",
    className:
      "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40",
  },
  cancelled: {
    label: "cancelled",
    className:
      "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40",
  },
  used: {
    label: "used",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export default function TicketsContent() {
  const t = useTranslations("tickets");
  const tBooking = useTranslations("booking");
  const locale = useLocale();
  const { user, isLoading: authLoading } = useAuth();

  // ✅ useSupabaseQuery
  const { data: bookings = [], isLoading } = useSupabaseQuery({
    table: "bookings",
    queryKey: ["my-bookings", user?.id],
    select: "*, schedules(*, routes(*), buses(*))",
    orderBy: { column: "created_at", asc: false },
    enabled: !!user?.id,
  });

  if (authLoading || isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-48 bg-muted rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!user || bookings.length === 0) {
    return (
      <FadeIn className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center mx-auto mb-5">
          <Ticket className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">{t("noTickets")}</h2>
        <p className="text-muted-foreground mb-6">{t("noTicketsDesc")}</p>
        <Button
          asChild
          className="gap-2 bg-brand text-brand-secondary hover:bg-brand/90"
        >
          <Link href={`/${locale}/search`}>
            {t("searchTrips")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </FadeIn>
    );
  }

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatDate = (d) =>
    new Date(d).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div>
      <FadeIn>
        <h1 className="text-2xl font-extrabold mb-6">{t("title")}</h1>
      </FadeIn>
      <Stagger className="space-y-4">
        {bookings.map((booking) => {
          const s = booking.schedules;
          const status = statusConfig[booking.status] || statusConfig.pending;
          return (
            <StaggerItem key={booking.id}>
              <Card className="overflow-hidden border-border/50 hover:border-border transition-colors">
                <div className="h-1 bg-brand" />
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-brand shrink-0" />
                        <span className="font-bold">
                          {s?.routes?.from_city} → {s?.routes?.to_city}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTime(s?.departure_time)} —{" "}
                          {formatTime(s?.arrival_time)}
                        </span>
                        <span>{formatDate(s?.departure_time)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <BusIcon className="w-3.5 h-3.5" />
                          {s?.buses?.name}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Armchair className="w-3.5 h-3.5" />
                          {tBooking("seat")} {booking.seat_number}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xl font-extrabold text-brand">
                        {Number(booking.total_price).toLocaleString()}{" "}
                        {tBooking("egp")}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-medium border",
                          status.className,
                        )}
                      >
                        {t(status.label)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
