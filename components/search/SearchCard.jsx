// components/search/SearchCard.jsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Users,
  Wifi,
  AirVent,
  Plug,
  ArrowRight,
  Bus as BusIcon,
} from "lucide-react";
import Link from "next/link";

const amenityIcons = {
  wifi: Wifi,
  ac: AirVent,
  usb: Plug,
};

export default function SearchCard({ schedule }) {
  const t = useTranslations("searchResults");
  const locale = useLocale();

  const departure = new Date(schedule.departure_time);
  const arrival = new Date(schedule.arrival_time);

  function formatTime(date) {
    return date.toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getDuration() {
    const diff = (arrival - departure) / (1000 * 60);
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h}h ${m}m`;
  }

  return (
    <Card className="route-card group border-border/50 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 bg-card overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left */}
          <div className="flex-1 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="font-semibold text-xs uppercase"
              >
                {schedule.buses?.bus_type || "Standard"}
              </Badge>
              {schedule.buses?.name && (
                <span className="text-xs text-muted-foreground">
                  {schedule.buses.name}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-extrabold tracking-tight">
                  {formatTime(departure)}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {schedule.routes?.from_city}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {getDuration()}
                </span>
                <div className="w-full flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full border-2 border-brand" />
                  <div className="flex-1 border-t border-dashed border-border" />
                  <BusIcon className="w-4 h-4 text-brand" />
                  <div className="flex-1 border-t border-dashed border-border" />
                  <div className="w-2 h-2 rounded-full bg-brand" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-extrabold tracking-tight">
                  {formatTime(arrival)}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {schedule.routes?.to_city}
                </div>
              </div>
            </div>

            {schedule.buses?.amenities?.length > 0 && (
              <div className="flex items-center gap-2">
                {schedule.buses.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  return Icon ? (
                    <div
                      key={amenity}
                      className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground"
                      title={amenity}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>

          <Separator
            orientation="vertical"
            className="hidden lg:block h-auto"
          />

          {/* Right */}
          <div className="lg:w-56 flex lg:flex-col items-center justify-between lg:justify-center gap-4 p-5 lg:px-6">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-brand">
                {Number(schedule.price).toLocaleString()} EGP
              </div>
              <div className="text-xs text-muted-foreground">
                {t("perSeat")}
              </div>
              <Badge
                variant="secondary"
                className="mt-1.5 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 border-0 text-[11px] font-medium"
              >
                <Users className="w-3 h-3 mr-1" aria-hidden="true" />
                {schedule.available_seats} {t("seatsLeft")}
              </Badge>
            </div>
            <Button
              className="w-full gap-2 bg-brand text-brand-secondary hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 active:scale-[0.98] transition-all font-semibold"
              asChild
            >
              <Link href={`/${locale}/booking/${schedule.id}`}>
                {t("selectSeats")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
