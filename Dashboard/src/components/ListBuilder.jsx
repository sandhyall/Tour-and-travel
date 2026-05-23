import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function ListBuilder({ title, data = [], setData }) {
  const [value, setValue] = useState("");

  const add = () => {
    if (value.trim()) {
     
      if (data.includes(value.trim())) {
        alert(`${title} already exists in the list!`);
        return;
      }
      setData([...data, value.trim()]);
      setValue("");
    }
  };

  const remove = (index) => setData(data.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
    
      <div className="flex gap-2">
        <input 
          type="text"
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
          value={value} 
          placeholder={`Add ${title}...`}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // मुख्य फारम सबमिट हुन दिँदैन
              add();
            }
          }}
        />
        <button 
          type="button"
          onClick={add}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-sm shadow-indigo-500/10 active:scale-95"
        >
          <FaPlus size={10} /> Add
        </button>
      </div>

      {/* List Container */}
      <div className="bg-slate-50/60 rounded-2xl p-2.5 min-h-[60px] border border-slate-100/80">
        {data.length === 0 ? (
          <div className="text-slate-400 text-xs text-center py-4 font-medium italic">
            No {title.toLowerCase()}s added yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {data.map((item, i) => (
              <li 
                key={i} 
                className="flex justify-between items-center bg-white px-3.5 py-2.5 rounded-xl border border-slate-100 shadow-sm group hover:border-slate-200 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Bullet point icon for professional look */}
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></span>
                  <span className="text-slate-600 text-sm font-medium truncate">{item}</span>
                </div>
                
                <button 
                  type="button"
                  onClick={() => remove(i)}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all md:opacity-0 group-hover:opacity-100"
                  title={`Delete ${title}`}
                >
                  <FaTrash size={12} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}