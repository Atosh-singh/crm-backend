const isAdmin = (req, res, next) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role.name !== "admin") {
      return res.status(403).json({ message: "Only admin can access" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error in isAdmin" });
  }
};

module.exports = { isAdmin };
