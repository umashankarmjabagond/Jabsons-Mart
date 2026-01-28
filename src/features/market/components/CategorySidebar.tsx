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
      className={`relative bg-white shadow rounded-xl transition-all duration-300 ${
        isOpen ? "w-64 p-4" : "w-14 p-2"
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 z-10 bg-white border rounded-full w-8 h-8 flex items-center justify-center shadow"
      >
        {isOpen ? "⟨" : "⟩"}
      </button>

      {isOpen && (
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
      )}
    </aside>
  );
};

export default CategorySidebar;
