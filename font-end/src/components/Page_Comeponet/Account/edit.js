import { useEffect } from "react";
import { readAllByIdUser } from "../../../service/AddressAPI/address.service";
import { useState } from "react";
import { update } from "../../../service/User/user.service";
import { notification } from "antd";

const EditAccount = ({ data }) => {
  const year = data.dateOfBirth[0];
  const month = data.dateOfBirth[1]?.toString().padStart(2, "0");
  const day = data.dateOfBirth[2]?.toString().padStart(2, "0");
  const [address, setAddress] = useState([]);
  const [fullName, setFullName] = useState([]);
  const [editAccount, setEditAccount] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let item = { ...editAccount };
    item[name] = value;
    setEditAccount(item);
    console.log(item);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    update(data.id, editAccount)
      .then((res) => {
        if (res.data === true) {
          notification.success({
            message: "CẬP NHẬT",
            description: "Cập nhật thông tin thành công",
          });
          // storedUser.user.fullName = editCustomer.fullName;
          // storedUser.email = editCustomer.email;
          // storedUser.user.email = editCustomer.email;
          // storedUser.user.phoneNumber = editCustomer.phoneNumber;
          // storedUser.user.dateOfBirth = editCustomer.dateOfBirth;
          // localStorage.setItem("account", JSON.stringify(storedUser));
        } else {
          notification.error({
            message: "CẬP NHẬT",
            description: "Cập nhật thông tin thất bại",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "CẬP NHẬT",
          description: "Cập nhật thông tin thất bại",
        });
        console.log(err);
      });
  };

  useEffect(() => {
    setEditAccount({
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dateOfBirth: `${year}-${month}-${day}`,
    });
    readAllByIdUser(data?.id)
      .then((res) => {
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data.id]);

  return (
    <div class="container-xl px-4 mt-4">
      <hr class="mt-0 mb-4" />
      <div class="row">
        <div class="col-xl-4">
          <div class="card mb-4 mb-xl-0">
            <div class="card-header">Profile Picture</div>
            <div class="card-body text-center">
              <img
                class="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              <div class="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              <button class="btn btn-primary" type="button">
                Upload new image
              </button>
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <div class="card mb-4">
            <div class="card-header">Thông tin tài khoản</div>
            <div class="card-body">
              <form onSubmit={handleUpdate}>
                <div class="mb-3">
                  <label class="small mb-1" for="inputUsername">
                    Họ và tên
                  </label>
                  <input
                    required
                    class="form-control"
                    id="inputUsername"
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    defaultValue={editAccount.fullName}
                  />
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="inputAddress">
                    Địa chỉ
                  </label>
                  {/* <input
                      required
                      class="form-control"
                      id="inputAddress"
                      type="text"
                      defaultValue={address}
                    /> */}
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                  >
                    {address.map((da) => {
                      return (
                        <option
                          id={da.id}
                          key={da.id}
                          // value={da}
                        >
                          {da.address}, {da.xaPhuong}, {da.quanHuyen},{" "}
                          {da.tinhThanhPho}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    class="form-control"
                    id="inputEmailAddress"
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    defaultValue={editAccount.email}
                  />
                </div>
                <div class="row gx-3 mb-3">
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputPhone">
                      Phone number
                    </label>
                    <input
                      required
                      class="form-control"
                      id="inputPhone"
                      type="tel"
                      name="phoneNumber"
                      onChange={handleChange}
                      defaultValue={editAccount.phoneNumber}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="small mb-1" for="inputBirthday">
                      Birthday
                    </label>
                    <input
                      required
                      class="form-control"
                      id="inputBirthday"
                      type="date"
                      name="dateOfBirth"
                      onChange={handleChange}
                      defaultValue={editAccount.dateOfBirth}
                    />
                  </div>
                </div>
                <button class="btn btn-primary" type="submit">
                  Cập nhật
                </button>{" "}
                {/* <button
                class="btn btn-warning"
                type="button"
                onClick={() => handleResetPassword(data)}
              >
                Đổi mật khẩu
              </button>{" "}
              <button
                class="btn btn-secondary"
                type="button"
                onClick={() => handleUpdateAddress(data)}
              >
                Cập nhật địa chỉ
              </button>{" "}
              <Link to="/login">
                <button
                  class="btn btn-danger"
                  type="button"
                  onClick={() => localStorage.removeItem("account")}
                >
                  Đăng xuất
                </button>
              </Link> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
