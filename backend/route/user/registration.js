const express = require("express");
const { userRegistraion } = require("../../controller/user/registration");
const route = express.Router();

route.post("/registration", userRegistraion);

module.exports = route;
