// components/search/SearchResults.jsx
"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { useTenant } from "@/lib/TenantProvider";
import SearchCard from "./SearchCard";
import { Bus, CalendarDays } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export default function SearchResults() {
  const t = useTranslations("searchResults");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { tenant } = useTenant();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  // ✅ useSupabaseQuery — join filters via dot notation + range
  const { data: schedules = [], isLoading } = useSupabaseQuery({
    table: "schedules",
    queryKey: ["schedules-search", from, to, date, tenant?.id],
    select: "*, routes!inner(*), buses(*)",
    filters: {
      tenant_id: tenant?.id,
      status: "active",
      "routes.from_city": from,
      "routes.to_city": to,
      "departure_time.gte": `${date}T00:00:00`,
      "departure_time.lte": `${date}T23:59:59`,
    },
    orderBy: { column: "departure_time", asc: true },
    enabled: !!tenant?.id && !!from && !!to && !!date,
  });

  if (isLoading) {
    return (
      <div className="space-y-5" aria-label="Loading search results">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-muted rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {from} → {to}
          </h1>
          {date && (
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              {new Date(date + "T00:00:00").toLocaleDateString(
                locale === "ar" ? "ar-EG" : "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </p>
          )}
        </div>
        <Badge
          variant="secondary"
          className="bg-muted/60 text-muted-foreground font-medium px-3 py-1.5 rounded-full"
        >
          {schedules.length} {t("found")}
        </Badge>
      </motion.div>

      {schedules.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mx-auto mb-6">
            <Bus className="w-9 h-9 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t("noResults")}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t("noResultsDesc")}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col gap-4"
        >
          {schedules.map((schedule) => (
            <motion.div
              key={schedule.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <SearchCard schedule={schedule} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
