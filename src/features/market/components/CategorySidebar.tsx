type Props = {
  categories: any[];
  activeSlug: string;
  onSelect: (slug: string) => void;
};

const CategorySidebar = ({ categories, activeSlug, onSelect }: Props) => {
  return (
    <aside className="w-64 bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-4">All Categories</h3>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            className={`cursor-pointer px-3 py-2 rounded-lg transition ${
              activeSlug === cat.slug
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
