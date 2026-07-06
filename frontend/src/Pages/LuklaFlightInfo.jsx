import React from "react";
import { Plane, CloudFog } from "lucide-react";

const fonts = {
  display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body: "'Nunito Sans', 'Lato', 'Segoe UI', system-ui, sans-serif",
};

export default function LuklaFlightInfo({ info }) {
  if (!info || !info.trim()) return null;

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-sky-500 mb-2">
          Getting There
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
          style={{ fontFamily: fonts.display, letterSpacing: "-0.01em" }}
        >
          Lukla Flight Information
        </h2>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-8 h-[2px] bg-sky-400 rounded-full" />
          <div className="w-2 h-[2px] bg-sky-200 rounded-full" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-sky-200 transition-all duration-200">
        <div className="h-1 bg-gradient-to-r from-sky-400 via-sky-300 to-transparent" />
        <div className="p-5 sm:p-6 bg-white flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 relative">
            <Plane size={18} className="text-sky-500" />
            <CloudFog
              size={12}
              className="text-sky-300 absolute -bottom-1 -right-1"
            />
          </div>
          <p
            className="text-base text-gray-600 leading-relaxed whitespace-pre-line"
            style={{ fontFamily: fonts.body, lineHeight: "1.8" }}
          >
            {info}
          </p>
        </div>
      </div>
    </section>
  );
}