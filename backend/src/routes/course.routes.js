const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  updateCourse,
  removeCourse,
} = require("../controllers/CourseControllers");

// CREATE
router.post("/", createCourse);

// READ
router.get("/", getCourses);

// UPDATE
router.put("/:id", updateCourse);

// SOFT DELETE
router.delete("/:id", removeCourse);

module.exports = router;
