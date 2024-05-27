const pool = require("../../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { resSend } = require("../../utils/resSend");

const login = async (req, res) => {
  const { email, phone, password } = req.body;
  const type = req.params.type;

  try {
    const connect = await pool.getConnection();

    const query = `SELECT * FROM users WHERE email = '${
      email ? email : "abc@gmail.com"
    }' OR phone = '${phone ? phone : "9999999999"}'`;

    const [data] = await connect.execute(query);

    connect.release();

    if (data.length === 0) {
      return resSend(
        res,
        200,
        false,
        "No such email or phonenumber exists!!!",
        null,
        null
      );
    }

    console.log(data[0].password, password);

    const check = await bcrypt.compare(password, data[0].password);

    if (!check) {
      return res.status(200).json({
        status: 0,
        msg: "The entered password is incorrect!!!",
      });
    }

    if (type === "admin" && data[0].role !== 3) {
      return res.status(200).json({
        status: 0,
        msg: "You are not registered as an admin!!!",
      });
    }

    if (type === "driver" && data[0].role !== 2) {
      return res.status(200).json({
        status: 0,
        msg: "You are not registered as a driver!!!",
      });
    }
    if (type === "user" && data[0].role !== 1) {
      return res.status(200).json({
        status: 0,
        msg: "You are not a registered user!!!",
      });
    }

    const token = jwt.sign(
      { name: data[0].name, role: data[0].role, id: data[0].user_id },
      process.env.JWT_TOKEN
    );

    // res.status(200).json({
    //   status: 1,
    //   msg: "Authentication Successfull!!",
    //   token: token,
    // });
    resSend(res, 200, true, "Authentication Successfull!!", data, token);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};

const isToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    res.status(400).json({
      status: 0,
      msg: "Please login to proceed!!!",
    });
  } else {
    next();
  }
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const path = req.originalUrl;
    let decode;

    try {
      decode = await jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 0,
        msg: "Invalid Token",
      });
    }
    if (
      path.startsWith(`${process.env.APP_VERSION}/user`) &&
      (decode.role === 1 || decode.role === 3)
    ) {
      req.decode = decode;
      return next();
    } else if (
      path.startsWith(`${process.env.APP_VERSION}/driver`) &&
      (decode.role === 2 || decode.role === 3)
    ) {
      req.decode = decode;
      return next();
    } else if (
      path.startsWith(`${process.env.APP_VERSION}/admin`) &&
      decode.role === 3
    ) {
      req.decode = decode;
      return next();
    } else {
      return res.status(400).json({
        status: 0,
        msg: "Your are not authorized to access this route!!!",
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
module.exports = { login, isToken, validateToken };
