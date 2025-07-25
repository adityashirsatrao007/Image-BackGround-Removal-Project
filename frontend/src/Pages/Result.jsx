import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";

const Result = () => {
  const { image, resultImage, removeBG, loading, uploadStatus } =
    useContext(AppContext);
  const [isDownloading, setIsDownloading] = useState(false);

  // Debug logging
  console.log("🔍 Result page state:", {
    hasImage: !!image,
    hasResultImage: !!resultImage,
    isLoading: loading,
    uploadStatus,
    resultImageLength: resultImage?.length,
  });

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Create a temporary link to download the image
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
    <div className="mx-4 my-8 lg:mx-44 min-h-[75vh]">
      <div className="bg-white rounded-2xl px-8 py-8 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          {loading ? (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Processing Your Image...
              </h1>
              <p className="text-gray-600 mb-4">
                {uploadStatus || "Please wait while we remove the background"}
              </p>
              <div className="flex justify-center items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
                <span className="text-violet-600 font-medium">
                  {uploadStatus}
                </span>
              </div>
            </>
          ) : resultImage ? (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Processing Complete!
              </h1>
              <p className="text-gray-600">
                Your image has been processed successfully. Compare the results
                below.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Upload Detected!
              </h1>
              <p className="text-gray-600">
                Your image is being prepared for processing...
              </p>
            </>
          )}
        </div>

        {/* Image Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Original Image */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-lg">
                Original Image
              </h3>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                Before
              </span>
            </div>
            <div className="relative group">
              <img
                className="w-full rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                src={image ? URL.createObjectURL(image) : ""}
                alt="Original image"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors duration-300"></div>
            </div>
            {image && (
              <div className="text-sm text-gray-500 text-center">
                {image.name} • {(image.size / 1024 / 1024).toFixed(2)} MB
              </div>
            )}
          </div>

          {/* Processed Image */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-lg">
                Background Removed
              </h3>
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-3 py-1 rounded-full text-sm">
                AI Processed
              </span>
            </div>

            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-gray-200 shadow-lg min-h-[300px] flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-violet-200 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 font-medium text-center">
                    {uploadStatus || "Processing..."}
                  </p>
                  <p className="text-gray-500 text-sm text-center mt-2">
                    This usually takes 5-10 seconds
                  </p>
                </div>
              ) : resultImage ? (
                <div className="relative group w-full h-full">
                  <img
                    src={resultImage}
                    alt="Background removed"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    ✓ Complete
                  </div>
                </div>
              ) : image ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">📤</span>
                  </div>
                  <p className="text-gray-600 font-medium text-center">
                    Image uploaded successfully!
                  </p>
                  <p className="text-gray-500 text-sm text-center mt-2">
                    Starting background removal...
                  </p>
                </div>
              ) : (
                <div className="text-gray-400 text-center p-8">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
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
                  <p>No image selected</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons - Always show for debugging */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Try Another Image */}
            <div>
              <input
                onChange={(e) => removeBG(e.target.files[0])}
                accept="image/*"
                type="file"
                id="image1"
                hidden
              />
              <label
                htmlFor="image1"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 border border-gray-300"
              >
                <img width={20} src={assets.upload_btn_icon} alt="upload btn" />
                <span className="font-medium">Try Another Image</span>
              </label>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading || !resultImage}
              className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 font-medium ${
                resultImage
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
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
                  <span>
                    {resultImage ? "Download Image" : "No Result Yet"}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Debug Info */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
            <strong>Debug Info:</strong>
            <br />• Image: {image ? "✅ Present" : "❌ Missing"}
            <br />• Result Image: {resultImage ? "✅ Present" : "❌ Missing"}
            <br />• Loading: {loading ? "🔄 Yes" : "✅ No"}
            <br />• Status: {uploadStatus || "None"}
            <br />• Result Length: {resultImage?.length || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
