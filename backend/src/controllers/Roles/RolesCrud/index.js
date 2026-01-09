const { createRole } = require("./createRole");
const { getAllRoles } = require("./getAllRoles.js");
const { updateRole } = require("./updateRole.js");
const { getSingleRole } = require("./getSingleRole.js");
const { deleteRole } = require("./deleteRole.js");


module.exports = {
    createRole,
    getAllRoles,
    updateRole,
    getSingleRole,
    deleteRole
}