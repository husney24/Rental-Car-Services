const express = require("express");
const route = express.Router();
const {
  driverRegistration,
  getAllDrivers,
  updateDriver,
  deleteDriver,
  getDriverById
} = require("../../controller/admin/driverRegistration");
const { isToken, validateToken } = require("../../controller/common/auth");
const {
  adminValidateToken,
} = require("../../controller/admin/adminValidateToken");

// route.get("/driverList", isToken, validateToken, getAllDrivers);
// route.post("/driverRegistration", isToken, validateToken, driverRegistration);
// route.patch("/updateDriver/:id",isToken,validateToken,updateDriver);
// route.delete("/updateDriver/:id",isToken,validateToken,deleteDriver);

route.get("/driverList", isToken, adminValidateToken, getAllDrivers);
route.get('/driverById/:id', isToken, adminValidateToken, getDriverById );

// route.get("/driverList", isToken, driverValidateToken, getAllDrivers);

route.post("/driverRegistration", isToken, adminValidateToken, driverRegistration);
route.patch("/updateDriver/:id", isToken, adminValidateToken, updateDriver);
route.delete("/deleteDriver/:id", isToken, adminValidateToken, deleteDriver);
module.exports = route;
