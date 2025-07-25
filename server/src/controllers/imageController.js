import "dotenv/config";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import { clipdrop_api_key } from "../secret.js";
import { successResponse } from "./responseController.js";

const removeBgImage = async (req, res, next) => {
  try {
    const { clerkId } = req.body;
    const user = await userModel.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found with this clerkId");
    }

    // No credit check needed - app is completely free!

    const imagePath = req.file.path;
    const imageFile = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("image_file", imageFile);

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
      throw new Error("ClipDrop API did not return image data.");
    }

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
    console.error("Error removing background:", error.message);
    if (error.response) {
      console.error("ClipDrop API Error:", error.response.data);
    }
    next(error);
  }
};

export { removeBgImage };
