import React from "react";

import { Product } from "@/types/dashboardType";
import ProductCard from "@components/dashboard/productCategory/ProductCard";

interface ProductCategoryProps {
  title: string;
  products: Product[];
  staticImage?: string;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ title, products, staticImage }) => {
  return (
    <div className="flex flex-col items-center w-full px-4">
      
      <hr className="w-full h-1 bg-gray-100 border-0 rounded-sm dark:bg-gray-700" />

      
      <h2 className="text-2xl  font-semibold text-gray-800 text-start mt-2 truncate">
        {title}
      </h2>

      
      <div className="w-full max-w-screen-xl mx-auto mt-1 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4">
        
        <div className=" flex items-center justify-center p-1 rounded h-full">
          <img
            src={staticImage || "https://via.placeholder.com/150"}
            alt="Main Static"
            className="w-full h-auto object-contain rounded"
          />
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id.toString()}
              productName={product.product}
              subProducts={product.subProducts}
              img={product.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;