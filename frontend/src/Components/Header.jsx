import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const Header = () => {
  const { removeBG } = useContext(AppContext);
  return (
    <header className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 mx-4 mt-10 lg:px-44 sm:mt-20">
      {/* ------left side ------- */}

      <div className="max-w-2xl">
        <div className="mb-4">
          <span className="inline-block bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ✨ AI-Powered Background Removal
          </span>
        </div>

        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-800 leading-tight mb-6">
          Remove the <br className="max-md:hidden" />{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
            background
          </span>{" "}
          from <br className="max-md:hidden" />
          images instantly.
        </h1>

        <p className="my-6 text-lg text-gray-600 leading-relaxed max-w-xl">
          Transform your images with our advanced AI technology. Get
          professional, transparent backgrounds in seconds - completely free and
          hassle-free!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <input
            onChange={(e) => removeBG(e.target.files[0])}
            accept="image/*"
            type="file"
            id="image1"
            hidden
          />
          <label
            htmlFor="image1"
            className="inline-flex gap-3 px-8 py-4 rounded-xl cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <img
              width={20}
              src={assets.upload_btn_icon}
              alt="upload btn"
              className="group-hover:scale-110 transition-transform"
            />
            <p className="text-white text-sm font-medium">Upload your image</p>
          </label>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                1K+
              </div>
            </div>
            <span>Happy users</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>100% Free</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Instant Results</span>
          </div>
        </div>
      </div>

      {/* ------right side ------- */}

      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
        <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
          <img
            src={assets.header_img}
            alt="Background removal demo"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
