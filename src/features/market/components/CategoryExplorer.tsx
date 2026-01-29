// import { useEffect, useState } from "react";
// import CategorySidebar from "./CategorySidebar";
// import CategoryContent from "./CategoryContent";
// import {
//   fetchCategoryTreeBySlug,
//   fetchMainCategories,
// } from "@/services/category.service";
// import { Category, CategoryTreeResponse } from "@/types/categoryTypes";

// const CategoryExplorer = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [activeSlug, setActiveSlug] = useState("");
//   const [data, setData] = useState<CategoryTreeResponse | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true); // shared

//   useEffect(() => {
//     init();
//   }, []);

//   const init = async () => {
//     setLoading(true);
//     const { data } = await fetchMainCategories();
//     setCategories(data);
//     if (data?.length) {
//       setActiveSlug(data[0].slug);
//       loadTree(data[0].slug);
//     }
//     setLoading(false);
//   };

//   const loadTree = async (slug: string) => {
//     setActiveSlug(slug);
//     setLoading(true);
//     const { data } = await fetchCategoryTreeBySlug(slug);
//     setData(data);
//     setLoading(false);

//     // mobile UX → collapse after select
//     if (window.innerWidth < 768) {
//       setSidebarOpen(false);
//     }
//   };

//   return (
//     <div className="flex w-full min-h-[calc(100vh-120px)]">
//       {/* SIDEBAR */}
//       <CategorySidebar
//         categories={categories}
//         activeSlug={activeSlug}
//         isOpen={sidebarOpen}
//         onToggle={() => setSidebarOpen((p) => !p)}
//         onSelect={loadTree}
//       />

//       {/* CONTENT */}
//       <div className="flex-1 overflow-hidden">
//         <CategoryContent
//           loading={loading}
//           error={null}
//           data={data}
//           mode="full"
//         />
//       </div>
//     </div>
//   );
// };

// export default CategoryExplorer;

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
  const [activeSlug, setActiveSlug] = useState("");
  const [categoryData, setCategoryData] = useState<CategoryTreeResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      <div className="flex-1 overflow-y-auto px-4">
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
