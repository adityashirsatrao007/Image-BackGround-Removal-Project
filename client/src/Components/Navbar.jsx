import { useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <header className="flex items-center justify-between mx-4 py-4 lg:mx-44 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <Link
        to="/"
        className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
      >
        <img
          className="w-22 sm:w-44"
          src={assets.logo}
          alt="Image-BackGround-Removal Project logo"
        />
        <div className="hidden lg:block">
          <p className="text-sm font-semibold text-gray-800">
            Image-BackGround-Removal
          </p>
          <p className="text-xs text-gray-500">by Aditya Shirsatrao</p>
        </div>
      </Link>

      {isSignedIn ? (
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-xs sm:text-sm text-green-700 font-semibold">
              Free App - Unlimited Usage!
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <p className="text-gray-700 font-medium">Hi, {user.fullName}</p>
            <div className="w-px h-6 bg-gray-300"></div>
          </div>
          <div className="hover:scale-110 transition-transform duration-300">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-8 sm:py-3 text-sm font-medium rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get started{" "}
          <img
            className="w-3 sm:w-4 group-hover:translate-x-1 transition-transform"
            src={assets.arrow_icon}
            alt="arrow icon"
          />
        </button>
      )}
    </header>
  );
};

export default Navbar;
