import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";


dotenv.config();
connectDB();

const app = express();

// ✅ CORS configuration for deployed frontend

app.use(
  cors({
    origin: [
      "https://flysureacademy.com",       // ✅ Main domain
      "https://www.flysureacademy.com",   // ✅ www version
      "https://flysure-web.vercel.app",   // ✅ Vercel temp domain
      "http://localhost:5173"             // ✅ Local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);



app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Flysure Tuition Academy API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
