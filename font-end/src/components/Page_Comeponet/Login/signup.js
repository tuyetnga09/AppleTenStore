import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../Login/login.css";
import { Form, Space, Avatar, Typography, Upload } from "antd";
import { useState } from "react";
import { add } from "../../../service/Customer/customer.service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignUp = () => {
  const { Text } = Typography;

  const history = useHistory();

  const [isChecked, setIsChecked] = useState([true]);

  const [data, setData] = useState({
    user: {
      fullName: "",
      phoneNumber: "",
      email: "",
      gender: 0,
      dateOfBirth: "",
    },
    address: {
      address: "",
      quanHuyen: "",
      tinhThanhPho: "",
      xaPhuong: "",
    },
    account: {
      password: "",
    },
  });

  const handleUser = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setData({
      ...data, // Giữ nguyên các giá trị cũ của data
      user: {
        ...data.user, // Giữ nguyên các giá trị cũ của user
        [name]: value, // Cập nhật theo giá trị từ ô input
      },
    });
    console.log(data);
  };

  const handleAddress = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setData({
      ...data, // Giữ nguyên các giá trị cũ của data
      address: {
        ...data.address, // Giữ nguyên các giá trị cũ của user
        [name]: value, // Cập nhật theo giá trị từ ô input
      },
    });
    console.log(data);
  };

  const handleAccount = (event) => {
    const target = event.target;
    const value = target.value;
    setData({
      ...data, // Giữ nguyên các giá trị cũ của data
      account: {
        password: value, // Cập nhật theo giá trị từ ô input
      },
    });
    console.log(data);
  };

  const handleGender = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setData({
      ...data, // Giữ nguyên các giá trị cũ của data
      user: {
        ...data.user, // Giữ nguyên các giá trị cũ của user
        [name]: parseInt(value, 10), // Cập nhật theo giá trị từ ô input
      },
    });
    setIsChecked(!isChecked);
    console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const items = { ...data };

    add(items);

    console.log(items);

    history.push("/login");
  };

  return (
    <>
      <div class="bgr">
        <div class="login-box">
          <h2>Sing Up</h2>
          <form onSubmit={handleSubmit}>
            <label style={{ color: "#03e9f4", fontSize: "12px" }}>
              Ảnh đại diện
            </label>
            <Form.Item>
              <Form.Item
                name="images"
                valuePropName="fileList"
                // getValueFromEvent={getValueFromEvent}
                noStyle
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload.Dragger
                  name="file"
                  listType="picture"
                  accept="image/*"
                  // multiple={true}
                  // onChange={handleChangeImage}
                >
                  <Space direction="vertical" size={2}>
                    <Avatar
                      style={{
                        width: "50%",
                        height: "50%",
                        maxWidth: "256px",
                      }}
                      src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=nZB7DICVaTAAX-xrGOC&_nc_ht=scontent.fhan3-2.fna&oh=00_AfBm-LR3ITOsER4cXK9Jvckt7ToE7HMZ-p4Npw0LguZ-mQ&oe=654EB4F8"
                      alt="Store Location"
                    />
                    <Text
                      style={{
                        fontWeight: 800,
                        fontSize: "12px",
                        marginTop: "8px",
                        color: "#03e9f4",
                      }}
                    >
                      Thêm ảnh
                    </Text>
                  </Space>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <div className="row">
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="text"
                    name="fullName"
                    required=""
                    onChange={handleUser}
                  />
                  <label>Họ và tên</label>
                </div>
              </div>
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="text"
                    name="phoneNumber"
                    required=""
                    onChange={handleUser}
                  />
                  <label>Số điện thoại</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="email"
                    name="email"
                    required=""
                    onChange={handleUser}
                  />
                  <label>Email</label>
                </div>
              </div>
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="password"
                    name="password"
                    required=""
                    onChange={handleAccount}
                  />
                  <label>Password</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="date"
                    name="dateOfBirth"
                    required=""
                    onChange={handleUser}
                  />
                  <label>Ngày sinh</label>
                </div>
              </div>
              <div className="col-6">
                <label style={{ color: "#03e9f4", fontSize: "12px" }}>
                  Giới tính
                </label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="flexRadioDefault1"
                    value={0}
                    onChange={handleGender}
                    checked={isChecked}
                  />
                  <label
                    class="form-check-label"
                    for="flexRadioDefault1"
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      marginRight: "50px",
                    }}
                  >
                    Nam
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="flexRadioDefault2"
                    value={1}
                    onChange={handleGender}
                  />
                  <label
                    class="form-check-label"
                    for="flexRadioDefault2"
                    style={{ color: "#fff", fontSize: "12px" }}
                  >
                    Nữ
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="text"
                    name="address"
                    required=""
                    onChange={handleAddress}
                  />
                  <label>Địa chỉ</label>
                </div>
              </div>
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="text"
                    name="xaPhuong"
                    required=""
                    onChange={handleAddress}
                  />
                  <label>Xã, phường</label>
                </div>
              </div>
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="text"
                    name="quanHuyen"
                    required=""
                    onChange={handleAddress}
                  />
                  <label>Quận, huyện</label>
                </div>
              </div>
              <div className="col-6">
                <div class="user-box">
                  <input
                    type="text"
                    name="tinhThanhPho"
                    required=""
                    onChange={handleAddress}
                  />
                  <label>Tỉnh, thành phố</label>
                </div>
              </div>
            </div>
            <button type="submit">
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
                Sign in
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
