const { Role } = require("../../../models/Role");

const getSingleRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.status(200).json({ message: "✅ Role fetched", data: role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getSingleRole};
