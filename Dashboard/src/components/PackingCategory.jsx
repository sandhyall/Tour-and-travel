import React from "react";

const categories = [
  { key: "general", label: "General" },
  { key: "upperBody", label: "Upper Body" },
  { key: "torso", label: "Torso" },
  { key: "lowerBody", label: "Lower Body" },
  { key: "hands", label: "Hands" },
  { key: "feet", label: "Feet" },
  { key: "undergarments", label: "Undergarments" },
  { key: "otherEssentials", label: "Other Essentials" },
  { key: "optionalItems", label: "Optional Items" },
];

const PackingCategory = ({
  packingList,
  addPackingItem,
  removePackingItem,
  updatePackingItem,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <section
          key={cat.key}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center justify-between">
            {cat.label}
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              {(packingList[cat.key] || []).length} items
            </span>
          </h3>

          <div className="space-y-3 mb-5">
            {(packingList[cat.key] || []).map((item, index) => (
              <div key={index} className="flex gap-2 group">
                <input
                  type="text"
                  value={item}
                  placeholder={`Add ${cat.label.toLowerCase()}...`}
                  onChange={(e) => updatePackingItem(cat.key, index, e.target.value)}
                  className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => removePackingItem(cat.key, index)}
                  className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addPackingItem(cat.key)}
            className="w-full text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            + Add to {cat.label}
          </button>
        </section>
      ))}
    </div>
  );
};

export default PackingCategory;