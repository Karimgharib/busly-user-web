"use client";

import { createContext, useContext, useEffect } from "react";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";

const TenantContext = createContext(null);

export function useTenant() {
  return useContext(TenantContext);
}

export default function TenantProvider({ children, slug }) {
  const { data: tenants, isLoading } = useSupabaseQuery({
    table: "tenants",
    queryKey: ["tenant", slug],
    filters: { slug },
    enabled: !!slug,
  });

  const tenant = tenants?.[0] || null;

  useEffect(() => {
    if (tenant) {
      document.documentElement.style.setProperty(
        "--brand",
        tenant.primary_color,
      );
      document.documentElement.style.setProperty(
        "--brand-secondary",
        tenant.secondary_color,
      );
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, isLoading }}>
      {children}
    </TenantContext.Provider>
  );
}
