import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (categoryData && contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [categoryData]);

  useEffect(() => {
    loadMainCategories();
  }, []);

  const loadMainCategories = async () => {
    try {
      setLoading(true);
      const { data } = await fetchMainCategories();
      setMainCategories(data);

      if (data.length) {
        setActiveSlug(data[0].slug);
        await loadCategoryTree(data[0].slug);
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
      const { data } = await fetchCategoryTreeBySlug(slug);
      setCategoryData(data);

      // ✅ Mobile UX: auto-close sidebar after selection
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
      {/* <div className="flex w-full flex-1 overflow-hidden"> */}
      {/* SIDEBAR */}
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

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4" ref={contentRef}>
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
