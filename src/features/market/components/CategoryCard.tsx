import { CategoryGroup } from "@/types/categoryTypes";

const CategoryCard = ({ group }: { group: CategoryGroup }) => {
  return (
    <div className="bg-green-50 rounded-xl p-4 hover:shadow">
      <h3 className="font-semibold mb-3">{group.title}</h3>

      <div className="flex flex-wrap gap-2">
        {group.items.map((item, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-white rounded-full text-sm border"
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
