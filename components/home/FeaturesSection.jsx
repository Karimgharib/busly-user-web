// components/home/FeaturesSection.jsx
import { getTranslations } from "next-intl/server";
import {
  Wifi,
  AirVent,
  Plug,
  Tv,
  ShieldCheck,
  Headphones,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const features = [
  { icon: Wifi, titleKey: "freeWifi", descKey: "freeWifiDesc" },
  {
    icon: AirVent,
    titleKey: "airConditioning",
    descKey: "airConditioningDesc",
  },
  { icon: Plug, titleKey: "usbCharging", descKey: "usbChargingDesc" },
  { icon: Tv, titleKey: "entertainment", descKey: "entertainmentDesc" },
  { icon: ShieldCheck, titleKey: "safeTravel", descKey: "safeTravelDesc" },
  { icon: Headphones, titleKey: "support247", descKey: "support247Desc" },
  { icon: CreditCard, titleKey: "easyPayment", descKey: "easyPaymentDesc" },
  { icon: Smartphone, titleKey: "mobileBooking", descKey: "mobileBookingDesc" },
];

export default async function FeaturesSection() {
  const t = await getTranslations("features");

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/3 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge
              variant="secondary"
              className="bg-brand/8 text-brand hover:bg-brand/12 mb-4"
            >
              {t("badge")}
            </Badge>
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
            >
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <StaggerItem key={feature.titleKey}>
              <Card className="group border-border/50 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-0.5 transition-all duration-300 bg-card overflow-hidden relative h-full">
                <div
                  className="absolute -inset-px rounded-[inherit] bg-gradient-to-b from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  aria-hidden="true"
                />
                <CardContent className="p-6">
                  <div
                    className="w-12 h-12 rounded-xl bg-brand/8 flex items-center justify-center mb-4 group-hover:bg-brand/15 group-hover:scale-110 transition-all duration-300"
                    aria-hidden="true"
                  >
                    <feature.icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="text-base font-bold mb-1.5 group-hover:text-brand transition-colors">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
