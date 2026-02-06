const jwt = require("jsonwebtoken");
const { User } = require("../../models/User");

const authenticate = async (req, res, next) => {
  try {
    let token;

    // Authorization: Bearer <token>
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).populate("role");
    if (!user) {
      return res.status(401).json({ message: "User not found, unauthorized" });
    }

    if (!user.enabled) {
      return res.status(403).json({ message: "User disabled by admin" });
    }

    if (user.status === "inactive") {
      return res.status(403).json({ message: "User is inactive" });
    }

    req.user = user; // ✅ logged-in user attached
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
