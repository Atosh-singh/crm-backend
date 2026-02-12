const { Course } = require("../../models/Course");

const getCourses = async (req, res) => {
  try {
    const { name } = req.query;

    let filter = {
      removed: false,
      enabled: true,
    };

    // 🔎 Search by name (case-insensitive)
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: "✅ Courses fetched",
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCourses };
