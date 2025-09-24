import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Banner from "@/features/market/Banner/Banner";
import FarmerMartLanding from "@/features/market/MoreforyouSection/FarmerMartLanding";
import MoreForYou from "@/features/market/MoreforyouSection/MoreForYou";
import CategoryList from "@/features/market/ProductsCategory/CategoryList";

export default function LandingPage() {

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header/>
      <Banner/>
      <CategoryList />
      <MoreForYou />
      <FarmerMartLanding />
      <Footer/>
    </div>
  );
}
