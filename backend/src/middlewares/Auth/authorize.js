const authorize = (permissionKey) => {
  return (req, res, next) => {
    try {
      const role = req.user?.role;

      if (!role || role.isActive === false) {
        return res.status(403).json({ message: "Role missing/inactive" });
      }

      // ✅ optional: admin has full access
      if (role.name === "admin") return next();

      const permissions = role.permissions || [];

      if (!permissions.includes(permissionKey)) {
        return res.status(403).json({
          message: `Permission denied: ${permissionKey}`,
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: "Permission check failed" });
    }
  };
};

module.exports = { authorize };
