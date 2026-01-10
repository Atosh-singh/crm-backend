const express = require("express");

const router = express.Router();

const {authenticate, isAdmin} = require('../middlewares')

const {
  createRole,
  getAllRoles,
  getSingleRole,
  updateRole,
  deleteRole,
} = require("../controllers/Roles/RolesCrud");



router.post("/", authenticate, isAdmin, createRole);
router.get("/", authenticate, isAdmin, getAllRoles);
router.get("/:id", authenticate, isAdmin, getSingleRole);
router.patch("/:id", authenticate, isAdmin, updateRole);
router.delete("/:id", authenticate, isAdmin, deleteRole);

module.exports = router;
