const { User } = require("../../../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = (
      await User.find({ removed: false }).populate(
        "role",
        "name permissions isActive"
      )
    ).toSorted({ createdAt: -1 });

    return res.json({
      message: "✅ Users fetched successfully",
      total: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers };
