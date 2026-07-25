// hooks/useSupabaseQuery.js
import { useQuery } from "@tanstack/react-query";
import supabase from "@/lib/supabase";

const OPERATORS = ["gte", "lte", "gt", "lt", "like", "ilike", "neq"];

export function useSupabaseQuery({
  table,
  queryKey,
  select = "*",
  filters = {},
  orderBy,
  single = false,
  in: inFilter,
  enabled = true,
}) {
  return useQuery({
    queryKey,
    enabled,
    queryFn: async () => {
      let query = supabase.from(table).select(select);

      for (const [key, value] of Object.entries(filters)) {
        if (value === undefined || value === null) continue;

        const parts = key.split(".");
        const lastPart = parts[parts.length - 1];

        if (OPERATORS.includes(lastPart)) {
          // e.g. "departure_time.gte" → query.gte("departure_time", value)
          const column = parts.slice(0, -1).join(".");
          query = query[lastPart](column, value);
        } else {
          // e.g. "routes.from_city" → query.eq("routes.from_city", value)
          // Supabase supports dot notation in eq() for joined tables
          query = query.eq(key, value);
        }
      }

      if (inFilter) {
        query = query.in(inFilter.column, inFilter.values);
      }

      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.asc ?? true });
      }

      if (single) query = query.single();

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}
