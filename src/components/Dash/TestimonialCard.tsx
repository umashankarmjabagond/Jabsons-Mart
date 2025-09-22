import React from "react";
import { CartItem } from "@/types/authTypes";
import { Button } from "@/components/common/ui/Button";

const TestimonialCard: React.FC<CartItem> = ({ textTop, textBottom, Btn }) => {
  return (
    <div className="w-full  bg-white shadow-lg rounded-md p-3 flex flex-col justify-between">
      {/* Top Text */}
      <p className="text-xs sm:text-sm md:text-base lg:text-md leading-relaxed text-black">
        {textTop}
      </p>

      {/* Bottom */}
      <div className="mt-3">
        <p className="text-xs sm:text-sm md:text-base lg:text-md leading-relaxed text-black">
          {textBottom}
        </p>

        {Btn && (
          <Button
            type="button"
            size="sm"
            className="mt-2 px-2 py-1 !bg-blue-800 hover:bg-blue-700 text-white text-xs sm:text-sm rounded-lg"
          >
            {Btn}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;