# Image Background Removal App - Deployment Guide

**A free AI-powered background removal tool built with React + Vite and Node.js, featuring Clerk authentication.**

_Deployed Application:_ [Coming Soon - Render Deployment]

## Description

This app provides unlimited free background removal using AI technology. Built with the MERN stack (MongoDB, Express.js, React, Node.js) with Clerk authentication for user management and deployed on Render for reliable hosting.

## Features

- **Free Background Removal:** Unlimited AI-powered background removal using ClipDrop API
- **User Authentication:** Secure login/signup via Clerk
- **Modern UI:** Beautiful, responsive design with Tailwind CSS
- **Fast & Reliable:** Built with Vite for optimal performance
- **Real-time Processing:** Instant background removal with progress feedback

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Clerk
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Clerk
- **AI Processing:** ClipDrop API
- **Deployment:** Render

## Environment Variables

### Backend (.env in server folder):

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLIPDROP_API_KEY=your_clipdrop_api_key
NODE_ENV=production
PORT=5001
```

### Frontend (.env in client folder):

```
# No environment variables needed - uses dynamic API URL
```

## Local Setup Instructions

To get a local copy up and running on your machine, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/adityashirsatrao007/Image-Background-Removal.git
   cd Image-Background-Removal
   ```

2. **Backend Setup:**
   Navigate to the `server` directory, install dependencies, and configure environment variables.

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server/` folder with the environment variables listed above.

   Start the backend server:

   ```bash
   npm start
   ```

3. **Frontend Setup:**
   Navigate to the `client` directory, install dependencies, and start the development server.
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

After completing these steps, the application should be running locally on your machine.

## Deployment on Render

### Prerequisites:

- GitHub repository with your code
- MongoDB Atlas database
- Clerk account with webhook configured
- ClipDrop API account

### Steps:

1. **Push to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit - Background removal app"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourreponame.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Root Directory:** `server`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
     - **Environment:** Node
3. **Add Environment Variables:**
   In Render dashboard, add all the environment variables listed above.

4. **Update Clerk Webhook:**

   - Go to Clerk Dashboard
   - Navigate to Webhooks
   - Update endpoint URL to: `https://your-render-url.onrender.com/api/user/webhooks`

5. **Verify Deployment:**
   - Check logs in Render dashboard
   - Test the application functionality
   - Verify image upload and processing

## API Endpoints

- **POST** `/api/image/remove-bg` - Remove background from uploaded image
- **POST** `/api/user/webhooks` - Clerk webhook for user management
- **GET** `/api/user/credits` - Get user credits (returns unlimited for free app)

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions and API
│   │   └── Context/       # React context providers
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Custom middleware
│   │   └── config/        # Database configuration
│   └── package.json
└── README.md
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is licensed under the MIT License.

---

**Made by Aditya Shirsatrao** - [GitHub](https://github.com/adityashirsatrao007)
