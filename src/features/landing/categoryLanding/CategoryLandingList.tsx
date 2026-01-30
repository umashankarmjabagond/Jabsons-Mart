import { useEffect, useState } from "react";
import CategoryLandingSection from "./CategoryLandingSection";

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

  useEffect(() => {
    fetch("http://localhost:3001/categories/landing/flattened")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-10 text-center">Loading categories…</div>;
  }

  return (
    <section className="bg-green-50 py-12 space-y-14">
      {data.map((main) => (
        <CategoryLandingSection key={main.id} mainCategory={main} />
      ))}
    </section>
  );
}
