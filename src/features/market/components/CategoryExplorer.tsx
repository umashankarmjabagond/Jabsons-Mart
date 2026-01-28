import { useEffect, useState } from "react";
import CategorySidebar from "./CategorySidebar";
import CategoryContent from "./CategoryContent";
import {
  fetchCategoryTreeBySlug,
  fetchMainCategories,
} from "@/services/category.service";

const CategoryExplorer = ({ mode = "full" }: any) => {
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [activeSlug, setActiveSlug] = useState("");
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMainCategories();
  }, []);

  const loadMainCategories = async () => {
    const { data } = await fetchMainCategories();
    setMainCategories(data);

    if (data.length) {
      setActiveSlug(data[0].slug);
      loadCategoryTree(data[0].slug);
    }
  };

  const loadCategoryTree = async (slug: string) => {
    setLoading(true);
    const { data } = await fetchCategoryTreeBySlug(slug);
    setCategoryData(data);
    setLoading(false);
  };

  return (
    <div className="flex gap-6">
      <CategorySidebar
        categories={mainCategories}
        activeSlug={activeSlug}
        onSelect={(slug: string) => {
          setActiveSlug(slug);
          loadCategoryTree(slug);
        }}
      />

      <CategoryContent loading={loading} data={categoryData} mode={mode} />
    </div>
  );
};

export default CategoryExplorer;
