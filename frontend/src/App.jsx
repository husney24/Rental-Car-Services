import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/admin/Login";
import AddCar from "./pages/admin/AddCar";
import UpdateCars from "./pages/admin/UpdateCars";
import Updatedriver from "./pages/admin/UpdateDriver";
import Dashboard from "./pages/admin/Dashboard";
import { useSelector } from "react-redux";
import { CarList } from "./pages/admin/CarLists";
import Home from './pages/Home';
import Bookings from "./pages/admin/Bookings";
import Profile from "./pages/admin/Profile";
import Driver from "./pages/admin/Driver";
import User from "./pages/admin/User";

function App() {
  const { token } = useSelector((state) => state.auth);

  console.log("token: " + token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/cars" element={<CarList />} />
              <Route path="/admin/bookings" element={<Bookings />} />
              <Route path="/admin/users" element={<User />} />
              <Route path="/admin/drivers" element={<Driver />} />
              <Route path="/admin/cars/add" element={<AddCar />} />
              <Route path="/admin/cars/update/:id" element={<UpdateCars />} />
              <Route path="/admin/driver/update/:id" element={<Updatedriver />} />
            </>
          ) : (
            <Route path="/admin" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


