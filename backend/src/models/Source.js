const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },

    removed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Source = mongoose.model("Source", sourceSchema);

module.exports = {
    Source
}
