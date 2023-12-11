// import { useEffect, useState } from "react";
// import {
//   readAllByIdUser,
//   deleteAddress,
// } from "../../../service/AddressAPI/address.service";
// import { Menu, Modal, Table, notification } from "antd";
// import { CloseCircleOutlined, FormOutlined } from "@ant-design/icons";
// import AddAddress from "./AddAddress";

// const AddressCustomer = ({ data }) => {
//   const [address, setAddress] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
//   const handleAddAddress = (record) => {
//     setAddress(record);
//     setIsModalVisible(true);
//     console.log(data);
//   };
//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   async function remove(id) {
//     deleteAddress(id)
//       .then((res) => {
//         if (res !== null) {
//           notification.success({
//             message: "XÓA",
//             description: "Xóa địa chỉ thành công",
//           });
//           let newArr = [...address].filter((s) => s.id !== id);
//           setAddress(newArr);
//         } else {
//           notification.error({
//             message: "XÓA",
//             description: "Xóa địa chỉ thất bại",
//           });
//         }
//       })
//       .catch((err) => {
//         notification.error({
//           message: "XÓA",
//           description: "Xóa địa chỉ thất bại",
//         });
//         console.log(err);
//       });
//   }

//   useEffect(() => {
//     readAllByIdUser(data?.data?.user?.id)
//       .then((res) => {
//         setAddress(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [address]);

//   return (
//     <>
//       <Table
//         rowKey="id"
//         dataSource={address}
//         pagination={{
//           pageSize: 5,
//           showSizeChanger: false,
//           showTotal: (total) => `Tổng số ${total} mục`,
//           showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
//         }}
//       >
//         <Table.Column
//           key="address"
//           dataIndex="nameProduct"
//           title="Địa chỉ"
//           render={(text, record) => {
//             return `${record.address}`;
//           }}
//         />
//         <Table.Column
//           key="xaPhuong"
//           dataIndex="nameProduct"
//           title="Xã, Phường"
//           render={(text, record) => {
//             return `${record.xaPhuong}`;
//           }}
//         />
//         <Table.Column
//           key="quanHuyen"
//           dataIndex="nameProduct"
//           title="Quận, Huyện"
//           render={(text, record) => {
//             return `${record.quanHuyen}`;
//           }}
//         />
//         <Table.Column
//           key="tinhThanhPho"
//           dataIndex="nameProduct"
//           title="Tỉnh, Thành phố"
//           render={(text, record) => {
//             return `${record.tinhThanhPho}`;
//           }}
//         />
//         <Table.Column
//           title="Actions"
//           dataIndex="actions"
//           key="actions"
//           align="center"
//           render={(text, record) => {
//             return (
//               <Menu
//                 mode="vertical"
//                 onClick={({ domEvent }) => domEvent.stopPropagation()}
//               >
//                 <Menu.Item
//                   key="edit"
//                   style={{
//                     fontSize: 15,
//                     display: "flex",
//                     alignItems: "center",
//                     fontWeight: 500,
//                   }}
//                   icon={
//                     <FormOutlined
//                       style={{
//                         color: "#52c41a",
//                         fontSize: 17,
//                         fontWeight: 500,
//                       }}
//                     />
//                   }
//                 >
//                   Edit
//                 </Menu.Item>
//                 <Menu.Item
//                   key="remove"
//                   style={{
//                     fontSize: 15,
//                     display: "flex",
//                     alignItems: "center",
//                     fontWeight: 500,
//                   }}
//                   icon={
//                     <CloseCircleOutlined
//                       style={{
//                         color: "red",
//                         fontSize: 17,
//                         fontWeight: 500,
//                       }}
//                     />
//                   }
//                   onClick={() => remove(record.id)}
//                 >
//                   Remove
//                 </Menu.Item>
//               </Menu>
//             );
//           }}
//         />
//       </Table>
//       <button
//         class="btn btn-success"
//         type="button"
//         onClick={() => handleAddAddress(address)}
//       >
//         Thêm địa chỉ
//       </button>
//       <section>
//         <Modal
//           visible={isModalVisible}
//           onCancel={handleCancel}
//           width={1000}
//           footer={null}
//           bodyStyle={{ minHeight: "350px" }}
//         >
//           <AddAddress data={data} />
//         </Modal>
//       </section>
//     </>
//   );
// };

