// app/[locale]/booking/[id]/page.js
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import SeatMap from "@/components/booking/SeatMap";
import TripSummary from "@/components/booking/TripSummary";
import { BookingProvider } from "@/components/booking/BookingContext";
import AuthGuard from "@/components/booking/AuthGuard";
import { Bus } from "lucide-react";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "booking" });
  return {
    title: `${t("selectSeat")} | Busly`,
    description: t("selectSeat"),
  };
}

export default async function BookingPage({ params }) {
  const { id } = await params;
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Bus className="w-5 h-5 animate-spin" />
              Loading trip details...
            </div>
          }
        >
          <AuthGuard locale={locale}>
            <BookingProvider scheduleId={id}>
              <div className="grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  <SeatMap />
                </div>
                <div className="lg:col-span-2">
                  <TripSummary />
                </div>
              </div>
            </BookingProvider>
          </AuthGuard>
        </Suspense>
      </div>
    </main>
  );
}
