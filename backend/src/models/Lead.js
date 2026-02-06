const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
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
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    degree: {
      type: String,
      enum: ["UG", "PG", "Diploma"],
    },
    graduation: String,
    postGraduation: String,
    course: String,
    subCourse: String,

    course: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Course",
},
 
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Source"
    },

    
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = { Lead }; // ✅ FIXED
