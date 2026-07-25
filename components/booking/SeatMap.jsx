// app/[locale]/booking/[id]/SeatMap.jsx
"use client";

import { useTranslations } from "next-intl";
import { useBooking } from "./BookingContext";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus as BusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "next-intl";

function SeatButton({ number, isSelected, isOccupied, onClick }) {
  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={() => onClick(number)}
      aria-label={`Seat ${number}${
        isOccupied ? " (occupied)" : isSelected ? " (selected)" : ""
      }`}
      className={cn(
        "w-10 h-10 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center",
        isOccupied
          ? "bg-muted/50 text-muted-foreground/30 cursor-not-allowed line-through"
          : isSelected
            ? "bg-brand text-brand-secondary scale-105 shadow-md shadow-brand/30 hover:bg-brand/90"
            : "bg-muted/80 text-muted-foreground hover:bg-brand/10 hover:text-brand cursor-pointer",
      )}
    >
      {number}
    </button>
  );
}

export default function SeatMap() {
  const t = useTranslations("booking");
  const locale = useLocale();
  const {
    schedule,
    isLoading,
    seatMap,
    selectedSeats,
    isOccupied,
    toggleSeat,
  } = useBooking();

  if (isLoading) {
    return <div className="h-80 bg-muted rounded-2xl animate-pulse" />;
  }

  if (!schedule) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">Schedule not found</p>
        <Button variant="outline" asChild>
          <Link href={`/${locale}/search`} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to search
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <FadeIn>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">{t("selectSeat")}</h2>
            <Badge variant="outline" className="text-xs uppercase">
              {schedule.buses?.bus_type || "Standard"} •{" "}
              {schedule.buses?.total_seats} {t("seats")}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-muted/80" />
              <span>{t("available")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-brand" />
              <span>
                {t("selected")} ({selectedSeats.length})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-muted/50 line-through" />
              <span>{t("occupied")}</span>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-28 h-7 rounded-t-2xl bg-muted/40 border border-border border-b-0 flex items-center justify-center">
              <BusIcon className="w-4 h-4 text-muted-foreground/60" />
            </div>
          </div>

          <div className="bg-muted/20 rounded-xl p-4 border border-border/50">
            <div className="flex flex-col items-center gap-1.5">
              {Array.from({ length: Math.ceil(seatMap.length / 4) }).map(
                (_, rowIdx) => {
                  const rowSeats = seatMap.slice(rowIdx * 4, rowIdx * 4 + 4);
                  return (
                    <div
                      key={rowIdx}
                      className="flex items-center gap-2 w-full justify-center"
                    >
                      {rowSeats.slice(0, 2).map((seat) => (
                        <SeatButton
                          key={seat.number}
                          number={seat.number}
                          isSelected={selectedSeats.includes(seat.number)}
                          isOccupied={isOccupied(seat.number)}
                          onClick={toggleSeat}
                        />
                      ))}
                      <div className="w-8" />
                      {rowSeats.slice(2, 4).map((seat) => (
                        <SeatButton
                          key={seat.number}
                          number={seat.number}
                          isSelected={selectedSeats.includes(seat.number)}
                          isOccupied={isOccupied(seat.number)}
                          onClick={toggleSeat}
                        />
                      ))}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
