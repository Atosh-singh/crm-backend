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

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);


userSchema.pre(/^find/, function (next) {
  this.where({ removed: false });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
