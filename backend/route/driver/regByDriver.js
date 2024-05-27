const express = require("express");
const { regByDriver } = require("../../controller/driver/regByDriver");
const { isToken, validateToken } = require("../../controller/common/auth");
const {
  driverValidateToken,
} = require("../../controller/driver/driverValidateToken");
const route = express.Router();


route.post("/regByDriver", isToken, driverValidateToken, regByDriver);
module.exports = route;
