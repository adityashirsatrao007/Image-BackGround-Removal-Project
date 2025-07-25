import app from "./app.js";
import connectDB from "./config/db.js";
import { PORT } from "./secret.js";

const startServer = async () => {
  try {
    console.log("Starting server...");
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected successfully");
    
    const port = PORT || process.env.PORT || 10000;
    
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`URL: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();
