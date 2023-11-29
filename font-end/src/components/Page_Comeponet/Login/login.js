import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../Login/login.css";
import { login } from "../../../service/Account/account.service";
import React, { useState } from "react";
import { notification } from "antd";
import { useHistory } from "react-router-dom";

export let account = null;

const Login = () => {
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function checkLogin(event) {
    event.preventDefault(); // Ngăn form tự động submit
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
          localStorage.removeItem("name");
          localStorage.removeItem("phoneNumber");
          localStorage.removeItem("email");
          // history.replace("/");
          if (res.data.roles === "CUSTOMER") {
            window.location.replace("/");
          } else {
            window.location.replace("/dashboard");
          }
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
          <h2>Đăng nhập</h2>
          <form onSubmit={checkLogin}>
            <div class="user-box">
              <input
                type="text"
                name="email"
                required
                onChange={handleChange}
              />
              <label>Email</label>
            </div>
            <div class="user-box">
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
              />
              <label>Password</label>
            </div>
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Đăng nhập
            </button>{" "}
            <Link to="/signup">
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Đăng ký
              </button>
            </Link>
            <Link to="/forgotpassword">
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Quên mật khẩu
              </button>
            </Link>
            <Link to="/">
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Trở lại
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
