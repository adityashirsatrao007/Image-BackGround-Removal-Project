# AI Image Background Removal

**A powerful AI-powered background removal app with Clerk authentication.**

## Features

* **AI Background Removal:** Advanced image processing with ClipDrop API
* **User Authentication:** Secure login/signup with Clerk
* **Credit System:** Manage user credits for API usage
* **Modern UI:** Responsive design with Tailwind CSS

## Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Clerk
* **AI Processing:** ClipDrop API
* **Deployment:** Render

## Deployment Commands for Render

**Build Command:**
```
cd frontend && npm install && npm run build
```

**Start Command:**
```
cd backend && npm start
```

## Environment Variables

Set these in your Render dashboard:

- `MONGODB_URI` - MongoDB connection string  
- `JWT_SECRET` - JWT secret key
- `CLERK_WEBHOOK_SECRET` - Clerk webhook secret
- `CLIPDROP_API_KEY` - ClipDrop API key
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `NODE_ENV=production`

---

Made with ❤️ by Aditya Shirsatrao

