import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getTrend } from "@/services/profile";

const EnquiryTrend = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTrend().then(setData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-[250px]">
      <h2 className="font-bold mb-2">Enquiry Trend</h2>
      {!data.length ? (
        <p className="text-gray-400 mt-20">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })
              }
            />

            <YAxis tick={{ fontSize: 12 }} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EnquiryTrend;
