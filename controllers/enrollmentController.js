import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// ✅ Enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    // Create new enrollment
    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
      paid: false, // default
    });

    res.status(201).json(enrollment);
  } catch (err) {
    console.error("Enroll error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Mark payment done (after QR scan & manual confirmation)
export const confirmPayment = async (req, res) => {
  try {
    const { enrollmentId } = req.body;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.paid = true;
    const updated = await enrollment.save();

    res.json(updated);
  } catch (err) {
    console.error("Confirm payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get my enrolled courses
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate("course", "title description price"); // 👈 populate is key

    res.json(enrollments);
  } catch (err) {
    console.error("Get enrollments error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
