import "dotenv/config";
import express from "express";
import xssClean from "xss-clean";
// import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import createHttpError from "http-errors";
import path from "path";
import fs from "fs";
import { errorResponse } from "./controllers/responseController.js";
import userRouter from "./routes/userRoute.js";
import imageRouter from "./routes/imageRoute.js";

const app = express();
const __dirname = path.resolve();

// Trust proxies (required for rate limiting to work correctly)
app.set("trust proxy", 1);

// const reqLimit = rateLimit({
//   windowMs: 1 * 60 * 1000,
//   max: 300,
//   message: "Too many requests from this API, please try again after 1 minute",
//   keyGenerator: (req) => req.ip,
// });

// Middlewares
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? ["https://image-background-removal-project.onrender.com", "https://*.onrender.com"]
      : "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
// app.use(reqLimit);
app.use(xssClean());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Try different possible paths for the client dist folder
  const possiblePaths = [
    path.join(__dirname, "../../client/dist"),
    path.join(__dirname, "../client/dist"),
    path.join(process.cwd(), "client/dist"),
  ];

  let staticPath = null;

  // Use the first path that exists
  for (const testPath of possiblePaths) {
    try {
      if (fs.existsSync(testPath)) {
        staticPath = testPath;
        console.log(`Found static files at: ${staticPath}`);
        break;
      }
    } catch (e) {
      console.log(`Path ${testPath} not accessible:`, e.message);
    }
  }

  if (staticPath) {
    console.log(`Serving static files from: ${staticPath}`);
    app.use(express.static(staticPath));

    // Catch-all handler for React Router
    app.get("*", (req, res) => {
      // Don't serve index.html for API routes
      if (req.path.startsWith('/api/')) {
        return next();
      }
      
      const indexPath = path.join(staticPath, "index.html");
      if (fs.existsSync(indexPath)) {
        console.log(`Serving index.html from: ${indexPath}`);
        res.sendFile(indexPath);
      } else {
        console.error(`index.html not found at: ${indexPath}`);
        res.status(404).json({ error: "Frontend not found" });
      }
    });
  } else {
    console.error("No static files found! Frontend will not be served.");
    // Serve a simple message if frontend build is missing
    app.get("/", (req, res) => {
      res.status(200).json({ 
        message: "Background Removal API Server Running",
        error: "Frontend build not found - please check build process"
      });
    });
  }
} else {
  // Development mode
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Background Removal API Server Running (Development)" });
  });
}

// 404 Error handler (Route not found)
app.use((req, res, next) => {
  next(createHttpError(404, { message: "Route not found!" }));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  return errorResponse(res, {
    statusCode: err.status || 500,
    message: err.message,
  });
});

export default app;
