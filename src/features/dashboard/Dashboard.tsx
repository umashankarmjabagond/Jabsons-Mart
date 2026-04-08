import Testimonials from "@/components/common/Testimonials";
import Footer from "@/components/common/Footer";
import DashboardStats from "./dashboard/DashboardStats";
import EnquiryTrend from "./dashboard/EnquiryTrend";
import CategoryChart from "./dashboard/CategoryChart ";
import Recommendations from "./dashboard/Recommendations ";
import RecentViews from "./dashboard/RecentViews ";

function Dashboard() {
  return (
    <>
      <DashboardStats />
      <div className="grid md:grid-cols-2 gap-4 max-w-7xl mx-auto mt-6">
        <EnquiryTrend />
        <CategoryChart />
      </div>
      <Recommendations />
      <RecentViews />
      {/* <UseCategory /> */}
      <Testimonials />
      <Footer />
    </>
  );
}

export default Dashboard;
