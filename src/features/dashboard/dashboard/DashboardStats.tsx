import { getStats } from "@/services/profile";
import { useEffect, useState } from "react";

const DashboardStats = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mt-4">
      <Card title="Enquiries" value={stats.total_enquiries} />
      <Card title="Quotes" value={stats.total_quotes} />
      <Card title="Views" value={stats.total_views} />
      <Card title="Suppliers" value={12} />
    </div>
  );
};

const Card = ({ title, value }: any) => (
  <div className="bg-white shadow-md rounded-xl p-4 text-center">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DashboardStats;
