import type {
  CategorySection as SectionType,
  CategoryGroup,
} from "@/types/categoryTypes";
import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import HorizontalScroller from "./HorizontalScroller";
import { slugify } from "@/utils/helpers";

type Props = {
  section: SectionType;
  loading?: boolean;
  activeGroupSlug?: string | null;
};

const CategorySection = ({ section, loading, activeGroupSlug }: Props) => {
  if (!loading && section.groups.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 scroll-mt-24">
      {/* ✅ section title */}
      <h2 className="text-xl font-bold text-left">{section.title}</h2>

      <HorizontalScroller>
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <CategoryCardSkeleton key={idx} />
            ))
          : section.groups.map((group: CategoryGroup) => {
              // ✅ canonical slug from title
              const groupSlug = slugify(group.title);

              return (
                <div
                  key={groupSlug}
                  id={`group-${groupSlug}`}
                  className={`
                    min-w-[300px] max-w-[300px]
                    ${
                      groupSlug === activeGroupSlug
                        ? "ring-2 ring-green-400 rounded-xl"
                        : ""
                    }
                  `}
                >
                  <CategoryCard group={group} />
                </div>
              );
            })}
      </HorizontalScroller>
    </section>
  );
};

export default CategorySection;
