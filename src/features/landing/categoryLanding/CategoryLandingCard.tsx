import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MouseEvent } from "react";
import fallbackImageUrl from "../../../assets/images/FruitSeed.png";

interface Group {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
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

  // CARD → MARKET PAGE
  const handleCardClick = () => {
    navigate(`/market?category=${mainSlug}&group=${group.slug}`);
  };

  // CHIP → PLP
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
        group relative overflow-hidden
        h-[200px]
        rounded-2xl
        bg-slate-900
        border border-white/10
        cursor-pointer
        shadow-md hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={group.imageUrl || fallbackImageUrl}
        alt={group.name}
        className="
          absolute
          w-full h-full
          object-cover
          opacity-40
          group-hover:opacity-20
          scale-100 group-hover:scale-105
          transition-all duration-500
          pointer-events-none
        "
      />

      {/* GRADIENT OVERLAY (EXACT SAME AS MARKET CARD) */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-black/70 via-black/30 to-black/70
        "
      />

      {/* GREEN STRIP */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-green-500 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col h-full p-5 pl-6 text-white">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold leading-snug line-clamp-2">
            {group.name}
          </h3>
          <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white transition" />
        </div>

        {/* CHIPS (SCROLLABLE) */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-2 content-start">
            {group.products.map((product, i) => (
              <span
                key={i}
                onClick={(e) => handleProductClick(e, product)}
                className="
                  text-xs px-3 py-1.5
                  rounded-full
                  bg-white text-black-900
                  hover:bg-green-100
                  cursor-pointer
                  transition
                  whitespace-nowrap
                "
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-3 text-xs font-medium text-green-400">
          Explore {group.name} →
        </div>
      </div>
    </div>
  );
}
