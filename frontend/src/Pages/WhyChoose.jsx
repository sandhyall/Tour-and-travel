import React from "react";
import { Award } from "lucide-react";

const fonts = {
  display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body: "'Nunito Sans', 'Lato', 'Segoe UI', system-ui, sans-serif",
};

export default function WhyChoose({ text }) {
  if (!text || !text.trim()) return null;

  // Support optional line-separated bullet formatting without requiring it
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const isList = lines.length > 1;

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-500 mb-2">
          The Difference
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
          style={{ fontFamily: fonts.display, letterSpacing: "-0.01em" }}
        >
          Why Choose This Trip
        </h2>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-8 h-[2px] bg-emerald-400 rounded-full" />
          <div className="w-2 h-[2px] bg-emerald-200 rounded-full" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm bg-gradient-to-br from-emerald-50/40 to-white">
        <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent" />
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
              <Award size={19} className="text-emerald-600" />
            </div>
            <div className="min-w-0 flex-1">
              {isList ? (
                <ul className="space-y-2.5">
                  {lines.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-base text-gray-700"
                      style={{ fontFamily: fonts.body }}
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className="text-base text-gray-700 leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: fonts.body, lineHeight: "1.8" }}
                >
                  {text}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}