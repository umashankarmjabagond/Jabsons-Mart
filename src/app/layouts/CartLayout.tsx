import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import AddToCartPage from "@/features/Cart/AddToCart";

const CartLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* SCROLLABLE AREA */}
      <div className="flex-1 overflow-hidden">
        <AddToCartPage />
      </div>

      <Footer />
    </div>
  );
};

export default CartLayout;
