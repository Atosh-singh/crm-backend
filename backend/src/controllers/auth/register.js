const bcrypt = require("bcryptjs");
const { User } = require("../../models/User");
const { Role } = require("../../models/Role");

const register = async (req, res) => {
  try {
    const { name, username, email, phone, password } = req.body;

    // ✅ basic fields check
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "name, username, email, password are required",
      });
    }

    // ✅ if password missing (extra safety)
    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const emailExist = await User.findOne({ email: email.toLowerCase() });
    if (emailExist) return res.status(409).json({ message: "Email already exists" });

    const usernameExist = await User.findOne({ username: username.toLowerCase() });
    if (usernameExist) return res.status(409).json({ message: "Username already exists" });

    const userRole = await Role.findOne({ name: "user" });
    if (!userRole) {
      return res.status(500).json({
        message: "Default role 'user' not found. Please seed roles first.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      phone: phone || "",
      password: hashedPassword, // ✅ controller handles password
      role: userRole._id,
      authProvider: "local",
    });

    return res.status(201).json({
      message: "✅ User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register };
