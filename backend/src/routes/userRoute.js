import express from "express";
import { clerkWebhooks, userCredits } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Test endpoint
userRouter.get("/test", (req, res) => {
  res.status(200).json({
    message: "User routes working!",
    timestamp: new Date().toISOString(),
    env: {
      mongodb: process.env.MONGODB_URI ? "Present" : "Missing",
      clerk: process.env.CLERK_WEBHOOK_SECRET ? "Present" : "Missing",
      clipdrop: process.env.CLIPDROP_API_KEY ? "Present" : "Missing",
      jwt: process.env.JWT_SECRET ? "Present" : "Missing",
    },
  });
});

userRouter.post("/webhooks", clerkWebhooks);
userRouter.get("/credits", isAuthorized, userCredits);

export default userRouter;
