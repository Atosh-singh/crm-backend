const { Role } = require("../../../models/Role");


const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

  const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await Role.findByIdAndDelete(id);

    return res.status(200).json({
      message: "✅ Role deleted successfully",
    });
    
    
 } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {deleteRole};