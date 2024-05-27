import { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "../../utils/isEmail";
import { isPhone } from "../../utils/isPhone";
import { apiCallFun } from "../../utils/fetchAPIs";
import { useDispatch } from "react-redux";
import { loginHandler } from "../../redux/slices/loginSlice";

export const Login = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    phoneOrEmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  console.log(form);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { phoneOrEmail, password } = form;
    let subForm = {
      password: password,
    };
    if (phoneOrEmail === "" || password === "") {
      toast.warn("Please enter a phone or email address");
      return;
    }
    if (isEmail(phoneOrEmail)) {
      // toast.success("Yes, this is a valid email address");
      subForm = { ...subForm, email: phoneOrEmail };
    } else if (isPhone(phoneOrEmail)) {
      // toast.success("THis is a valid phone");
      subForm = { ...subForm, phone: phoneOrEmail };
    } else {
      toast.error("This is not a valid email address or phone number!");
    }

    const data = await apiCallFun("POST", "login/admin", subForm, null);
    console.log(data);
    const { token } = data;
    if (data?.status) {
      toast.success(data?.msg);
      if (token) {
        dispatch(loginHandler(token));
      }
      setForm({
        phoneOrEmail: "",
        password: "",
      });
      subForm = {};
    } else {
      toast.error(data?.msg);
    }
  };

  return (
    <>
      <div className="container-1">
        <h2>Login</h2>
        <p>We are so excited to see you again!</p>
        <form action="" onSubmit={handleLogin} className="w-100">
          <input
            type="text"
            placeholder="Username or email"
            className="email-input inputs w-100"
            name="phoneOrEmail"
            value={form?.phoneOrEmail}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="password-input inputs w-100"
            name="password"
            value={form?.password}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <span className="login-span login">
            <button className="login-span login-ahref w-100">Login</button>
          </span>
        </form>
        {/* <button onClick={() => dispatch(loginHandler())}>Login</button> */}
      </div>
    </>
  );
};
