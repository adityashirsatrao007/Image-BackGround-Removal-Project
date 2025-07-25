import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="flex items-center justify-between gap-5 px-4 lg:px-44 py-6">
        <div className="flex items-center gap-3">
          <img width={150} src={assets.logo} alt="logo" />
          <div className="hidden sm:block">
            <p className="text-xs text-gray-600 font-medium">
              Image-BackGround-Removal Project
            </p>
            <p className="text-xs text-gray-500">
              AI-Powered Background Removal
            </p>
          </div>
        </div>

        <div className="flex-1 text-center max-sm:hidden">
          <p className="text-sm text-gray-600 font-medium">
            Developed by Aditya Shirsatrao
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © 2025 All rights reserved.
          </p>
        </div>

        <div className="flex gap-2">
          <img
            className="hover:scale-110 transition-transform duration-300 cursor-pointer rounded-lg p-1 hover:bg-gray-200"
            width={40}
            src={assets.facebook_icon}
            alt="facebook icon"
          />
          <img
            className="hover:scale-110 transition-transform duration-300 cursor-pointer rounded-lg p-1 hover:bg-gray-200"
            width={40}
            src={assets.twitter_icon}
            alt="twitter icon"
          />
          <img
            className="hover:scale-110 transition-transform duration-300 cursor-pointer rounded-lg p-1 hover:bg-gray-200"
            width={40}
            src={assets.google_plus_icon}
            alt="google plus icon"
          />
        </div>
      </div>

      {/* Mobile version of credits */}
      <div className="sm:hidden text-center pb-4">
        <p className="text-sm text-gray-600 font-medium">
          Developed by Aditya Shirsatrao
        </p>
        <p className="text-xs text-gray-500 mt-1">
          © 2025 All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
