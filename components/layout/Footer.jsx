// components/layout/Footer.jsx
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Bus, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/motion/FadeIn";

// ── Brand icons (Lucide doesn't include these) ──
function FacebookIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsappIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Social links config ──
const socials = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: XIcon, href: "#", label: "X (Twitter)" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
  { icon: WhatsappIcon, href: "#", label: "WhatsApp" },
];

export default async function Footer({ locale }) {
  const t = await getTranslations("footer");

  const links = {
    company: [
      { label: t("aboutUs"), href: "#about" },
      { label: t("careers"), href: "#" },
      { label: t("press"), href: "#" },
      { label: t("blog"), href: "#" },
    ],
    support: [
      { label: t("helpCenter"), href: "#" },
      { label: t("safety"), href: "#" },
      { label: t("terms"), href: "#" },
      { label: t("privacy"), href: "#" },
    ],
    routes: [
      {
        label: "Cairo → Alexandria",
        href: `/${locale}/search?from=Cairo&to=Alexandria`,
      },
      {
        label: "Cairo → Hurghada",
        href: `/${locale}/search?from=Cairo&to=Hurghada`,
      },
      { label: "Cairo → Luxor", href: `/${locale}/search?from=Cairo&to=Luxor` },
      { label: "Cairo → Aswan", href: `/${locale}/search?from=Cairo&to=Aswan` },
    ],
  };

  const FooterLink = ({ label, href }) => (
    <Button
      variant="link"
      asChild
      className="h-auto p-0 text-background/50 hover:text-background hover:no-underline gap-1 group"
    >
      <Link href={href}>
        {label}
        <ArrowUpRight
          className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
          aria-hidden="true"
        />
      </Link>
    </Button>
  );

  return (
    <footer
      id="contact"
      className="relative bg-foreground text-background overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand */}
          <FadeIn className="lg:col-span-2">
            <Button
              variant="link"
              asChild
              className="flex items-center gap-2.5 mb-5 h-auto p-0 hover:no-underline"
            >
              <Link href={`/${locale}`} aria-label="Busly home">
                <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                  <Bus
                    className="w-5 h-5 text-brand-secondary"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-xl font-extrabold text-background">
                  Busly
                </span>
              </Link>
            </Button>
            <p className="text-sm text-background/60 leading-relaxed max-w-sm mb-6">
              {t("description")}
            </p>
            <address className="not-italic space-y-3">
              <Button
                variant="link"
                asChild
                className="h-auto p-0 text-background/70 hover:text-background hover:no-underline gap-2.5"
              >
                <a href="tel:19600">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  19600
                </a>
              </Button>
              <div>
                <Button
                  variant="link"
                  asChild
                  className="h-auto p-0 text-background/70 hover:text-background hover:no-underline gap-2.5"
                >
                  <a href="mailto:support@busly.com">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    support@busly.com
                  </a>
                </Button>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-background/70">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                Cairo, Egypt
              </div>
            </address>
          </FadeIn>

          {/* Company */}
          <FadeIn delay={0.1}>
            <nav aria-label="Company links">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-background/90">
                {t("company")}
              </h3>
              <div className="flex flex-col gap-3">
                {links.company.map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </div>
            </nav>
          </FadeIn>

          {/* Support */}
          <FadeIn delay={0.15}>
            <nav aria-label="Support links">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-background/90">
                {t("support")}
              </h3>
              <div className="flex flex-col gap-3">
                {links.support.map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </div>
            </nav>
          </FadeIn>

          {/* Routes */}
          <FadeIn delay={0.2}>
            <nav aria-label="Popular routes">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-background/90">
                {t("popularRoutes")}
              </h3>
              <div className="flex flex-col gap-3">
                {links.routes.map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </div>
            </nav>
          </FadeIn>
        </div>

        <Separator className="bg-background/10" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Busly. {t("rights")}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                asChild
                className="w-9 h-9 rounded-lg bg-background/5 text-background/50 hover:bg-brand hover:text-brand-secondary transition-all"
              >
                <a href={social.href} aria-label={social.label}>
                  <social.icon className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>

          {/* Payment methods */}
          <div
            className="flex items-center gap-2"
            aria-label="Accepted payment methods"
          >
            {["Visa", "Mastercard", "Fawry", "Cash"].map((m) => (
              <span
                key={m}
                className="px-2.5 py-1 rounded-md bg-background/5 text-[10px] font-semibold text-background/40 border border-background/10"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
