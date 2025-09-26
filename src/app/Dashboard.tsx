import CommonCarousel from "@/components/common/CommonCarousel";
import { products } from "../utils/json_util";
import { DASHBOARD_TEXT, HEADING, SERVICES } from "@constants/textConstants";
import { SlideItem } from "@/types/carouselTypes";
import Testimonials from "@/components/common/Testimonials";
import UseCategory from "@/features/dashboard/productCategory/UseCategory";
import Footer from "@/components/common/Footer";
import MoreForYouCard from "@/components/common/MoreForYouCard";
function Dashboard() {
  return (
    <>
    <div className="overflow-auto no-scrollbar max-h-[100vh]">
      <CommonCarousel
        slides={products as SlideItem[]}
        autoPlay
        interval={5000}
        centerSlidePercentage={25}
        title={DASHBOARD_TEXT.DASHBOARD_CAROUSEL}
        buttonText={DASHBOARD_TEXT.CAROUSEL_BUTTON}
        onButtonClick={(slide) => console.log("Clicked", slide.name)}
      />
      <div className="w-full mt-10 ">
        <UseCategory/>
        <Testimonials />
         <MoreForYouCard heading={HEADING.heading} services={SERVICES} />
        <Footer/>
      </div>
      </div>
    </>
  );
}
export default Dashboard;
