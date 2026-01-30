import { CategoryTreeResponse } from "@/types/categoryTypes";
import CategorySection from "./CategorySection";

type Props = {
  loading: boolean;
  error: string | null;
  data: CategoryTreeResponse | null;
  mode: "full" | "compact";
};

const CategoryContent = ({ loading, error, data, mode }: Props) => {
  if (error) return <div className="h-60 text-red-500">{error}</div>;

  const sections =
    mode === "compact" && data
      ? data.sections.slice(0, 1)
      : (data?.sections ?? []);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold">{data?.mainCategory ?? "Loading…"}</h1>
      {sections.map((section, idx) => (
        <CategorySection key={idx} section={section} loading={loading} />
      ))}
    </div>
  );
};

export default CategoryContent;
