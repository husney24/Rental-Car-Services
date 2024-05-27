const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistraion = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        status: 0,
        msg: "Please fill in all the fields to proceed!!!",
      });
    }

    const connect = await pool.getConnection();

    const query = `SELECT COUNT(1) as count FROM users WHERE email = '${
      email ? email : "abc@gmail.com"
    }' OR phone = '${phone ? phone : "9999999999"}'`;

    let countData;

    try {
      [countData] = await connect.execute(query);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 0,
        msg: "Could not search for the required data!!!",
      });
    }

    if (countData[0].count > 0) {
      return res.status(400).json({
        status: 0,
        msg: "Your are already registered!!!",
      });
    }

    const enpassword = await bcrypt.hash(password.toString(), 10);

    const insertQuery = `INSERT INTO users (name,email,phone,password,role) VALUES('${name}','${email}','${phone}','${enpassword}',1)`;

    try {
      await connect.execute(insertQuery);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 0,
        msg: "Could not save the data!!!",
      });
    }

    connect.release();

    const token = await jwt.sign(
      { name: name, role: 1 },
      process.env.JWT_TOKEN
    );

    res.status(201).json({
      status: 1,
      msg: "Data saved successfully!!",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};

module.exports = { userRegistraion };
