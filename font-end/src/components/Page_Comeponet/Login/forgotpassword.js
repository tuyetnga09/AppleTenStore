import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../Login/login.css";

const ForgotPassword = () => {
  return (
    <>
      <div class="bgr">
        <div class="login-box">
          <h2>Forgot Password</h2>
          <form>
            <div class="user-box">
              <input type="email" name="" required="" />
              <label>Email</label>
            </div>
            <button>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>{" "}
            <Link to="/login">
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Cannel
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
