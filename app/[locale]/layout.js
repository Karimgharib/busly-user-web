import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import ThemeProvider from "@/components/ThemeProvider";
import TenantProvider from "@/lib/TenantProvider";
import "./globals.css";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";

  // Get tenant slug from subdomain or default to 'go-bus' for now
  const slug = "go-bus";

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ReactQueryProvider>
            <NextIntlClientProvider messages={messages}>
              <TenantProvider slug={slug}>{children}</TenantProvider>
            </NextIntlClientProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
