// app/[locale]/search/page.js
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import SearchResults from "@/components/search/SearchResults";
import SearchForm from "@/components/home/SearchForm";

export async function generateMetadata({ params: { locale }, searchParams }) {
  const t = await getTranslations({ locale, namespace: "searchResults" });
  const from = searchParams.from || "";
  const to = searchParams.to || "";

  return {
    title: `${from} → ${to} | Busly`,
    description: t("noResultsDesc"),
  };
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Compact Search Header */}
      <div className="relative bg-brand py-8 overflow-hidden">
        <div
          className="absolute inset-0 dot-pattern opacity-10"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4">
          <SearchForm compact />
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="space-y-5" aria-label="Loading search results">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-40 bg-muted rounded-2xl animate-pulse"
                />
              ))}
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </main>
  );
}
