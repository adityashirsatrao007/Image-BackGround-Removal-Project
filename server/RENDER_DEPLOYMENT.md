# Render Deployment Configuration

## Server Configuration:

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18+ (Latest LTS)
- **Environment**: Node.js

## Environment Variables to Set in Render:

```
MONGODB_URI=mongodb+srv://adityashirsatrao007:929BTdepjiEafVZe@cluster0.hvd91hz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
CLERK_WEBHOOK_SECRET=whsec_yvy+Z49TvPDuOuvNO/TwZRLubvuHIiMs
CLIPDROP_API_KEY=c882313d9e9cc550b67c3753476002463fae833b8008cd65985cf63f65203161e45cf0c5a20afbe730733a9dccfec346
JWT_SECRET=super_secure_jwt_secret_123456789
NODE_ENV=production
PORT=10000
```

## Deployment Steps:

1. Push code to GitHub
2. Connect Render to your GitHub repository
3. Add environment variables
4. Deploy
