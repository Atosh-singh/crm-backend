require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// const seedRoles = require("./config/seedRoles");
// const seedAdmin = require("./config/seedAdmin");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  // ✅ seed roles + admin (only first time)
  // await seedRoles();
  // await seedAdmin();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
