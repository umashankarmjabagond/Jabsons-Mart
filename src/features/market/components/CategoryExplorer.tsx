import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategorySidebar from "./CategorySidebar";
import CategoryContent from "./CategoryContent";
import {
  fetchCategoryTreeBySlug,
  fetchMainCategories,
} from "@/services/category.service";
import { Category, CategoryTreeResponse } from "@/types/categoryTypes";

type Props = {
  mode?: "full" | "compact";
};

const CategoryExplorer = ({ mode = "full" }: Props) => {
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [activeSlug, setActiveSlug] = useState("");
  const [categoryData, setCategoryData] = useState<CategoryTreeResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const contentRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const groupFromUrl = searchParams.get("group");

  useEffect(() => {
    loadMainCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFromUrl]);

  useEffect(() => {
    if (!categoryData || !groupFromUrl) return;

    const el = document.getElementById(`group-${groupFromUrl}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [categoryData, groupFromUrl]);

  const loadMainCategories = async () => {
    try {
      setLoading(true);
      const { data } = await fetchMainCategories();
      setMainCategories(data);

      if (!data.length) return;

      const initialSlug =
        categoryFromUrl && data.some((c) => c.slug === categoryFromUrl)
          ? categoryFromUrl
          : data[0].slug;

      setActiveSlug(initialSlug);
      await loadCategoryTree(initialSlug);
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryTree = async (slug: string) => {
    try {
      setLoading(true);
      const { data } = await fetchCategoryTreeBySlug(slug);
      setCategoryData(data);

      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    } catch {
      setError("Failed to load category details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
      <CategorySidebar
        categories={mainCategories}
        activeSlug={activeSlug}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((p) => !p)}
        onSelect={(slug) => {
          setActiveSlug(slug);
          loadCategoryTree(slug);
        }}
      />

      <div className="flex-1 overflow-y-auto px-4" ref={contentRef}>
        <CategoryContent
          loading={loading}
          error={error}
          data={categoryData}
          mode={mode}
          activeGroupSlug={groupFromUrl}
        />
      </div>
    </div>
  );
};

export default CategoryExplorer;
