import type { CategorySection as SectionType } from "@/types/categoryTypes";
import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import HorizontalScroller from "./HorizontalScroller";

const CategorySection = ({
  section,
  loading,
}: {
  section: SectionType;
  loading?: boolean;
}) => {
  if (!loading && section.groups.length === 0) {
    return "No items";
  }
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-left">{section.title}</h2>

      <HorizontalScroller>
        {(loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <CategoryCardSkeleton key={idx} />
            ))
          : section.groups.map((group, idx) => (
              <CategoryCard key={idx} group={group} />
            ))
        ).map((card, idx) => (
          <div key={idx} className="min-w-[300px] max-w-[300px]">
            {card}
          </div>
        ))}
      </HorizontalScroller>
    </section>
  );
};

export default CategorySection;
