const mongoose = require("mongoose");

const subcourseSchema = new mongoose.Schema(
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
      lowercase: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // ✅ Correct option
  }
);

// 🔥 Prevent duplicate subcourse inside same course
subcourseSchema.index(
  { name: 1, course: 1, removed: 1 },
  { unique: true }
);

// 🔥 Faster filtering by course
subcourseSchema.index({ course: 1 });

const Subcourse = mongoose.model("Subcourse", subcourseSchema);

module.exports = { Subcourse };
