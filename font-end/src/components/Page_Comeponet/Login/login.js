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
          history.replace("/");
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
