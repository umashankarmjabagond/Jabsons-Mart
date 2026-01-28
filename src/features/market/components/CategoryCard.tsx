import { CategoryGroup } from "@/types/categoryTypes";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ group }: { group: CategoryGroup }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-50 rounded-xl p-4 hover:shadow">
      <h3 className="font-semibold mb-3">{group.title}</h3>

      <div className="flex flex-wrap gap-2">
        {group.items.map((item, idx) => (
          <button
            key={idx}
            onClick={() =>
              navigate(
                `/products?product=${encodeURIComponent(
                  item.name,
                )}&category=${item.slug ?? ""}`,
              )
            }
            className="px-3 py-1 bg-white rounded-full text-sm border hover:bg-green-100 transition"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
