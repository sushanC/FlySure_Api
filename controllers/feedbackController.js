import Feedback from "../models/Feedback.js";

// 📨 Submit Feedback (User)
export const submitFeedback = async (req, res) => {
  try {
    console.log("Body Received:", req.body);
   const { name, course, message } = req.body;
   const feedback = await Feedback.create({ name, course, message });
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
};

// 👀 Get All Feedback (Admin Only)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
};
