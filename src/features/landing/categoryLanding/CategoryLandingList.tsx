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
    return <div className="py-10 text-center">Loading categories…</div>;
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load categories
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100  border border-2 py-12 space-y-6 rounded-2xl">
      {data.map((main) => (
        <CategoryLandingSection key={main.id} mainCategory={main} />
      ))}
    </section>
  );
}
