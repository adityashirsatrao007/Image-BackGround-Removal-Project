import React, { useState } from "react";

const Toast = ({ message, type, onClose }) => {
  const bgColor =
    type === "error"
      ? "bg-red-500"
      : type === "success"
      ? "bg-green-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
  </div>
);

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We're sorry for the inconvenience. Please try again.
          </p>
          <button
            onClick={() => setHasError(false)}
            className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
          >
            Try Again
          </button>
        </div>
      )
    );
  }

  return children;
};

export { Toast, LoadingSpinner, ErrorBoundary };
