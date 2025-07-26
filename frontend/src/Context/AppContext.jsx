import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import api from "../lib/axios.js";
import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // App is now completely free - no need to load credits!

  const removeBG = async (image) => {
    try {
      console.log("🚀 Starting background removal...");
      console.log("Image file:", image);

      if (!image) {
        throw new Error("No image file selected.");
      }
      if (!isSignedIn) {
        console.log("❌ User not signed in");
        return openSignIn();
      }

      console.log("✅ User is signed in");
      setImage(image);
      setResultImage(false);
      navigate("/result");

      console.log("🔑 Getting auth token...");
      const token = await getToken();
      console.log("✅ Token received:", token ? "Present" : "Missing");

      const formData = new FormData();
      image && formData.append("image", image);
      console.log("📦 FormData created with image");

      console.log("📡 Sending request to /image/remove-bg...");
      const { data } = await api.post("/image/remove-bg", formData, {
        headers: { token },
      });

      console.log("📥 Response received:", data);

      if (data.success) {
        console.log("✅ Background removal successful!");
        setResultImage(data.payload.resultImage);
        // No credit handling needed - app is free!
      } else {
        console.log("❌ Server responded with failure:", data.message);
        alert("Something went wrong: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("💥 Error in removeBG:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      alert(
        "Failed to remove background. Please try again. Error: " + error.message
      );
    }
  };

  const value = {
    removeBG,
    image,
    resultImage,
    setResultImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
