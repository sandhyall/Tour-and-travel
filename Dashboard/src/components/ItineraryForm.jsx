import React from "react";
import { Plus, Trash2, Calendar, Utensils, AlignLeft } from "lucide-react";

export default function ItineraryBuilder({ data, setData }) {
  const addDay = () => {
    setData([
      ...data,
      { day: data.length + 1, title: "", description: "", meals: "" }
    ]);
  };

  const removeDay = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const update = (i, key, value) => {
    const copy = [...data];
    copy[i][key] = value;
    setData(copy);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="text-blue-600" size={28} />
          Trip Itinerary
        </h2>
        <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
          Total Days: {data.length}
        </span>
      </div>

      <div className="space-y-6">
        {data.map((d, i) => (
          <div 
            key={i} 
            className="group relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-blue-200 shadow-lg">
                  {i + 1}
                </div>
                <h4 className="text-lg font-semibold text-slate-700">Day Plan</h4>
              </div>
              
              {data.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDay(i)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove Day"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            {/* Inputs Grid */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  placeholder="Day Title (e.g., Arrival & City Tour)"
                  value={d.title || ""}
                  className="w-full pl-3 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 placeholder:text-slate-400 font-medium"
                  onChange={(e) => update(i, "title", e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute top-3 left-3 text-slate-400">
                  <AlignLeft size={18} />
                </div>
                <textarea
                  placeholder="Day Description (activities, places to visit, etc.)"
                  value={d.description || ""}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                  onChange={(e) => update(i, "description", e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400">
                  <Utensils size={18} />
                </div>
                <input
                  placeholder="Meals Included (e.g., Breakfast, Lunch)"
                  value={d.meals || ""}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 placeholder:text-slate-400"
                  onChange={(e) => update(i, "meals", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={addDay}
        className="mt-4 flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
      >
        <div className="bg-slate-100 group-hover:bg-blue-100 p-1 rounded-md transition-colors">
          <Plus size={20} />
        </div>
        Add Another Day
      </button>
    </div>
  );
}