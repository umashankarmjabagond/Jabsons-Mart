import React from "react";
import FilterDropdown from "@/components/common/FilterSection";
import TextDropdown from "@/components/common/TextDropdown";

const sidebarData = [
  {
    type: "text", 
    title: "Price",
    options: [
      "₹2,000 and Below",
      "₹2,001-₹9,000",
      "₹9,001-₹50,000",
      "₹50,001 and Above"
    ],
  },
  {
    type: "filter",
    title: "Filters",
    options: ["Bengaluru-based Suppliers"],
  },
  {
    type: "text",
    title: "Usage/Application",
    options: ["Industrial", "Garage"],
  },
  {
    type: "text",
    title: "Business Type",
    options: ["Manufacturer", "Exporter", "Wholesaler", "Retailer"],
  },


  {
    type: "text",
    title: "Related Category",
    options: [
      "Automobile Dashboard",
      "Executive Dashboard",
      "Car Dashboard Light",
      "IT Solutions",
      "Virtual Imaging System",
    ],
  },



];

const SidebarFilters: React.FC = () => {
  return (
<aside className="w-64 bg-white border rounded-lg border-gray-200 flex flex-col h-screen">
  {sidebarData.map((section) => {
    if (section.type === "text") {
      return (
        <TextDropdown
          key={section.title}
          title={section.title}
          options={section.options}
        />
      );
    } else if (section.type === "filter") {
      return (
        <FilterDropdown
          key={section.title}
          title={section.title}
          options={section.options}
        />
      );
    }
    return null;
  })}
</aside>

  );
};

export default SidebarFilters;
