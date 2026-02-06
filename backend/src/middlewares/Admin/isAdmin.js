const isAdmin = (req, res, next) => {
  try {
    if (!req.user?.role) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (req.user.role.name !== "admin") {
      return res.status(403).json({ message: "Only admin can access" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Access denied" });
  }
};

module.exports = { isAdmin };
