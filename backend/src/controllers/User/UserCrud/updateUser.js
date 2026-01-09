const { User } = require("../../../models/User");
const { Role } = require("../../../models/Role");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, phone, roleId, enabled, status } = req.body;

    const user = await User.findById(id).select("+password"); // password optional
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ name update
    if (name) user.name = name.trim();

    // ✅ phone update
    if (phone) user.phone = phone.trim();

    // ✅ role update
    if (roleId) {
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(400).json({ message: "Invalid roleId" });
      }
      user.role = roleId;
    }

    // ✅ enabled update
    if (typeof enabled === "boolean") {
      user.enabled = enabled;
    }

    // ✅ status update
    if (status) {
      if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      user.status = status;
    }

    await user.save();

    return res.status(200).json({
      message: "✅ User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports={updateUser}