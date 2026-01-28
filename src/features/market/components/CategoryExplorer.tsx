import { useEffect, useState } from "react";

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
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [categoryData, setCategoryData] = useState<CategoryTreeResponse | null>(
    null,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    loadMainCategories();
  }, []);

  const loadMainCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await fetchMainCategories();
      setMainCategories(data);

      if (data.length > 0) {
        setActiveSlug(data[0].slug);
        await loadCategoryTree(data[0].slug);
      } else {
        setError("No categories found");
      }
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryTree = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await fetchCategoryTreeBySlug(slug);
      setCategoryData(data);
    } catch {
      setError("Failed to load category details");
      setCategoryData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex gap-4">
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

      <div className="flex-1 transition-all duration-300">
        <CategoryContent
          loading={loading}
          error={error}
          data={categoryData}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default CategoryExplorer;
