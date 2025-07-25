const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🚀 Starting build process...");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("CWD:", process.cwd());

// Check if required directories exist
const clientPath = path.join(process.cwd(), "client");
if (!fs.existsSync(clientPath)) {
  console.error("❌ Client directory not found:", clientPath);
  process.exit(1);
}

try {
  // Install root dependencies
  console.log("📦 Installing root dependencies...");
  execSync("npm install", { 
    stdio: "inherit", 
    cwd: process.cwd(),
    timeout: 300000 // 5 minutes timeout
  });

  // Build client
  console.log("🔨 Building client...");
  console.log("Client path:", clientPath);
  
  // Check if client package.json exists
  const clientPackageJson = path.join(clientPath, "package.json");
  if (!fs.existsSync(clientPackageJson)) {
    console.error("❌ Client package.json not found:", clientPackageJson);
    process.exit(1);
  }

  console.log("Installing client dependencies...");
  execSync("npm install", { 
    stdio: "inherit", 
    cwd: clientPath,
    timeout: 300000 // 5 minutes timeout
  });

  console.log("Building client application...");
  execSync("npm run build", { 
    stdio: "inherit", 
    cwd: clientPath,
    timeout: 300000 // 5 minutes timeout
  });

  // Verify build output
  const distPath = path.join(clientPath, "dist");
  if (!fs.existsSync(distPath)) {
    console.error("❌ Client build failed - dist directory not created");
    process.exit(1);
  }

  const indexHtml = path.join(distPath, "index.html");
  if (!fs.existsSync(indexHtml)) {
    console.error("❌ Client build failed - index.html not created");
    process.exit(1);
  }

  console.log("✅ Build completed successfully!");
  console.log("📁 Build artifacts created in:", distPath);
} catch (error) {
  console.error("❌ Build failed:", error.message);
  console.error("Error details:", error);
  process.exit(1);
}
