import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { HELP_PAGE_TEXT } from "@/constants/textConstants";
import { HeroProps } from "@/types/helpTypes";
import { Search } from "lucide-react";
import React, { useState } from "react";

const HeroSection: React.FC<HeroProps> = () => {
  const [searchText, setSearchText] = useState("");

  const supportLinks = [
    { label: "How to Register for Paid Services on IndiaMART?", href: "#" },
    { label: "Does IndiaMART Provide Shipping Services?", href: "#" },
    { label: "How to Sell Items on IndiaMART?", href: "#" },
  ];

  return (
    <section className="w-full h-auto py-2 text-center bg-gradient-to-b from-white to-[#B3B7FF]">
      {" "}
      <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
        {HELP_PAGE_TEXT.TITLE}
      </h1>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl flex justify-center gap-3">
          <Input
            type="text"
            placeholder="Search using Keywords..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-2 w-88 rounded-sm border-none border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            variant="blue"
            size="md"
            className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-2 rounded-sm flex items-center gap-2"
          >
            <Search size="16" />
          </Button>
        </div>
      </div>
      <div className="mt-2 flex justify-around mb-4 mx-8 transition">
        <p className="text-base text-md font-medium text-gray-900 mt-2 ">
          {HELP_PAGE_TEXT.SUBTITLE}
        </p>

        {supportLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className=" p-2 rounded-full shadow-md text-sm font-medium  transition"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div></div>
    </section>
  );
};

export default HeroSection;
