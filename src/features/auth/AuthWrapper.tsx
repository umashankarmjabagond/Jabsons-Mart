import React from "react";
import { AuthLayoutProps } from "@/types/authTypes";

export const AuthWrapper: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex w-1/2 bg-gray-100">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/003/689/224/small_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
          alt=""
        />
      </div>

      <div className="  lg:flex w-1/2 justify-center items-center px-6 sm:px-10 lg:px-16 bg-white">
        <div className="w-[448px] space-y-6">
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
