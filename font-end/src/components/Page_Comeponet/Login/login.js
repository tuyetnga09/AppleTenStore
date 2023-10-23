import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../Login/login.css";
import { login } from "../../../service/Account/account.service";
import { useState } from "react";
import { notification } from "antd";
import { useHistory } from "react-router-dom";

export let account = null;

const Login = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function checkLogin() {
    document
      .getElementById("myForm")
      .addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn form tự động submit
      });
    login(data.email, data.password)
      .then((res) => {
        console.log(res.data);
        if (res.data != "") {
          account = res.data;
          notification.success({
            message: "ĐĂNG NHẬP",
            description: "Đăng nhập thành công",
          });
          localStorage.setItem("account", JSON.stringify(account));
          history.push("/");
        } else {
          notification.error({
            message: "ĐĂNG NHẬP",
            description: "Sai thông tin đăng nhập",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...data };
    item[name] = value;
    setData(item);
  }

  return (
    <>
      <div class="bgr">
        <div class="login-box">
          <h2>Login</h2>
          <form id="myForm">
            <div class="user-box">
              <input
                type="text"
                name="email"
                required=""
                onChange={handleChange}
              />
              <label>Email</label>
            </div>
            <div class="user-box">
              <input
                type="password"
                name="password"
                required=""
                onChange={handleChange}
              />
              <label>Password</label>
            </div>
            <button onClick={() => checkLogin()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>{" "}
            <Link to="/signup">
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Sign up
              </button>
            </Link>
            <Link to="/forgotpassword">
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Forgot password
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
