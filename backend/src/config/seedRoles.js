const { Role } = require("../models/Role");

const seedRoles = async () => {
  const rolesWithPermissions = [
    {
      name: "admin",
      permissions: [
        "role:create",
        "role:read",
        "role:update",
        "role:delete",

        "user:create",
        "user:read",
        "user:update",
        "user:delete",
      ],
      isActive: true,
    },
    {
      name: "manager",
      permissions: ["user:read", "lead:create", "lead:read", "lead:update"],
      isActive: true,
    },
    {
      name: "subadmin",
      permissions: ["lead:create", "lead:read", "lead:update"],
      isActive: true,
    },
    {
      name: "user",
      permissions: ["lead:read"],
      isActive: true,
    },
  ];

  for (const roleObj of rolesWithPermissions) {
    const exists = await Role.findOne({ name: roleObj.name });

    if (!exists) {
      await Role.create(roleObj);
      console.log(`✅ Role created: ${roleObj.name}`);
    } else {
      console.log(`ℹ️ Role already exists: ${roleObj.name}`);
    }
  }
};

module.exports = seedRoles;
