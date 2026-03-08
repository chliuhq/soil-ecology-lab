"use client";
import { useI18n } from "@/lib/i18n-context";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-20">
      <div className="container-main py-10 text-center text-sm text-text-light">
        <p className="mb-2">{t.common.copyright}</p>
        <p>&copy; {year}. All rights reserved.</p>
      </div>
    </footer>
  );
}
