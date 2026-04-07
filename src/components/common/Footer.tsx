import { Apple, Facebook, Linkedin, Smartphone, Twitter } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
      {/* TOP BAR */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 flex justify-between flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-lg font-semibold text-left">
            Grow your business with Trade Hub
          </span>

          <div className="flex gap-6 text-sm flex-col sm:flex-row items-start sm:items-center">
            {/* MOBILE */}
            <div className="flex gap-2 items-center">
              <span>Get our app:</span>
              <div className="flex">
                <span className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer">
                  <Apple size={20} />
                </span>
                <span className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer">
                  <Smartphone size={20} />
                </span>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-2 items-center">
              <span>Follow us:</span>
              <div className="flex gap-2">
                <span className="h-8 w-8 flex items-center justify-center bg-blue-900 rounded-full cursor-pointer">
                  <Facebook size={18} />
                </span>
                <span className="h-8 w-8 flex items-center justify-center bg-blue-900 rounded-full cursor-pointer">
                  <Twitter size={18} />
                </span>
                <span className="h-8 w-8 flex items-center justify-center bg-blue-900 rounded-full cursor-pointer">
                  <Linkedin size={18} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 grid grid-cols-2 md:grid-cols-5 gap-8 items-start text-sm">
          <FooterColumn
            title="Trade Hub"
            items={["About Us", "Our Mission", "Success Stories", "Contact Us"]}
          />

          <FooterColumn
            title="For Sellers"
            items={[
              "Start Selling",
              "Seller Dashboard",
              "Leads & Inquiries",
              "Pricing Plans",
            ]}
          />

          <FooterColumn
            title="For Buyers"
            items={[
              "Search Products",
              "Request Quotes (RFQ)",
              "Explore Suppliers",
              "Saved Products",
            ]}
          />

          <FooterColumn
            title="Resources"
            items={["Blog", "Market Insights", "Help Center", "FAQs"]}
          />

          <FooterColumn
            title="Business Tools"
            items={[
              "Inventory Management",
              "Lead Management",
              "Analytics Dashboard",
              "Export Opportunities",
            ]}
          />
        </div>
      </div>

      {/* BOTTOM */}
      <div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 flex justify-between flex-col sm:flex-row gap-3 items-start sm:items-center text-sm">
          <p>© 2026 Trade Hub. All rights reserved.</p>
          <p className="cursor-pointer hover:underline">
            Terms of Use • Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

const FooterColumn = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <div className="flex flex-col items-start text-left gap-2">
      <h3 className="font-semibold text-base mb-2">{title}</h3>
      {items.map((item, index) => (
        <p key={index} className="cursor-pointer hover:underline text-sm">
          {item}
        </p>
      ))}
    </div>
  );
};

export default Footer;
