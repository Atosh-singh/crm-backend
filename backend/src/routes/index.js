const express = require("express");
const router = express.Router();


const roleRoutes = require("./role.routes");
const userRoutes = require("./user.routes");

router.use("/roles", roleRoutes);
router.use("/users", userRoutes);

module.exports = router;