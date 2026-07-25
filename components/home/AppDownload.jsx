// components/home/AppDownload.jsx
import { getTranslations } from "next-intl/server";
import { Bell, MapPin, Ticket, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/FadeIn";
import { FloatingShape } from "@/components/motion/FloatingShape";

export default async function AppDownload({ locale }) {
  const t = await getTranslations("appDownload");

  const appFeatures = [
    { icon: Ticket, label: t("feature1") },
    { icon: MapPin, label: t("feature2") },
    { icon: Bell, label: t("feature3") },
  ];

  return (
    <section
      className="relative py-24 overflow-hidden"
      aria-labelledby="app-heading"
    >
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div
        className="absolute inset-0 dot-pattern opacity-20"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="right">
            <Badge
              variant="secondary"
              className="gap-1.5 bg-brand/8 text-brand hover:bg-brand/12 mb-5"
            >
              <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              {t("badge")}
            </Badge>
            <h2
              id="app-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-[1.15]"
            >
              {t("title")}{" "}
              <span className="gradient-text">{t("titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {appFeatures.map((feat) => (
                <Card
                  key={feat.label}
                  className="bg-card/80 border-border/50 shadow-none"
                >
                  <CardContent className="flex items-center gap-2 px-4 py-2.5">
                    <feat.icon
                      className="w-4 h-4 text-brand"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">{feat.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-3 bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a href="#" aria-label="Download on the App Store">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-start">
                    <div className="text-[10px] opacity-70 leading-none">
                      {t("downloadOn")}
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      App Store
                    </div>
                  </div>
                </a>
              </Button>
              <Button
                size="lg"
                className="gap-3 bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <a href="#" aria-label="Get it on Google Play">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div className="text-start">
                    <div className="text-[10px] opacity-70 leading-none">
                      {t("getItOn")}
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      Google Play
                    </div>
                  </div>
                </a>
              </Button>
            </div>
          </FadeIn>

          {/* Phone mockup */}
          <FadeIn direction="left">
            <div className="relative flex justify-center">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/15 rounded-full blur-3xl"
                aria-hidden="true"
              />
              <div
                className="relative w-64 h-[500px] rounded-[3rem] bg-foreground p-3 shadow-2xl shadow-black/30"
                role="img"
                aria-label="Busly mobile app screenshot"
              >
                <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-gradient-to-b from-brand/20 to-brand/5 relative">
                  <div
                    className="flex items-center justify-between px-6 pt-4 pb-2"
                    aria-hidden="true"
                  >
                    <span className="text-[10px] font-semibold text-foreground/70">
                      9:41
                    </span>
                    <div className="w-20 h-5 bg-foreground rounded-full" />
                    <div className="w-3.5 h-2.5 border border-foreground/60 rounded-sm">
                      <div className="w-2 h-1.5 bg-green-500 rounded-[1px] m-[1px]" />
                    </div>
                  </div>
                  <div className="px-5 pt-4">
                    <div className="text-lg font-extrabold text-foreground mb-1">
                      Busly
                    </div>
                    <div className="text-[11px] text-foreground/50 mb-5">
                      Book your next trip
                    </div>
                    <div className="space-y-2.5 mb-5">
                      <div className="h-11 rounded-xl bg-white/80 border border-white/50 px-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand/30" />
                        <div className="h-2 w-16 rounded bg-foreground/15" />
                      </div>
                      <div className="h-11 rounded-xl bg-white/80 border border-white/50 px-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand/30" />
                        <div className="h-2 w-12 rounded bg-foreground/15" />
                      </div>
                      <div className="h-11 rounded-xl bg-brand flex items-center justify-center">
                        <span className="text-[11px] font-bold text-white">
                          Search Buses
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-white/50 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-2 w-20 rounded bg-foreground/15" />
                        <div className="h-2 w-10 rounded bg-brand/30" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-1.5 w-12 rounded bg-foreground/10" />
                        <div className="flex-1 border-t border-dashed border-foreground/20" />
                        <div className="h-1.5 w-14 rounded bg-foreground/10" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-10 rounded bg-foreground/10" />
                        <div className="h-1.5 w-8 rounded bg-foreground/10" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-3 bg-gradient-to-t from-white/80 to-transparent"
                    aria-hidden="true"
                  >
                    <div className="flex items-center justify-around">
                      {["Home", "Search", "Tickets", "Profile"].map((l, i) => (
                        <div
                          key={l}
                          className="flex flex-col items-center gap-1"
                        >
                          <div
                            className={
                              l === "Home"
                                ? "w-5 h-5 rounded-md bg-brand/30"
                                : "w-5 h-5 rounded-md bg-foreground/10"
                            }
                          />
                          <div
                            className={
                              l === "Home"
                                ? "h-1 w-7 rounded bg-brand/40"
                                : "h-1 w-7 rounded bg-foreground/10"
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <FloatingShape
                className="absolute -left-8 top-24"
                duration={6}
                delay={1}
                aria-hidden="true"
              >
                <Card className="glass-card shadow-xl border-0">
                  <CardContent className="flex items-center gap-2.5 p-3">
                    <div
                      className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Bell className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold">
                        {t("notifTitle")}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {t("notifDesc")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FloatingShape>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
