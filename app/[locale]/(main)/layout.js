// app/[locale]/(main)/layout.js
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function MainLayout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer locale={locale} /> */}
    </>
  );
}
