// components/home/TestimonialCards.jsx — CLIENT island for active state
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "Frequent Traveler",
    avatar: "https://picsum.photos/seed/ahmed/100/100",
    rating: 5,
    text: "text1",
    route: "Cairo → Alex",
  },
  {
    name: "Sara Mohamed",
    role: "Student",
    avatar: "https://picsum.photos/seed/sara/100/100",
    rating: 5,
    text: "text2",
    route: "Cairo → Luxor",
  },
  {
    name: "Omar Ali",
    role: "Business Traveler",
    avatar: "https://picsum.photos/seed/omar/100/100",
    rating: 4,
    text: "text3",
    route: "Cairo → Hurghada",
  },
  {
    name: "Fatma Ibrahim",
    role: "Tourist",
    avatar: "https://picsum.photos/seed/fatma/100/100",
    rating: 5,
    text: "text4",
    route: "Alex → Matrouh",
  },
];

export default function TestimonialCards() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.name}
            layout
            onClick={() => setActive(index)}
            className="cursor-pointer"
          >
            <Card
              className={cn(
                "transition-all duration-300 h-full",
                active === index
                  ? "bg-card border-brand/30 shadow-lg shadow-brand/10"
                  : "bg-card/50 border-border/50 hover:border-brand/15 hover:bg-card",
              )}
            >
              <CardContent className="relative p-6">
                <div
                  className="flex items-center gap-0.5 mb-3"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < item.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-muted-foreground/20",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-muted-foreground leading-relaxed mb-5">
                  <p>&ldquo;{t(item.text)}&rdquo;</p>
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <Avatar className="h-10 w-10 ring-2 ring-border">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <cite className="not-italic text-sm font-bold truncate block">
                      {item.name}
                    </cite>
                    <span className="text-xs text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="absolute top-4 right-4 bg-brand/6 text-brand border-brand/15 text-[11px] font-semibold"
                >
                  {item.route}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div
        className="flex items-center justify-center gap-3 mt-8"
        role="tablist"
        aria-label="Testimonial navigation"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setActive(
              (p) => (p - 1 + testimonials.length) % testimonials.length,
            )
          }
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-8 bg-brand"
                  : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setActive((p) => (p + 1) % testimonials.length)}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}
