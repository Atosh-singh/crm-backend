const { Course } = require("../../models/Course");

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!course)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json({
      message: "✅ Course updated",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {updateCourse}