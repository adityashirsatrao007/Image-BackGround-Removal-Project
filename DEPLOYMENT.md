# Deployment Setup Guide

## Step 1: GitHub Repository Setup

1. **Initialize Git Repository:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI Background Removal App by Aditya Shirsatrao"
   git branch -M main
   ```

2. **Create GitHub Repository:**

   - Go to GitHub.com and create a new repository
   - Name it something like `Image-Background-Removal`
   - Don't initialize with README (we already have one)

3. **Connect and Push:**
   ```bash
   git remote add origin https://github.com/adityashirsatrao007/Image-Background-Removal.git
   git push -u origin main
   ```

## Step 2: Render.com Deployment

### Prerequisites

Before deploying, make sure you have:

- [x] MongoDB Atlas database connection string
- [x] Clerk account with app configured
- [x] ClipDrop API key
- [x] JWT secret key

### Deployment Steps

1. **Go to Render.com:**

   - Sign up/login to [render.com](https://render.com)
   - Click "New Web Service"

2. **Connect Repository:**

   - Choose "Build and deploy from a Git repository"
   - Connect your GitHub account
   - Select your `Image-Background-Removal` repository

3. **Configure Service:**

   ```
   Name: bg-removal-app (or any name you prefer)
   Root Directory: (leave empty - use project root)
   Environment: Node
   Region: Choose your preferred region
   Branch: main
   Build Command: npm run build
   Start Command: npm run start
   ```

4. **Environment Variables:**
   Add these environment variables in Render dashboard:

   ```
   MONGODB_URI=mongodb+srv://adityashirsatrao007:929BTdepjiEafVZe@cluster0.hvd91hz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=super_secure_jwt_secret_123456789
   CLERK_WEBHOOK_SECRET=whsec_yvy+Z49TvPDuOuvNO/TwZRLubvuHIiMs
   CLIPDROP_API_KEY=c882313d9e9cc550b67c3753476002463fae833b8008cd65985cf63f65203161e45cf0c5a20afbe730733a9dccfec346
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete (usually 5-10 minutes)
   - Note your Render URL (something like `https://bg-removal-app.onrender.com`)

## Step 3: Configure Clerk Webhook

1. **Go to Clerk Dashboard:**

   - Navigate to your app in Clerk Dashboard
   - Go to "Webhooks" section

2. **Update Webhook Endpoint:**

   - Edit your existing webhook
   - Update the Endpoint URL to: `https://your-render-url.onrender.com/api/user/webhooks`
   - Make sure these events are selected:
     - `user.created`
     - `user.updated`
     - `user.deleted`

3. **Test Webhook:**
   - Use Clerk's webhook testing feature
   - Check Render logs to ensure webhooks are being received

## Step 4: Verification

1. **Check Deployment:**

   - Visit your Render URL
   - Should see the background removal app
   - Test user registration/login
   - Test image upload and background removal

2. **Monitor Logs:**
   - Check Render logs for any errors
   - Verify all environment variables are loaded correctly
   - Test API endpoints

## Environment Variables Details

### Required Environment Variables:

- **MONGODB_URI**: Your MongoDB Atlas connection string
- **JWT_SECRET**: Secret key for JWT tokens (generate a strong random string)
- **CLERK_WEBHOOK_SECRET**: Webhook secret from Clerk dashboard (starts with `whsec_`)
- **CLIPDROP_API_KEY**: API key from ClipDrop/Stability AI
- **NODE_ENV**: Set to `production` for production deployment
- **PORT**: Not needed - Render automatically assigns this

### Getting API Keys:

**MongoDB Atlas:**

1. Create account at mongodb.com
2. Create a cluster
3. Get connection string from "Connect" button

**Clerk:**

1. Create account at clerk.com
2. Create new application
3. Get webhook secret from Webhooks section

**ClipDrop:**

1. Create account at clipdrop.co
2. Navigate to API section
3. Generate API key

## Troubleshooting

**Common Issues:**

1. **Build fails**: Check Node.js version compatibility
2. **API errors**: Verify all environment variables are set correctly
3. **Webhook failures**: Ensure webhook URL is correct and accessible
4. **Image processing fails**: Verify ClipDrop API key is valid

**Debug Commands:**

```bash
# Check logs in Render dashboard
# Test API endpoints manually
curl https://your-render-url.onrender.com/api/user/webhooks
```

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Render service deployed successfully
- [ ] All environment variables configured
- [ ] Clerk webhook endpoint updated
- [ ] App loads correctly at Render URL
- [ ] User authentication works
- [ ] Background removal functionality works
- [ ] Logs show no errors

Your app should now be live at: `https://your-render-url.onrender.com`

Made with ❤️ by Aditya Shirsatrao