// export default AddressCustomer;
import React, { useEffect, useState } from "react";
import {
  readAllByIdUser,
  deleteAddress,
  add,
} from "../../../service/AddressAPI/address.service";
import { Menu, Modal, Table, notification } from "antd";
import { CloseCircleOutlined, FormOutlined } from "@ant-design/icons";
import AddAddress from "./AddAddress";
import { readAllWard } from "../../../service/AddressAPI/ward.service";
import { readAllDistrict } from "../../../service/AddressAPI/district.service";
import { readAllProvince } from "../../../service/AddressAPI/province.service";

const AddressCustomer = ({ data }) => {
  const [address, setAddress] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const handleAddAddress = (record) => {
    setAddress(record);
    setIsModalVisible(true);
    console.log(data);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
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

  async function remove(id) {
    deleteAddress(id)
      .then((res) => {
        if (res !== null) {
          notification.success({
            message: "XÓA",
            description: "Xóa địa chỉ thành công",
          });
          let newArr = [...address].filter((s) => s.id !== id);
          setAddress(newArr);
        } else {
          notification.error({
            message: "XÓA",
            description: "Xóa địa chỉ thất bại",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: "XÓA",
          description: "Xóa địa chỉ thất bại",
        });
        console.log(err);
      });
  }

  useEffect(() => {
    readAllByIdUser(data?.data?.user?.id)
      .then((res) => {
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalVisible]);

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
            setIsModalVisible(false);
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
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      setDistrict_id(value);
      setAddAddress({
        ...addAddress,
        quanHuyen: document.getElementById(value).innerText,
      });
      setShowWards(true);
    } else {
      setShowWards(false);
    }
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
  }, [province_id, district_id, showDistricts, showWards]);

  return (
    <>
      <Table
        rowKey="id"
        dataSource={address}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total) => `Tổng số ${total} mục`,
          showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
        }}
      >
        <Table.Column
          key="address"
          dataIndex="nameProduct"
          title="Địa chỉ"
          render={(text, record) => {
            return `${record.address}`;
          }}
        />
        <Table.Column
          key="xaPhuong"
          dataIndex="nameProduct"
          title="Xã, Phường"
          render={(text, record) => {
            return `${record.xaPhuong}`;
          }}
        />
        <Table.Column
          key="quanHuyen"
          dataIndex="nameProduct"
          title="Quận, Huyện"
          render={(text, record) => {
            return `${record.quanHuyen}`;
          }}
        />
        <Table.Column
          key="tinhThanhPho"
          dataIndex="nameProduct"
          title="Tỉnh, Thành phố"
          render={(text, record) => {
            return `${record.tinhThanhPho}`;
          }}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          key="actions"
          align="center"
          render={(text, record) => {
            return (
              <Menu
                mode="vertical"
                onClick={({ domEvent }) => domEvent.stopPropagation()}
              >
                <Menu.Item
                  key="remove"
                  style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                  }}
                  icon={
                    <CloseCircleOutlined
                      style={{
                        color: "red",
                        fontSize: 17,
                        fontWeight: 500,
                      }}
                    />
                  }
                  onClick={() => remove(record.id)}
                >
                  Remove
                </Menu.Item>
              </Menu>
            );
          }}
        />
      </Table>
      <button
        class="btn btn-success"
        type="button"
        onClick={() => handleAddAddress(address)}
      >
        Thêm địa chỉ
      </button>
      <section>
        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1000}
          footer={null}
          bodyStyle={{ minHeight: "350px" }}
        >
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
        </Modal>
      </section>
    </>
  );
};

export default AddressCustomer;
