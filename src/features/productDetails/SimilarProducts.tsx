import React from "react";
import { MapPin, Phone } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/productTypes";
interface SimilarProductsProps {
  products: Product[];
  currentProductName: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  products,
  currentProductName,
}) => {
  const navigate = useNavigate();

  if (!products?.length) {
    return <div className="p-6">No similar products found.</div>;
  }

  const orderedProducts = [
    ...products.filter((p) => p.itemName === currentProductName),
    ...products.filter((p) => p.itemName !== currentProductName),
  ];

  return (
    <div className="mt-8 bg-white p-4 rounded-2xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        style={{ gridAutoRows: "1fr" }}
      >
        {orderedProducts.map((product) => {
          const rating = Number(product.rating) || 0;

          return (
            <div
              key={`${product.itemName ?? "no-name"}-${
                product.sellerName ?? "no-seller"
              }`}
              onClick={() =>
                navigate(`/product/${product.id}`, {
                  state: { supplier: product },
                })
              }
              className="bg-white rounded-xl shadow hover:shadow-md transition-all border border-gray-200 flex flex-col h-full p-2 sm:p-2 cursor-pointer w-full"
            >
              <div className="relative h-30 sm:h-30 md:h-36 w-full bg-gray-100 rounded-lg overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.itemName ?? "Unnamed Product"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs sm:text-sm">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col mt-2">
                <h3
                  className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-gray-900 leading-tight h-10 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.itemName ?? "Unnamed Product"}
                </h3>

                <div className="flex items-center justify-around mt-1">
                  <p className="text-blue-600 font-bold text-sm sm:text-base truncate">
                    {formatCurrency(product.price)}
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      {product.quantity ? `/${product.quantity}` : ""}
                    </span>
                  </p>

                  <div className="flex items-center text-xs sm:text-sm text-gray-600 truncate">
                    <MapPin size={14} className="mr-1" />
                    <span>{product.location ?? "Unknown Location"}</span>
                  </div>
                </div>

                <button className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold py-2 rounded-md mt-2">
                  Contact Supplier
                </button>
              </div>

              <div className="border-t mt-2 pt-2 flex justify-around items-center gap-3">
                <p className="text-sm font-semibold truncate break-words">
                  {product.sellerName ?? "Unknown Seller"}
                </p>

                <div className="flex items-center text-green-700 text-xs">
                  <Phone size={14} className="mr-1" />
                  <span>View Number</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < rating ? "text-yellow-500" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;
