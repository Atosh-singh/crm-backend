const { Source } = require("../../models/Source");

const getSources = async (req, res) => {
  try {
    const { name } = req.query;

    let filter = {
      removed: false,
      enabled: true,
    };

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const sources = await Source.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: "✅ Sources fetched",
      count: sources.length,
      data: sources,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSources };
