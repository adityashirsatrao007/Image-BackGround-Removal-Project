import React, { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSlider = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="pb-10 md:py-20 mx-2 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          See the Difference in Quality
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Drag the slider to compare the original image with our AI-processed
          result. Notice how precisely our technology preserves details while
          removing the background.
        </p>
      </div>

      <div className="relative w-full max-w-4xl overflow-hidden mx-auto rounded-2xl shadow-2xl border border-gray-200">
        {/* Before Image */}
        <img
          src={assets.image_w_bg}
          style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }}
          alt="Original image with background"
          className="w-full h-full object-cover"
        />

        {/* After Image */}
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={assets.image_wo_bg}
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          alt="Processed image without background"
        />

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          Original
        </div>
        <div className="absolute top-4 right-4 bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          AI Processed
        </div>

        {/* Slider */}
        <div className="absolute top-1/2 left-0 w-full h-px transform -translate-y-1/2">
          <input
            className="slider absolute top-1/2 left-0 w-full h-full transform -translate-y-1/2 appearance-none bg-transparent cursor-ew-resize"
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={handleSlider}
          />
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-1 h-full bg-white shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-violet-600">
              <svg
                className="w-4 h-4 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">
          Drag the slider above to see the comparison
        </p>
        <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Before</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-violet-600 rounded-full"></div>
            <span className="text-sm text-gray-600">After</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BgSlider;
