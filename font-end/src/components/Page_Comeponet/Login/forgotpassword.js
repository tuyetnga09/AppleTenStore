import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState } from "react";
import "../Login/login.css";

const ForgotPassword = () => {
  return (
    <>
      <div class="bgr">
        <div class="login-box">
          <h2>Quên mật khẩu</h2>
          <form>
            <div class="user-box">
              <input type="email" name="" required />
              <label>Email</label>
            </div>
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Gửi mật khẩu
            </button>{" "}
            <Link to="/login">
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

export default ForgotPassword;
