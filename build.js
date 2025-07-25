const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🚀 Starting enhanced build process...");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("CWD:", process.cwd());
console.log("Environment:", process.env.NODE_ENV || 'development');
console.log("Timestamp:", new Date().toISOString());

// Enhanced command execution with better error handling
function executeCommand(command, options = {}) {
  console.log(`\n▶️  Executing: ${command}`);
  try {
    const result = execSync(command, {
      stdio: "inherit",
      timeout: 600000, // 10 minutes timeout
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      env: { ...process.env, ...options.env },
      ...options
    });
    console.log(`✅ Command completed: ${command}`);
    return result;
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    console.error(`Exit code: ${error.status || 'unknown'}`);
    console.error(`Signal: ${error.signal || 'none'}`);
    console.error(`Error message: ${error.message}`);
    throw error;
  }
}

// Check if required directories exist
const clientPath = path.join(process.cwd(), "client");
const serverPath = path.join(process.cwd(), "server");

console.log("\n📁 Validating project structure...");
[
  { name: "client", path: clientPath },
  { name: "server", path: serverPath },
  { name: "package.json", path: path.join(process.cwd(), "package.json") }
].forEach(({ name, path: itemPath }) => {
  if (fs.existsSync(itemPath)) {
    console.log(`✅ ${name} found`);
  } else {
    console.error(`❌ ${name} not found at: ${itemPath}`);
    process.exit(1);
  }
});

try {
  // Clean npm cache first
  console.log("\n🧹 Cleaning npm cache...");
  try {
    executeCommand("npm cache clean --force");
  } catch (error) {
    console.warn("⚠️  Cache clean failed, continuing...");
  }

  // Install root dependencies with npm ci for faster, reliable builds
  console.log("\n📦 Installing root dependencies...");
  try {
    // Try npm ci first (faster and more reliable)
    executeCommand("npm ci", { cwd: process.cwd() });
  } catch (error) {
    console.warn("⚠️  npm ci failed, falling back to npm install...");
    executeCommand("npm install --no-package-lock", { cwd: process.cwd() });
  }

  // Build client
  console.log("\n🔨 Building client application...");
  console.log("Client path:", clientPath);
  
  // Check if client package.json exists
  const clientPackageJson = path.join(clientPath, "package.json");
  if (!fs.existsSync(clientPackageJson)) {
    console.error("❌ Client package.json not found:", clientPackageJson);
    process.exit(1);
  }

  // Read and validate client package.json
  try {
    const clientPkg = JSON.parse(fs.readFileSync(clientPackageJson, 'utf8'));
    console.log(`📄 Client package: ${clientPkg.name} v${clientPkg.version}`);
    console.log(`📄 Vite version: ${clientPkg.devDependencies?.vite || 'not specified'}`);
  } catch (error) {
    console.error("❌ Invalid client package.json:", error.message);
    process.exit(1);
  }

  // Clean client dependencies if they exist
  const clientNodeModules = path.join(clientPath, "node_modules");
  const clientPackageLock = path.join(clientPath, "package-lock.json");
  
  if (fs.existsSync(clientNodeModules)) {
    console.log("🧹 Removing existing client node_modules...");
    fs.rmSync(clientNodeModules, { recursive: true, force: true });
  }

  if (fs.existsSync(clientPackageLock)) {
    console.log("🧹 Removing existing client package-lock.json...");
    fs.unlinkSync(clientPackageLock);
  }

  console.log("📦 Installing client dependencies...");
  executeCommand("npm install --legacy-peer-deps --no-package-lock", { cwd: clientPath });

  // Verify Vite installation
  console.log("🔍 Verifying Vite installation...");
  try {
    executeCommand("npx vite --version", { cwd: clientPath });
  } catch (error) {
    console.error("❌ Vite verification failed, attempting to reinstall...");
    executeCommand("npm install vite@5.4.9 --save-dev --legacy-peer-deps", { cwd: clientPath });
  }

  // Remove existing dist directory
  const distPath = path.join(clientPath, "dist");
  if (fs.existsSync(distPath)) {
    console.log("🧹 Removing existing dist directory...");
    fs.rmSync(distPath, { recursive: true, force: true });
  }

  console.log("🏗️  Building client application...");
  executeCommand("npm run build", { 
    cwd: clientPath,
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });

  // Verify build output
  console.log("\n🔍 Verifying build output...");
  if (!fs.existsSync(distPath)) {
    console.error("❌ Client build failed - dist directory not created");
    process.exit(1);
  }

  const indexHtml = path.join(distPath, "index.html");
  if (!fs.existsSync(indexHtml)) {
    console.error("❌ Client build failed - index.html not created");
    process.exit(1);
  }

  // List build artifacts
  const distFiles = fs.readdirSync(distPath);
  console.log("📁 Build artifacts:", distFiles.join(", "));

  // Check file sizes
  const stats = fs.statSync(indexHtml);
  console.log(`📊 index.html size: ${Math.round(stats.size / 1024)}KB`);

  console.log("\n🎉 Build completed successfully!");
  console.log("📁 Build artifacts created in:", distPath);
  console.log("⏰ Build finished at:", new Date().toISOString());

} catch (error) {
  console.error("\n💥 Build failed!");
  console.error("❌ Error:", error.message);
  console.error("🔍 Error details:", {
    code: error.code,
    status: error.status,
    signal: error.signal,
    killed: error.killed,
    command: error.cmd
  });
  
  // Additional debugging info
  console.error("\n🐛 Debug information:");
  console.error("📁 Current directory:", process.cwd());
  console.error("🔧 Node version:", process.version);
  console.error("💻 Platform:", process.platform);
  console.error("🌍 Environment variables:");
  console.error("  NODE_ENV:", process.env.NODE_ENV);
  console.error("  PATH length:", process.env.PATH?.length || 'undefined');
  
  process.exit(1);
}
