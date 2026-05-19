// import React from "react";
// import { Calendar, CheckCircle2, Star, Award } from "lucide-react";

// const TrekCard = ({
//   image,
//   category,
//   duration,
//   title,
//   price,
//   features,
//   badge,
//   categoryColor,
// }) => {
//   return (
//     <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
//       <div className="relative h-64">
//         <img src={image} alt={title} className="w-full h-full object-cover" />
//         <div
//           className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold flex items-center gap-1 ${categoryColor}`}
//         >
//           <CheckCircle2 size={14} />
//           {category}
//         </div>
//         {badge && (
//           <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md flex items-center gap-2">
//             <Award className="text-orange-500" size={20} />
//             <div className="leading-tight">
//               <p className="text-[10px] text-gray-500 uppercase font-bold">
//                 Travelers' Choice
//               </p>
//               <p className="text-xs font-black">Best of the Best</p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-6">
//         <div className="flex items-center gap-2 text-gray-600 mb-3">
//           <Calendar size={18} />
//           <span className="text-sm font-medium">{duration}</span>
//         </div>

//         <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug h-14 line-clamp-2">
//           {title}
//         </h3>

//         <p className="text-blue-600 font-bold text-lg mb-4">from USD {price}</p>

//         <hr className="mb-4 border-gray-100" />

//         <ul className="space-y-2">
//           {features.map((feature, index) => (
//             <li
//               key={index}
//               className="flex items-start gap-2 text-gray-600 text-sm"
//             >
//               <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />
//               {feature}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TrekCard;