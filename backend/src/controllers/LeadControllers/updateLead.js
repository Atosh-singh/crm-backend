const { Lead } = require("../../models/Lead");

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, name } = req.body;

    let filter = {};

    // 🔹 Priority 1: Update by ID
    if (id) {
      filter._id = id;
    }
    // 🔹 Priority 2: Update by phone
    else if (phone) {
      filter.phone = phone;
    }
 
    else {
      return res.status(400).json({
        message: "ID or phone or name is required to update lead",
      });
    }

    const lead = await Lead.findOneAndUpdate(
      filter,
      req.body,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
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
