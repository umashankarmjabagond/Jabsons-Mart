import React, { useState } from "react";
import sellerImg from "@/assets/images/sellerImg.png";
import sellerGraph from "@/assets/images/seller_graph.png";
import ZeroCost from "@/assets/images/seller_zerocost.png";
import ManageBusiness from "@/assets/images/seller_manage_business.png";
import { Country } from "@/types/authTypes";
import sellergraph from "@/assets/images/seller_graph.png";
import sellercost from "@/assets/images/seller_zerocost.png";
import sellerbusiness from "@/assets/images/seller_manage_business.png";

import {
  countries,
  SELLER_PAGE_TXT,
  SELLER_REGIST_ICON_TXT,
  SELLER_REGISTER_TXT,
} from "@/constants/textConstants";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { FiBox } from "react-icons/fi";

const SellerRegistration: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/seller/business-details");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 px-2 py-4">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-2xl overflow-hidden w-full max-w-md">
            <img
              src={sellerImg}
              alt="Seller"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left">
          {/* HEADING */}
          <h2 className="text-xl md:text-3xl font-semibold text-black leading-snug">
            <span className="font-bold text-black">
              {SELLER_REGISTER_TXT.SELLER_HEADIND1}
            </span>{" "}
            {SELLER_REGISTER_TXT.SELLER_HEADING2}
            <br className="hidden sm:block" />
            {SELLER_REGISTER_TXT.SELLER_TEXT3}
          </h2>

          <p className="text-lg font-semibold text-black">
            {SELLER_REGISTER_TXT.SELLER_REGISTER_TITLE}
          </p>

          {/* LOGIN FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-full shadow-md overflow-visible w-full max-w-md mx-auto md:mx-0 relative"
          >
            {/* COUNTRY */}
            <div
              className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-100 rounded-l-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-5 h-5 rounded-sm"
              />
              <span className="text-sm font-medium">
                {selectedCountry.code}
              </span>
            </div>

            {/* DROPDOWN */}
            {dropdownOpen && (
              <ul className="absolute top-14 left-0 bg-white shadow-lg rounded-md w-48 z-50 max-h-60 overflow-y-auto border">
                {countries.map((country) => (
                  <li
                    key={country.code}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCountry(country);
                      setDropdownOpen(false);
                    }}
                  >
                    <img src={country.flag} className="w-5 h-5 rounded-sm" />
                    <span className="text-sm">
                      {country.name} ({country.code})
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* INPUT */}
            <input
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="flex-1 px-3 py-3 outline-none text-sm"
              required
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-3 font-semibold rounded-r-full hover:opacity-90 transition"
            >
              {SELLER_REGISTER_TXT.SELLER_LOGIN_BTN} →
            </button>
          </form>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* CARD 1 */}
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition text-center">
              <img src={sellerGraph} className="w-12 mx-auto mb-3" />
              <h3 className="font-semibold text-black">
                {SELLER_REGIST_ICON_TXT.ICON1_TITLE}
              </h3>
              <p className="text-sm text-black">
                {SELLER_REGIST_ICON_TXT.ICON1_DES}
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition text-center">
              <img src={ZeroCost} className="w-12 mx-auto mb-3" />
              <h3 className="font-semibold text-black">
                {SELLER_REGIST_ICON_TXT.ICON2_TITLE}
              </h3>
              <p className="text-sm text-black">
                {SELLER_REGIST_ICON_TXT.ICON2_DES1} <br />
                {SELLER_REGIST_ICON_TXT.ICON2_DES2}
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition text-center">
              <img src={ManageBusiness} className="w-12 mx-auto mb-3" />
              <h3 className="font-semibold text-black">
                {SELLER_REGIST_ICON_TXT.ICON3_TITLE}
              </h3>
              <p className="text-sm text-black">
                {SELLER_REGIST_ICON_TXT.ICON3_DES}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 lg:gap-32 xl:gap-72">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 mb-2 md:mb-3 text-left">
            {SELLER_PAGE_TXT.HEADING1_TXT}
          </h2>
          <h1 className="hidden sm:block text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 mb-2 md:mb-3 text-left">
            {SELLER_PAGE_TXT.HEADING2_TXT}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full  ">
          <div className="w-full md:basis-1/3 bg-gray-50 h-auto md:h-72 flex flex-col items-stretch justify-between ">
            <div className="flex items-start gap-3 p-5">
              <div className="w-8 flex justify-start">
                <img src={sellergraph} alt="" className="w-20 h-10 mt-2" />
              </div>

              <div className="flex flex-col  gap-2 ml-2 ">
                <span className="text-lg font-medium text-blue-600 text-left">
                  {SELLER_PAGE_TXT.ICON1_TITLE}
                </span>
                <span className="text-sm text-black-900  text-left">
                  {SELLER_PAGE_TXT.ICON1_DES}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5">
              <div className="w-8 flex justify-start">
                <img src={sellercost} alt="" className="w-20 h-10 mt-2" />
              </div>

              <div className="flex flex-col  gap-2 ml-2 ">
                <span className="text-lg font-medium text-blue-600 text-left">
                  {SELLER_PAGE_TXT.ICON2_TITLE}
                </span>
                <span className="text-sm text-black-900  text-left">
                  {SELLER_PAGE_TXT.ICON2_DES}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5">
              <div className="w-8 flex justify-start">
                <img src={sellerbusiness} alt="" className="w-20 h-10 mt-2" />
              </div>

              <div className="flex flex-col  gap-2 ml-2 ">
                <span className="text-lg font-medium text-blue-600 text-left">
                  {SELLER_PAGE_TXT.ICON3_TITLE}
                </span>
                <span className="text-sm text-black-900  text-left">
                  {SELLER_PAGE_TXT.ICON3_DES}
                </span>
              </div>
            </div>
          </div>
          <h1 className="sm:hidden text-lg sm:text-xl md:text-2xl font-semibold text-black-700 mb-2 md:mb-3 text-left">
            {SELLER_PAGE_TXT.HEADING2_TXT}
          </h1>
          <div className="w-full md:basis-2/3 bg-gray-50 h-auto flex flex-col md:flex-row  bg-[url('src/assets/images/seller_page_bg.jpg')] bg-cover bg-center ">
            <div className="flex-1 flex flex-col items-center justify-center p-5 gap-4  min-w-0">
              <div className="w-10 flex justify-start relative">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative flex items-center justify-center w-16 h-16 border-2 border-blue-600 rounded-full">
                    <IoIosCreate className="w-8 h-8 text-blue-600" />

                    <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs font-bold rounded-full px-[5px] py-[1px]  ml-1">
                      1
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col  gap-2  ">
                <span className="text-lg font-medium text-blue-600 text-center">
                  {SELLER_PAGE_TXT.ICON4_TITLE}
                </span>
                <span className="text-sm text-black-900  text-center">
                  {SELLER_PAGE_TXT.ICON4_DES}
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-5 gap-4 min-w-0">
              <div className="w-10 flex justify-start   relative ">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative flex items-center justify-center w-16 h-16 border-2 border-blue-600 rounded-full">
                    <ImLocation2 className="w-8 h-8 text-blue-600" />

                    <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs font-bold rounded-full px-[5px] py-[1px] shadow ml-1">
                      2
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  gap-2  ">
                <span className="text-lg font-medium text-blue-600 text-center">
                  {SELLER_PAGE_TXT.ICON5_TITLE}
                </span>
                <span className="text-sm text-black-900  text-center">
                  {SELLER_PAGE_TXT.ICON5_DES}
                </span>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-5 min-w-0">
              <div className="w-14 flex justify-start  relative ">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative flex items-center justify-center w-16 h-16 border-2 border-blue-600 rounded-full">
                    <FiBox className="w-8 h-8 text-blue-600" />

                    <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-xs font-bold rounded-full px-[5px] py-[1px] shadow ml-1">
                      3
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  gap-2  ">
                <span className="text-lg font-medium text-blue-600 text-center ">
                  {SELLER_PAGE_TXT.ICON6_TITLE}
                </span>
                <span className="text-sm text-black-900 text-center  ">
                  {SELLER_PAGE_TXT.ICON6_DES}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;
