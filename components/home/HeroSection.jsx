// components/home/HeroSection.jsx
import { getTranslations } from "next-intl/server";
import { MapPin, Shield, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/FadeIn";
import { Blob } from "@/components/motion/Blob";
import { FloatingShape } from "@/components/motion/FloatingShape";
import SearchForm from "./SearchForm";

export default async function HeroSection() {
  const t = await getTranslations("hero");

  const trustItems = [
    { icon: Shield, label: t("securePayment") },
    { icon: Clock, label: t("realTimeTracking") },
    { icon: Star, label: t("ratedExcellent") },
    { icon: MapPin, label: t("coveringCities") },
  ];

  const popularCities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Aswan",
    "Luxor",
    "Hurghada",
    "Sharm El Sheikh",
    "Marsa Alam",
  ];

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
      aria-label="Search bus tickets"
    >
      {/* Background layers */}
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div
        className="absolute inset-0 dot-pattern opacity-40"
        aria-hidden="true"
      />

      {/* Animated blobs — client island, purely decorative */}
      <Blob
        className="absolute top-20 -left-32 w-96 h-96 bg-brand/8 blur-3xl"
        duration={8}
        aria-hidden="true"
      />
      <Blob
        className="absolute top-40 right-0 w-80 h-80 bg-brand/6 blur-3xl"
        duration={8}
        delay={2}
        aria-hidden="true"
      />
      <Blob
        className="absolute -bottom-20 left-1/3 w-72 h-72 bg-brand/5 blur-3xl"
        duration={10}
        delay={4}
        aria-hidden="true"
      />

      {/* Floating shapes — client islands, purely decorative */}
      <FloatingShape
        className="absolute top-32 right-[15%] w-4 h-4 bg-brand/20 rounded-full"
        duration={4}
        aria-hidden="true"
      />
      <FloatingShape
        className="absolute top-48 left-[20%] w-3 h-3 bg-brand/15 rounded-full"
        duration={6}
        delay={1}
        aria-hidden="true"
      />
      <FloatingShape
        className="absolute bottom-40 right-[25%] w-5 h-5 bg-brand/10 rounded-sm rotate-45"
        duration={4}
        aria-hidden="true"
      />
      <FloatingShape
        className="absolute bottom-60 left-[10%] w-2.5 h-2.5 bg-brand/20 rounded-full"
        duration={6}
        delay={1}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-20 w-full">
        <FadeIn>
          <div className="flex justify-center mb-6">
            <Badge
              variant="secondary"
              className="gap-2 bg-brand/8 text-brand hover:bg-brand/12 border-brand/15 px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {t("liveTracking")}
            </Badge>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-5">
            <span>{t("headingLine1")} </span>
            <span className="gradient-text">{t("headingHighlight")}</span>
            <br />
            <span>{t("headingLine2")}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-center text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("subheading")}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="max-w-4xl mx-auto mb-10">
            <SearchForm />
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <span className="text-sm text-muted-foreground font-medium me-1">
              {t("popular")}:
            </span>
            {popularCities.map((city) => (
              <Badge
                key={city}
                variant="outline"
                className="px-3.5 py-1.5 rounded-full text-sm font-normal text-muted-foreground bg-muted/50 border-transparent hover:bg-brand/8 hover:text-brand hover:border-brand/15 cursor-pointer transition-colors"
              >
                {city}
              </Badge>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div
                  className="w-8 h-8 rounded-lg bg-brand/8 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <item.icon className="w-4 h-4 text-brand" />
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
