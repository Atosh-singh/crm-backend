const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
     removed: {
      type: Boolean,
      default: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },

    name: { type: String, required: true, trim: true, minlength: 2 },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: { type: String, trim: true, default: "" },

    password: {
      type: String,
      minlength: 6,
      select: false,
      default: null, // ✅ local login me controller set karega
    },

    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },

    status: { type: String, enum: ["active", "inactive"], default: "active" },

    lastLogin: { type: Date, default: null },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
