import { CategoryGroup } from "@/types/categoryTypes";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FALLBACK_IMAGE from "@assets/images/Fruits&Preserved.jpg";

const CategoryCard = ({ group }: { group: CategoryGroup }) => {
  console.log("Rendering CategoryCard with group:", group);
  const navigate = useNavigate();

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl
        h-[200px]
        bg-slate-900
        shadow-md hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* Background Image */}
      <img
        src={group?.image || FALLBACK_IMAGE}
        alt={group.title}
        className="
          absolute inset-0 w-full h-full object-cover
          opacity-40 group-hover:opacity-55
          scale-100 group-hover:scale-105
          transition-all duration-500
        "
      />

      {/* Gradient Overlay (lighter now) */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-black/70 via-black/30 to-black/70
        "
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">{group.title}</h3>
          <ArrowRight className="text-white/70 group-hover:text-white transition" />
        </div>

        {/* Body */}
        <div className="flex gap-3 flex-1">
          {/* Left image */}
          <div className="w-[50%] rounded-xl overflow-hidden border border-white/10">
            <img
              src={group?.image || FALLBACK_IMAGE}
              alt={group.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right items */}
          <div className="flex flex-wrap gap-2 content-start overflow-y-auto">
            {group?.items?.map((item, idx) => (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/products?product=${encodeURIComponent(
                      item,
                    )}&category=${item}`,
                  );
                }}
                className="
                  text-xs px-3 py-1
                  rounded-full
                  bg-white text-black
                  hover:bg-green-100
                  cursor-pointer
                  transition
                  whitespace-nowrap
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
