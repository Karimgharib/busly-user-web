// app/[locale]/booking/[id]/AuthGuard.jsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn, Bus } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { usePathname } from "next/navigation";

export default function AuthGuard({ locale, children }) {
  const { user, isLoading } = useAuth();
  const t = useTranslations("auth");
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
        <Bus className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <FadeIn className="flex items-center justify-center py-20">
        <Card className="w-full max-w-sm border-border/60">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-5">
              <LogIn className="w-7 h-7 text-brand" />
            </div>
            <h2 className="text-lg font-bold mb-2">{t("loginRequired")}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t("loginToBook")}
            </p>
            <Button
              asChild
              className="w-full gap-2 bg-brand text-brand-secondary hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 font-semibold"
            >
              <Link
                href={`/${locale}/login?redirect=${encodeURIComponent(pathname)}`}
              >
                <LogIn className="w-4 h-4" />
                {t("signIn")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </FadeIn>
    );
  }

  return children;
}
