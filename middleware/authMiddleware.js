// 📄 middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔑 Protect routes middleware
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// 👑 Admin-only middleware
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};
export const verifyAdmin = (req, res, next) => {
  // Assuming req.user is set after JWT auth
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

