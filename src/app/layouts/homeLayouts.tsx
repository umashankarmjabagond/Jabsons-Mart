import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Footer from "@/components/common/Footer";
import ProductCategory from "@/components/common/ui/Reusablecard";
import { products } from "@/utils/products";

const HomeLayout: React.FC = () => {
  return (
    <div className="h-screen bg-gray-200">
      <div className="flex">
        <Sidebar />
        <ProductCategory
          title="Explore Product Categories"
          products={products}
          staticImage="src/assets/ProductcategoryImages/download.jpeg"
        />

        <main className="flex-1 overflow-y-auto rounded-bl-2xl mb-4">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
