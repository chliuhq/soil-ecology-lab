"use client";
import { I18nProvider } from "@/lib/i18n-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import BackToTop from "@/components/BackToTop";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
      <BackToTop />
    </I18nProvider>
  );
}
