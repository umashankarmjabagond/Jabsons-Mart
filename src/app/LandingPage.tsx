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
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <Banner />
      {/* 🔥 CTA to Market */}
      <div
        onClick={() => navigate("/market")} // ✅ KEEP THIS (unchanged)
        className="relative cursor-pointer group mt-2"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-20 blur-xl group-hover:opacity-40 transition duration-500"></div>

        {/* Moving CTA */}
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold overflow-hidden">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {/* content repeated */}
            {[...Array(8)].map((_, i) => (
              <span key={i} className="mx-8 whitespace-nowrap">
                🚀 Explore All Categories →
              </span>
            ))}

            {/* duplicate for seamless loop */}
            {[...Array(8)].map((_, i) => (
              <span key={`dup-${i}`} className="mx-8 whitespace-nowrap">
                🚀 Explore All Categories →
              </span>
            ))}
          </div>
        </div>
      </div>
      <br />
      <CategoryLandingList />
      <TopCities />
      <MoreForYou />
      <Footer />
    </div>
  );
}
