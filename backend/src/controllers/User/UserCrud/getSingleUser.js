const { User } = require("../../../models/User");

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "role",
      "name permissions isActive"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "✅ User fetched", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getSingleUser};
