// hooks/useCities.js
import { useMemo } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { useTenant } from "@/lib/TenantProvider";

export function useCities() {
  const { tenant } = useTenant();

  const { data: routes = [] } = useSupabaseQuery({
    table: "routes",
    queryKey: ["cities", tenant?.id],
    select: "from_city, to_city",
    filters: { tenant_id: tenant?.id, is_active: true },
    enabled: !!tenant?.id,
  });

  const cities = useMemo(() => {
    const citySet = new Set();
    routes.forEach((r) => {
      if (r.from_city) citySet.add(r.from_city);
      if (r.to_city) citySet.add(r.to_city);
    });
    return Array.from(citySet).sort();
  }, [routes]);

  return { cities };
}
