import { getRecent } from "@/services/profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentViews = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecent().then(setData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-6 px-3">
      <h2 className="text-xl font-bold mb-4 text-black text-start">
        Recently Viewed
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="
              min-w-[180px]
              bg-white rounded-xl shadow 
              hover:shadow-md hover:scale-105 
              transition cursor-pointer p-2
            "
          >
            {/* Image */}
            <div className="h-28 w-full bg-gray-100 rounded-lg overflow-hidden">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No image
                </div>
              )}
            </div>

            {/* Name */}
            <p className="text-sm font-semibold mt-2 truncate">{item.name}</p>

            {/* Optional price */}
            <p className="text-blue-600 text-sm font-bold">
              ₹{item.price || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentViews;
