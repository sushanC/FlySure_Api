import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    paid: { type: Boolean, default: false },
    paymentScreenshot: { type: String }, // you can store file path or URL if needed
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
