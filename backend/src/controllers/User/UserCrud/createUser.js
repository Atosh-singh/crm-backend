const bcrypt = require("bcryptjs");
const { User } = require("../../../models/User");
const { Role } = require("../../../models/Role");

const createUser = async (req, res) => {
  try {
    const { name, username, email, phone, password, roleId } = req.body;

    if (!name || !username || !email || !password || !roleId) {
      return res.status(400).json({
        message: "name, username, email, password, roleId are required",
      });
    }

    const emailExist = await User.findOne({ email: email.toLowerCase() });
    if (emailExist) return res.status(409).json({ message: "Email already exists" });

    const usernameExist = await User.findOne({ username: username.toLowerCase() });
    if (usernameExist) return res.status(409).json({ message: "Username already exists" });

    const role = await Role.findById(roleId);
    if (!role) return res.status(400).json({ message: "Invalid roleId" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role: roleId,
      authProvider: "local",
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
