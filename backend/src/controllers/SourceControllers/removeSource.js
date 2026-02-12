const { Source } = require("../../models/Source");

const removeSource = async (req, res) => {
  try {
    const { id } = req.params;

    const source = await Source.findByIdAndUpdate(
      id,
      { removed: true },
      { new: true }
    );

    if (!source) {
      return res.status(404).json({
        message: "Source not found",
      });
    }

    res.status(200).json({
      message: "✅ Source removed",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { removeSource };
