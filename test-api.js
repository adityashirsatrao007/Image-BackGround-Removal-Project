// Test script to verify Remove.bg API
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

console.log("Testing Remove.bg API...");
console.log("API Key:", REMOVE_BG_API_KEY ? "Present" : "Missing");

// Test with a simple URL-based image
const testRemoveBg = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: {
        image_url:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        size: "auto",
      },
      headers: {
        "X-Api-Key": REMOVE_BG_API_KEY,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
      timeout: 30000,
    });

    console.log("✅ Remove.bg API is working!");
    console.log("Response size:", response.data.length, "bytes");
    return true;
  } catch (error) {
    console.error("❌ Remove.bg API Error:");
    console.error("Status:", error.response?.status);
    console.error(
      "Message:",
      error.response?.data ? error.response.data.toString() : error.message
    );
    return false;
  }
};

testRemoveBg();
