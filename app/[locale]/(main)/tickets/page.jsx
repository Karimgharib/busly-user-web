// app/[locale]/(main)/tickets/page.js
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import TicketsContent from "./TicketsContent";
import { Ticket } from "lucide-react";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "tickets" });
  return { title: `${t("title")} | Busly` };
}

export default function TicketsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
