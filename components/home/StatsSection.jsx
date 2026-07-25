// components/home/StatsSection.jsx
import { getTranslations } from "next-intl/server";
import { Bus, MapPin, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { FloatingShape } from "@/components/motion/FloatingShape";

const stats = [
  { icon: Bus, value: 250, suffix: "+", key: "buses" },
  { icon: MapPin, value: 45, suffix: "+", key: "cities" },
  { icon: Users, value: 2, suffix: "M+", key: "passengers" },
  { icon: Star, value: 4.8, suffix: "", key: "rating", decimal: true },
];

export default async function StatsSection() {
  const t = await getTranslations("stats");

  return (
    <section
      className="relative py-20 overflow-hidden"
      aria-labelledby="stats-heading"
    >
      <div className="absolute inset-0 bg-brand" aria-hidden="true" />
      <div
        className="absolute inset-0 dot-pattern opacity-10"
        aria-hidden="true"
      />
      <FloatingShape
        className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white/5"
        duration={6}
        aria-hidden="true"
      />
      <FloatingShape
        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5"
        duration={8}
        delay={1}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <h2 id="stats-heading" className="sr-only">
          {t("title")}
        </h2>
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <StaggerItem key={stat.key}>
              <Card className="bg-transparent border-white/10 hover:border-white/20 transition-colors shadow-none">
                <CardContent className="flex flex-col items-center text-center p-6 lg:p-8">
                  <div
                    className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4"
                    aria-hidden="true"
                  >
                    <stat.icon className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-brand-secondary mb-1 tracking-tight">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimal={stat.decimal ?? false}
                    />
                  </div>
                  <div className="text-sm text-brand-secondary/70 font-medium">
                    {t(stat.key)}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
