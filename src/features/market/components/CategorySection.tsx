// import type { CategorySection as SectionType } from "@/types/categoryTypes";
// import CategoryCard from "./CategoryCard";

// const CategorySection = ({ section }: { section: SectionType }) => {
//   return (
//     <section>
//       <h2 className="text-xl font-semibold mb-4">{section.title}</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {section.groups.map((group, idx) => (
//           <CategoryCard key={idx} group={group} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategorySection;

// CategorySection.tsx
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
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{section.title}</h2>

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
