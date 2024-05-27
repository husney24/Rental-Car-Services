const jwt = require("jsonwebtoken");
require("dotenv").config();

const driverValidateToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    let decode;

    try {
      decode = await jwt.verify(token, process.env.JWT_TOKEN);
      if (decode.role !== 2 && decode.role !== 3) {
        return res.status(400).json({
          status: 0,
          msg: "Your are not registered as a driver!!!",
        });
      }
      req.decode = decode;
      return next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 0,
        msg: "Invalid Token",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};

module.exports = { driverValidateToken };
