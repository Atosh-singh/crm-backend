const { Lead } = require("../../models/Lead");

const getLead = async (req, res) => {
  try {
    const { name, phone } = req.query;

    const filter = {
      removed: false,
      enabled: true,
    };

    // 🔍 Filter by name (case-insensitive)
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // 🔍 Filter by phone (partial search)
    if (phone) {
      filter.phone = { $regex: phone };
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: "✅ Leads fetched",
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLead };
