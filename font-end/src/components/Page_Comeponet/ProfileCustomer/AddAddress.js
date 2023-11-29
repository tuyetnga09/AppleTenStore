import React, { useEffect, useState } from "react";
import { add } from "../../../service/AddressAPI/address.service";
import { notification } from "antd";
import { readAllWard } from "../../../service/AddressAPI/ward.service";
import { readAllDistrict } from "../../../service/AddressAPI/district.service";
import { readAllProvince } from "../../../service/AddressAPI/province.service";

const AddAddress = ({ data }) => {
  const [addAddress, setAddAddress] = useState({
    address: "",
    xaPhuong: "",
    quanHuyen: "",
    tinhThanhPho: "",
    nameCustomer: data.data.user.fullName,
    numberCustomer: data.data.user.phoneNumber,
    idUser: data.data.user.id,
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province_id, setProvince_id] = useState();
  const [district_id, setDistrict_id] = useState();
  const [showDistricts, setShowDistricts] = useState(true);
  const [showWards, setShowWards] = useState(true);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let item = { ...addAddress };
    item[name] = value;
    setAddAddress(item);
    console.log(item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      addAddress.tinhThanhPho !== "" &&
      addAddress.quanHuyen !== "" &&
      addAddress.xaPhuong !== ""
    ) {
      add(addAddress)
        .then((res) => {
          if (res.data !== null) {
            notification.success({
              message: "THÊM ĐỊA CHỈ",
              description: "Thêm địa chỉ thành công",
            });
          } else {
            notification.error({
              message: "THÊM ĐỊA CHỈ",
              description: "Thêm địa chỉ thất bại",
            });
          }
        })
        .catch((err) => {
          notification.error({
            message: "THÊM ĐỊA CHỈ",
            description: "Thêm địa chỉ thất bại",
          });
          console.log(err);
        });
    } else {
      notification.error({
        message: "THÊM ĐỊA CHỈ",
        description: "Thêm địa chỉ thất bại",
      });
    }
  };

  const handleProvince = (event) => {
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      setProvince_id(value);
      setDistrict_id(null);
      setWards([]);
      setAddAddress({
        ...addAddress,
        tinhThanhPho: document.getElementById(value).innerText,
      });
      setShowDistricts(true);
    } else {
      setShowDistricts(false);
      setShowWards(false);
    }
  };

  const handleDistrict = (event) => {
    const target = event.target;
    const value = target.value;
    setDistrict_id(value);
    setAddAddress({
      ...addAddress,
      quanHuyen: document.getElementById(value).innerText,
    });
  };

  const handleWard = (event) => {
    const target = event.target;
    const value = target.value;
    setAddAddress({
      ...addAddress,
      xaPhuong: document.getElementById(value).innerText,
    });
    console.log(addAddress);
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
  }, [province_id, district_id]);

  return (
    <div class="container-xl px-4 mt-4">
      <hr class="mt-0 mb-4" />
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-4">
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label class="small mb-1" for="address">
                    Địa chỉ
                  </label>
                  <input
                    required
                    class="form-control"
                    id="address"
                    type="text"
                    name="address"
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="tinhThanhPho">
                    Tỉnh, Thành phố
                  </label>
                  <select
                    class="form-select"
                    id="provinces"
                    aria-label="Floating label select example"
                    onChange={handleProvince}
                  >
                    <option selected></option>
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
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="quanHuyen">
                    Quận, Huyện
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
                </div>

                <div class="mb-3">
                  <label class="small mb-1" for="xaPhuong">
                    Xã, Phường
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
                        <option
                          id={w.WardCode}
                          key={w.WardID}
                          value={w.WardCode}
                        >
                          {w.WardName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button class="btn btn-warning" type="submit">
                  Thêm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
