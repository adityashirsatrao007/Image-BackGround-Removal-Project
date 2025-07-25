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
    let user = await userModel.findOne({ clerkId });

    if (!user) {
      console.log("User not found, creating new user with clerkId:", clerkId);
      // Auto-create user if they don't exist (fallback for webhook issues)
      user = await userModel.create({
        clerkId: clerkId,
        email: `user_${clerkId}@temp.com`, // Temporary email
        firstName: "User",
        lastName: "",
        photo: "",
      });
      console.log("User created successfully:", user.email);
    }

    console.log("User found/created:", user.email);

    // No credit check needed - app is completely free!

    const imagePath = req.file.path;
    console.log("Image path:", imagePath);

    const imageFile = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("image_file", imageFile);
    formData.append("size", "auto");

    console.log("Calling Remove.bg API...");
    const { data } = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          "X-Api-Key": clipdrop_api_key, // We'll reuse the same env var for now
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      }
    );

    if (!data) {
      console.error("Remove.bg API returned no data");
      throw new Error("Remove.bg API did not return image data.");
    }

    console.log("Remove.bg API success, data length:", data.length);

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
      console.error("Remove.bg API Error Status:", error.response.status);
      console.error("Remove.bg API Error Data:", error.response.data);
      console.error("Remove.bg API Error Headers:", error.response.headers);
    }

    if (error.code) {
      console.error("Error code:", error.code);
    }

    next(error);
  }
};

export { removeBgImage };
