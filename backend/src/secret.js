import dotenv from "dotenv";
import path from "path";

// Load .env from backend directory
dotenv.config({ path: path.join(process.cwd(), "backend", ".env") });
// Also try root directory as fallback
dotenv.config({ path: path.join(process.cwd(), ".env") });

const PORT = process.env.PORT || 5001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bg-removal";
const JWT_SECRET = process.env.JWT_SECRET;
const clerk_webhook_secret = process.env.CLERK_WEBHOOK_SECRET;
const remove_bg_api_key = process.env.REMOVE_BG_API_KEY;

console.log("Environment loaded:", {
  PORT,
  MONGODB_URI: MONGODB_URI ? "Present" : "Missing",
  clerk_webhook_secret: clerk_webhook_secret ? "Present" : "Missing",
  remove_bg_api_key: remove_bg_api_key ? "Present" : "Missing",
  JWT_SECRET: JWT_SECRET ? "Present" : "Missing",
});

export {
  PORT,
  MONGODB_URI as mongoAtlasURL,
  clerk_webhook_secret,
  remove_bg_api_key,
  JWT_SECRET,
};
