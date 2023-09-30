import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../Login/login.css";

const Login = () => {
  return (
    <>
      <div class="bgr">
        <div class="login-box">
          <h2>Login</h2>
          <form>
            <div class="user-box">
              <input type="text" name="" required="" />
              <label>Username</label>
            </div>
            <div class="user-box">
              <input type="password" name="" required="" />
              <label>Password</label>
            </div>
            <a href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>{" "}
            <Link to="/signup">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Sign up
            </Link>
            <Link to="/forgotpassword">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Forgot password
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
