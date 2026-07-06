import React from "react";
import {
  CheckCircle,
  Backpack,
  Shirt,
  Layers,
  PersonStanding,
  Hand,
  Footprints,
  ShieldCheck,
  Package,
  Sparkles,
} from "lucide-react";

const fonts = {
  display: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  body: "'Nunito Sans', 'Lato', 'Segoe UI', system-ui, sans-serif",
};

const categoryMeta = {
  general: { title: "General", icon: Backpack },
  upperBody: { title: "Upper Body", icon: Shirt },
  torso: { title: "Torso", icon: Layers },
  lowerBody: { title: "Lower Body", icon: PersonStanding },
  hands: { title: "Hands", icon: Hand },
  feet: { title: "Feet", icon: Footprints },
  undergarments: { title: "Undergarments", icon: ShieldCheck },
  otherEssentials: { title: "Other Essentials", icon: Package },
  optionalItems: { title: "Optional Items", icon: Sparkles },
};

export default function PackingList({ packingList }) {
  if (!packingList) return null;

  const categories = Object.entries(categoryMeta)
    .map(([key, meta]) => {
      const items = (packingList[key] || []).filter(
        (item) => item && item.trim() !== "",
      );
      return { key, items, ...meta };
    })
    .filter((cat) => cat.items.length > 0);

  if (categories.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-500 mb-2">
          Get Ready
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
          style={{ fontFamily: fonts.display, letterSpacing: "-0.01em" }}
        >
          Packing List
        </h2>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-8 h-[2px] bg-emerald-400 rounded-full" />
          <div className="w-2 h-[2px] bg-emerald-200 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(({ key, title, icon: Icon, items }) => (
          <div
            key={key}
            className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-emerald-200 hover:shadow-md transition-all duration-200"
          >
            <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent" />
            <div className="p-5 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-emerald-500 stroke-[1.75]" />
                </div>
                <h3
                  className="text-base font-bold text-gray-900"
                  style={{ fontFamily: fonts.body }}
                >
                  {title}
                </h3>
                <span
                  className="ml-auto text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"
                  style={{ fontFamily: fonts.body }}
                >
                  {items.length}
                </span>
              </div>

              <ul className="space-y-2.5">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-gray-600"
                    style={{ fontFamily: fonts.body }}
                  >
                    <CheckCircle
                      size={14}
                      className="text-emerald-500 mt-0.5 shrink-0"
                    />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}