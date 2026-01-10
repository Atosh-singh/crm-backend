const express = require("express");
const router = express.Router();


const roleRoutes = require("./role.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes")

router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;