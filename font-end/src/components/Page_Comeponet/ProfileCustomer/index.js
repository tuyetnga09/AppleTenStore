import { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { detail } from "../../../service/Account/account.service";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const ProfileCustomer = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const [data, setData] = useState([]);
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  useEffect(() => {
    detail(storedUser?.email)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <div class="card-header">Account Details</div>
              <div class="card-body">
                <form>
                  <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">
                      Họ và tên
                    </label>
                    <input
                      class="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder={data?.data?.user.fullName}
                    />
                  </div>
                  <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">
                      Mật khẩu
                    </label>
                    <input
                      class="form-control"
                      id="inputUsername"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter your username"
                      value="username"
                    />
                    <input
                      type="checkbox"
                      onClick={() => togglePasswordVisibility()}
                    />
                    Hiện thị mật khẩu
                  </div>
                  <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">
                      Địa chỉ
                    </label>
                    <input
                      class="form-control"
                      id="inputUsername"
                      type="text"
                      // placeholder={data?.data?.user.fullName}
                    />
                  </div>
                  <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      class="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder={data?.data?.email}
                    />
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        class="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder={data?.data?.user.phoneNumber}
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthday">
                        Birthday
                      </label>
                      {/* <input
                        class="form-control"
                        id="inputBirthday"
                        type="date"
                        name="birthday"
                        // defaultValue={formattedDate}
                        // value={formattedDate}
                      /> */}
                      <br />
                      <DatePicker
                        type="text"
                        required
                        defaultValue={dayjs(
                          data?.data?.user.dateOfBirth
                        ).locale("vi-VN")}
                        // onChange={(date, dateString) =>
                        // handleChangeDatePicker(dateString, "dateStart")
                        // }
                        // id="dateStart"
                        // name="dateStart"
                      />
                    </div>
                  </div>
                  <button class="btn btn-primary" type="button">
                    Cập nhật
                  </button>{" "}
                  <Link to="/login">
                    <button
                      class="btn btn-danger"
                      type="button"
                      onClick={() => localStorage.removeItem("account")}
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
      <Footer />
    </>
  );
};

export default ProfileCustomer;
