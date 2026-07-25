// components/home/SearchForm.jsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useCities } from "@/hooks/useCities";
import {
  MapPin,
  ArrowRightLeft,
  CalendarDays,
  Search,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function SearchForm({ compact = false }) {
  const t = useTranslations("search");
  const router = useRouter();
  const locale = useLocale();
  const { cities } = useCities();

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [date, setDate] = useState(undefined);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  const filteredFrom =
    cities?.filter(
      (c) => c.toLowerCase().includes(fromQuery.toLowerCase()) && c !== toCity,
    ) || [];

  const filteredTo =
    cities?.filter(
      (c) => c.toLowerCase().includes(toQuery.toLowerCase()) && c !== fromCity,
    ) || [];

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
    setFromQuery(toCity);
    setToQuery(fromCity);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!fromCity || !toCity || !date) return;

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const params = new URLSearchParams({
      from: fromCity,
      to: toCity,
      date: `${yyyy}-${mm}-${dd}`,
    });
    router.push(`/${locale}/search?${params.toString()}`);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (d) =>
    d?.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // ─────────────────────────────────────
  // COMPACT MODE (Search Results Page)
  // ─────────────────────────────────────
  if (compact) {
    return (
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-stretch gap-2"
        role="search"
        aria-label="Search bus trips"
      >
        {/* From */}
        <Popover open={fromOpen} onOpenChange={setFromOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-brand-secondary hover:bg-white/25 transition-colors text-start"
              aria-label={t("from")}
            >
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    "text-sm truncate block",
                    fromCity ? "font-medium" : "opacity-60",
                  )}
                >
                  {fromCity || t("fromPlaceholder")}
                </span>
              </div>
              <ChevronDown
                className="w-3.5 h-3.5 opacity-60 shrink-0"
                aria-hidden="true"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-1"
            align="start"
          >
            <div className="px-2 pb-2">
              <Input
                value={fromQuery}
                onChange={(e) => setFromQuery(e.target.value)}
                placeholder={t("fromPlaceholder")}
                className="border-0 shadow-none focus-visible:ring-0 h-9 text-sm"
                autoFocus
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredFrom.length === 0 && (
                <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                  {t("noResults")}
                </p>
              )}
              {filteredFrom.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setFromCity(city);
                    setFromQuery(city);
                    setFromOpen(false);
                  }}
                  className="w-full px-3 py-2.5 text-left text-sm hover:bg-muted/60 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MapPin
                    className="w-3.5 h-3.5 text-muted-foreground shrink-0"
                    aria-hidden="true"
                  />
                  {city}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Swap */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={swapCities}
          className="self-center w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 text-brand-secondary shrink-0 border border-white/20"
          aria-label="Swap cities"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
        </Button>

        {/* To */}
        <Popover open={toOpen} onOpenChange={setToOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-brand-secondary hover:bg-white/25 transition-colors text-start"
              aria-label={t("to")}
            >
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <span
                  className={cn(
                    "text-sm truncate block",
                    toCity ? "font-medium" : "opacity-60",
                  )}
                >
                  {toCity || t("toPlaceholder")}
                </span>
              </div>
              <ChevronDown
                className="w-3.5 h-3.5 opacity-60 shrink-0"
                aria-hidden="true"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-1"
            align="start"
          >
            <div className="px-2 pb-2">
              <Input
                value={toQuery}
                onChange={(e) => setToQuery(e.target.value)}
                placeholder={t("toPlaceholder")}
                className="border-0 shadow-none focus-visible:ring-0 h-9 text-sm"
                autoFocus
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredTo.length === 0 && (
                <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                  {t("noResults")}
                </p>
              )}
              {filteredTo.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setToCity(city);
                    setToQuery(city);
                    setToOpen(false);
                  }}
                  className="w-full px-3 py-2.5 text-left text-sm hover:bg-muted/60 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MapPin
                    className="w-3.5 h-3.5 text-muted-foreground shrink-0"
                    aria-hidden="true"
                  />
                  {city}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Date */}
        <Popover open={calOpen} onOpenChange={setCalOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 sm:flex-none sm:min-w-[180px] flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-brand-secondary hover:bg-white/25 transition-colors text-start"
              aria-label={t("date")}
            >
              <CalendarDays className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span
                className={cn(
                  "text-sm truncate flex-1",
                  date ? "font-medium" : "opacity-60",
                )}
              >
                {date ? formatDate(date) : t("selectDate")}
              </span>
              <ChevronDown
                className="w-3.5 h-3.5 opacity-60 shrink-0"
                aria-hidden="true"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setCalOpen(false);
              }}
              disabled={{ before: today }}
              initialFocus
              className="p-3"
            />
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button
          type="submit"
          className="gap-2 bg-brand-secondary text-brand hover:bg-brand-secondary/90 font-semibold px-6 shrink-0 transition-all active:scale-[0.98]"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          {t("search")}
        </Button>
      </form>
    );
  }

  // ─────────────────────────────────────
  // FULL MODE (Hero Section)
  // ─────────────────────────────────────
  return (
    <form
      onSubmit={handleSearch}
      className="relative rounded-2xl bg-background/80 backdrop-blur-2xl border border-border/60 shadow-2xl shadow-black/10 dark:shadow-black/30 p-2"
      role="search"
      aria-label="Search bus trips"
    >
      <div className="flex flex-col md:flex-row items-stretch gap-2">
        {/* From */}
        <Popover open={fromOpen} onOpenChange={setFromOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 flex items-center gap-2 px-4 py-3.5 rounded-xl hover:bg-muted/50 transition-colors text-start"
              aria-label={t("from")}
            >
              <MapPin
                className="w-5 h-5 text-brand shrink-0"
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("from")}
                </label>
                <div
                  className={cn(
                    "text-sm truncate",
                    fromCity
                      ? "font-medium text-foreground"
                      : "text-muted-foreground/50",
                  )}
                >
                  {fromCity || t("fromPlaceholder")}
                </div>
              </div>
              <ChevronDown
                className="w-4 h-4 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-1"
            align="start"
          >
            <div className="px-2 pb-2">
              <Input
                value={fromQuery}
                onChange={(e) => setFromQuery(e.target.value)}
                placeholder={t("fromPlaceholder")}
                className="border-0 shadow-none focus-visible:ring-0 h-9 text-sm"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredFrom.length === 0 && (
                <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                  {t("noResults")}
                </p>
              )}
              {filteredFrom.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setFromCity(city);
                    setFromQuery(city);
                    setFromOpen(false);
                  }}
                  className="w-full px-3 py-2.5 text-left text-sm hover:bg-muted/60 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MapPin
                    className="w-3.5 h-3.5 text-muted-foreground shrink-0"
                    aria-hidden="true"
                  />
                  {city}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Swap */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={swapCities}
          className="hidden md:flex self-center w-10 h-10 rounded-xl bg-brand/8 text-brand hover:bg-brand/15 transition-all duration-300 shrink-0"
          aria-label="Swap cities"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </Button>

        {/* To */}
        <Popover open={toOpen} onOpenChange={setToOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 flex items-center gap-2 px-4 py-3.5 rounded-xl hover:bg-muted/50 transition-colors text-start"
              aria-label={t("to")}
            >
              <MapPin
                className="w-5 h-5 text-brand shrink-0"
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("to")}
                </label>
                <div
                  className={cn(
                    "text-sm truncate",
                    toCity
                      ? "font-medium text-foreground"
                      : "text-muted-foreground/50",
                  )}
                >
                  {toCity || t("toPlaceholder")}
                </div>
              </div>
              <ChevronDown
                className="w-4 h-4 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-1"
            align="start"
          >
            <div className="px-2 pb-2">
              <Input
                value={toQuery}
                onChange={(e) => setToQuery(e.target.value)}
                placeholder={t("toPlaceholder")}
                className="border-0 shadow-none focus-visible:ring-0 h-9 text-sm"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredTo.length === 0 && (
                <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                  {t("noResults")}
                </p>
              )}
              {filteredTo.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setToCity(city);
                    setToQuery(city);
                    setToOpen(false);
                  }}
                  className="w-full px-3 py-2.5 text-left text-sm hover:bg-muted/60 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MapPin
                    className="w-3.5 h-3.5 text-muted-foreground shrink-0"
                    aria-hidden="true"
                  />
                  {city}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Date */}
        <Popover open={calOpen} onOpenChange={setCalOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex-1 md:flex-none md:min-w-[180px] flex items-center gap-2 px-4 py-3.5 rounded-xl hover:bg-muted/50 transition-colors text-start"
              aria-label={t("date")}
            >
              <CalendarDays
                className="w-5 h-5 text-brand shrink-0"
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("date")}
                </label>
                <div
                  className={cn(
                    "text-sm truncate",
                    date
                      ? "font-medium text-foreground"
                      : "text-muted-foreground/50",
                  )}
                >
                  {date ? formatDate(date) : t("selectDate")}
                </div>
              </div>
              <ChevronDown
                className="w-4 h-4 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setCalOpen(false);
              }}
              disabled={{ before: today }}
              initialFocus
              className="p-3"
            />
          </PopoverContent>
        </Popover>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="flex-1 md:flex-none gap-2.5 px-8 bg-brand text-brand-secondary hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 active:scale-[0.98] transition-all shrink-0 font-semibold"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          {t("search")}
        </Button>
      </div>
    </form>
  );
}
