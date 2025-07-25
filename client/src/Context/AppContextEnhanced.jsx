import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import api from "../lib/axios.js";
import { useNavigate } from "react-router-dom";
import { createContext, useState, useCallback } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // Toast helper function
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  }, []);

  // Error helper function
  const handleError = useCallback(
    (error, userMessage = "Something went wrong") => {
      console.error("App Error:", error);
      setError(error.message || userMessage);
      showToast(userMessage, "error");
    },
    [showToast]
  );

  const loadCreditsData = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();

      const { data } = await api.get("/user/credits", {
        headers: { token: token, "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setCredit(data.payload);
      } else {
        throw new Error(data.message || "Failed to load credits");
      }
    } catch (error) {
      handleError(error, "Failed to load credits. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeBG = async (image) => {
    try {
      if (!image) {
        throw new Error("No image file selected.");
      }
      if (!isSignedIn) {
        return openSignIn();
      }

      setIsLoading(true);
      setImage(image);
      setResultImage(false);
      setError(null);
      navigate("/result");

      showToast("Processing your image...", "info");

      const token = await getToken();
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await api.post("/image/remove-bg", formData, {
        headers: { token, "Content-Type": "multipart/form-data" },
        timeout: 30000, // 30 second timeout
      });

      if (data.success) {
        setResultImage(data.payload.resultImage);
        if (data.payload.creditBalance !== undefined) {
          setCredit(data.payload.creditBalance);
        }
        showToast("Background removed successfully!", "success");
      } else {
        throw new Error(data.message || "Failed to remove background");
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        handleError(
          error,
          "Request timed out. Please try again with a smaller image."
        );
      } else if (error.response?.status === 402) {
        handleError(
          error,
          "Insufficient credits. Please purchase more credits."
        );
        navigate("/buy-credits");
      } else {
        handleError(error, "Failed to remove background. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    setCredit,
    credit,
    loadCreditsData,
    removeBG,
    image,
    resultImage,
    setResultImage,
    isLoading,
    error,
    clearError,
    toast,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
