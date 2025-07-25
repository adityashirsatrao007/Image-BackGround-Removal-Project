import "dotenv/config";
import express from "express";
import xssClean from "xss-clean";
// import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import createHttpError from "http-errors";
import path from "path";
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
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use(morgan("dev"));
// app.use(reqLimit);
app.use(xssClean());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// Test route for non-production
if (process.env.NODE_ENV !== "production") {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Background Removal API Server Running" });
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
