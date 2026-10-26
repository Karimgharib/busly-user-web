// app/[locale]/(main)/tickets/page.js
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import TicketsContent from "./TicketsContent";
import { Ticket } from "lucide-react";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tickets" });
  return { title: `${t("title")} | Busly` };
}

export default async function TicketsPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tickets" });
  return (
    <main className="flex-1 bg-muted/30">
      <div className="bg-brand dark:bg-card dark:border-b dark:border-border">
        <div className="max-w-5xl mx-auto px-4 py-8 flex items-center gap-3 text-white">
          <Ticket className="w-7 h-7" aria-hidden="true" />
          <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="flex justify-center py-20 gap-3 text-muted-foreground">
              <Ticket className="w-5 h-5 animate-spin" />
            </div>
          }
        >
          <TicketsContent />
        </Suspense>
      </div>
    </main>
  );
}
