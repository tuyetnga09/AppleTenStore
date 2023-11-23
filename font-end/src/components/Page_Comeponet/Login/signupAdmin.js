import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../Login/login.css";
import { Form, Space, Avatar, Typography, Upload, notification } from "antd";
import { useState, useEffect } from "react";
import { add } from "../../../service/Employee/employee.service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readAllWard } from "../../../service/AddressAPI/ward.service";
import { readAllDistrict } from "../../../service/AddressAPI/district.service";
import { readAllProvince } from "../../../service/AddressAPI/province.service";
import {addImage, saveImageAccount} from "../../../service/image.service";

const SignUpAdmin = () => {
  const { Text } = Typography;

  const history = useHistory();

  const [isChecked, setIsChecked] = useState([true]);

  const [isChecked2, setIsChecked2] = useState([true]);

  const [role, setRole] = useState("NHAN_VIEN_BAN_HANG");

  const [avt, setAvt] = useState({});

  const [data, setData] = useState({
    user: {
      avatar: "",
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
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province_id, setProvince_id] = useState();
  const [district_id, setDistrict_id] = useState();
  const [showDistricts, setShowDistricts] = useState(true);
  const [showWards, setShowWards] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = new FormData();

  const handleProvince = (event) => {
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      setProvince_id(value);
      setDistrict_id(null);
      setWards([]);
      setData({
        ...data, // Giữ nguyên các giá trị cũ của data
        address: {
          ...data.address, // Giữ nguyên các giá trị cũ của user
          tinhThanhPho: document.getElementById(value).innerText, // Cập nhật theo giá trị từ ô input
        },
      });
      setShowDistricts(true);
    } else {
      setShowDistricts(false);
      setShowWards(false);
    }
  };

  const handleDistrict = (event) => {
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      setDistrict_id(value);
      setData({
        ...data, // Giữ nguyên các giá trị cũ của data
        address: {
          ...data.address, // Giữ nguyên các giá trị cũ của user
          quanHuyen: document.getElementById(value).innerText, // Cập nhật theo giá trị từ ô input
        },
      });
      setShowWards(true);
    } else {
      setShowWards(false);
    }
  };

  const handleWard = (event) => {
    const target = event.target;
    const value = target.value;
    setData({
      ...data, // Giữ nguyên các giá trị cũ của data
      address: {
        ...data.address, // Giữ nguyên các giá trị cũ của user
        xaPhuong: document.getElementById(value).innerText, // Cập nhật theo giá trị từ ô input
      },
    });
    // console.log(addAddress);
  };

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

  const handleRole = (event) => {
    const target = event.target;
    const value = target.value;
    setRole(value);
    setIsChecked2(!isChecked2);
    console.log(data);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const items = {...data};

    add(items, role)
        .then((res) => {
          if (res !== null) {
            notification.success({
              message: "ĐĂNG KÍ",
              description: "Đăng kí thành công",
            });
            setLoading(false);
            history.push("/login");
          } else {
            notification.error({
              message: "ĐĂNG KÍ",
              description: "Đăng kí thất bại",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    await form.append("file", avt);
    await saveImageAccount(form);

    console.log(items);
  };

  useEffect(() => {
    readAllProvince()
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readAllDistrict(province_id)
      .then((response) => {
        // setDistricts(response.data.data);
        if (showDistricts === true) {
          setDistricts(response.data.data);
        } else {
          setDistricts([]);
        }
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readAllWard(district_id)
      .then((response) => {
        // setWards(response.data.data);
        if (showWards === true) {
          setWards(response.data.data);
        } else {
          setWards([]);
        }
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [province_id, district_id, showDistricts, showWards]);

  function handleChangeImage(value) {
    setAvt(value.file.originFileObj);
    setData({
      ...data, // Giữ nguyên các giá trị cũ của data
      user: {
        ...data.user,
        avatar: value.file.originFileObj.name,
      },
    });
  }

  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: "9999", // Đặt z-index lớn hơn phần nền
          }}
        >
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div class="bgr">
        <div class="login-box">
          <h2>Đăng ký nhân viên</h2>
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
                  onChange={handleChangeImage}
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
                    required
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
                    required
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
                    required
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
                    required
                    onChange={handleAccount}
                  />
                  <label>Password</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label style={{ color: "rgb(3, 233, 244)", fontSize: "12px" }}>
                  Ngày sinh
                </label>
                <div class="user-box">
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    onChange={handleUser}
                  />
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
                    value={1}
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
                    value={0}
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
                    required
                    onChange={handleAddress}
                  />
                  <label>Địa chỉ</label>
                </div>
              </div>

              <div className="col-6">
                {/* <div class="user-box"> */}
                <label style={{ color: "rgb(3, 233, 244)", fontSize: "12px" }}>
                  Tỉnh, thành phố
                </label>
                <select
                  class="form-select"
                  id="provinces"
                  aria-label="Floating label select example"
                  onChange={handleProvince}
                >
                  <option value={"undefined"} selected></option>
                  {provinces.map((pr) => {
                    return (
                      <option
                        id={pr.ProvinceID}
                        key={pr.ProvinceID}
                        value={pr.ProvinceID}
                      >
                        {pr.ProvinceName}
                      </option>
                    );
                  })}
                </select>

                {/* </div> */}
              </div>
              <div className="col-6">
                {/* <div class="user-box"> */}
                <label style={{ color: "rgb(3, 233, 244)", fontSize: "12px" }}>
                  Quận, huyện
                </label>
                <select
                  class="form-select"
                  id="districts"
                  aria-label="Floating label select example"
                  onChange={handleDistrict}
                >
                  <option selected></option>
                  {districts.map((dt) => {
                    return (
                      <option
                        id={dt.DistrictID}
                        key={dt.DistrictID}
                        value={dt.DistrictID}
                      >
                        {dt.DistrictName}
                      </option>
                    );
                  })}
                </select>

                {/* </div> */}
              </div>
              <div className="col-6">
                {/* <div class="user-box"> */}
                <label style={{ color: "rgb(3, 233, 244)", fontSize: "12px" }}>
                  Xã, phường
                </label>
                <select
                  class="form-select"
                  id="wards"
                  aria-label="Floating label select example"
                  onChange={handleWard}
                >
                  <option selected></option>
                  {wards.map((w) => {
                    return (
                      <option id={w.WardCode} key={w.WardID} value={w.WardCode}>
                        {w.WardName}
                      </option>
                    );
                  })}
                </select>

                {/* </div> */}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label style={{ color: "#03e9f4", fontSize: "12px" }}>
                  Chức vụ
                </label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="roles"
                    id="flexRadioDefault3"
                    value={"NHAN_VIEN_BAN_HANG"}
                    onChange={handleRole}
                    checked={isChecked2}
                  />
                  <label
                    class="form-check-label"
                    for="flexRadioDefault3"
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      marginRight: "50px",
                    }}
                  >
                    Nhân viên bán hàng
                  </label>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="roles"
                    id="flexRadioDefault4"
                    value={"NHAN_VIEN_QUAN_LY"}
                    onChange={handleRole}
                  />
                  <label
                    class="form-check-label"
                    for="flexRadioDefault4"
                    style={{ color: "#fff", fontSize: "12px" }}
                  >
                    Nhân viên quản lý
                  </label>
                </div>
              </div>
            </div>
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Đăng ký
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

export default SignUpAdmin;
