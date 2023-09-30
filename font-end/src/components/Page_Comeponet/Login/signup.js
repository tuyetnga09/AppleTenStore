import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../Login/login.css";

const SignUp = () => {
  return (
    <>
      <div class="bgr">
        <div class="login-box">
          <h2>Sing Up</h2>
          <form>
            <div class="user-box">
              <input type="text" name="" required="" />
              <label>Username</label>
            </div>
            <div class="user-box">
              <input type="password" name="" required="" />
              <label>Password</label>
            </div>
            <div class="user-box">
              <input type="email" name="" required="" />
              <label>Email</label>
            </div>
            <a href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>{" "}
            <Link to="/login">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Sign in
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
