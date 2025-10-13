// routes/feedbackRoutes.js
import express from "express";
import Feedback from "../models/Feedback.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST feedback (any logged-in user can submit)
router.post("/", async (req, res) => {
  try {
    const { name, course, message } = req.body;
    const feedback = await Feedback.create({ name, course, message });
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all feedbacks (admin only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
