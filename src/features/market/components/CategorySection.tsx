import type { CategorySection as SectionType } from "@/types/categoryTypes";
import CategoryCard from "./CategoryCard";

const CategorySection = ({ section }: { section: SectionType }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.groups.map((group, idx) => (
          <CategoryCard key={idx} group={group} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
