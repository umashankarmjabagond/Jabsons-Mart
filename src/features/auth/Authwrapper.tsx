import React from "react";
import { AuthLayoutProps } from "@/types/authTypes";
 
export const AuthWrapper: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-gray-100"></div>
 
      <div className="flex-1 flex justify-center items-center px-6 lg:px-16 bg-white">
        <div className="w-full max-w-md space-y-6">
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
 
 