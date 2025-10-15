import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true }, // ✅ added
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Feedback", feedbackSchema);
