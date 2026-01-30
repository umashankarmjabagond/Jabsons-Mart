import { Category } from "@/types/categoryTypes";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

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

        /* POSITIONING */
        fixed md:relative
        top-16 md:top-0
        h-[calc(100vh-64px)]

        /* WIDTH CONTROL */
        ${isOpen ? "w-46 md:w-64" : "w-14"}
      `}
    >
      {/* TOGGLE BUTTON */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 bg-white border rounded-full w-8 h-8 flex items-center justify-center shadow"
      >
        {isOpen ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
      </button>

      {/* CONTENT */}
      <div className="h-full overflow-y-auto px-2 py-3 md:p-3">
        {isOpen ? (
          <>
            <h3 className="font-semibold mb-3 text-sm md:text-base">
              All Categories
            </h3>

            <ul className="space-y-1 text-left">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => onSelect(cat.slug)}
                  title={cat.name}
                  className={`
                    cursor-pointer rounded-lg
                    px-2 py-2 md:px-3
                    text-sm md:text-base test-left

                    truncate whitespace-nowrap
                    max-w-[180px] md:max-w-none

                    ${
                      activeSlug === cat.slug
                        ? "bg-green-100 text-green-700 font-semibold"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </>
        ) : (
          /* COLLAPSED ICON MODE */
          <div className="flex flex-col gap-3 items-center mt-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.slug)}
                title={cat.name}
                className={`w-10 h-10 rounded-full text-sm font-semibold ${
                  activeSlug === cat.slug
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {cat.name.charAt(0)}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default CategorySidebar;
