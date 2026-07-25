// components/home/TestimonialsSection.jsx — SERVER wrapper
import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion/FadeIn";
import TestimonialCards from "./TestimonialCards";

export default async function TestimonialsSection() {
  const t = await getTranslations("testimonials");

  return (
    <section
      className="relative py-24 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="absolute bottom-0 left-0 w-72 h-72 bg-brand/3 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge
              variant="secondary"
              className="gap-1.5 bg-brand/8 text-brand hover:bg-brand/12 mb-4"
            >
              <Quote className="w-3.5 h-3.5" aria-hidden="true" />
              {t("badge")}
            </Badge>
            <h2
              id="testimonials-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
            >
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
          </div>
        </FadeIn>

        <TestimonialCards />
      </div>
    </section>
  );
}
