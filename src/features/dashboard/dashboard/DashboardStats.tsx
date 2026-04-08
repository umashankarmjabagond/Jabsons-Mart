import { getStats } from "@/services/profile";
import { useEffect, useState } from "react";

const DashboardStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-6 px-3">
      <h2 className="text-xl font-bold mb-4 text-black text-start">
        Dashboard Overview
      </h2>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-md p-6 flex justify-center items-center text-gray-400">
          Loading stats...
        </div>
      ) : !stats ? (
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-black">
          <p className="text-lg font-semibold">No data available</p>
          <p className="text-sm">Your activity stats will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Enquiries" value={stats.total_enquiries} />
          <Card title="Quotes" value={stats.total_quotes} />
          <Card title="Views" value={stats.total_views} />
          <Card title="Suppliers" value={12} />
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value }: any) => (
  <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value ?? 0}</p>
  </div>
);

export default DashboardStats;
