
const {authorize}= require("./Auth/authorize");
const {authenticate}= require("./Auth/authenticate");
const {isAdmin} = require('./Admin/isAdmin')


module.exports = {
  authenticate,
  authorize,
  isAdmin,
};