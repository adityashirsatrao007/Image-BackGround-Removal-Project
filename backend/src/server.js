import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import imageRouter from "./routes/imageRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
