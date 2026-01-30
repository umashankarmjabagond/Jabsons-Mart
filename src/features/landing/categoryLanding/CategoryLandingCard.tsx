import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MouseEvent } from "react";

interface Group {
  id: string;
  name: string;
  slug: string;
  products: string[];
}

export default function CategoryLandingCard({
  mainSlug,
  group,
}: {
  mainSlug: string;
  group: Group;
}) {
  const navigate = useNavigate();

  // CARD → MARKET PAGE (group level)
  const handleCardClick = () => {
    navigate(`/market?category=${mainSlug}&group=${group.slug}`);
  };

  // CHIP → PLP (REAL PRODUCT)
  const handleProductClick = (
    e: MouseEvent<HTMLSpanElement>,
    product: string,
  ) => {
    e.stopPropagation();
    navigate(`/products?product=${encodeURIComponent(product)}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        bg-white
        border border-gray-200
        rounded-xl
        p-4
        h-[180px]
        flex flex-col
        justify-between
        hover:shadow-lg
        hover:border-green-500
        transition
        cursor-pointer
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-gray-900">{group.name}</h3>
        <ArrowRight className="w-4 h-4 text-gray-400" />
      </div>

      {/* REAL PRODUCT CHIPS */}
      {group.products.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {group.products.slice(0, 6).map((product, i) => (
            <span
              key={i}
              onClick={(e) => handleProductClick(e, product)}
              className="
                text-xs
                px-3 py-1
                rounded-full
                bg-gray-100
                hover:bg-green-100
                hover:text-green-700
                transition
                cursor-pointer
              "
            >
              {product}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
