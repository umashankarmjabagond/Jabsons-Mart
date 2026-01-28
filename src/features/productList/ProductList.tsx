import React, { useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { useNavigate, useLocation } from "react-router-dom";
import type { ProductListProps, Product } from "@/types/productTypes";
import { MESSAGES, BUTTON_TEXTS } from "@/constants/searchpagelayout";

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Query params
  const searchParams = new URLSearchParams(location.search);
  const productParam = searchParams.get("product");
  const categoryParam = searchParams.get("category");

  // Helper: highlight searched product text
  const highlightText = (text: string, highlight?: string | null) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 px-1 rounded font-semibold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [products]);

  if (loading)
    return (
      <p className="text-center py-8 text-gray-500 text-sm sm:text-base">
        {MESSAGES.LOADING}
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-8 text-sm sm:text-base">
        {error}
      </p>
    );

  if (!products || products.length === 0)
    return (
      <div className="p-6">
        <button
          onClick={() => navigate("/market")}
          className="text-green-700 text-sm font-medium hover:underline mb-3 inline-flex items-center"
        >
          ← Back to Market
        </button>

        <p className="text-center py-8 text-gray-500 text-sm sm:text-base">
          {MESSAGES.NO_PRODUCTS}
        </p>
      </div>
    );

  return (
    <div className="h-full overflow-y-auto">
      {/* Breadcrumb + Back */}
      <div className="px-4 sm:px-5 md:px-6 pt-4">
        <button
          onClick={() => navigate("/market")}
          className="text-green-700 text-sm font-medium hover:underline mb-2 inline-flex items-center"
        >
          ← Back to Market
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span
            className="cursor-pointer text-green-700 hover:underline"
            onClick={() => navigate("/market")}
          >
            Market
          </span>

          {categoryParam && (
            <>
              <span>›</span>
              <span className="capitalize">
                {categoryParam.replace(/-/g, " ")}
              </span>
            </>
          )}

          {productParam && (
            <>
              <span>›</span>
              <span className="font-semibold text-gray-900">
                {productParam}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4 sm:p-5 md:p-6">
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
          style={{ gridAutoRows: "1fr" }}
        >
          {products.map((product: Product) => {
            const ratingNumber = product.rating ? Number(product.rating) : 0;

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
                className="bg-white rounded-xl shadow hover:shadow-md transition-all border border-gray-200 flex flex-col h-full p-3 sm:p-4 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-36 sm:h-40 md:h-48 w-full bg-gray-100 rounded-lg overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.itemName ?? MESSAGES.UNNAMED_PRODUCT}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs sm:text-sm">
                      {MESSAGES.NO_IMAGE}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col mt-3">
                  <h3
                    className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-gray-900 leading-tight h-12 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {highlightText(
                      product.itemName ?? MESSAGES.UNNAMED_PRODUCT,
                      productParam,
                    )}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm mt-1 truncate">
                    {product.location ?? MESSAGES.UNKNOWN_LOCATION}
                  </p>

                  <p className="text-blue-600 font-bold text-sm sm:text-base mt-2">
                    {formatCurrency(product.price)}
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      {product.quantity ? `/${product.quantity}` : ""}
                    </span>
                  </p>

                  <button className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold py-2 rounded-md mt-auto">
                    {BUTTON_TEXTS.CONTACT_SUPPLIER}
                  </button>
                </div>

                {/* Seller */}
                <div className="border-t mt-3 pt-3 flex justify-between">
                  <div>
                    <p className="text-sm font-semibold truncate">
                      {product.sellerName ?? MESSAGES.UNKNOWN_SELLER}
                    </p>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin size={14} className="mr-1" />
                      {product.location ?? MESSAGES.UNKNOWN_LOCATION}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex gap-1">
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
                      <span className="ml-1 text-xs font-semibold">
                        {ratingNumber.toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-center text-green-700 text-xs mt-1">
                      <Phone size={14} className="mr-1" />
                      {BUTTON_TEXTS.VIEW_NUMBER}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
