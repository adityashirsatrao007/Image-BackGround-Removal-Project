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
      if (!image) {
        throw new Error("No image file selected.");
      }
      if (!isSignedIn) {
        return openSignIn();
      }

      setImage(image);
      setResultImage(false);
      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
      image && formData.append("image", image);

      const { data } = await api.post("/image/remove-bg", formData, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setResultImage(data.payload.resultImage);
        // No credit handling needed - app is free!
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error in removeBG:", error);
      alert("Failed to remove background. Please try again.");
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
