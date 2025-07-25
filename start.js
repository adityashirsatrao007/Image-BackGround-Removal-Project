const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting server...');

try {
  // Install server dependencies and start
  console.log('📦 Installing server dependencies...');
  const serverPath = path.join(process.cwd(), 'server');
  execSync('npm install', { stdio: 'inherit', cwd: serverPath });
  
  console.log('🌟 Starting server...');
  execSync('npm start', { stdio: 'inherit', cwd: serverPath });
} catch (error) {
  console.error('❌ Server start failed:', error.message);
  process.exit(1);
}
