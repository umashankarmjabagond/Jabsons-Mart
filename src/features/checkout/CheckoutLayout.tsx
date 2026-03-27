import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CheckoutFlow from "@/features/checkout/CheckoutFlow";

const CheckoutLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100">
        <div className="mx-auto max-w-[1280px] py-4">
          <CheckoutFlow />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
