import React from "react";
import { Sun } from "lucide-react";

const fonts = {
  display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body: "'Nunito Sans', 'Lato', 'Segoe UI', system-ui, sans-serif",
};

export default function BestTime({ text }) {
  if (!text || !text.trim()) return null;

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-orange-400 mb-2">
          Plan Ahead
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
          style={{ fontFamily: fonts.display, letterSpacing: "-0.01em" }}
        >
          Best Time To Visit
        </h2>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-8 h-[2px] bg-orange-400 rounded-full" />
          <div className="w-2 h-[2px] bg-orange-200 rounded-full" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-orange-200 transition-all duration-200">
        <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-300 to-transparent" />
        <div className="p-5 sm:p-6 bg-white flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <Sun size={17} className="text-orange-500" />
          </div>
          <p
            className="text-base text-gray-600 leading-relaxed whitespace-pre-line"
            style={{ fontFamily: fonts.body, lineHeight: "1.8" }}
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}