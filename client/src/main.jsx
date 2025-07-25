import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import AppContextProvider from "./Context/AppContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Fallback for missing environment variables
if (!PUBLISHABLE_KEY) {
  console.warn("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
} else {
  createRoot(rootElement).render(
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY || "pk_test_placeholder"}
        afterSignOutUrl="/"
        afterSignInUrl="/"
      >
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ClerkProvider>
    </BrowserRouter>
  );
}
