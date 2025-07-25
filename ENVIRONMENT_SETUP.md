# Environment Setup Guide for Image-BackGround-Removal Project

## Overview

This guide will help you set up the environment variables for both the client and server applications. The project uses Clerk for authentication, Stripe for payments, and various API services for background removal.

## Client Environment Variables (.env)

Create a `.env` file in the `client` directory with the following variables:

```bash
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# Backend URL
VITE_BACKEND_URL=your_backend_url_here
```

### How to get Clerk keys:

1. **Sign up for Clerk**

   - Go to [Clerk.dev](https://clerk.dev)
   - Create an account and sign in
   - Create a new application

2. **Get your Publishable Key**

   - In your Clerk dashboard, go to "API Keys"
   - Copy the "Publishable key"
   - Replace `your_clerk_publishable_key_here` with this key

3. **Configure Authentication**
   - In Clerk dashboard, configure your authentication methods
   - Set up OAuth providers if needed (Google, GitHub, etc.)
   - Configure your application domains

### How to get Backend URL from Vercel:

#### For Development (Local Backend):

```bash
VITE_BACKEND_URL=http://localhost:4000
```

#### For Production (Vercel Deployed Backend):

1. **Deploy your server to Vercel**

   - In your project root, make sure you have a `vercel.json` in the server directory
   - Install Vercel CLI: `npm install -g vercel`
   - Navigate to server directory: `cd server`
   - Run: `vercel --prod`

2. **Get your Vercel URL**

   - After deployment, Vercel will provide a URL like: `https://your-project-name.vercel.app`
   - Or go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Find your deployed project
   - Copy the production domain URL

3. **Update your client .env**
   ```bash
   VITE_BACKEND_URL=https://your-project-name.vercel.app
   ```

#### Alternative: Use the existing deployed backend

If you want to use the backend that's already deployed:

```bash
VITE_BACKEND_URL=https://server-9eozwztsw-adityas-projects-7c01ad4a.vercel.app
```

**Note**: For development, use `http://localhost:4000`. For production, use your Vercel deployment URL.

## Server Environment Variables (.env)

Create a `.env` file in the `server` directory with the following variables:

```bash
# MongoDB Database
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Stripe Payment Processing
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Background Removal API
REMOVE_BG_API_KEY=your_remove_bg_api_key

# ClipDrop API (Alternative)
CLIPDROP_API_KEY=your_clipdrop_api_key

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Configuration
PORT=4000
NODE_ENV=development
```

### How to get required API keys:

#### MongoDB:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create an account and a new cluster
3. Get your connection string from "Connect" > "Connect your application"

#### Stripe:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your secret key from "Developers" > "API keys"
3. Set up webhooks for payment processing

#### Remove.bg API:

1. Go to [Remove.bg](https://www.remove.bg/api)
2. Sign up and get your API key
3. This is used for AI background removal

#### ClipDrop API (Alternative):

1. Go to [ClipDrop](https://clipdrop.co/apis)
2. Sign up and get your API key
3. Alternative service for background removal

## Environment Setup Steps

### Step 1: Client Environment

```bash
cd client
cp .env.example .env
# Edit .env with your actual values
```

### Step 2: Server Environment

```bash
cd server
cp .env.example .env
# Edit .env with your actual values
```

### Step 3: Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Step 4: Test Configuration

```bash
# Start the server
cd server
npm run dev

# Start the client (in another terminal)
cd client
npm run dev
```

## Vercel Deployment Guide

### Deploy Backend to Vercel:

1. **Prepare your server for Vercel**

   - Ensure you have a `vercel.json` file in your server directory:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "src/server.js"
       }
     ]
   }
   ```

2. **Install Vercel CLI and Deploy**

   ```bash
   # Install Vercel CLI globally
   npm install -g vercel

   # Navigate to your server directory
   cd server

   # Login to Vercel (first time only)
   vercel login

   # Deploy to production
   vercel --prod
   ```

3. **Set Environment Variables on Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your deployed project
   - Go to "Settings" → "Environment Variables"
   - Add all your server environment variables:
     - `MONGODB_URI`
     - `CLERK_WEBHOOK_SECRET`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
     - `REMOVE_BG_API_KEY` or `CLIPDROP_API_KEY`
     - `JWT_SECRET`

4. **Get Your Backend URL**
   - After deployment, Vercel provides a URL like: `https://your-project-name.vercel.app`
   - Copy this URL for your client's `VITE_BACKEND_URL`

### Deploy Frontend to Vercel:

1. **Deploy Client**

   ```bash
   # Navigate to client directory
   cd client

   # Deploy to production
   vercel --prod
   ```

2. **Set Client Environment Variables**
   - In Vercel Dashboard, go to your client project
   - Add environment variables:
     - `VITE_CLERK_PUBLISHABLE_KEY`
     - `VITE_BACKEND_URL` (your backend Vercel URL)

### Quick Deployment Commands:

```bash
# Deploy both frontend and backend
cd server && vercel --prod
cd ../client && vercel --prod
```

## Important Security Notes

1. **Never commit `.env` files to version control**
2. **Use different keys for development and production**
3. **Regularly rotate your API keys**
4. **Use environment-specific URLs**

## Development vs Production

### Development:

- Use test API keys where available
- Point to local backend URL
- Use development Stripe keys

### Production:

- Use production API keys
- Point to deployed backend URL
- Use production Stripe keys
- Enable webhook endpoints

## Troubleshooting

### Common Issues:

1. **Vercel Authentication Error**

   ```
   Error: The specified token is not valid. Use `vercel login` to generate a new token.
   ```

   **Solution:**

   ```bash
   # First, logout from Vercel
   vercel logout

   # Then login again
   vercel login

   # Follow the browser authentication process
   # After successful login, try deploying again
   vercel --prod
   ```

2. **Vercel Deployment Issues**

   - **Problem**: Project not deploying or build errors
   - **Solution**:
     - Ensure `vercel.json` exists in server directory
     - Check that all environment variables are set in Vercel dashboard
     - Verify your entry point file path in `vercel.json`

3. **Clerk Authentication Not Working**

   - Check if your publishable key is correct
   - Verify domain configuration in Clerk dashboard

4. **Stripe Payments Failing**

   - Ensure webhook endpoints are configured
   - Check if secret key has correct permissions

5. **Background Removal Not Working**

   - Verify API key for remove.bg or ClipDrop
   - Check API rate limits

6. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check network access in MongoDB Atlas

### Vercel CLI Common Commands:

```bash
# Check if you're logged in
vercel whoami

# Login to Vercel
vercel login

# Logout from Vercel
vercel logout

# Deploy to production
vercel --prod

# Deploy with specific project name
vercel --prod --name your-project-name

# Check deployment status
vercel list
```

## Support

For issues with this setup:

- Check the troubleshooting section above
- Review the official documentation for each service
- Contact the development team

---

**Developer:** Aditya Shirsatrao  
**Project:** Image-BackGround-Removal Project  
**Last Updated:** 2025
