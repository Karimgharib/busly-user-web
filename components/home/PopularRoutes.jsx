// components/home/PopularRoutes.jsx
import { getTranslations } from "next-intl/server";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, Clock, Bus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const routes = [
  {
    from: "Cairo",
    to: "Alexandria",
    price: 120,
    duration: "3h 30m",
    rating: 4.8,
    trips: 24,
    seed: "cairo-alex",
  },
  {
    from: "Cairo",
    to: "Hurghada",
    price: 350,
    duration: "6h 00m",
    rating: 4.6,
    trips: 12,
    seed: "cairo-hurg",
  },
  {
    from: "Cairo",
    to: "Luxor",
    price: 280,
    duration: "8h 30m",
    rating: 4.7,
    trips: 8,
    seed: "cairo-lux",
  },
  {
    from: "Cairo",
    to: "Aswan",
    price: 320,
    duration: "10h 00m",
    rating: 4.5,
    trips: 6,
    seed: "cairo-asw",
  },
  {
    from: "Alexandria",
    to: "Marsa Matrouh",
    price: 180,
    duration: "4h 00m",
    rating: 4.4,
    trips: 10,
    seed: "alex-mat",
  },
  {
    from: "Cairo",
    to: "Sharm El Sheikh",
    price: 400,
    duration: "7h 30m",
    rating: 4.6,
    trips: 8,
    seed: "cairo-shrm",
  },
];

// Need locale for Link hrefs — use a small client wrapper or pass as prop
// Since this is a server component, we receive locale via the page
export default async function PopularRoutes({ locale }) {
  const t = await getTranslations("popularRoutes");

  const buildHref = (route) =>
    `/${locale}/search?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}&date=${new Date().toISOString().split("T")[0]}&passengers=1`;

  return (
    <section
      className="relative py-20 overflow-hidden"
      aria-labelledby="popular-routes-heading"
    >
      <div
        className="absolute inset-0 dot-pattern opacity-30"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <Badge
                variant="secondary"
                className="gap-1.5 bg-brand/8 text-brand hover:bg-brand/12 mb-3"
              >
                <Bus className="w-3.5 h-3.5" aria-hidden="true" />
                {t("badge")}
              </Badge>
              <h2
                id="popular-routes-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              >
                {t("title")}
              </h2>
              <p className="text-muted-foreground mt-2 text-lg max-w-lg">
                {t("subtitle")}
              </p>
            </div>
            <Button
              variant="ghost"
              className="gap-2 text-brand hover:text-brand/80 hover:gap-3 transition-all group"
              asChild
            >
              <Link href={`/${locale}/search`}>
                {t("viewAll")}
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {routes.map((route) => (
            <StaggerItem key={route.from + route.to}>
              <Link
                href={buildHref(getRoute(route))}
                className="block group"
                aria-label={`${route.from} to ${route.to} — EGP ${route.price}`}
              >
                <Card className="route-card border-border/50 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-1 transition-all duration-300 bg-card h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${route.seed}/600/400`}
                      alt={`${route.from} to ${route.to} bus route`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      width={600}
                      height={400}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                      aria-hidden="true"
                    />
                    <Badge className="absolute top-3 right-3 bg-brand text-brand-secondary hover:bg-brand shadow-lg z-10">
                      EGP {route.price}
                    </Badge>
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 z-10"
                      aria-hidden="true"
                    >
                      <div className="flex items-center gap-2 text-white">
                        <span className="font-bold text-lg">{route.from}</span>
                        <div className="flex-1 border-t border-dashed border-white/40 relative">
                          <Bus className="w-4 h-4 text-white/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 rounded-full p-0.5" />
                        </div>
                        <span className="font-bold text-lg">{route.to}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {route.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bus className="w-3.5 h-3.5" aria-hidden="true" />
                          {route.trips} {t("trips")}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="gap-1 text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400 border-0 font-semibold"
                      >
                        <Star
                          className="w-3 h-3 fill-amber-500 text-amber-500"
                          aria-hidden="true"
                        />
                        {route.rating}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function getRoute(route) {
  return route;
}
