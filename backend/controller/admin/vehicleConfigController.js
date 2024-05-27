const pool = require("../../config/db");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

// Adding a Car Image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${file.fieldname}_${new Date().getTime()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
});

// Create
const addVehicle = async (req, res) => {
  const car_images = req.files;
  const car_image = req.files[0];
  console.log(req.files);

  const { model, license_no, capacity, type, color, fare } = req.body;
  let countData;

  try {
    if (
      !car_images ||
      !model ||
      !license_no ||
      !capacity ||
      !type ||
      !color ||
      !fare
    ) {
      return res.status(200).json({
        status: 0,
        msg: "Please fill in all the fields in order to proceed!!!",
      });
    }
    
    const connect = await pool.getConnection();

    const countQuery = `SELECT COUNT(1) as count FROM cars WHERE license_no = '${license_no}'`;

    try {
      [countData] = await connect.execute(countQuery);
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        status: 0,
        msg: "Could not search for the required data!!!",
      });
    }

    if (countData[0].count > 0) {
      return res.status(200).json({
        status: 0,
        msg: "Data already present!!!",
      });
    }
    const insertQuery = `INSERT INTO cars (car_image,model,license_no,capacity,type,color,fare) VALUES (?,?,?,?,?,?,?)`;
    const values = [
      car_image,
      model,
      license_no,
      (capacity),
      type,
      color,
      (fare),
    ];

    let insertData;

    try {
      [insertData] = await connect.execute(insertQuery, values);

      car_images
        .filter((item, index) => index > 0)
        .map(async (image) => {
          const imageQuery = `INSERT INTO car_images (car_id,path) VALUES (?,?)`;
          const imageQueryValues = [insertData.insertId, image.filename];

          try {
            await connect.execute(imageQuery, imageQueryValues);
          } catch (err) {
            console.log(err);
            return res.status.json({
              status: 0,
              msg: "Could not insert the car image!!!",
            });
          }
        });
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        status: 0,
        msg: "Could not save the data!!!",
      });
    }

    connect.release();

    res.status(201).json({
      status: 1,
      msg: "Data added successfully!!",
      data: insertData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Sever Error!!!",
    });
  }
};

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

const getVehicleById= async(req, res)=>{
 const id = req.params.id;
 try {
  const connect = await pool.getConnection();
  const query =  `SELECT * FROM cars WHERE car_id = ${id} AND is_delete != 1` ;
   
  const [result] = await connect.execute(query);
  connect.release();
  if(result.length === 0){
    return res.status(200).json({
      status: 0,
      msg: "Could not fetch the required data!!!",
    });
  }
  res.status(200).json({
    status: 1,
    msg: "Data fetched successfully!!",
    data: result,
  });

 } catch (err) {
  console.log(err);
  res.status(500).json({
    status: 0,
    msg: "Server Error!!!",
  });
 }
}

// Update
const updateVehicle = async (req, res) => {
  const car_images = req.files;
  let car_image ;
  req.files.length && (car_image = req.files[0].filename);

  const { model, license_no, capacity, type, color, is_delete, fare } =
    req.body;
  const id = req.params.id;

  try {
    if (
      !car_images &&
      !model &&
      !license_no &&
      !capacity &&
      !type &&
      !color &&
      !fare &&
      !is_delete 
    ) {
      return res.status(200).json({
        status: 0,
        msg: "Please provide atleast one field in order to update",
      });
    }

    // const car_image = req.files[0].path;

    // const getQuery = `SELECT * FROM cars WHERE car_id = ${id}`;

    const connect = await pool.getConnection();

    // const [data] = await connect.execute(getQuery);

    // if (!data) {
    //   return res.status(400).json({
    //     status: 0,
    //     msg: "Could not fetch the required data!!!",
    //   });
    // }

    let update = "";

    model && (update += `model = '${model}',`);
    license_no && (update += `license_no = '${license_no}',`);
    capacity && (update += `capacity = '${(capacity)}',`);
    type && (update += `type = '${type}',`);
    color && (update += `color = '${color}',`);
    is_delete === 0 && (update += `is_delete = ${is_delete},`);
    car_image && (update += `car_image = '${car_image}',`);
    fare && (update += `fare = '${(fare)}',`);

    // if (
    //   data[0].car_image !== car_image ||
    //   data[0].model !== model ||
    //   data[0].license_no !== license_no ||
    //   data[0].capacity !== Number(capacity) ||
    //   data[0].type !== type ||
    //   data[0].color !== color ||
    //   data[0].fare !== fare ||
    //   data[0].is_delete !== is_delete
    // ) {
      
      const date = new Date().getTime();
      update += `modified_on = ${date},`;
    // } else {
    //   return res.status(400).json({
    //     status: 0,
    //     msg: "No data is updated since same data is provided!!!",
    //   });
    // }

    update = update.slice(0, -1);

    const updateQuery = `UPDATE cars SET ${update} WHERE car_id = ${id}`;
    // const updateQueryValues = [car_image];

    let updateData;

    try {
      [updateData] = await connect.execute(updateQuery);

      if (car_images.length > 1) {
        car_images
          .filter((item, index) => index > 0)
          .map(async (image) => {
            const date = new Date().getTime();
            const imageUpdateQuery = `UPDATE car_images SET path = ?, modified_on = ? WHERE car_id = ${id}`;
            const imageUpdateQueryValues = [image.filename, date];
            try {
              await connect.execute(imageUpdateQuery, imageUpdateQueryValues);
            } catch (err) {
              console.log(err);
              return res.status(200).json({
                status: 0,
                msg: "Could not update the car image!!!",
              });
            }
          });
      }
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        status: 0,
        msg: "Could not update the data!!!",
      });
    }

    connect.release();

    res.status(200).json({
      status: 1,
      msg: "Data updated successfully!!",
      data: updateData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};


// Delete
const deleteVehicle = async (req, res) => {
  const id = req.params.id;

  try {
    const connect = await pool.getConnection();

    const query = `SELECT COUNT(1) as count FROM cars WHERE car_id = ${id} AND is_delete = 1`;

    let countData;

    try {
      [countData] = await connect.execute(query);
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        status: 0,
        msg: "Could not search for the required data!!!",
      });
    }

    if (countData[0].count > 0) {
      return res.status(200).json({
        status: 0,
        msg: "Value is already set to 1!!!",
      });
    }

    const date = new Date().getTime();

    const deleteQuery = `UPDATE cars SET is_delete = 1,modified_on = ${date} WHERE car_id = ${id}`;

    try {
      await connect.execute(deleteQuery);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        status: 0,
        msg: "Could not delete the data!!!",
      });
    }

    connect.release();

    res.status(200).json({
      status: 1,
      msg: "Data deleted successfully!!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 0,
      msg: "Server Error!!!",
    });
  }
};

module.exports = {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicle,
  upload,
  getVehicleById,
};
