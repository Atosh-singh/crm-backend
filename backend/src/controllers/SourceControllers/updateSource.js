const { Source } = require("../../models/Source");

const updateSource = async (req, res) => {
  try {
    const { id } = req.params;
    let { name } = req.body;

    if (name) {
      name = name.trim().toLowerCase();

      const existing = await Source.findOne({
        name,
        removed: false,
      });

      if (existing && existing._id.toString() !== id) {
        return res.status(409).json({
          message: "Source already exists",
        });
      }
    }

    const source = await Source.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!source) {
      return res.status(404).json({
        message: "Source not found",
      });
    }

    res.status(200).json({
      message: "✅ Source updated",
      data: source,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateSource };
