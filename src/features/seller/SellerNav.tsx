import React, { useState } from "react";
import { Building2, CheckCircle, Package, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SellerAccountStep from "./SellerAccountStep";
import SellerBusinessDetails from "./SellerBusinessDetails";
import SellerProductDetails from "./SellerProductDetails";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/common/ui/Button";

const SellerNav: React.FC = () => {
  const navigate = useNavigate();

  // ✅ CHECK REGISTRATION
  const isRegistered = localStorage.getItem("isRegistered") === "true";

  const [step, setStep] = useState<number>(isRegistered ? 2 : 1);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    // 🔥 IMPORTANT LOGIC
    if (step === 2 && isRegistered) {
      navigate("/seller"); // go back instead of step 1
      return;
    }

    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100">
      <Navbar />

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        {/* BACK BUTTON */}
        <div className="flex justify-start">
          <Button
            onClick={() => navigate("/seller")}
            className="flex justify-start border border-gray-300 mb-4 text-sm font-medium text-gray-700 text-start flex  gap-1"
          >
            ← Back to Seller Page
          </Button>
        </div>
        {/* STEPPER */}
        <div className="flex items-center justify-center mb-10 w-full max-w-3xl mx-auto">
          {/* STEP 1 */}
          {!isRegistered && (
            <>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                    step > 1
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <UserPlus size={18} />
                </div>

                <span
                  className={`mt-2 text-sm font-medium ${
                    step === 1 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Create Account
                </span>

                {step > 1 && (
                  <CheckCircle className="text-green-500 mt-1" size={14} />
                )}
              </div>

              {/* LINE */}
              <div
                className={`flex-1 h-[2px] mx-3 ${
                  step > 1 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            </>
          )}

          {/* STEP 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                step >= 2
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              <Building2 size={18} />
            </div>

            <span
              className={`mt-2 text-sm font-medium ${
                step === 2 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Business Details
            </span>

            {step > 2 && (
              <CheckCircle className="text-green-500 mt-1" size={14} />
            )}
          </div>

          {/* LINE */}
          <div
            className={`flex-1 h-[2px] mx-3 ${
              step > 2 ? "bg-green-500" : "bg-gray-300"
            }`}
          />

          {/* STEP 3 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                step === 3
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              <Package size={18} />
            </div>

            <span
              className={`mt-2 text-sm font-medium ${
                step === 3 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Product Details
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-xl p-6 shadow">
          {!isRegistered && step === 1 && (
            <SellerAccountStep onNext={handleNext} />
          )}

          {step === 2 && (
            <SellerBusinessDetails
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {step === 3 && <SellerProductDetails onPrevious={handlePrevious} />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerNav;
