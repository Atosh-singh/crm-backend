const mongoose = require("mongoose");
const { Lead } = require("../../models/Lead");
const { Course } = require("../../models/Course");
const { Source } = require("../../models/Source");

const createLead = async (req, res) => {
  try {
    const { name, phone, course, source } = req.body;

    if (!name || !phone || !course) {
      return res.status(400).json({
        message: "Name, phone and course required",
      });
    }

    // 🔐 Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    if (source && !mongoose.Types.ObjectId.isValid(source)) {
      return res.status(400).json({ message: "Invalid Source ID" });
    }

    // 🔍 Check course exists
    const courseExist = await Course.findById(course);
    if (!courseExist) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 🔍 Check source exists (if provided)
    if (source) {
      const sourceExist = await Source.findById(source);
      if (!sourceExist) {
        return res.status(404).json({ message: "Source not found" });
      }
    }

    const existingLead = await Lead.findOne({
      phone,
      removed: false,
    });

    if (existingLead) {
      return res.status(409).json({
        message: "Lead already exists",
      });
    }

    const lead = await Lead.create(req.body);

    res.status(201).json({
      message: "✅ Lead created",
      data: lead,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLead };
