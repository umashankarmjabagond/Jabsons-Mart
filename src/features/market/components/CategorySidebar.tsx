// import { Category } from "@/types/categoryTypes";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// type Props = {
//   categories: Category[];
//   activeSlug: string;
//   isOpen: boolean;
//   onToggle: () => void;
//   onSelect: (slug: string) => void;
// };

// const CategorySidebar = ({
//   categories,
//   activeSlug,
//   isOpen,
//   onToggle,
//   onSelect,
// }: Props) => {
//   return (
//     <aside
//       className={`
//         relative
//         bg-white
//         shadow
//         transition-all duration-300
//         ${isOpen ? "w-64 p-4" : "w-14 p-2"}
//       `}
//     >
//       {/* TOGGLE BUTTON */}
//       <button
//         onClick={onToggle}
//         className="
//           absolute
//           -right-3
//           top-6
//           z-20
//           bg-white
//           border
//           rounded-full
//           w-8 h-8
//           flex items-center justify-center
//           shadow
//         "
//       >
//         {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
//       </button>

//       {/* EXPANDED VIEW */}
//       {isOpen && (
//         <>
//           <h3 className="font-semibold mb-3">All Categories</h3>
//           <ul className="space-y-2">
//             {categories.map((cat) => (
//               <li
//                 key={cat.id}
//                 onClick={() => onSelect(cat.slug)}
//                 className={`cursor-pointer px-3 py-2 rounded-lg ${
//                   activeSlug === cat.slug
//                     ? "bg-green-100 text-green-700 font-semibold"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 {cat.name}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {/* COLLAPSED ICON VIEW */}
//       {!isOpen && (
//         <ul className="space-y-3 mt-12">
//           {categories.map((cat) => (
//             <li
//               key={cat.id}
//               onClick={() => onSelect(cat.slug)}
//               title={cat.name}
//               className={`
//                 cursor-pointer
//                 w-10 h-10
//                 flex items-center justify-center
//                 rounded-lg
//                 text-sm
//                 font-semibold
//                 ${
//                   activeSlug === cat.slug
//                     ? "bg-green-100 text-green-700"
//                     : "hover:bg-gray-100"
//                 }
//               `}
//             >
//               {cat.name.charAt(0)}
//             </li>
//           ))}
//         </ul>
//       )}
//     </aside>
//   );
// };

// export default CategorySidebar;

import { Category } from "@/types/categoryTypes";

type Props = {
  categories: Category[];
  activeSlug: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (slug: string) => void;
};

const CategorySidebar = ({
  categories,
  activeSlug,
  isOpen,
  onToggle,
  onSelect,
}: Props) => {
  return (
    <aside
      className={`
        bg-white shadow-lg
        transition-all duration-300
        z-20

        /* MOBILE */
        fixed md:relative
        top-16 md:top-0
        h-[calc(100vh-64px)]
        ${isOpen ? "w-64" : "w-14"}
      `}
    >
      {/* TOGGLE BUTTON (always visible) */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 bg-white border rounded-full w-8 h-8 flex items-center justify-center shadow"
      >
        {isOpen ? "⟨" : "⟩"}
      </button>

      {/* SIDEBAR CONTENT */}
      <div className="h-full overflow-y-auto p-3">
        {isOpen ? (
          <>
            <h3 className="font-semibold mb-3">All Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => onSelect(cat.slug)}
                  className={`cursor-pointer px-3 py-2 rounded-lg ${
                    activeSlug === cat.slug
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </>
        ) : (
          /* COLLAPSED ICON MODE (mobile + desktop) */
          <div className="flex flex-col gap-3 items-center mt-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.slug)}
                className={`w-10 h-10 rounded-full text-sm font-semibold ${
                  activeSlug === cat.slug
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                title={cat.name}
              >
                {cat.name[0]}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default CategorySidebar;
