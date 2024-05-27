const express = require("express");
const {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicle,
  upload,
  getVehicleById,
} = require("../../controller/admin/vehicleConfigController");
const { isToken, validateToken } = require("../../controller/common/auth");
const {
  adminValidateToken,
} = require("../../controller/admin/adminValidateToken");

const route = express.Router();

// route.get("/getAllVehicle", isToken, validateToken, getAllVehicle);
// route.post("/addVehicle", isToken, validateToken, addVehicle);
// route.patch("/updateVehicle/:id", isToken, validateToken, updateVehicle);
// route.delete("/deleteVehicle/:id", isToken, validateToken, deleteVehicle);

route.get("/getAllVehicle", isToken, adminValidateToken, getAllVehicle);
route.get("/getVehicle/:id", isToken, adminValidateToken, getVehicleById);


route.post(
  "/addVehicle",
  isToken,
  adminValidateToken,
  upload.array("car_image", 2),
  addVehicle
);
route.patch(
  "/updateVehicle/:id",
  isToken,
  adminValidateToken,
  upload.array("car_image", 2),
  updateVehicle
);
route.delete("/deleteVehicle/:id", isToken, adminValidateToken, deleteVehicle);
module.exports = route;
