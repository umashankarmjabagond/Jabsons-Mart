import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useEffect, useState } from "react";
import { getCategory } from "@/services/profile";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

const CategoryChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getCategory().then((res) => {
      const formatted = res.map((item: any) => ({
        ...item,
        count: Number(item.count), // 🔥 important fix
      }));
      setData(formatted);
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-[250px] outline-none">
      <h2 className="font-semibold text-gray-700 mb-3">Category Interest</h2>

      {!data.length ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">No data available</p>
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
