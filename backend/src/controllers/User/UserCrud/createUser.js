const { User } = require("../../../models/User");
const { Role } = require("../../../models/Role");

const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, roleId } = req.body;

    if (!name || !email || !password || !roleId) {
      return res.status(400).json({
        message: "name, email, password, roleId are required",
      });
    }

    // ✅ check duplicate email
    const userExist = await User.findOne({ email: email.toLowerCase() });
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    // ✅ validate role
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: "Invalid roleId" });
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password, // ✅ hashing later (auth module)
      role: roleId,
    });

    return res.status(201).json({
      message: "✅ User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {createUser};
