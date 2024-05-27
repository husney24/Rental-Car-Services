import Header from "../../components/Header";
import { Link, useNavigate,  } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { apiCallFun } from "../../utils/fetchAPIs";
import { useDispatch, useSelector,  } from "react-redux";
import { toast } from "react-toastify";
import {driverIdSetHandler} from '../../redux/slices/driverIdSlice';


export default function Driver() {

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [isDelete, setIsDelete ] = useState(false);
  const dispatch = useDispatch();



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const d = await apiCallFun("GET", "admin/driverList", null, token);
    if (d.status) {
      setData(d.data);
    } else {
      toast.warn(d.msg);
    }
  };
  console.log(getData);

  const handleDelete  = async (item)=>{
    const res = await apiCallFun("DELETE", "admin/driverList/" + item.driver_id, null, token); 
    setIsDelete(!isDelete);
    if (res?.status)
    {
      toast.success(res.msg);
    }else{
      toast.warn(res.msg);
    }
  }

  const handleEdit = (item) => {
    dispatch(driverIdSetHandler(item.driver_id));
    navigate(`/admin/driver/update/${item.driver_id}`);
};

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
<div className="fixed-nav sticky-footer bg-dark" id="page-top">

<Header />
<div className="content-wrapper">
  <div className="container-fluid">

    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/admin">Dashboard</Link>
      </li>
      <li className="breadcrumb-item active">Driver</li>
    </ol>

    <div className="card mb-3 overflow">  
      <div className="card-header">
        <Link to={"/admin/driver/add"} className="btn btn-primary">
          Add New &nbsp; <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
        <form className="form-inline my-2 my-lg-0 mr-lg-2">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
            />
            <span className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead className="text-center">
              <tr>
              <th>Driver id</th>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Password</th> */}
                <th>license_no</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data &&
                data.map((item, i) => (
                  <Fragment key={i}>
                    <tr>
                      <td>{item?.driver_id}</td>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      {/* <td>{item?.password}</td> */}
                      <td>{item?.license_no}</td>
                      <td>

                        <button onClick={() =>handleEdit(item)} type="button" className="btn btn-success">
                          <i className="fa fa-pencil"></i>
                        </button>
                        {/* onClick={() =>handleEdit(item)} */}
<br /><br />
                        <button  onClick={() =>handleDelete(item)} type="button" className="btn btn-danger">
                          <i className="fa fa-trash"></i>
                        </button>
                        {/* onClick={() =>handleDelete(item)}   */}
                        

                      </td>
                    </tr>
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer small text-muted">
        Updated yesterday at 11:59 PM
      </div>
    </div>
  </div>

  <footer className="sticky-footer">
    <div className="container">
      <div className="text-center">
        <small>Copyright © Husney</small>
      </div>
    </div>
  </footer>
</div>
</div>
    </>
  )
}

