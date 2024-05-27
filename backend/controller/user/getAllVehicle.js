const pool = require("../../config/db");

// Read
const getAllVehicle = async (req, res) => {
  try {
    const connect = await pool.getConnection();

    const getQuery = `SELECT * FROM cars WHERE is_delete != 1`;

    const [data] = await connect.execute(getQuery);

    connect.release();

    if (!data) {
      return res.status(400).json({
        status: 0,
        msg: "Could not fetch the required data!!!",
      });
    }
    res.status(200).json({
      status: 1,
      msg: "Data fetched successfully!!",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};

module.exports = { getAllVehicle };
