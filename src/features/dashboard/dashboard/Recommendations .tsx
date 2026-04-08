// import { getRecommendations } from "@/services/profile";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Recommendations = () => {
//   const [data, setData] = useState<any[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getRecommendations().then(setData);
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto mt-6 p-3 bg-white rounded-2xl shadow-md ">
//       <h2 className="text-xl font-bold mb-4 text-black text-start">
//         Recommended for You
//       </h2>

//       <div
//         className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
//         style={{ gridAutoRows: "1fr" }}
//       >
//         {data.map((product: any) => {
//           const ratingNumber = product.rating ? Number(product.rating) : 0;

//           return (
//             <div
//               key={product.id}
//               onClick={() =>
//                 navigate(`/product/${product.id}`, {
//                   state: { supplier: product },
//                 })
//               }
//               className="
//                 bg-white rounded-xl shadow hover:shadow-md
//                 transition-all border border-gray-200
//                 flex flex-col h-full p-2 cursor-pointer
//               "
//             >
//               {/* Image */}
//               <div className="relative h-32 md:h-36 w-full bg-gray-100 rounded-lg overflow-hidden">
//                 {product.image_url ? (
//                   <img
//                     src={product.image_url}
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
//                     No image
//                   </div>
//                 )}
//               </div>

//               {/* Info */}
//               <div className="flex-1 flex flex-col mt-2">
//                 <h3
//                   className="text-sm md:text-base font-semibold text-gray-900 leading-tight h-10 overflow-hidden"
//                   style={{
//                     display: "-webkit-box",
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: "vertical",
//                   }}
//                 >
//                   {product.name || "Unnamed Product"}
//                 </h3>

//                 {/* Price + Location */}
//                 <div className="flex items-center justify-between mt-1">
//                   <p className="text-blue-600 font-bold text-sm">
//                     ₹{product.price || 0}
//                   </p>

//                   <div className="text-xs text-gray-600 flex items-center gap-1">
//                     📍 {product.location || "No Location"}
//                   </div>
//                 </div>

//                 {/* Button */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/product/${product.id}`);
//                   }}
//                   className="
//                     w-full bg-teal-700 hover:bg-teal-800
//                     text-white text-xs font-semibold
//                     py-1 rounded-md mt-2
//                   "
//                 >
//                   Contact Supplier
//                 </button>
//               </div>

//               {/* Seller */}
//               <div className="border-t mt-2 pt-2 flex justify-between items-start gap-2">
//                 <p className="text-sm font-semibold truncate">
//                   {product.seller_name || "Unknown Seller"}
//                 </p>

//                 <div className="text-green-700 text-xs">📞 View Number</div>
//               </div>

//               {/* Rating */}
//               <div className="flex justify-between items-center mt-1">
//                 <div>
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <span
//                       key={i}
//                       className={
//                         i < ratingNumber ? "text-yellow-500" : "text-gray-300"
//                       }
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>

//                 <span className="text-xs font-semibold">
//                   {ratingNumber.toFixed(1)}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Recommendations;

import { getRecommendations } from "@/services/profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRecommendations()
      .then((res) => setData(res || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-6 px-3">
      <h2 className="text-xl font-bold mb-4 text-black text-start">
        Recommended for You
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10 text-gray-500">
          Loading recommendations...
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 bg-white rounded-2xl p-4"
          style={{ gridAutoRows: "1fr" }}
        >
          {data.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-black">
              <p className="text-lg font-semibold ">
                No recommendations available
              </p>
              <p className="text-sm">
                Please check back later or explore products
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-4 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-sm rounded-md"
              >
                Explore Products
              </button>
            </div>
          ) : (
            data.map((product: any) => {
              const ratingNumber = product.rating ? Number(product.rating) : 0;

              return (
                <div
                  key={product.id}
                  onClick={() =>
                    navigate(`/product/${product.id}`, {
                      state: { supplier: product },
                    })
                  }
                  className="
                    bg-white rounded-xl shadow hover:shadow-md 
                    transition-all border border-gray-200 
                    flex flex-col h-full p-2 cursor-pointer
                  "
                >
                  <div className="relative h-32 md:h-36 w-full bg-gray-100 rounded-lg overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col mt-2">
                    <h3
                      className="text-sm md:text-base font-semibold text-gray-900 leading-tight h-10 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.name || "Unnamed Product"}
                    </h3>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-blue-600 font-bold text-sm">
                        ₹{product.price || 0}
                      </p>

                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        📍 {product.location || "No Location"}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="
                        w-full bg-teal-700 hover:bg-teal-800 
                        text-white text-xs font-semibold 
                        py-1 rounded-md mt-2
                      "
                    >
                      Contact Supplier
                    </button>
                  </div>

                  <div className="border-t mt-2 pt-2 flex justify-between items-start gap-2">
                    <p className="text-sm font-semibold truncate">
                      {product.seller_name || "Unknown Seller"}
                    </p>

                    <div className="text-green-700 text-xs">📞 View Number</div>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <div>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < ratingNumber
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-semibold">
                      {ratingNumber.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
