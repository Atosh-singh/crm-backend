const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const roleRoutes = require("./role.routes");
const leadRoutes= require("./lead.routes")

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/lead", leadRoutes)

module.exports = router;
