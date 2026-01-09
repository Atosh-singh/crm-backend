const { Role } = require("../../../models/Role");

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, permissions, isActive } = req.body;

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // ✅ name update
    if (name) {
      role.name = name.toLowerCase().trim();
    }

    // ✅ permissions update
    if (permissions && Array.isArray(permissions)) {
      role.permissions = permissions;
    }

    // ✅ isActive update
    if (typeof isActive === "boolean") {
      role.isActive = isActive;
    }

    await role.save();

    return res.status(200).json({
      message: "✅ Role updated successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports= {updateRole}