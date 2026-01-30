import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Banner from "@/features/landing/Banner/Banner";
import CategoryLandingList from "@/features/landing/categoryLanding/CategoryLandingList";
import MoreForYou from "@/features/landing/MoreforyouSection/MoreForYou";
import TopCities from "@/features/landing/supplierForCities/TopCities";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Banner />
      {/* 🔥 CTA to Market */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <button
          onClick={() => navigate("/market")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Explore All Categories →
        </button>
      </div>
      <br />
      <CategoryLandingList />
      <TopCities />
      <MoreForYou />
      <Footer />
    </div>
  );
}
