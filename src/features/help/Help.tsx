import Navbar from "@/components/common/Navbar";
import HeroSection from "./HeroSection";
import HelpCardList from "./HelpCardList";
import Footer from "@/components/common/Footer";

function Help() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100">
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <HeroSection />
        <HelpCardList />
      </div>

      <Footer />
    </div>
  );
}

export default Help;
