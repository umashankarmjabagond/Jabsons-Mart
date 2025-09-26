import Testimonials from "@/components/common/Testimonials";
import UseCategory from "@/features/dashboard/productCategory/UseCategory";
import Footer from "@/components/common/Footer";
import MoreForYouCard from "@/components/common/MoreForYouCard";
import DashboardCarousel from "@/components/DashboardCarousel";
import DashboardNav from "@/components/DashboardNav";
import { HEADING, SERVICES } from "@/constants/textConstants";
function Dashboard() {
  return (
    <>
      <DashboardNav />
      <DashboardCarousel />
      <UseCategory/>
      <Testimonials />
      <MoreForYouCard heading={HEADING.heading} services={SERVICES} />
      <Footer/>
    </>
  );
}
export default Dashboard;
