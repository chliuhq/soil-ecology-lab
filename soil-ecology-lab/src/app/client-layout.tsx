"use client";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import AnnouncementBar from "@/components/AnnouncementBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <I18nProvider>
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ChatWidget />
        <BackToTop />
      </I18nProvider>
    </ThemeProvider>
  );
}
