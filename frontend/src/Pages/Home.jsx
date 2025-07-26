import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";

const Home = () => {
  const { removeBG, image, resultImage, loading, uploadStatus } =
    useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileSelect = async (file) => {
    if (file) {
      setSelectedFile(file);
      console.log("✅ File selected:", file.name);
      removeBG(file);
    }
  };

  const handleDownload = async () => {
    if (!resultImage) return;

    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = `background-removed-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          AI Background Remover
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Remove backgrounds from your images instantly with advanced AI
          technology
        </p>
      </div>

      {/* Main Split Screen Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          {/* Left Side - Upload */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Upload Your Image
            </h2>

            {/* Upload Area */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-md">
                <input
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  accept="image/*"
                  type="file"
                  id="imageUpload"
                  hidden
                />
                <label
                  htmlFor="imageUpload"
                  className="group block w-full h-64 border-2 border-dashed border-purple-400 rounded-2xl cursor-pointer hover:border-purple-300 transition-all duration-300 hover:bg-purple-500/10"
                >
                  <div className="h-full flex flex-col items-center justify-center gap-4">
                    {selectedFile ? (
                      <>
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white"
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
                        <div className="text-center">
                          <p className="text-green-400 font-semibold">
                            {selectedFile.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <img
                            width={32}
                            src={assets.upload_btn_icon}
                            alt="upload"
                            className="filter brightness-0 invert"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-white text-lg font-semibold mb-2">
                            Drag & drop or click to browse
                          </p>
                          <p className="text-gray-400 text-sm">
                            Supports JPG, PNG, WEBP • Max 10MB
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Upload Status */}
            {loading && (
              <div className="mt-6 p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-purple-300 font-medium">
                    {uploadStatus || "Processing..."}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Results */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Result
            </h2>

            {/* Result Display */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
                {loading ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-medium">
                      {uploadStatus || "Processing..."}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      This usually takes 5-10 seconds
                    </p>
                  </div>
                ) : resultImage ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={resultImage}
                      alt="Background removed"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Complete
                    </div>
                  </div>
                ) : image ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📤</span>
                    </div>
                    <p className="text-white font-medium">Image uploaded!</p>
                    <p className="text-gray-400 text-sm">
                      Starting background removal...
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-400">
                      Upload an image to see results here
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Download Button */}
            {resultImage && (
              <div className="mt-6">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Download Result</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Debug Info (can be removed in production) */}
        <div className="mt-8 bg-black/30 backdrop-blur-lg rounded-lg p-4 text-sm text-gray-300">
          <strong className="text-white">Debug Info:</strong>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
            <div>Image: {image ? "✅ Present" : "❌ Missing"}</div>
            <div>Result: {resultImage ? "✅ Present" : "❌ Missing"}</div>
            <div>Loading: {loading ? "🔄 Yes" : "✅ No"}</div>
            <div>Status: {uploadStatus || "None"}</div>
            <div>Size: {resultImage?.length || "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
