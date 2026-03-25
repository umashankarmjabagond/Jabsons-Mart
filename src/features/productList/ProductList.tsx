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
    <div>
      {/* Breadcrumb + Back */}
      <div className="px-4 sm:px-5 md:px-6 pt-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
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

        <button
          onClick={() => navigate("/market")}
          className="text-green-700 text-sm font-medium hover:underline inline-flex items-center"
        >
          ← Back to Market
        </button>
      </div>

      {/* Product Grid */}
      <div className="py-2 sm:py-2 md:py-2 rounded-2xl !bg-white">
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
                className="bg-white rounded-xl shadow hover:shadow-md transition-all border border-gray-200 flex flex-col h-full p-2 sm:p-2 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-30 sm:h-30 md:h-36 w-full bg-gray-100 rounded-lg overflow-hidden">
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
                <div className="flex-1 flex flex-col mt-2">
                  <h3
                    className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-gray-900 leading-tight h-10 overflow-hidden"
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

                  <div className="flex items-center justify-around">
                    <p className="text-blue-600 font-bold text-sm sm:text-base truncate">
                      {formatCurrency(product.price)}
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">
                        {product.quantity ? `/${product.quantity}` : ""}
                      </span>
                    </p>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin size={14} className="mr-1" />
                      {product.location ?? MESSAGES.UNKNOWN_LOCATION}
                    </div>
                  </div>

                  <button className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-semibold py-1 rounded-md mt-1">
                    {BUTTON_TEXTS.CONTACT_SUPPLIER}
                  </button>
                </div>

                {/* Seller */}
                <div className="border-t mt-2 pt-2 flex justify-between items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate break-words">
                      {product.sellerName ?? MESSAGES.UNKNOWN_SELLER}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center text-green-700 text-xs mt-1">
                      <Phone size={14} className="mr-1" />
                      {BUTTON_TEXTS.VIEW_NUMBER}
                    </div>
                  </div>
                </div>
                <div className="flex justify-around items-center mt-1">
                  <div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < ratingNumber ? "text-yellow-500" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold mt-1">
                    {ratingNumber.toFixed(1)}
                  </span>
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
