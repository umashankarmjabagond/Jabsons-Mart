import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const MarketLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MarketLayout;
