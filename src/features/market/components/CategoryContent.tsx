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
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-center">
        <div className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white rounded-lg px-4 py-1 shadow-md hover:scale-[1.01] transition">
          <h1 className="text-lg md:text-xl font-semibold tracking-wide whitespace-nowrap">
            {data?.mainCategory ?? "Loading…"}
          </h1>
        </div>
      </div>
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
