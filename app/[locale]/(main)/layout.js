// app/[locale]/(main)/layout.js
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function MainLayout({ children, params }) {
  const { locale } = await params;
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      {/* <Footer locale={locale} /> */}
    </div>
  );
}
