import CategoryCard from "./CategoryCard";

const CategorySection = ({ section }: any) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.groups.map((group: any, idx: number) => (
          <CategoryCard key={idx} group={group} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
