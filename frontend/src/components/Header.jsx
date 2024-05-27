import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutHandler } from "../redux/slices/loginSlice";




const Header = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top"
        id="mainNav"
      >
        <Link
          style={{ paddingLeft: "20px" }}
          className="navbar-brand"
          to="/"
        >
          LuxRide
        </Link>

        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="rounded navbar-nav navbar-sidenav" id="exampleAccordion">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                <i className="fa fa-fw fa-dashboard"></i>
                <span className="nav-link-text"> Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/bookings">
                <i className="fa fa-fw fa-table"></i>
                <span className="nav-link-text"> Bookings</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/cars">
                <i className="fa-solid fa-car-side"></i>
                <span className="nav-link-text"> Cars</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/drivers">
              <i className="fa-solid fa-car"></i>
                <span className="nav-link-text"> Drivers</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
              <i className="fa-solid fa-user"></i>
                <span className="nav-link-text"> Users</span>
              </Link>
            </li>
            <li className="nav-item">
              {/* <button
                className="nav-link"
                onClick={() => dispatch(logoutHandler())}
              >
                <i className="fa fa-fw fa-table"></i>
                <span className="nav-link-text">Logout</span>
              </button> */}
            </li>
          </ul>
        </div>
        
        <form className="form-inline my-2 my-lg-0 mr-lg-2 m-4">
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
                      
<div className="btn-group m-2">
  <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa-solid fa-user"></i>
  </button>
  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
    <li><a className="dropdown-item" href="/admin/profile"><i className="fa-solid fa-user"></i> Profile</a></li>
    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-headset"></i> Support</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
    <li><hr className="dropdown-divider"/></li>
    <li><a className="dropdown-item" onClick={() => { 
      dispatch(logoutHandler())
      return navigate ('/admin')
    }}> <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
  </ul>
</div>
      </nav>
    </>
  );
};

export default Header;
