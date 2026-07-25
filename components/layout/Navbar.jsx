// components/layout/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  Bus,
  Moon,
  Sun,
  Globe,
  Phone,
  User,
  Ticket,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "motion/react";

export default function Navbar() {
  const t = useTranslations("navbar");
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, signOut } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const switchLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  const handleSignOut = async () => {
    await signOut();
    router.push(`/${locale}`);
  };

  const navLinks = [
    { label: t("home"), href: `/${locale}` },
    { label: t("routes"), href: `/${locale}/search` },
    { label: t("about"), href: "#about" },
    { label: t("contact"), href: "#contact" },
  ];

  // Derive display name from user metadata or email
  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "";

  return (
    <TooltipProvider delayDuration={200}>
      {/* Top info bar */}
      <div className="hidden md:block bg-brand text-brand-secondary text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              {t("hotline")}: 19600
            </span>
            <Separator
              orientation="vertical"
              className="h-3.5 bg-brand-secondary/30"
            />
            <span className="opacity-60">{t("support24")}</span>
          </div>
          <span className="opacity-80">{t("downloadApp")}</span>
        </div>
      </div>

      {/* Main nav */}
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/50"
            : "bg-background border-b border-transparent",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 group"
              aria-label="Busly home"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Bus
                    className="w-5 h-5 text-brand-secondary"
                    aria-hidden="true"
                  />
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight tracking-tight">
                  Busly
                </span>
                <span className="text-[10px] text-muted-foreground leading-none font-medium">
                  {t("tagline")}
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "font-medium",
                    pathname === link.href
                      ? "text-brand bg-brand/8 hover:text-brand hover:bg-brand/12"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={switchLocale}
                    className="gap-1.5 text-muted-foreground"
                  >
                    <Globe className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">
                      {locale === "en" ? "العربية" : "English"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t("switchLang")}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="text-muted-foreground"
                    aria-label={
                      theme === "dark" ? t("lightMode") : t("darkMode")
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {theme === "dark" ? t("lightMode") : t("darkMode")}
                </TooltipContent>
              </Tooltip>

              {/* Auth area — desktop */}
              {!isLoading && (
                <div className="hidden md:flex">
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 font-medium"
                        >
                          <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-brand" />
                          </div>
                          <span className="max-w-[100px] truncate">
                            {displayName}
                          </span>
                          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <div className="px-2 py-1.5">
                          <p className="text-xs font-semibold truncate">
                            {displayName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/${locale}/tickets`}
                            className="gap-2 cursor-pointer"
                          >
                            <Ticket className="w-4 h-4" />
                            {t("myTickets")}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          {t("signOut")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      size="sm"
                      asChild
                      className="gap-2 bg-brand text-brand-secondary hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 transition-shadow"
                    >
                      <Link href={`/${locale}/login`}>
                        <User className="w-4 h-4" />
                        {t("login")}
                      </Link>
                    </Button>
                  )}
                </div>
              )}

              {/* Mobile sheet */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-muted-foreground"
                    aria-label="Open menu"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M3 5h14M3 10h14M3 15h14" />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={locale === "ar" ? "right" : "left"}
                  className="w-72"
                >
                  <SheetTitle className="flex items-center gap-2.5 mb-6">
                    <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center">
                      <Bus
                        className="w-4 h-4 text-brand-secondary"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="font-bold text-lg">Busly</span>
                  </SheetTitle>

                  {/* Mobile user info */}
                  {user && (
                    <>
                      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-muted/50">
                        <div className="w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-brand" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {displayName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Separator className="mb-4" />
                    </>
                  )}

                  <nav
                    className="flex flex-col gap-1"
                    aria-label="Mobile navigation"
                  >
                    {navLinks.map((link) => (
                      <Button
                        key={link.href}
                        variant="ghost"
                        className={cn(
                          "justify-start font-medium",
                          pathname === link.href
                            ? "text-brand bg-brand/8"
                            : "text-muted-foreground",
                        )}
                        asChild
                      >
                        <Link href={link.href}>{link.label}</Link>
                      </Button>
                    ))}
                    {user && (
                      <Button
                        variant="ghost"
                        className="justify-start font-medium text-muted-foreground"
                        asChild
                      >
                        <Link href={`/${locale}/tickets`}>
                          <Ticket className="w-4 h-4 mr-2" />
                          {t("myTickets")}
                        </Link>
                      </Button>
                    )}
                  </nav>

                  <Separator className="my-4" />

                  {user ? (
                    <Button
                      variant="outline"
                      className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      {t("signOut")}
                    </Button>
                  ) : (
                    <Button
                      className="w-full gap-2 bg-brand text-brand-secondary hover:bg-brand/90"
                      asChild
                    >
                      <Link href={`/${locale}/login`}>
                        <User className="w-4 h-4" aria-hidden="true" />
                        {t("login")}
                      </Link>
                    </Button>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>
    </TooltipProvider>
  );
}
