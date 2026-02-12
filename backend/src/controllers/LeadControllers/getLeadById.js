const mongoose = require("mongoose");
const { Lead } = require("../../models/Lead");

const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Lead ID",
      });
    }

    const lead = await Lead.findOne({
      _id: id,
      removed: false,
    })
      .populate("course")
      .populate("source");

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "✅ Lead fetched",
      data: lead,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeadById };
