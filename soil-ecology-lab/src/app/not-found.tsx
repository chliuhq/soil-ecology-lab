"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      {/* Decorative icon */}
      <div className="relative mb-8">
        <span className="text-8xl select-none" role="img" aria-label="seedling">🌱</span>
        <div className="absolute -top-2 -right-4 text-4xl opacity-60 select-none">?</div>
      </div>

      {/* 404 number */}
      <h1 className="text-7xl font-extrabold text-primary mb-4 tracking-tight">404</h1>

      {/* Messages */}
      <p className="text-xl text-gray-700 mb-2 font-semibold">页面未找到 · Page Not Found</p>
      <p className="text-base text-text-light mb-8 max-w-md">
        这片土壤上还没有长出内容……也许它正在萌芽中。
        <br />
        <span className="text-sm">The page you&apos;re looking for doesn&apos;t exist yet.</span>
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
          </svg>
          返回首页 / Home
        </Link>
        <Link
          href="/research"
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-green-50 transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          探索研究 / Research
        </Link>
      </div>

      {/* Bottom decorative line */}
      <div className="mt-12 flex items-center gap-3 text-text-light text-sm">
        <div className="h-px w-12 bg-gray-200" />
        <span>土壤生态与水土保持课题组 · 广西大学</span>
        <div className="h-px w-12 bg-gray-200" />
      </div>
    </div>
  );
}

