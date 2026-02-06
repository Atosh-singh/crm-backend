

const { createLead } = require("./createLead");
const { getLead } = require("./getLead");
const { getLeadById } = require("./getLeadById");
const { updateLead } = require('./updateLead')
const {removeLead} = require('./removeLead')

module.exports = {
  createLead,
  getLead,
  getLeadById,
  updateLead,
  removeLead
};
