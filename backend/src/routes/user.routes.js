const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/Auth/authenticate");
const { authorize } = require("../middlewares/Auth/authorize");

const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/User/UserCrud");

// ✅ Standard REST + RBAC
router.post("/", authenticate, authorize("user:create"), createUser);
router.get("/", authenticate, authorize("user:read"), getAllUsers);
router.get("/:id", authenticate, authorize("user:read"), getSingleUser);
router.put("/:id", authenticate, authorize("user:update"), updateUser);
router.delete("/:id", authenticate, authorize("user:delete"), deleteUser);

module.exports = router;
