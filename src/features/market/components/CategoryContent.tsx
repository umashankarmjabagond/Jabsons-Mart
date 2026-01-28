import { CategoryTreeResponse } from "@/types/categoryTypes";
import CategorySection from "./CategorySection";

type Props = {
  loading: boolean;
  error: string | null;
  data: CategoryTreeResponse | null;
  mode: "full" | "compact";
};

const CategoryContent = ({ loading, error, data, mode }: Props) => {
  if (loading) return <div className="h-60 flex items-center">Loading…</div>;
  if (error) return <div className="h-60 text-red-500">{error}</div>;
  if (!data) return <div className="h-60 text-gray-400">No data available</div>;

  const sections =
    mode === "compact" ? data.sections.slice(0, 1) : data.sections;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">{data.mainCategory}</h1>
      {sections?.map((section, idx) => (
        <CategorySection key={idx} section={section} />
      ))}
    </div>
  );
};

export default CategoryContent;
