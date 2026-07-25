// app/[locale]/booking/[id]/PassengerForm.jsx
"use client";

import { useTranslations } from "next-intl";
import { useBooking } from "./BookingContext";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Phone, Smartphone, MapPin } from "lucide-react";

export default function PassengerForm() {
  const t = useTranslations("booking");
  const {
    passengerName,
    setPassengerName,
    passengerPhone,
    setPassengerPhone,
    vfCashPhone,
    setVfCashPhone,
    pickupPointId,
    setPickupPointId,
    pickupPoints,
  } = useBooking();

  return (
    <div className="space-y-5">
      <h3 className="font-bold text-lg">{t("passengerDetails")}</h3>

      {/* Name */}
      <div className="space-y-1.5">
        <Label
          htmlFor="passenger-name"
          className="flex items-center gap-1.5 text-sm font-medium"
        >
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          {t("passengerName")}
        </Label>
        <Input
          id="passenger-name"
          placeholder={t("passengerNamePlaceholder")}
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          className="h-11"
        />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label
          htmlFor="passenger-phone"
          className="flex items-center gap-1.5 text-sm font-medium"
        >
          <Phone className="w-3.5 h-3.5 text-muted-foreground" />
          {t("passengerPhone")}
        </Label>
        <Input
          id="passenger-phone"
          type="tel"
          placeholder="01XXXXXXXXX"
          value={passengerPhone}
          onChange={(e) => setPassengerPhone(e.target.value)}
          className="h-11"
          dir="ltr"
        />
      </div>

      {/* VF Cash Phone */}
      <div className="space-y-1.5">
        <Label
          htmlFor="vf-cash-phone"
          className="flex items-center gap-1.5 text-sm font-medium"
        >
          <Smartphone className="w-3.5 h-3.5 text-muted-foreground" />
          {t("vfCashPhone")}
        </Label>
        <p className="text-xs text-muted-foreground">
          {t("vfCashPhoneHint")}
        </p>
        <Input
          id="vf-cash-phone"
          type="tel"
          placeholder="01XXXXXXXXX"
          value={vfCashPhone}
          onChange={(e) => setVfCashPhone(e.target.value)}
          className="h-11"
          dir="ltr"
        />
      </div>

      {/* Pickup Point */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5 text-sm font-medium">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          {t("pickupPoint")}
        </Label>
        {pickupPoints.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">
            {t("noPickupPoints")}
          </p>
        ) : (
          <Select value={pickupPointId} onValueChange={setPickupPointId}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder={t("selectPickupPoint")} />
            </SelectTrigger>
            <SelectContent>
              {pickupPoints.map((point) => (
                <SelectItem key={point.id} value={point.id}>
                  {point.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
