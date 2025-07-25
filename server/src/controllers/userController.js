import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import { clerk_webhook_secret } from "../secret.js";
import { successResponse } from "./responseController.js";

// Endpoint: api/user/webhooks
const clerkWebhooks = async (req, res, next) => {
  try {
    console.log("Webhook received - Headers:", req.headers);
    console.log("Webhook received - Body:", req.body);
    console.log("Environment check:", {
      clerk_secret: clerk_webhook_secret ? "Present" : "Missing",
      node_env: process.env.NODE_ENV || "not set",
    });

    // For now, just respond OK to prevent crashes while we debug
    res.status(200).json({
      message: "Webhook received successfully",
      timestamp: new Date().toISOString(),
    });

    // Skip webhook verification temporarily to prevent crashes
    if (!clerk_webhook_secret) {
      console.error("CLERK_WEBHOOK_SECRET is missing - skipping verification");
      return;
    }

    // Only verify if we have the secret
    const whook = new Webhook(clerk_webhook_secret);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    console.log("Webhook verified successfully");
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url || data.profile_image_url,
        };

        await userModel.create(userData);
        return successResponse(res, {
          statusCode: 201,
          message: "User created successfully",
        });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url || data.profile_image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        return successResponse(res, {
          statusCode: 200,
          message: "User updated successfully",
        });
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        return successResponse(res, {
          statusCode: 200,
          message: "User deleted successfully",
        });
      }

      default:
        return successResponse(res, {
          statusCode: 200,
          message: "Webhook event received",
        });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Endpoint: api/user/credits
const userCredits = async (req, res, next) => {
  try {
    const { clerkId } = req.body;
    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Since app is free, return unlimited credits status
    return successResponse(res, {
      statusCode: 200,
      data: { credits: "unlimited" },
      message: "App is free - unlimited usage!",
    });
  } catch (error) {
    console.error("User credits error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { clerkWebhooks, userCredits };
