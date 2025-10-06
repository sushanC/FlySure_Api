import Course from "../models/Course.js";

// Add new course
export const addCourse = async (req, res) => {
  const { title, description, duration, price, qrCodeURL } = req.body;
  const course = new Course({ title, description, duration, price, qrCodeURL });
  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

// Get all courses
export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// Get single course
export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) res.json(course);
  else res.status(404).json({ message: "Course not found" });
};

// Update course
export const updateCourse = async (req, res) => {
  const { title, description, duration, price, qrCodeURL } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = title || course.title;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.price = price || course.price;
    course.qrCodeURL = qrCodeURL || course.qrCodeURL;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (course) {
    await course.deleteOne();
    res.json({ message: "Course removed" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};
