import { useEffect, useState } from "react";
import CategoryLandingSection from "./CategoryLandingSection";
import { fetchLandingCategories } from "@/services/category.service";

interface Group {
  id: string;
  name: string;
  slug: string;
  products: string[];
}

interface MainCategory {
  id: string;
  name: string;
  slug: string;
  groups: Group[];
}

const CategoryCardSkeleton = () => {
  return (
    <div className="min-w-[260px] h-[180px] rounded-2xl bg-gray-200 animate-pulse p-4">
      <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
      </div>

      <div className="h-3 w-28 bg-gray-300 rounded mt-auto"></div>
    </div>
  );
};

const CategorySectionSkeleton = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="h-6 w-64 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-300 rounded-full animate-pulse"></div>
      </div>

      <div className="flex gap-4 overflow-hidden px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default function CategoryLandingList() {
  const [data, setData] = useState<MainCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadLandingCategories();
  }, []);

  const loadLandingCategories = async () => {
    try {
      setLoading(true);
      const { data } = await fetchLandingCategories();
      if (data.success) setData(data.data);
    } catch (err) {
      console.error("Landing categories error", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 border border-2 py-12 space-y-6 rounded-2xl">
        {Array.from({ length: 2 }).map((_, i) => (
          <CategorySectionSkeleton key={i} />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load categories
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 border border-2 py-12 space-y-6 rounded-2xl">
      {data.map((main) => (
        <CategoryLandingSection key={main.id} mainCategory={main} />
      ))}
    </section>
  );
}
