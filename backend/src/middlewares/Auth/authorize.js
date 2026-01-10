const authorize = (permission) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const permissions = req.user.role.permissions || [];

      if (!permissions.includes(permission)) {
        return res.status(403).json({
          message: "Access denied (permission required)",
          required: permission,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error in authorize" });
    }
  };
};

module.exports = { authorize };
