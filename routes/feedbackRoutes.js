import express from "express";
import { submitFeedback, getAllFeedback } from "../controllers/feedbackController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📝 User Feedback (Public or Logged-In Users)
router.post("/", submitFeedback);

// 🔒 Admin Dashboard - See all feedback
router.get("/", protect, adminOnly, getAllFeedback);

export default router;
