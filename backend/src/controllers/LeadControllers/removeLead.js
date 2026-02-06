const { Lead } = require("../../models/Lead");

const removeLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, name } = req.query; // ✅ IMPORTANT CHANGE

    let filter = {
      removed: false,
      enabled: true,
    };

    // 🔹 Priority 1: ID
    if (id) {
      filter._id = id;
    }
    // 🔹 Priority 2: phone
    else if (phone) {
      filter.phone = phone;
    }
    // 🔹 Priority 3: name
    else if (name) {
      filter.name = { $regex: `^${name}$`, $options: "i" };
    } else {
      return res.status(400).json({
        message: "ID or phone or name is required",
      });
    }

    const lead = await Lead.findOneAndUpdate(
      filter,
      { removed: true },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
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
