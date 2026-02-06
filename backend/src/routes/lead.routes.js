const express = require("express");
const router = express.Router();

const {
  createLead,
  getLead,
  getLeadById,
  updateLead,
  removeLead
} = require("../controllers/LeadControllers/index");

// CREATE
router.post("/", createLead);

// READ
router.get("/", getLead);
router.get("/:id", getLeadById);

// UPDATE (✅ static route FIRST)
router.put("/update/by-filter", updateLead);
router.put("/:id", updateLead);

// REMOVE (✅ static route FIRST)
router.delete("/remove/by-filter", removeLead); // by phone / name
router.delete("/remove/:id", removeLead);       // by ID

module.exports = router;
