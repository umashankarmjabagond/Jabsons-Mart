import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryLandingCard from "./CategoryLandingCard";
import { Button } from "@/components/common/ui/Button";

interface Group {
  id: string;
  name: string;
  slug: string;
  products: string[];
}

interface MainCategory {
  id: string;
  name: string;
  slug: string;
  groups: Group[];
}

export default function CategoryLandingSection({
  mainCategory,
}: {
  mainCategory: MainCategory;
}) {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visible = expanded
    ? mainCategory.groups
    : mainCategory.groups.slice(0, 6);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl text-black-900 font-bold text-left">
            {mainCategory.name}
          </h2>
          <p className="text-black-900 text-left">
            Explore {mainCategory.name}
          </p>
        </div>

        {mainCategory.groups.length > 6 && (
          <Button
            onClick={() => setExpanded(!expanded)}
            className="text-sm font-medium text-green-600 hover:underline"
          >
            {expanded ? "Show Less" : "View All"}
          </Button>
        )}
      </div>

      {/* CARDS */}
      <div className="relative">
        {!expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              scroll("left");
            }}
            className="absolute  left-0  top-[50%]  -translate-y-[50%]  z-30  w-10 h-10  bg-green-600 text-white  rounded-full  flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
        )}

        {!expanded && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              scroll("right");
            }}
            className="absolute
  right-0
  top-[50%]
  -translate-y-[50%]
  z-30
  w-10 h-10
  bg-green-600 text-white
  rounded-full
  flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        )}

        <div
          ref={scrollRef}
          className={`grid gap-6 ${
            expanded
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-flow-col auto-cols-[280px] overflow-x-hidden"
          }`}
        >
          {visible.map((group) => (
            <CategoryLandingCard
              key={group.id}
              mainSlug={mainCategory.slug}
              group={group}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
