const { User } = require("../../../models/User");

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, removed: false }).populate(
      "role",
      "name permissions isActive"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "✅ User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {getSingleUser};