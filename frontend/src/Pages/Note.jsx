import React from "react";
import { AlertTriangle } from "lucide-react";

const fonts = {
  display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body: "'Nunito Sans', 'Lato', 'Segoe UI', system-ui, sans-serif",
};

export default function Note({ note }) {
  if (!note || !note.trim()) return null;

  return (
    <section>
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 overflow-hidden shadow-sm">
        <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />
        <div className="p-5 sm:p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-amber-600" />
          </div>
          <div className="min-w-0">
            <p
              className="text-xs font-black tracking-[0.25em] uppercase text-amber-600 mb-1.5"
              style={{ fontFamily: fonts.body }}
            >
              Important Note
            </p>
            <p
              className="text-[15px] text-amber-900 leading-relaxed whitespace-pre-line"
              style={{ fontFamily: fonts.body }}
            >
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}