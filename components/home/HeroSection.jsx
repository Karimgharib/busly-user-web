// components/home/HeroSection.jsx
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ShieldCheck, Headphones, Star, MapPin } from "lucide-react";
import SearchForm from "./SearchForm";

export default async function HeroSection({ locale }) {
  const t = await getTranslations("hero");

  const highlights = [
    { icon: ShieldCheck, label: t("securePayment") },
    { icon: Headphones, label: t("realTimeTracking") },
    { icon: Star, label: t("ratedExcellent") },
    { icon: MapPin, label: t("coveringCities") },
  ];

  const popularCities = ["Alexandria", "Hurghada", "Luxor", "Aswan", "Sharm El Sheikh"];

  return (
    <section aria-label="Search bus tickets" className="flex-1 flex flex-col">
      {/* Photo banner — grows to fill all remaining height under the navbar */}
      <div
        className="relative bg-cover bg-center flex-1 flex flex-col justify-center"
        style={{ backgroundImage: "url('/hero-bus.jpg')" }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand/80 via-brand/70 to-brand/85 dark:from-black/70 dark:via-black/60 dark:to-black/80"
          aria-hidden="true"
        />
        <div className="relative w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-2">
            {t("headingLine1")}
          </p>
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            {t("headingHighlight")} {t("headingLine2")}
          </h1>
          <p className="text-white/85 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed">
            {t("subheading")}
          </p>

          <div className="mt-6 sm:mt-10 mx-auto text-start">
            <SearchForm />
          </div>

          {/* Popular cities
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-sm text-white/80">
            <span className="font-medium text-white">{t("popular")}:</span>
            {popularCities.map((city) => (
              <Link
                key={city}
                href={`/${locale}/search?from=Cairo&to=${encodeURIComponent(city)}`}
                className="hover:text-white hover:underline underline-offset-4"
              >
                {city}
              </Link>
            ))}
          </div>
          */}
        </div>
      </div>

      {/* Highlights strip
      <div className="max-w-6xl mx-auto px-4 mt-12 mb-16">
        <ul className="grid grid-cols-2 md:grid-cols-4 border-y border-border divide-x divide-border rtl:divide-x-reverse">
          {highlights.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-center gap-2.5 py-5 px-3 text-sm font-medium"
            >
              <item.icon className="w-5 h-5 text-brand" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      */}
    </section>
  );
}
