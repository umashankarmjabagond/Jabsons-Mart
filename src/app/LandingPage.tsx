import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Banner from "@/features/landing/Banner/Banner";
import MoreForYou from "@/features/landing/MoreforyouSection/MoreForYou";
import CategoryList from "@/features/landing/ProductsCategory/CategoryList";
import TopCities from "@/features/landing/supplierForCities/TopCities";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Banner />
      <CategoryList />
      <TopCities />
      <MoreForYou />
      <Footer />
    </div>
  );
}
