import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localeDirection: {
    ar: "rtl",
    en: "ltr",
  },
});
