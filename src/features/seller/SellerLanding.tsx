import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SellerRegistration from "@/features/seller/SellerRegistration";

function SellerLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100">
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <SellerRegistration />
      </div>

      {/* FOOTER AT BOTTOM */}
      <Footer />
    </div>
  );
}

export default SellerLanding;

// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/common/Navbar";
// import Footer from "@/components/common/Footer";

// function SellerLanding() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100">
//       <Navbar />

//       <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
//         <h1 className="text-3xl font-bold mb-4">
//           Start Selling on TradeHub 🚀
//         </h1>

//         <p className="text-gray-600 mb-6">
//           Register your business and reach thousands of buyers.
//         </p>

//         <button
//           onClick={() => navigate("/seller/register")}
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
//         >
//           Start Selling →
//         </button>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default SellerLanding;
