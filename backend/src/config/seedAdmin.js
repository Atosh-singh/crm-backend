const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const { Role } = require("../models/Role");

const seedAdmin = async () => {
  try {
    // ✅ Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (adminExists) {
      console.log("ℹ️ Admin already exists");
      return;
    }

    // ✅ Get admin role
    const adminRole = await Role.findOne({ name: "admin" });

    if (!adminRole) {
      console.log("❌ Admin role not found. Run seedRoles first!");
      return;
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // ✅ Create admin user
    await User.create({
      name: "Super Admin",
      username: "admin",
      email: "admin@gmail.com",
      phone: "9999999999",
      password: hashedPassword,
      role: adminRole._id,
      status: "active",
    });

    console.log("✅ Admin user created successfully");
  } catch (error) {
    console.log("❌ Seed Admin Error:", error.message);
  }
};

module.exports = seedAdmin;
