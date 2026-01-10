const { Role } = require("../../../models/Role");

const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    if (!name) return res.status(400).json({ message: "Role name required" });

    const exist = await Role.findOne({ name: name.toLowerCase().trim() });
    if (exist) return res.status(409).json({ message: "Role already exists" });

    const role = await Role.create({
      name: name.toLowerCase().trim(),
      permissions: Array.isArray(permissions) ? permissions : [],
    });

    res.status(201).json({ message: "✅ Role created", data: role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createRole};
