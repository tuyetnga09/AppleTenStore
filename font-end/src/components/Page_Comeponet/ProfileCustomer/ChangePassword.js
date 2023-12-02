import React, { useState } from "react";
import { updatePassword } from "../../../service/User/user.service";
import { notification } from "antd";

const ChangePassword = ({ changePassword }) => {
  const [editPassword, setEditPassword] = useState({
    password: "",
    passwordNew: "",
    passwordRepeat: "",
  });

  const handleChangePassword = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let item = { ...editPassword };
    item[name] = value;
    setEditPassword(item);
    console.log(item);
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    updatePassword(changePassword.data.user.id, editPassword)
      .then((res) => {
        if (res.data === true) {
          notification.success({
            message: "CẬP NHẬT",
            description: "Cập nhật mật khẩu thành công",
          });
        } else {
          notification.error({
            message: "CẬP NHẬT",
            description: "Cập nhật mật khẩu thất bại",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "CẬP NHẬT",
          description: "Cập nhật mật khẩu thất bại",
        });
        console.log(err);
      });
  };

  return (
    <div class="container-xl px-4 mt-4">
      <hr class="mt-0 mb-4" />
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-4">
            <div class="card-body">
              <form onSubmit={handleUpdatePassword}>
                <div class="mb-3">
                  <label class="small mb-1" for="inputPassword">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    required
                    class="form-control"
                    id="inputPassword"
                    type="text"
                    name="password"
                    onChange={handleChangePassword}
                  />
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="inputPasswordNew">
                    Mật khẩu mới
                  </label>
                  <input
                    required
                    class="form-control"
                    id="inputPasswordNew"
                    type="text"
                    name="passwordNew"
                    onChange={handleChangePassword}
                  />
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="inputPasswordNewRepeat">
                    Nhập lại mật khẩu
                  </label>
                  <input
                    required
                    class="form-control"
                    id="inputPasswordNewRepeat"
                    type="text"
                    name="passwordRepeat"
                    onChange={handleChangePassword}
                  />
                </div>
                <button class="btn btn-warning" type="submit">
                  Đổi mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
