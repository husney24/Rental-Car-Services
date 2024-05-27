const express = require("express");
const { getAllVehicle } = require("../../controller/user/getAllVehicle");
const { isToken, validateToken } = require("../../controller/common/auth");
const {
  driverValidateToken,
} = require("../../controller/driver/driverValidateToken");
const route = express.Router();


route.get("/getAllVehicle", isToken, driverValidateToken, getAllVehicle);
module.exports = route;
