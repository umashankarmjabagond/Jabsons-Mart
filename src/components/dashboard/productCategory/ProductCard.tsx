import React from "react";
import { SubProduct } from "@/types/dashboardType";
import { truncateText } from "@/utils/helpers";

interface ProductCardProps {
  productId: string;
  productName: string;
  img: string;
  subProducts: SubProduct[];
}

const ProductCard: React.FC<ProductCardProps> = ({ productId, productName, img, subProducts }) => {
  return (
    <div className="p-2 flex flex-col gap-2 border rounded shadow-sm">
      <h3 className="text-base font-semibold text-gray-900">{productName}</h3>

      <div className="flex items-center justify-between gap-1">
        <img
          src={img}
          alt={`Item ${productId}`}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="grid grid-cols-1 gap-1 text-sm text-gray-800 font-medium">
          {subProducts.map((sub) => (
            <div key={sub.id} className="p-1" title={sub.name}>
              {truncateText(sub.name, 15)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;