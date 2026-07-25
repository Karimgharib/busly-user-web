// app/[locale]/page.js
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import PopularRoutes from "@/components/home/PopularRoutes";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AppDownload from "@/components/home/AppDownload";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: {
      default: t("title"),
      template: `%s | Busly`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      siteName: "Busly",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

function JsonLd({ locale }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Busly",
    description:
      locale === "ar"
        ? "احجز تذاكر الأتوبيس في ثوانٍ عبر مصر"
        : "Book bus tickets in seconds across Egypt",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EGP",
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function HomePage({ params: { locale } }) {
  return (
    <>
      <JsonLd locale={locale} />
      <main>
        <HeroSection />
        {/* <PopularRoutes locale={locale} /> */}
        {/* <FeaturesSection /> */}
        {/* <StatsSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <AppDownload locale={locale} /> */}
      </main>
    </>
  );
}
