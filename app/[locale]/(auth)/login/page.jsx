// app/[locale]/(auth)/login/page.js
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import LoginForm from "./LoginForm";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "login" });
  return {
    title: locale === "ar" ? "تسجيل الدخول | Busly" : "Sign In | Busly",
  };
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
