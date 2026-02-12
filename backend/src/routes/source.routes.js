const express = require("express");
const router = express.Router();

const {
  createSource,
  getSources,
  updateSource,
  removeSource,
} = require("../controllers/SourceControllers/index");

// CREATE
router.post("/", createSource);

// READ
router.get("/", getSources);

// UPDATE
router.put("/:id", updateSource);

// SOFT DELETE
router.delete("/:id", removeSource);

module.exports = router;
console.log("createSource:", typeof createSource);
