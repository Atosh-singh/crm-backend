const { User } = require("../../../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("role", "name permissions isActive")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "✅ Users fetched", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getAllUsers};
