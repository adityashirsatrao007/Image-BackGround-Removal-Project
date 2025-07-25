import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          What Our Users Say
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied users who trust our AI-powered background
          removal technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {testimonialsData.map((item, i) => (
          <div key={i} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
              <div className="flex items-start gap-1 mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L0 6.91l6.564-.955L10 0l3.436 5.955L20 6.91l-5.245 4.635L15.878 18z" />
                  </svg>
                ))}
              </div>

              <p className="text-4xl text-gray-300 mb-2 font-serif">"</p>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                {item.text}
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    src={item.image}
                    alt={`${item.author} profile`}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.author}</p>
                  <p className="text-sm text-gray-600">{item.jobTitle}</p>
                </div>
              </div>

              <div className="absolute top-4 right-4 text-gray-200">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-4c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-4c0-1.1.9-2 2-2V8z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-violet-600">1000+</p>
            <p className="text-sm text-gray-600">Happy Users</p>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">50k+</p>
            <p className="text-sm text-gray-600">Images Processed</p>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">99.9%</p>
            <p className="text-sm text-gray-600">Accuracy Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
