const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/Auth/authenticate");
const { authorize } = require("../middlewares/Auth/authorize");

const {
  createRole,
  getAllRoles,
  getSingleRole,
  updateRole,
  deleteRole,
} = require("../controllers/Roles/RolesCrud");

// ✅ Standard REST + RBAC
router.post("/", authenticate, authorize("role:create"), createRole);
router.get("/", authenticate, authorize("role:read"), getAllRoles);
router.get("/:id", authenticate, authorize("role:read"), getSingleRole);
router.put("/:id", authenticate, authorize("role:update"), updateRole);
router.delete("/:id", authenticate, authorize("role:delete"), deleteRole);

module.exports = router;
