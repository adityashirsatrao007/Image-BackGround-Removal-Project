import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import api from "../lib/axios.js";
import { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider(props) {
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

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

      // Set loading states and show feedback
      setLoading(true);
      setUploadStatus("Uploading image...");
      setImage(image);
      setResultImage(false);
      // No navigation needed - staying on same page

      console.log("🔑 Getting auth token...");
      setUploadStatus("Authenticating...");
      const token = await getToken();
      console.log("✅ Token received:", token ? "Present" : "Missing");

      const formData = new FormData();
      image && formData.append("image", image);
      console.log("📦 FormData created with image");

      console.log("📡 Sending request to /image/remove-bg...");
      setUploadStatus("Removing background...");

      try {
        const response = await api.post("/image/remove-bg", formData, {
          headers: { token },
          timeout: 60000, // 60 second timeout
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        });

        const { data } = response;
        console.log("📥 Response received:", {
          success: data.success,
          messageExists: !!data.message,
          payloadExists: !!data.payload,
          resultImageExists: !!data.payload?.resultImage,
          resultImageLength: data.payload?.resultImage?.length,
        });

        if (data.success) {
          console.log("✅ Background removal successful!");
          setUploadStatus("Complete!");
          setResultImage(data.payload.resultImage);
          setLoading(false);
          // No credit handling needed - app is free!
        } else {
          console.log("❌ Server responded with failure:", data.message);
          setLoading(false);
          setUploadStatus("");
          alert("Something went wrong: " + (data.message || "Unknown error"));
        }
      } catch (requestError) {
        console.error("🚨 Request failed:", requestError);
        throw requestError;
      }
    } catch (error) {
      console.error("💥 Error in removeBG:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      setLoading(false);
      setUploadStatus("");
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
    loading,
    uploadStatus,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppContext };
export default AppContextProvider;
