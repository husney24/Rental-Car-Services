import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { apiCallFun } from "../../utils/fetchAPIs";
import { useDispatch, useSelector } from "react-redux";
import { inputChange } from "../../Helper/smallFun";
import { driverIdDeleteHandler } from "../../redux/slices/driverIdSlice";
import { useNavigate } from "react-router-dom";

function UpdateDriver() {
  // const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const driver_id = useSelector((state) => state.driverId.driver_id);
  console.log(driver_id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    license_no: "",
  });
  // const [filterData, setFilterData] = useState(null);

  const updateDriverHandler = async () => {
    const { name, email, license_no} = form;
    if (
      !name &&
      !email&&
      !license_no 
    ) {
      toast.warn("Make changes in atleast one field in order to update!!!!");
      return;
    }

    const response = await apiCallFun(
      "PATCH",
      `admin/updateDriver/${driver_id}`,
      form,
      token
    );

    if (response?.status) {
      toast.success(response?.msg);
      setForm({
        name: "",
        email: "",
        license_no: "",
      });
    } else {
      toast.warn(response?.msg);
    }
    dispatch(driverIdDeleteHandler());
    return navigate("/admin/drivers");
  };

  console.log(form);

  const getDriverDetails = async () => {
    const res = await apiCallFun(
      "GET",
      `admin/driverById/${driver_id}`,
      null,
      token
    );
    if (res?.status) {
      // toast.success(res.msg);
      setForm(res.data[0]);
      console.log(res.data);
    } else toast.warn(res.msg);
  };

  useEffect(() => {
    getDriverDetails();
  }, []);

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
              <li className="breadcrumb-item active">Update Driver</li>
            </ol>

            {form && (
              <div className="mb_100">
                <div className="row mb-4 align-items-end">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder=""
                        value={form?.name}
                        onChange={(e) => inputChange(e, form, setForm)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        email
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder=""
                        value={form?.email}
                        onChange={(e) => inputChange(e, form, setForm)}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="license_no" className="form-label">
                        license_no
                      </label>
                      <input
                        type="text"
                        name="license_no"
                        className="form-control"
                        id="license_no"
                        placeholder=""
                        value={form?.license_no}
                        onChange={(e) => inputChange(e, form, setForm)}
                        // onChange={(e) => setForm({...form, license_no: e.target.value})}
                      />
                    </div>
                  </div>

                  
                </div>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={updateDriverHandler}
                >
                  Update Driver
                </button>
              </div>
            )}
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

export default UpdateDriver;
