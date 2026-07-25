// app/[locale]/(auth)/login/LoginForm.jsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bus, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { FloatingShape } from "@/components/motion/FloatingShape";

export default function LoginForm() {
  const t = useTranslations("login");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const redirect = searchParams.get("redirect") || `/${locale}`;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError(t("somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating shapes */}
      <FloatingShape
        className="absolute top-20 right-[15%] w-3 h-3 bg-brand/20 rounded-full"
        duration={5}
        aria-hidden="true"
      />
      <FloatingShape
        className="absolute bottom-32 left-[10%] w-4 h-4 bg-brand/15 rounded-full"
        duration={7}
        delay={1}
        aria-hidden="true"
      />
      <FloatingShape
        className="absolute top-40 left-[20%] w-2 h-2 bg-brand/25 rounded-full"
        duration={6}
        delay={2}
        aria-hidden="true"
      />

      <FadeIn>
        <Card className="border-border/40 shadow-2xl shadow-black/10 dark:shadow-black/30 backdrop-blur-xl bg-background/80">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/25">
                <Bus className="w-6 h-6 text-brand-secondary" />
              </div>
            </div>
            <p className="text-center text-brand font-semibold text-sm mb-8">
              Busly
            </p>

            <h1 className="text-2xl font-extrabold text-center mb-1.5">
              {t("title")}
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-8">
              {t("subtitle")}
            </p>

            {/* Success message after signup */}
            {searchParams.get("registered") && (
              <FadeIn delay={0}>
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-sm text-center">
                  {t("registeredSuccess")}
                </div>
              </FadeIn>
            )}

            {/* Error */}
            {error && (
              <FadeIn delay={0}>
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </div>
              </FadeIn>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="pl-11 h-12 bg-muted/40 border-border/50 focus-visible:border-brand/50"
                  required
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  className="pl-11 pr-11 h-12 bg-muted/40 border-border/50 focus-visible:border-brand/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand text-brand-secondary hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 font-semibold h-12 text-base rounded-xl disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-brand-secondary/30 border-t-brand-secondary rounded-full animate-spin" />
                ) : (
                  t("submit")
                )}
              </Button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground font-medium">
                {t("or")}
              </span>
              <Separator className="flex-1" />
            </div>

            <p className="text-sm text-muted-foreground text-center">
              {t("noAccount")}{" "}
              <Link
                href={`/${locale}/signup${redirect !== `/${locale}` ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
                className="text-brand font-semibold hover:underline"
              >
                {t("signUp")}
              </Link>
            </p>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-muted-foreground/60">
              <Shield className="w-3.5 h-3.5" aria-hidden="true" />
              {t("secure")}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </>
  );
}
