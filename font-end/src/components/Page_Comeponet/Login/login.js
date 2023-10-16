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
              <label>Email</label>
            </div>
            <div class="user-box">
              <input type="password" name="" required="" />
              <label>Password</label>
            </div>
            <button>
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
