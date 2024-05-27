import { useRef, useState } from "react";
import Header from "../../components/Header";
import { handleFileChange, inputChange } from "../../Helper/smallFun";
import { toast } from "react-toastify";
import { apiCallFun } from "../../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddCar() {


  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    // alert("jnjnk");
    const file = e.target.files[0].filename;
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
    // console.log('ghh');
  };

  const { token } = useSelector((state) => state.auth);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    car_image: "",
    model: "",
    license_no: "",
    capacity: "",
    type: "",
    color: "",
    fare: "",
  });

  const addCarHandler = async () => {
    const { car_image, model, license_no, capacity, type, color, fare } = form;
    if (
      car_image === "" ||
      model === "" ||
      license_no === "" ||
      capacity === "" ||
      type === "" ||
      color === "" ||
      fare === ""
    ) {
      toast.warn("Please enter all required fields!");
    }
    let data = new FormData();
    data.append("car_image", car_image);
    data.append("model", model);
    data.append("license_no", license_no);
    data.append("capacity", capacity);
    data.append("type", type);
    data.append("color", color);
    data.append("fare", fare);

    const res = await apiCallFun("POST", "admin/addVehicle", data, token);
    if (res.status) {
      toast.success("Vehicle added successfully!");
      setForm({
        car_image: "",
        model: "",
        license_no: "",
        capacity: "",
        type: "",
        color: "",
        fare: "",
      });
      inputRef.current.value = null;
    } else {
      toast.warn(res?.msg);
    }
    return navigate("/admin/cars");
  };

  return (
    <>
      <div className="fixed-nav sticky-footer bg-dark" id="page-top">
        <Header />
        <div className="content-wrapper">
          <div className="container-fluid">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Add Vehicle</li>
            </ol>
            <div className="mb_100">
              <div className="row mb-4 align-items-end">
                <div className="col-md-6">
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="text"
                      name="model"
                      className="form-control"
                      id="floatingInput"
                      placeholder=""
                      value={form?.model}
                      onChange={(e) => inputChange(e, form, setForm, null)}
                    />
                    <label htmlFor="floatingInput">Model</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="text"
                      name="license_no"
                      className="form-control"
                      id="floatingInput"
                      placeholder=""
                      value={form?.license_no}
                      onChange={(e) => inputChange(e, form, setForm, null)}
                    />
                    <label htmlFor="floatingInput">License No</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="text"
                      name="capacity"
                      className="form-control"
                      id="floatingInput"
                      placeholder=""
                      value={form?.capacity}
                      onChange={(e) => inputChange(e, form, setForm, null)}
                    />
                    <label htmlFor="floatingInput">Capacity</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="text"
                      name="type"
                      className="form-control"
                      id="floatingInput"
                      placeholder=""
                      value={form?.type}
                      onChange={(e) => inputChange(e, form, setForm, null)}
                    />
                    <label htmlFor="floatingInput">Type</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="text"
                      name="color"
                      className="form-control"
                      id="floatingInput"
                      placeholder=""
                      value={form?.color}
                      onChange={(e) => inputChange(e, form, setForm, null)}
                    />
                    <label htmlFor="floatingInput">Color</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="text"
                      name="fare"
                      className="form-control"
                      id="floatingInput"
                      placeholder=""
                      value={form?.fare}
                      onChange={(e) => inputChange(e, form, setForm, null)}
                    />
                    <label htmlFor="floatingInput">Fare</label>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="formFileMultiple" className="form-label">
                      Car Images
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      name="car_image"
                      ref={inputRef}
                      onChange={(e) => {
                        handleFileChange(e, form, setForm, null);
                        handleImageChange(e);
                      }}
                      
                      // onChange={(e) => handleFileChange(e, form, setForm), handleImageChange}

                      multiple
                      // id="imageUpload"
            accept="image/*"
            // onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>

              <div className="pre card">
              {/* <div className="card-body"> */}
                {image && (
            <div>
              <h4>Preview:</h4>
              <img src={image} alt="Preview" style={{ maxWidth: '50vh' }} />
              
            </div>
          )}
              {/* </div> */}
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={addCarHandler}
              >
                Add Vehicle
              </button>
            </div>
          </div>

          <footer className="sticky-footer">
            <div className="container">
              <div className="text-center">
                <small>Copyright © 2024</small>
              </div>
            </div>
          </footer>

          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fa fa-angle-up"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default AddCar;
