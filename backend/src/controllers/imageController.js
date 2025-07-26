import "dotenv/config";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import { remove_bg_api_key } from "../secret.js";
import { successResponse } from "./responseController.js";

const removeBgImage = async (req, res, next) => {
  console.log("🚀 === Background Removal Request Started ===");

  try {
    // Step 1: Check API key
    console.log(
      "✅ Step 1: API Key check:",
      remove_bg_api_key ? "Present" : "Missing"
    );
    if (!remove_bg_api_key) {
      throw new Error("Remove.bg API key is not configured");
    }

    // Step 2: Check file upload
    console.log("✅ Step 2: File check:", req.file ? "Present" : "Missing");
    if (!req.file) {
      throw new Error("No image file uploaded");
    }
    console.log("File details:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    });

    // Step 3: Check authentication
    const clerkId = req.clerkId || req.body.clerkId;
    console.log("✅ Step 3: ClerkId:", clerkId);
    if (!clerkId) {
      throw new Error("User authentication required");
    }

    // Step 4: Handle user (simplified - no database dependency for testing)
    console.log("✅ Step 4: User handling - skipping DB for now");

    // Step 5: Process image with Remove.bg
    console.log("✅ Step 5: Starting Remove.bg API call...");
    const imagePath = req.file.path;

    const formData = new FormData();
    formData.append("image_file", fs.createReadStream(imagePath));
    formData.append("size", "auto");

    console.log("📡 Calling Remove.bg API...");
    const response = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      headers: {
        "X-Api-Key": remove_bg_api_key,
        ...formData.getHeaders(),
      },
      responseType: "arraybuffer",
      timeout: 30000,
    });

    console.log(
      "✅ Remove.bg API success! Response size:",
      response.data.length
    );
    const base64Image = Buffer.from(response.data).toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Clean up uploaded file
    try {
      fs.unlinkSync(imagePath);
      console.log("✅ Cleanup: Temporary file deleted");
    } catch (err) {
      console.log("⚠️ Cleanup warning:", err.message);
    }

    // Step 6: Send success response
    console.log("✅ Step 6: Sending success response");
    return res.status(200).json({
      success: true,
      message: "Background removed successfully!",
      payload: {
        resultImage,
        message: "Powered by Remove.bg",
      },
    });
  } catch (error) {
    console.error("💥 === Background Removal Error ===");
    console.error("Error message:", error.message);
    console.error("Error details:", {
      stack: error.stack,
      response: error.response?.data
        ? error.response.data.toString()
        : "No response data",
      status: error.response?.status,
    });

    // Clean up file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
        console.log("✅ Error cleanup: File deleted");
      } catch (err) {
        console.log("⚠️ Error cleanup failed:", err.message);
      }
    }

    // Send error response
    return res.status(500).json({
      success: false,
      message: error.message || "Background removal failed",
    });
  }
};

export { removeBgImage };
