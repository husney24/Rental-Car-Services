const express = require("express");
const { getAllVehicle } = require("../../controller/user/getAllVehicle");
const { isToken, validateToken } = require("../../controller/common/auth");
const {
  userValidateToken,
} = require("../../controller/user/userValidateToken");
const route = express.Router();

// route.get("/getAllVehicle", isToken, validateToken, getAllVehicle);

route.get("/getAllVehicle", isToken, userValidateToken, getAllVehicle);
module.exports = route;
