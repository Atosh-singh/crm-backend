const mongoose = require("mongoose");
const { Lead } = require("../../models/Lead");

const removeLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Lead ID",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { removed: true },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "✅ Lead soft deleted successfully",
      data: lead,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { removeLead };
