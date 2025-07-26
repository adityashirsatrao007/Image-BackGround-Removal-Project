import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const Upload = () => {
  const { removeBG } = useContext(AppContext);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = async (file) => {
    if (file) {
      setSelectedFile(file);
      setIsUploading(true);

      // Show immediate feedback
      console.log("✅ File selected:", file.name);

      // Small delay to show the selection feedback
      setTimeout(() => {
        removeBG(file);
      }, 500);
    }
  };

  return (
    <div className="pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
          Ready to Experience the Magic?
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Upload your image now and see our AI technology remove backgrounds
          with incredible precision in just seconds.
        </p>

        <div className="relative inline-block mb-16">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
            <input
              onChange={(e) => handleFileSelect(e.target.files[0])}
              accept="image/*"
              type="file"
              id="image2"
              hidden
            />
            <label
              htmlFor="image2"
              className={`group inline-flex flex-col items-center gap-4 px-12 py-8 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl ${
                isUploading
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 hover:scale-105"
              }`}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                {isUploading ? (
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <img
                    width={32}
                    src={assets.upload_btn_icon}
                    alt="upload btn"
                    className="filter brightness-0 invert"
                  />
                )}
              </div>
              <div className="text-center">
                <p className="text-white text-lg font-semibold mb-1">
                  {isUploading
                    ? `✅ ${selectedFile?.name || "File"} Selected!`
                    : "Upload Your Image"}
                </p>
                <p className="text-white/80 text-sm">
                  {isUploading
                    ? "Redirecting to processing..."
                    : "Drag & drop or click to browse"}
                </p>
              </div>
            </label>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>JPG, PNG, WEBP</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Max 10MB</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>High Quality Output</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Instant Processing
            </h3>
            <p className="text-sm text-gray-600">Results in 2-3 seconds</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Perfect Quality
            </h3>
            <p className="text-sm text-gray-600">Preserves fine details</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">
              Secure & Private
            </h3>
            <p className="text-sm text-gray-600">Your images are safe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
