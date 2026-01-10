const { User } = require("../../../models/User");
const { Role } = require("../../../models/Role");

const updateUser = async (req, res) => {
  try {
    const { name, phone, roleId, enabled, status } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (phone) user.phone = phone;

    if (roleId) {
      const role = await Role.findById(roleId);
      if (!role) return res.status(400).json({ message: "Invalid roleId" });
      user.role = roleId;
    }

    if (typeof enabled === "boolean") user.enabled = enabled;
    if (status) user.status = status;

    await user.save();

    res.status(200).json({ message: "✅ User updated", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {updateUser};
