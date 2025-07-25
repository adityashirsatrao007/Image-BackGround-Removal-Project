#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("=== DEBUG BUILD SCRIPT ===");
console.log("Node.js version:", process.version);
console.log("Platform:", process.platform);
console.log("Current working directory:", process.cwd());
console.log("Environment:", process.env.NODE_ENV);

// Check if we're in the right directory
const expectedFiles = ["package.json", "server", "client", "build.js"];
console.log("\n=== CHECKING PROJECT STRUCTURE ===");
expectedFiles.forEach((file) => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`${file}: ${exists ? "✓" : "✗"}`);
});

// Check package.json content
console.log("\n=== CHECKING ROOT PACKAGE.JSON ===");
try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  console.log("Name:", pkg.name);
  console.log("Scripts:", pkg.scripts);
} catch (error) {
  console.error("Error reading package.json:", error.message);
}

// Test npm install
console.log("\n=== TESTING NPM INSTALL ===");
try {
  execSync("npm --version", { stdio: "inherit" });
  console.log("Running npm install...");
  execSync("npm install", { stdio: "inherit", timeout: 300000 });
  console.log("✓ Root npm install successful");
} catch (error) {
  console.error("✗ Root npm install failed:", error.message);
  process.exit(1);
}

// Check client directory
console.log("\n=== CHECKING CLIENT DIRECTORY ===");
const clientDir = path.join(process.cwd(), "client");
if (fs.existsSync(clientDir)) {
  console.log("✓ Client directory exists");
  try {
    const clientPkg = JSON.parse(
      fs.readFileSync(path.join(clientDir, "package.json"), "utf8")
    );
    console.log("Client name:", clientPkg.name);
    console.log("Client scripts:", clientPkg.scripts);
    console.log(
      "Vite version:",
      clientPkg.devDependencies?.vite || "not found"
    );
  } catch (error) {
    console.error("Error reading client package.json:", error.message);
  }
} else {
  console.error("✗ Client directory not found");
  process.exit(1);
}

// Test client npm install
console.log("\n=== TESTING CLIENT NPM INSTALL ===");
try {
  process.chdir(clientDir);
  console.log("Changed to client directory:", process.cwd());
  execSync("npm install", { stdio: "inherit", timeout: 300000 });
  console.log("✓ Client npm install successful");
} catch (error) {
  console.error("✗ Client npm install failed:", error.message);
  process.exit(1);
}

// Test vite build
console.log("\n=== TESTING VITE BUILD ===");
try {
  execSync("npm run build", { stdio: "inherit", timeout: 300000 });
  console.log("✓ Vite build successful");

  // Check if dist folder was created
  const distDir = path.join(process.cwd(), "dist");
  if (fs.existsSync(distDir)) {
    console.log("✓ Dist folder created");
    const files = fs.readdirSync(distDir);
    console.log("Dist contents:", files);
  } else {
    console.error("✗ Dist folder not created");
  }
} catch (error) {
  console.error("✗ Vite build failed:", error.message);
  process.exit(1);
}

console.log("\n=== BUILD DEBUG COMPLETE ===");
console.log("All checks passed successfully!");
