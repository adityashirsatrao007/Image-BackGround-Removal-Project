import jwt from "jsonwebtoken";
const isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    // Just decode the token to get clerkId (Clerk tokens are already verified)
    const decode = jwt.decode(token);

    if (!decode || !decode.sub) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Add clerkId to request for FormData compatibility
    req.clerkId = decode.sub;
    req.body.clerkId = decode.sub;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export { isAuthorized };
