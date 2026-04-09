import { getRecent } from "@/services/profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentViews = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRecent()
      .then((res) => setData(res || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-6 px-3">
      <h2 className="text-xl font-bold mb-4 text-black text-start">
        Recently Viewed
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-6 text-gray-500">
          Loading recent views...
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-black bg-white rounded-2xl">
          <p className="text-lg font-semibold">No recent views</p>
          <p className="text-sm">Start exploring products to see them here</p>

          <button
            onClick={() => navigate("/products")}
            className="mt-3 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-sm rounded-md"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 p-4 bg-white rounded-2xl">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="
            basis-[calc(50%-8px)] 
            sm:basis-[calc(33.33%-10px)] 
            md:basis-[calc(25%-12px)] 
            bg-white rounded-xl shadow 
            hover:shadow-md hover:scale-105 
            transition cursor-pointer p-2 border border-2
            "
            >
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

              <p className="text-sm font-semibold mt-2 truncate">
                {item.name || "Unnamed Product"}
              </p>

              <p className="text-blue-600 text-sm font-bold">
                ₹{item.price || 0}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentViews;
