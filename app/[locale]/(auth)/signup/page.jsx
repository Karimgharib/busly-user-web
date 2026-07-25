// app/[locale]/(auth)/signup/page.js
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import SignUpForm from "./SignUpForm";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "signup" });
  return {
    title: locale === "ar" ? "إنشاء حساب | Busly" : "Create Account | Busly",
  };
}

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUpForm />
    </Suspense>
  );
}
