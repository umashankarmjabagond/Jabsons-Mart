import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useEffect, useState } from "react";
import { getCategory } from "@/services/profile";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

const CategoryChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategory()
      .then((res) => {
        const formatted = (res || []).map((item: any) => ({
          ...item,
          count: Number(item.count), // ✅ ensure number
        }));
        setData(formatted);
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-[250px] flex flex-col">
      <h2 className="font-bold text-black mb-3">Category Interest</h2>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Loading categories...
        </div>
      ) : data.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-black">
          <p className="text-sm font-semibold">No data available</p>
          <p className="text-xs">Category insights will appear here</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              outerRadius={80}
              label
              stroke="none"
            >
              {data.map((_: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryChart;
