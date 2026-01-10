const { Role } = require("../../../models/Role");

const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    await Role.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "✅ Role deleted permanently" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {deleteRole};
