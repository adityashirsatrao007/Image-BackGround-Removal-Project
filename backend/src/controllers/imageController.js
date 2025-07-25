import "dotenv/config";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import { clipdrop_api_key } from "../secret.js";
import { successResponse } from "./responseController.js";

const removeBgImage = async (req, res, next) => {
  try {
    console.log("=== Background Removal Request ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("File:", req.file);
    
    const { clerkId } = req.body;
    const user = await userModel.findOne({ clerkId });

    if (!user) {
      console.error("User not found with clerkId:", clerkId);
      throw new Error("User not found with this clerkId");
    }

    console.log("User found:", user.email);

    // No credit check needed - app is completely free!

    const imagePath = req.file.path;
    console.log("Image path:", imagePath);
    
    const imageFile = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("image_file", imageFile);

    console.log("Calling ClipDrop API...");
    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formData,
      {
        headers: {
          "x-api-key": clipdrop_api_key,
        },
        responseType: "arraybuffer",
      }
    );

    if (!data) {
      console.error("ClipDrop API returned no data");
      throw new Error("ClipDrop API did not return image data.");
    }

    console.log("ClipDrop API success, data length:", data.length);

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // No credit deduction needed - app is free!

    return successResponse(res, {
      statusCode: 200,
      message: "Background removed successfully - Free service!",
      payload: {
        resultImage,
        message: "Unlimited free usage available!",
      },
    });
  } catch (error) {
    console.error("=== Background Removal Error ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    if (error.response) {
      console.error("ClipDrop API Error Status:", error.response.status);
      console.error("ClipDrop API Error Data:", error.response.data);
      console.error("ClipDrop API Error Headers:", error.response.headers);
    }
    
    if (error.code) {
      console.error("Error code:", error.code);
    }
    
    next(error);
  }
};

export { removeBgImage };
