const { execSync } = require("child_process");
const path = require("path");

console.log("🚀 Starting build process...");

try {
  // Install root dependencies
  console.log("📦 Installing root dependencies...");
  execSync("npm install", { stdio: "inherit", cwd: process.cwd() });

  // Build client
  console.log("🔨 Building client...");
  const clientPath = path.join(process.cwd(), "client");
  execSync("npm install", { stdio: "inherit", cwd: clientPath });
  execSync("npm run build", { stdio: "inherit", cwd: clientPath });

  console.log("✅ Build completed successfully!");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
