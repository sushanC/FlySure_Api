import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({})
      .populate("enrolledCourses", "title description price") // ✅ safe now
      .select("-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

export default router;
