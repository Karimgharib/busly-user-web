// app/[locale]/payment/page.js
import { getTranslations } from "next-intl/server";
import PaymentContent from "./PaymentContent";
import AuthGuard from "@/components/booking/AuthGuard";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "payment" });
  return { title: t("pageTitle") };
}

export default async function PaymentPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearch = await searchParams;

  const ids = resolvedSearch?.ids?.split(",").filter(Boolean) ?? [];
  const amount = Number(resolvedSearch?.amount ?? 0);

  return (
    <AuthGuard locale={locale}>
      <PaymentContent bookingIds={ids} amount={amount} />
    </AuthGuard>
  );
}
