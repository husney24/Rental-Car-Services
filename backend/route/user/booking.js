const express = require("express");
const route = express.Router();
const {
  fareCalculate,
  bookingDetails,
  createOrder,
  callBackUrl,
} = require("../../controller/user/booking");
const { isToken, validateToken } = require("../../controller/common/auth");

route.post("/fareCalculate", isToken, validateToken, fareCalculate);
route.post("/createOrder", isToken, validateToken, createOrder);
route.post("/callBackUrl", isToken, validateToken, callBackUrl);
route.post("/booking", isToken, validateToken, bookingDetails);

module.exports = route;
