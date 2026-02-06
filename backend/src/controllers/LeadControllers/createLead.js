const { Lead } = require("../../models/Lead");

const createLead = async (req, res) => {
  try {
    const { name, phone, course, source } = req.body;

    if (!name || !phone || !course) {
      return res.status(400).json({ message: "Name, phone and course required" });
    }

    const exist = await Lead.findOne({ phone, removed: false });
    if (exist) {
      return res.status(409).json({ message: "Lead already exists" });
    }

    const lead = await Lead.create({
      name,
      phone,
      course,
      source,
      email: req.body.email || null,
      state: req.body.state || null,
      degree: req.body.degree || null,
      graduation: req.body.graduation || null,
      postGraduation: req.body.postGraduation || null,
      subCourse: req.body.subCourse || null,
    });

    res.status(201).json({
      message: "✅ Lead created",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLead };
