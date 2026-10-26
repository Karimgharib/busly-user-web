// app/[locale]/search/page.js
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import SearchResults from "@/components/search/SearchResults";
import SearchForm from "@/components/home/SearchForm";

export async function generateMetadata({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearch = await searchParams;
  const t = await getTranslations({ locale, namespace: "searchResults" });
  const from = resolvedSearch.from || "";
  const to = resolvedSearch.to || "";

  return {
    title: `${from} → ${to} | Busly`,
    description: t("noResultsDesc"),
  };
}

export default function SearchPage() {
  return (
    <main className="flex-1 bg-muted/30">
      {/* Compact Search Header */}
      <div className="bg-brand dark:bg-card dark:border-b dark:border-border py-6">
        <div className="max-w-5xl mx-auto px-4">
          <SearchForm compact />
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="space-y-4" aria-label="Loading search results">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-36 bg-muted rounded-lg animate-pulse"
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
