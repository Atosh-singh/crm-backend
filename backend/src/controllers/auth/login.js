const bcrypt = require("bcryptjs");
const { User } = require("../../models/User");
const { generateToken } = require("../../utils/Token/generateToken");

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "identifier (email/username) and password are required",
      });
    }

    const isEmail = identifier.includes("@");

    const user = await User.findOne(
      isEmail
        ? { email: identifier.toLowerCase() }
        : { username: identifier.toLowerCase() }
    )
      .select("+password")
      .populate("role", "name permissions isActive");

    if (!user) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    if (!user.enabled) {
      return res.status(403).json({ message: "User disabled by admin" });
    }

    if (user.status === "inactive") {
      return res.status(403).json({ message: "User is inactive" });
    }

    if (user.authProvider !== "local") {
      return res.status(400).json({
        message: `This account is registered using ${user.authProvider}. Please login with ${user.authProvider}.`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      message: "✅ Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role?.name,
        permissions: user.role?.permissions || [],
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
