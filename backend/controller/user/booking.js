const Razorpay = require("razorpay");
const pool = require("../../config/db");

const fareCalculate = async (req, res) => {
  try {
    const { type, distance } = req.body;

    if (!type || !distance) {
      return res.status(400).json({
        status: 0,
        msg: "Please fill in the required fields in order to proceed!!!",
      });
    }

    const connect = await pool.getConnection();
    let data;
    const searchQuery = `SELECT * FROM cars WHERE type = '${type}'`;

    try {
      [data] = await connect.execute(searchQuery);
      connect.release();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 0,
        msg: "Could not fetch the required data!!!",
      });
    }

    const totalFare = data[0].fare * distance;

    res.status(200).json({
      status: 1,
      data: totalFare,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { fare } = req.body;
    if (!fare) {
      return res.status(400).json({
        status: 0,
        msg: "Please fill the required fields in order to proceed!!!",
      });
    }
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const orderId = await instance.orders.create({
      amount: fare * 100,
      currency: "INR",
      receipt: `receipt_no-${new Date().getTime()}`,
    });

    if (Object.keys(orderId).length === 0) {
      return res.status(400).json({
        status: 0,
        msg: "Order Id not available!!!",
      });
    }

    orderId.callBackUrl = "/user/callBackUrl";
    res.status(200).json({
      status: 1,
      msg: "Order creation successfull!!",
      data: orderId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};

const callBackUrl = async (res, req) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    res.redirect(
      `localhost:3000?razorpay_payment_id=${razorpay_payment_id}&razorpay_order_id=${razorpay_order_id}&razorpay_signature=${razorpay_signature}`
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};

const bookingDetails = async (req, res) => {
  try {
    const {
      pickUp,
      dropOff,
      distance,
      type,
      pickUpDate,
      pickUpTime,
      passengers,
      model,
      driverAge,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    if (
      !pickUp ||
      !dropOff ||
      !distance ||
      !type ||
      !pickUpDate ||
      !pickUpTime ||
      !passengers ||
      !model ||
      !driverAge ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        status: 0,
        msg: "Please fill in the required fields in order to proceed!!!",
      });
    }

    const connect = await pool.getConnection();
    let fare;

    try {
      const getQuery = `SELECT * FROM cars WHERE type = '${type}'`;
      const [data] = await connect.execute(getQuery);

      if (data.length === 0) {
        return res.status(400).json({
          status: 0,
          msg: "The selected type is not available!!!",
        });
      }

      fare = data[0].fare * distance;
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 0,
        msg: "DataBase Error!!!",
      });
    }
    const insertQuery = `INSERT INTO booking (user_id,pick_up,drop_off,distance,fare,type,pick_up_date,pick_up_time,passengers,model,driver_age,created_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    const insertValues = [
      req.decode.id,
      pickUp,
      dropOff,
      distance,
      fare,
      type,
      pickUpDate,
      pickUpTime,
      passengers,
      model,
      driverAge,
      req.decode.name,
    ];

    try {
      await connect.execute(insertQuery, insertValues);
      connect.release();
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 0,
        msg: "DataBase Error!!!",
      });
    }

    res.status(200).json({
      status: 1,
      msg: "Booking Successfull!!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};
module.exports = { fareCalculate, createOrder, callBackUrl, bookingDetails };
