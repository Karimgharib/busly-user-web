// app/[locale]/(auth)/layout.js
import { Blob } from "@/components/motion/Blob";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div
        className="absolute inset-0 dot-pattern opacity-40"
        aria-hidden="true"
      />

      {/* Decorative blobs */}
      <Blob
        className="absolute top-10 -left-20 w-72 h-72 bg-brand/8 blur-3xl"
        duration={10}
        aria-hidden="true"
      />
      <Blob
        className="absolute bottom-10 -right-20 w-80 h-80 bg-brand/6 blur-3xl"
        duration={10}
        delay={3}
        aria-hidden="true"
      />
      <Blob
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand/4 blur-3xl"
        duration={12}
        delay={5}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">{children}</div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
