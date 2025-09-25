import React from "react";
import { AuthLayoutProps } from "@/types/authTypes";
import farmerLogo from "@assets/images/farmerLogo.png";
import farmerBg from "@assets/images/farmerBg.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export const AuthWrapper: React.FC<AuthLayoutProps> = ({ children, title }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className="hidden md:flex relative md:w-[90%] lg:w-[50%] min-h-screen overflow-hidden">
        <img
          src={farmerBg}
          alt={t("AUTH.FARMER_BG_ALT")}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-black-900 bg-opacity-30 z-10" />

        <svg
          className="absolute top-0 -right-11 lg:-right-6 h-full z-20"
          viewBox="0 0 200 800"
          preserveAspectRatio="none"
        >
          <path d="M0,0 Q200,400 0,800 L200,800 L200,0 Z" fill="white" />
        </svg>

        <div className="absolute inset-0 z-30 flex flex-col justify-between pl-6 lg:px-12 py-8 text-white">
          <div>
            <div className="flex items-left space-x-3">
              <img
                src={farmerLogo}
                alt={t("AUTH.LOGO_ALT")}
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-xl font-bold">{t("AUTH.BRAND_NAME")}</h1>
            </div>

            <div className="w-[60%] pt-5">
              <h2 className="text-2xl lg:text-3xl font-bold py-2">
                {t("AUTH.AUTH_HEADER")}
                <span className="italic font-normal">
                  {" "}
                  {t("AUTH.AUTH_SUBHEADING")}{" "}
                </span>
                {t("AUTH.AUTH_ENDING")}
              </h2>
            </div>
          </div>

          <p className="mb-5 max-w-md font-normal text-sm lg:text-xl leading-[1.5rem] whitespace-pre-line">
            {t("AUTH.AUTH_FOOTER")}
          </p>
        </div>
      </div>

      <div className="flex w-full lg:w-[50%] justify-center items-center px-6 lg:px-6 bg-white z-20 relative">
        <div className="w-full max-w-sm lg:max-w-md space-y-6 py-12 relative">
          <div className="absolute top-4 right-4">
            <LanguageSwitcher />
          </div>

          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-black text-center">
              {title}
            </h2>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
