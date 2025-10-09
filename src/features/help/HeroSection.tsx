import { HELP_PAGE_TEXT } from "@/constants/textConstants";
import { HeroProps } from "@/types/helpTypes";
import React from "react";
const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="w-full h-48 bg-gradient-to-b from-indigo-200 to-indigo-300 py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
        {HELP_PAGE_TEXT.TITLE}
      </h1>
    </section>
  );
};

export default Hero;
