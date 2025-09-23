
import CommonCarousel from "@/components/common/CommonCarousel";
import { products } from "../utils/json_util";
import {DASHBOARD_TEXT} from  "@constants/textConstants"
import {  SlideItem} from "@/types/carouselTypes"; 
function Dashboard() {
  return (
    <>
      <CommonCarousel
        slides={products as SlideItem[]}
        autoPlay
        interval={5000}
        centerSlidePercentage={25}
        title={DASHBOARD_TEXT.DASHBOARD_CAROUSEL}
        buttonText={DASHBOARD_TEXT.CAROUSEL_BUTTON}          
      onButtonClick={(slide) => console.log("Clicked", slide.name)}
      />

    </>
  );
}   
export default Dashboard;
