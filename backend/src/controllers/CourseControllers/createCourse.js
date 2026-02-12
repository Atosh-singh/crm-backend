const { Course } = require("../../models/Course");

const createCourse = async (req, res) => {
  try {
    let { name } = req.body;

    // 1️⃣ Check if name exists
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Course name is required",
      });
    }

    // 2️⃣ Normalize name
    name = name.trim();

    // 3️⃣ Case-insensitive duplicate check
    const existingCourse = await Course.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
      removed: false,
    });

    if (existingCourse) {
      return res.status(409).json({
        message: "Course already exists",
      });
    }

    // 4️⃣ Create course
    const course = await Course.create({
      name,
    });

    res.status(201).json({
      message: "✅ Course created",
      data: course,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createCourse };
