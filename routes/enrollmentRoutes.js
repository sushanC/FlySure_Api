import express from "express";
import {
  enrollCourse,
  confirmPayment,
  getMyEnrollments,
} from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, enrollCourse);
router.post("/confirm", protect, confirmPayment);
router.get("/my", protect, getMyEnrollments);

export default router;
