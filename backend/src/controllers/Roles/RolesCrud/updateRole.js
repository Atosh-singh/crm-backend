const { Role } = require("../../../models/Role");

const updateRole = async (req, res) => {
  try {
    const { name, permissions, isActive } = req.body;

    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    if (name) role.name = name.toLowerCase().trim();
    if (Array.isArray(permissions)) role.permissions = permissions;
    if (typeof isActive === "boolean") role.isActive = isActive;

    await role.save();
    res.status(200).json({ message: "✅ Role updated", data: role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {updateRole};
