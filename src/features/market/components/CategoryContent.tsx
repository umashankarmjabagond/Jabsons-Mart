import { CategoryTreeResponse } from "@/types/categoryTypes";
import CategorySection from "./CategorySection";

type Props = {
  loading: boolean;
  error: string | null;
  data: CategoryTreeResponse | null;
  mode: "full" | "compact";
  activeGroupSlug?: string | null;
};

const CategoryContent = ({
  loading,
  error,
  data,
  mode,
  activeGroupSlug,
}: Props) => {
  if (error) return <div className="h-60 text-red-500">{error}</div>;

  const sections =
    mode === "compact" && data?.sections?.length
      ? data.sections.slice(0, 1)
      : (data?.sections ?? []);

  if (!sections.length && !loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 text-gray-500">
        No sections available
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold">{data?.mainCategory ?? "Loading…"}</h1>

      {sections.map((section, idx) => (
        <CategorySection
          key={idx}
          section={section}
          loading={loading}
          activeGroupSlug={activeGroupSlug}
        />
      ))}
    </div>
  );
};

export default CategoryContent;
