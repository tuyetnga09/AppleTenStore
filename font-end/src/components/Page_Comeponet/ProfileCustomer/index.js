import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { detail } from "../../../service/Account/account.service";
import { readAllByIdUser } from "../../../service/AddressAPI/address.service";
import { Modal } from "antd";
import ChangePassword from "./ChangePassword";
import AddressCustomer from "./AddressCustomer";
import { update, updatePassword } from "../../../service/User/user.service";
import { notification } from "antd";
import { useHistory } from "react-router-dom";

const ProfileCustomer = () => {
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [isModalVisibleAddress, setIsModalVisibleAddress] = useState(false); // Trạng thái hiển thị Modal
  const year = storedUser?.user?.dateOfBirth[0];
  const month = storedUser?.user?.dateOfBirth[1]?.toString().padStart(2, "0");
  const day = storedUser?.user?.dateOfBirth[2]?.toString().padStart(2, "0");
  const [editCustomer, setEditCustomer] = useState({
    fullName: storedUser?.user?.fullName,
    email: storedUser?.user?.email,
    phoneNumber: storedUser?.user?.phoneNumber,
    dateOfBirth: `${year}-${month}-${day}`,
  });

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
    updatePassword(data.data.user.id, editPassword)
      .then((res) => {
        if (res.data === true) {
          notification.success({
            message: "CẬP NHẬT",
            description: "Cập nhật mật khẩu thành công",
          });
          setIsModalVisible(false);
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

  const handleResetPassword = (record) => {
    setData(record);
    setIsModalVisible(true);
    console.log(data);
  };

  const handleUpdateAddress = (record) => {
    setData(record);
    setIsModalVisibleAddress(true);
    console.log(data);
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleAddress(false);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let item = { ...editCustomer };
    item[name] = value;
    setEditCustomer(item);
    console.log(item);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    update(storedUser?.user?.id, editCustomer)
      .then((res) => {
        if (res.data === true) {
          notification.success({
            message: "CẬP NHẬT",
            description: "Cập nhật thông tin thành công",
          });
          storedUser.user.fullName = editCustomer.fullName;
          storedUser.email = editCustomer.email;
          storedUser.user.email = editCustomer.email;
          storedUser.user.phoneNumber = editCustomer.phoneNumber;
          storedUser.user.dateOfBirth = editCustomer.dateOfBirth;
          localStorage.setItem("account", JSON.stringify(storedUser));
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
  const history = useHistory();
  useEffect(() => {
    if (storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      detail(storedUser?.id)
        .then((res) => {
          setData(res.data);
          // Lấy năm, tháng và ngày từ mảng
          const year = res.data.data.user.dateOfBirth[0];
          const month = res.data.data.user.dateOfBirth[1]
            ?.toString()
            .padStart(2, "0");
          const day = res.data.data.user.dateOfBirth[2]
            ?.toString()
            .padStart(2, "0");
          setDateOfBirth(`${year}-${month}-${day}`);
          setEditCustomer({
            fullName: res.data.data.user.fullName,
            email: res.data.data.user.email,
            phoneNumber: res.data.data.user.phoneNumber,
            dateOfBirth: `${year}-${month}-${day}`,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      readAllByIdUser(storedUser?.user?.id)
        .then((res) => {
          setAddress(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isModalVisibleAddress]);

  return (
    <>
      <Header />
      <div class="container-xl px-4 mt-4">
        <hr class="mt-0 mb-4" />
        <div class="row">
          <div class="col-xl-4">
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                {storedUser?.user?.avatar == null ||
                storedUser?.user?.avatar == "" ? (
                  <img
                    style={{ width: 290, height: 290 }}
                    class="img-account-profile rounded-circle mb-2"
                    src={
                      "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                    }
                    alt=""
                  />
                ) : (
                  <img
                    style={{ width: 290, height: 290 }}
                    class="img-account-profile rounded-circle mb-2"
                    src={`/imageUpload/` + storedUser?.user?.avatar}
                    alt=""
                  />
                )}

                <div class="small font-italic text-muted mb-4">
                  {/* JPG or PNG no larger than 5 MB */}
                  {storedUser?.user?.points <= 0
                    ? ""
                    : storedUser?.user?.points <= 1000000
                    ? "Hạng bạc - Điểm: " + storedUser?.user?.points
                    : storedUser?.user?.points <= 2000000
                    ? "Hạng vàng - Điểm: " + storedUser?.user?.points
                    : "Hạng kim cương - Điểm: " + storedUser?.user?.points}
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
                      defaultValue={data?.data?.user?.fullName}
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
                      defaultValue={data?.data?.email}
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
                        defaultValue={data?.data?.user?.phoneNumber}
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
                        defaultValue={dateOfBirth}
                      />
                    </div>
                  </div>
                  <button class="btn btn-primary" type="submit">
                    Cập nhật
                  </button>{" "}
                  <button
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
                      onClick={() => {
                        localStorage.removeItem("account");
                        window.location.replace("http://localhost:3000/");
                      }}
                    >
                      Đăng xuất
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1000}
          footer={null}
          bodyStyle={{ minHeight: "350px" }}
        >
          {/* <ChangePassword changePassword={data} /> */}
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
        </Modal>
      </section>
      <section>
        <Modal
          visible={isModalVisibleAddress}
          onCancel={handleCancel}
          width={1000}
          footer={null}
          bodyStyle={{ minHeight: "350px" }}
        >
          <AddressCustomer data={data} />
        </Modal>
      </section>
      <br />
      <Footer />
    </>
  );
};

export default ProfileCustomer;
