const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🚀 Starting server...");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("CWD:", process.cwd());

const serverPath = path.join(process.cwd(), "server");

// Check if server directory exists
if (!fs.existsSync(serverPath)) {
  console.error("❌ Server directory not found:", serverPath);
  process.exit(1);
}

// Check if server package.json exists
const serverPackageJson = path.join(serverPath, "package.json");
if (!fs.existsSync(serverPackageJson)) {
  console.error("❌ Server package.json not found:", serverPackageJson);
  process.exit(1);
}

try {
  // Install server dependencies and start
  console.log("📦 Installing server dependencies...");
  console.log("Server path:", serverPath);
  
  execSync("npm install", { 
    stdio: "inherit", 
    cwd: serverPath,
    timeout: 300000 // 5 minutes timeout
  });

  console.log("🌟 Starting server...");
  console.log("Environment variables check:");
  console.log("- NODE_ENV:", process.env.NODE_ENV || "not set");
  console.log("- PORT:", process.env.PORT || "not set");
  console.log("- MONGODB_URI:", process.env.MONGODB_URI ? "set" : "not set");
  
  execSync("npm start", { 
    stdio: "inherit", 
    cwd: serverPath 
  });
} catch (error) {
  console.error("❌ Server start failed:", error.message);
  console.error("Error details:", error);
  process.exit(1);
}
