import React from "react";
import { Package, Trash2, Plus, Banknote, Tag, AlignLeft } from "lucide-react";

export default function PackageBuilder({ data, setData }) {
  const addPackage = () => {
    setData([
      ...data,
      {
        name: "",
        price: "",
        oldPrice: "",
        description: "",
        groupPricing: []
      }
    ]);
  };

  const removePackage = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const update = (i, key, value) => {
    const copy = [...data];
    copy[i][key] = value;
    setData(copy);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Package className="text-indigo-600" size={24} />
          Pricing Packages
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          {data.length} Available
        </span>
      </div>

      <div className="grid gap-6">
        {data.map((p, i) => (
          <div
            key={i}
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 animate-in zoom-in-95"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl">
                  <Tag size={20} />
                </div>
                <h4 className="font-bold text-slate-700 text-lg">Package Option {i + 1}</h4>
              </div>
              
              {data.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(i)}
                  className="p-2.5 text-slate-400 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-200 shadow-sm hover:shadow-red-200"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {/* Input Grid */}
            <div className="space-y-4">
              {/* Package Name */}
              <div className="relative">
                <input
                  placeholder="Package Name (e.g., Luxury Suite, Group Special)"
                  value={p.name || ""}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-800"
                  onChange={(e) => update(i, "name", e.target.value)}
                />
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600 font-bold">
                    <span>₹</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Current Price"
                    value={p.price || ""}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    onChange={(e) => update(i, "price", e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">Current</span>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <span>₹</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Old Price (Optional)"
                    value={p.oldPrice || ""}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    onChange={(e) => update(i, "oldPrice", e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">Original</span>
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <div className="absolute top-3 left-4 text-slate-400">
                  <AlignLeft size={18} />
                </div>
                <textarea
                  placeholder="What's included in this package? (Services, amenities, etc.)"
                  value={p.description || ""}
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-slate-700 resize-none"
                  onChange={(e) => update(i, "description", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={addPackage}
        className="group relative flex items-center justify-center gap-3 w-full py-5 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-300 active:scale-[0.98]"
      >
        <div className="bg-white group-hover:bg-indigo-600 group-hover:text-white p-1.5 rounded-lg border border-slate-200 group-hover:border-indigo-600 transition-all shadow-sm">
          <Plus size={20} />
        </div>
        Add New Pricing Package
      </button>
    </div>
  );
}