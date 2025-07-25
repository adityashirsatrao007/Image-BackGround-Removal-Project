import "dotenv/config";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import { remove_bg_api_key } from "../secret.js";
import { successResponse } from "./responseController.js";

const removeBgImage = async (req, res, next) => {
  try {
    console.log("=== Background Removal Request ===");
    console.log("API Key check:", remove_bg_api_key ? "Present" : "Missing");
    console.log(
      "File info:",
      req.file
        ? {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
          }
        : "No file"
    );

    const { clerkId } = req.body;

    // Auto-create user if they don't exist
    let user = await userModel.findOne({ clerkId });
    if (!user) {
      console.log("Creating new user with clerkId:", clerkId);
      user = await userModel.create({
        clerkId: clerkId,
        email: `user_${clerkId}@temp.com`,
        firstName: "User",
        lastName: "",
        photo: "",
      });
    }

    if (!req.file) {
      throw new Error("No image file uploaded");
    }

    if (!remove_bg_api_key) {
      throw new Error("Remove.bg API key is not configured");
    }

    const imagePath = req.file.path;
    console.log("Processing image at:", imagePath);

    // Method 1: Try with file stream
    try {
      const formData = new FormData();
      formData.append("image_file", fs.createReadStream(imagePath));
      formData.append("size", "auto");

      console.log("Calling Remove.bg API with FormData...");
      const response = await axios({
        method: "post",
        url: "https://api.remove.bg/v1.0/removebg",
        data: formData,
        headers: {
          "X-Api-Key": remove_bg_api_key,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
        timeout: 30000, // 30 second timeout
      });

      if (response.data && response.data.length > 0) {
        console.log("Remove.bg success! Response size:", response.data.length);
        const base64Image = Buffer.from(response.data).toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Clean up uploaded file
        try {
          fs.unlinkSync(imagePath);
        } catch (err) {
          console.log("Could not delete temp file:", err.message);
        }

        return successResponse(res, {
          statusCode: 200,
          message: "Background removed successfully!",
          payload: {
            resultImage,
            message: "Powered by Remove.bg",
          },
        });
      }
    } catch (apiError) {
      console.error("Remove.bg API Error:", {
        status: apiError.response?.status,
        statusText: apiError.response?.statusText,
        data: apiError.response?.data
          ? apiError.response.data.toString()
          : "No data",
        message: apiError.message,
      });

      // Method 2: Try with base64 if file stream failed
      if (apiError.response?.status === 400) {
        console.log("Trying alternative method with base64...");

        try {
          const imageBuffer = fs.readFileSync(imagePath);
          const base64Image = imageBuffer.toString("base64");

          const formData2 = new FormData();
          formData2.append("image_file_b64", base64Image);
          formData2.append("size", "auto");

          const response2 = await axios({
            method: "post",
            url: "https://api.remove.bg/v1.0/removebg",
            data: formData2,
            headers: {
              "X-Api-Key": remove_bg_api_key,
              ...formData2.getHeaders(),
            },
            responseType: "arraybuffer",
            timeout: 30000,
          });

          if (response2.data && response2.data.length > 0) {
            console.log(
              "Remove.bg success with base64! Response size:",
              response2.data.length
            );
            const resultBase64 = Buffer.from(response2.data).toString("base64");
            const resultImage = `data:image/png;base64,${resultBase64}`;

            // Clean up uploaded file
            try {
              fs.unlinkSync(imagePath);
            } catch (err) {
              console.log("Could not delete temp file:", err.message);
            }

            return successResponse(res, {
              statusCode: 200,
              message: "Background removed successfully (base64 method)!",
              payload: {
                resultImage,
                message: "Powered by Remove.bg",
              },
            });
          }
        } catch (base64Error) {
          console.error("Base64 method also failed:", base64Error.message);
        }
      }

      // Method 3: Fallback - return original image with message
      console.log("All API methods failed, providing fallback response...");
      const originalBuffer = fs.readFileSync(imagePath);
      const originalBase64 = originalBuffer.toString("base64");
      const resultImage = `data:${req.file.mimetype};base64,${originalBase64}`;

      // Clean up uploaded file
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.log("Could not delete temp file:", err.message);
      }

      return successResponse(res, {
        statusCode: 200,
        message: "API temporarily unavailable - showing original image",
        payload: {
          resultImage,
          message: "Please try again later or check API configuration",
        },
      });
    }
  } catch (error) {
    console.error("=== Background Removal Error ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Clean up file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.log("Could not delete temp file on error:", err.message);
      }
    }

    next(error);
  }
};

export { removeBgImage };
