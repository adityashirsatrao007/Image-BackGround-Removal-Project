import React from "react";
import { assets, plans } from "../assets/assets";
import { useAuth } from "@clerk/clerk-react";
import api from "../lib/axios.js";

const BuyCredit = () => {
  const { getToken } = useAuth();

  const handlePurchase = async (planId) => {
    try {
      const token = await getToken();

      const { data } = await api.post(
        "/user/pay",
        { planId },
        { headers: { token } }
      );
      if (!data.success) {
        alert(
          "You have enough credits. You have to login with another account to get credits."
        );
      }

      if (data.success && data.session_url) {
        // Redirect to the Stripe checkout page
        window.location.href = data.session_url;
      } else {
        alert("Error processing payment. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Flexible Pricing Plans
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Choose Your Perfect Plan
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your needs. All plans include
            high-quality background removal with our advanced AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((item, i) => (
            <div
              key={i}
              className={`relative group ${
                item.id === "Advanced"
                  ? "bg-gradient-to-b from-violet-50 to-fuchsia-50 border-2 border-violet-200 scale-105"
                  : "bg-white border border-gray-200"
              } rounded-2xl p-8 text-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
            >
              {item.id === "Advanced" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <img
                  width={48}
                  src={assets.logo_icon}
                  alt="logo icon"
                  className="opacity-80"
                />
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.id === "Basic"
                      ? "bg-green-100"
                      : item.id === "Advanced"
                      ? "bg-violet-100"
                      : "bg-blue-100"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      item.id === "Basic"
                        ? "text-green-600"
                        : item.id === "Advanced"
                        ? "text-violet-600"
                        : "text-blue-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.id}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    ${item.price}
                  </span>
                  <span className="text-gray-600">
                    / {item.credits} credits
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  ${(item.price / item.credits).toFixed(2)} per credit
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">
                    High-quality background removal
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">
                    PNG download format
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">
                    AI-powered precision
                  </span>
                </div>
                {item.id !== "Basic" && (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">
                      Priority processing
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePurchase(item.id)}
                className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                  item.id === "Advanced"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-800 hover:bg-gray-900 text-white"
                }`}
              >
                {item.id === "Advanced" ? "Get Started" : "Purchase Plan"}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">30-Day</p>
              <p className="text-sm text-gray-600">Money Back Guarantee</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">24/7</p>
              <p className="text-sm text-gray-600">Customer Support</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">Secure</p>
              <p className="text-sm text-gray-600">Payment Processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredit;
