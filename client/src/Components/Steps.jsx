import React from "react";
import { assets } from "../assets/assets";

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Remove Background in 3 Simple Steps
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our AI-powered technology makes background removal effortless. Follow
          these simple steps to get professional results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 xl:mt-24">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col items-center text-center bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <img
                className="w-8 h-8"
                src={assets.upload_icon}
                alt="upload icon"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Upload Your Image
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Simply drag and drop your image or click to browse. We support all
              major formats including JPG, PNG, and WEBP.
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col items-center text-center bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <img
                className="w-8 h-8"
                src={assets.remove_bg_icon}
                alt="AI processing icon"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              AI Processing
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our advanced AI analyzes your image and precisely identifies the
              subject, removing the background while preserving fine details.
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col items-center text-center bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <img
                className="w-8 h-8"
                src={assets.download_icon}
                alt="download icon"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Download Result
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get your high-quality image with transparent background instantly.
              Download in PNG format for the best results.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-6 py-3 rounded-full">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 font-medium">
            Average processing time: 2-3 seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default Steps;
