const mongoose = require("mongoose");
const { Lead } = require("../../models/Lead");

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Lead ID",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message: "✅ Lead updated",
      data: lead,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateLead };
