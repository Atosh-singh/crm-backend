const express = require('express');

const router = express.Router();

const { createRole, getAllRoles, getSingleRole, updateRole, deleteRole} =  require('../controllers/Roles/RolesCrud');

router.post("/", createRole);
router.get("/", getAllRoles);
router.get("/:id", getSingleRole);
router.patch("/:id", updateRole);
router.delete("/:id",deleteRole);


module.exports= router;