const express = require("express");
const { login } = require("../../controller/common/auth");

const route = express.Router();

// login route for user,driver and admin

route.post("/login/:type", login);

module.exports = route;
