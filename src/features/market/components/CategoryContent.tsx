import CategorySection from "./CategorySection";

const CategoryContent = ({ loading, data, mode }: any) => {
  if (loading) return <div className="flex-1">Loading...</div>;
  if (!data) return <div className="flex-1">No data</div>;

  const sections =
    mode === "compact" ? data.sections.slice(0, 1) : data.sections;

  return (
    <div className="flex-1 space-y-10">
      <h1 className="text-2xl font-bold">{data.mainCategory}</h1>

      {sections.map((section: any, idx: number) => (
        <CategorySection key={idx} section={section} />
      ))}
    </div>
  );
};

export default CategoryContent;
