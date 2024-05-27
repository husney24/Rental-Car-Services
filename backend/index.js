const express = require("express");
require("dotenv").config();
const cors = require("cors");
const commonAuthRoute = require("./route/common/authRoute");
const adminVehicleRoute = require("./route/admin/vehicleConfigRoute");
const registrationRoute = require("./route/user/registration");
const getAllVehicleUserRoute = require("./route/user/getAllVehicle");
const getAllVehicleDriverRoute = require("./route/driver/getAllVehicle");
const adminDriverRegistrationRoute = require("./route/admin/driverRegistration");
const bookingRoute = require("./route/user/booking");
const { driverRegistration, getAllDrivers } = require("./controller/admin/driverRegistration");

const app = express();

app.use(express.json());
app.use("/images", express.static("images"));
app.use(cors("*"));

app.use(`${process.env.APP_VERSION}`, commonAuthRoute);

app.use(`${process.env.APP_VERSION}/user`, registrationRoute);
app.use(`${process.env.APP_VERSION}/user`, getAllVehicleUserRoute);
app.use(`${process.env.APP_VERSION}/user`, bookingRoute);

app.use(`${process.env.APP_VERSION}/driver`, getAllVehicleDriverRoute);
app.use(`${process.env.APP_VERSION}/driver`, driverRegistration);

app.use(`${process.env.APP_VERSION}/admin`, adminVehicleRoute);
app.use(`${process.env.APP_VERSION}/admin`, adminDriverRegistrationRoute);

app.use((req, res) => {
  res.status(404).json({
    status: 0,
    msg: "Page not found!!!",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
