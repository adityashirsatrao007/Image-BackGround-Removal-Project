# AI Image Background Removal

**A completely free AI-powered background removal app with modern authentication.**

## Features

- **Free Service:** Unlimited background removal - no payments required
- **AI Processing:** High-quality results with Remove.bg API
- **User Authentication:** Secure login/signup with Clerk
- **Modern UI:** Responsive design with Tailwind CSS
- **Instant Results:** Process images in seconds

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Clerk
- **AI Processing:** Remove.bg API
- **Deployment:** Render

## Deployment Commands for Render

**Build Command:**

```
npm run build
```

**Start Command:**

```
npm start
```

## Environment Variables

Set these in your Render dashboard:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `CLERK_WEBHOOK_SECRET` - Clerk webhook secret
- `REMOVE_BG_API_KEY` - Remove.bg API key
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `NODE_ENV=production`

## Quick Start

1. **Clone and install:**

```bash
git clone <your-repo-url>
cd Image-BackGround-Removal-Project
npm install
```

2. **Development:**

```bash
npm run dev
```

3. **Production:**

```bash
npm run build
npm start
```

---

Made with ❤️ by Aditya Shirsatrao
