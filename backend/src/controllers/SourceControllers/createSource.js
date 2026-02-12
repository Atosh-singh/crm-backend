const { Source } = require("../../models/Source");

const createSource = async (req, res) => {
  try {
    let { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Source name is required",
      });
    }

    name = name.trim().toLowerCase();

    const existing = await Source.findOne({
      name,
      removed: false,
    });

    if (existing) {
      return res.status(409).json({
        message: "Source already exists",
      });
    }

    const source = await Source.create({ name });

    res.status(201).json({
      message: "✅ Source created",
      data: source,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSource };
