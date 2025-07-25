const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🚀 Starting enhanced production server...");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("CWD:", process.cwd());
console.log("Timestamp:", new Date().toISOString());

// Enhanced command execution
function executeCommand(command, options = {}) {
  console.log(`\n▶️  Executing: ${command}`);
  try {
    const result = execSync(command, {
      stdio: "inherit",
      timeout: 300000, // 5 minutes timeout
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

// Environment validation
console.log("\n🔍 Validating environment...");
const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET", 
  "CLERK_WEBHOOK_SECRET",
  "CLIPDROP_API_KEY"
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  console.error("\n💡 Make sure these are set in your Render dashboard:");
  console.error("   Dashboard → Environment → Add Environment Variable");
  process.exit(1);
}

console.log("✅ All required environment variables are present");
console.log("🌍 Environment variables summary:");
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  const display = value?.length > 20 ? `${value.substring(0, 20)}...` : value;
  console.log(`   ${varName}: ${display}`);
});

// Additional environment info
console.log(`\n📊 Additional environment info:`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   PORT: ${process.env.PORT || 'not set (will use default)'}`);
console.log(`   RENDER: ${process.env.RENDER || 'not set'}`);

const serverPath = path.join(process.cwd(), "server");

// Validate server directory
console.log(`\n📁 Validating server directory: ${serverPath}`);

if (!fs.existsSync(serverPath)) {
  console.error("❌ Server directory not found:", serverPath);
  process.exit(1);
}

const serverPackageJson = path.join(serverPath, "package.json");
if (!fs.existsSync(serverPackageJson)) {
  console.error("❌ Server package.json not found:", serverPackageJson);
  process.exit(1);
}

// Validate client build exists
const clientDistPath = path.join(process.cwd(), "client", "dist");
console.log(`\n🔍 Checking client build: ${clientDistPath}`);

if (!fs.existsSync(clientDistPath)) {
  console.error("❌ Client build not found. Run build first!");
  console.error("   Expected location:", clientDistPath);
  process.exit(1);
}

const indexHtml = path.join(clientDistPath, "index.html");
if (!fs.existsSync(indexHtml)) {
  console.error("❌ Client index.html not found in build!");
  console.error("   Expected location:", indexHtml);
  process.exit(1);
}

console.log("✅ Client build verified");

try {
  // Ensure server dependencies are installed
  console.log("\n📦 Installing server dependencies...");
  executeCommand("npm install --production", { cwd: serverPath });

  // Validate server entry point
  const serverEntry = path.join(serverPath, "src", "server.js");
  if (!fs.existsSync(serverEntry)) {
    console.error("❌ Server entry point not found:", serverEntry);
    process.exit(1);
  }

  console.log("✅ Server setup validated");

  // Start the server
  console.log("\n🌟 Starting production server...");
  console.log("📡 Server will be available on:", `http://localhost:${process.env.PORT || 10000}`);
  console.log("🚀 Starting server process...");
  
  executeCommand("npm start", { 
    cwd: serverPath,
    env: {
      NODE_ENV: 'production',
      ...process.env
    }
  });

} catch (error) {
  console.error("\n💥 Server startup failed!");
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
  console.error("📁 Server directory:", serverPath);
  console.error("🔧 Node version:", process.version);
  console.error("💻 Platform:", process.platform);
  console.error("🌍 Environment:");
  console.error("  NODE_ENV:", process.env.NODE_ENV);
  console.error("  PORT:", process.env.PORT);
  
  process.exit(1);
}
