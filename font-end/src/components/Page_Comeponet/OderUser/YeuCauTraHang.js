import React, { useEffect, useState, useRef } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AvtProduct from "../../custumer_componet/avtProduct";
import {
  readAll,
  checkBillTraHang,
  getAllBillDetail,
  khachHangHuyYeuCauTraHang,
} from "../../../service/BillDetail/billDetailCustomer.service";
import { readAllByIdAndStatus } from "../../../service/Bill/billCustomer.service";
import { account } from "../Login/login";
import { Form, Modal, Row, Table, notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

const OderUserYeuCauTraHang = () => {
  const [billDetails, setBillDetails] = useState([]);
  const [bills, setBills] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const toast1 = useRef(null);
  useEffect(() => {
    readAllByIdAndStatus(storedUser?.id, "YEU_CAU_TRA_HANG")
      .then((res) => {
        setBills(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = bills.map((b) => readAll(b.id));
        const results = await Promise.all(promises);

        // Lấy dữ liệu từ các kết quả và cập nhật trạng thái
        const data = results.map((res) => res.data);
        setBillDetails(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [bills]);

  const [billReturn, setBillReturn] = useState({
    id: null,
    note: null,
  });
  const [dataCheckBill, setCheckDataBill] = useState(true); // check bill da tra hang lan nao hay chua
  const [dataBillDetails, setDataBillDetails] = useState([]); // lisst bill detail cuar idbill
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); //list id imei da ban
  const [data3Ngay, setData3Ngay] = useState(); //list id imei da ban
  const handleNoteReturnsClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.id,
    });
    checkBillTraHang(record.id)
      .then((res) => {
        setCheckDataBill(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBillDetail(record.id, "")
      .then((res) => {
        setDataBillDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    const completionDate = new Date(record.completionDate);
    const yearStart = completionDate.getFullYear();
    const monthStart = completionDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const dayStart = completionDate.getDate();
    const formattedDateStart = `${yearStart}-${monthStart
      .toString()
      .padStart(2, "0")}-${dayStart.toString().padStart(2, "0")}`;
    // Ngày hoàn thành đơn hàng
    const ngayHoanThanh = new Date(formattedDateStart);

    // Ngày hiện tại
    const dateNow = new Date();
    const yearStart1 = dateNow.getFullYear();
    const monthStart1 = dateNow.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const dayStart1 = dateNow.getDate();
    const formattedDateStart1 = `${yearStart1}-${monthStart1
      .toString()
      .padStart(2, "0")}-${dayStart1.toString().padStart(2, "0")}`;
    const ngayHienTai = new Date(formattedDateStart1);
    // Tính khoảng cách giữa hai ngày
    const khoangCachNgay = Math.floor(
      (ngayHienTai - ngayHoanThanh) / (1000 * 60 * 60 * 24)
    );
    setData3Ngay(khoangCachNgay);
    handleOpenXemHoaDonChiTiets();
  };

  const [isModalVisibleXemHoaDonChiTiet, setIsModalVisibleXemHoaDonChiTiet] =
    useState(false); // Trạng thái hiển thị Modal

  // Hàm để mở Modal
  const handleOpenXemHoaDonChiTiets = () => {
    setIsModalVisibleXemHoaDonChiTiet(true);
  };
  // Hàm để ẩn Modal
  const handleCancelXemHoaDonChiTiet = () => {
    setCheckDataBill();
    setDataBillDetails([]);
    setSelectedCheckboxes([]);
    setIsModalVisibleXemHoaDonChiTiet(false);
  };

  // phongnh
  const [isModalVisibleHuyTrahang, setIsModalVisibleHuyTrahang] =
    useState(false); // Trạng thái hiển thị Modal

  // Hàm để mở Modal
  const handleOpenXemHuyTrahang = () => {
    setIsModalVisibleHuyTrahang(true);
  };
  // Hàm để ẩn Modal
  const handleCancelHuyTrahang = () => {
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1-1"
    );
    textNoteReturn.value = "";
    setIsModalVisibleHuyTrahang(false);
  };

  // onClick={() => confirmHuyTraHang()}

  const huyTrahang = () => {
    handleOpenXemHuyTrahang();
  };
  const rejectKhachHuyTraHang = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục mua sắm.",
      life: 3000,
    });
  };
  const confirmHuyTraHang = () => {
    confirmDialog({
      message: "Bạn chắc chắc huỷ trả sản phẩm?",
      header: "XÁC NHẬN THÔNG BÁO",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => huyTrahang(),
      reject: () => rejectKhachHuyTraHang(),
    });
  };
  const handleCanneHuyTraHang = (event) => {
    setBillReturn({
      ...billReturn,
      note: event.target.value,
    });
  };
  const handleSubmitHuyTrahang = (event) => {
    event.preventDefault();

    khachHangHuyYeuCauTraHang(billReturn.id, billReturn.note)
      .then((res) => {
        if (res.data !== "" && res.data !== undefined) {
          setDataBillDetails(res.data);
          notification.success({
            message: " Huỷ yêu cầu trả hàng",
            description: "Huỷ yêu cầu trả hàng thành công.",
          });
          checkBillTraHang(billReturn.id)
            .then((res) => {
              setCheckDataBill(res.data);
            })
            .catch((err) => {
              console.log(err);
            });

          handleCancelHuyTrahang();
        } else {
          notification.warn({
            message: "Huỷ yêu cầu trả hàng thất bại!",
            description:
              "Yêu cầu trả hàng của quý khách thất bại! Vui lòng thử lại!",
          });
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const result = bills.map((b, index) => {
    return (
      <>
        <div>
          <Row>
            <div className="col-10" style={{ paddingTop: "20px" }}>
              <strong>AppleTenStore</strong>{" "}
            </div>
            <div className="col-2">
              <span
                style={{ paddingTop: "20px", float: "right", color: "red" }}
              >
                Yêu cầu trả hàng
              </span>
            </div>
          </Row>
        </div>
        <hr />
        {billDetails[index]?.map((bd) => {
          return (
            <div>
              <Row>
                <div className="col-10">
                  <p style={{ width: "300px" }}>
                    <AvtProduct product={bd.idProduct} />
                  </p>
                  <strong>
                    {bd.nameProduct} {bd.capacity} {bd.color}
                  </strong>
                  <p style={{ fontSize: "13px", color: "gray" }}>
                    Phân loại hàng: {bd.category}
                  </p>
                  <strong>x{bd.quantity}</strong>
                </div>
                <div className="col-2">
                  <p style={{ float: "right" }}>
                    {bd.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </Row>
            </div>
          );
        })}
        <hr />
        <div>
          <Row>
            <div className="col-6"></div>
            <div className="col-6">
              <span style={{ float: "right" }}>
                Thành tiền:{" "}
                {b.totalMoney.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <br />
              <br />
              <div style={{ float: "right" }}>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={() => handleNoteReturnsClick(b)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </Row>
        </div>
        <hr />
      </>
    );
  });
  function handleChangeSearch(event) {
    getAllBillDetail(billReturn.id, event.target.value)
      .then((res) => {
        setDataBillDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Header />
      <Toast ref={toast1} />
      <ConfirmDialog />
      <br />
      <section>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <Link class="nav-link" to="/oderUserAll">
              Tất cả
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/oderUserCTT">
              Chờ xác nhận
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/oderUserCVC">
              Chờ vận chuyển
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/oderUserVC">
              Vận chuyển
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/oderUserHT">
              Hoàn thành
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" aria-current="page" to="/oderUserDH">
              Đã hủy
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link active"
              aria-current="page"
              to="/oderUserYCTH"
            >
              Yêu cầu trả hàng
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" aria-current="page" to="/oderUserTH">
              Trả hàng
            </Link>
          </li>
        </ul>
      </section>
      <Modal
        visible={isModalVisibleXemHoaDonChiTiet}
        onCancel={handleCancelXemHoaDonChiTiet}
        width={900}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <h4
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "20px",
          }}
        >
          THÔNG TIN TRẢ HÀNG
        </h4>
        <span style={{ color: "red", marginBottom: "15px", marginTop: "15px" }}>
          * Lưu ý: Quý khách chỉ được trả hàng một lần duy nhất trên một hoá đơn
          trong vòng 3 ngày kể từ lúc nhận được hàng.
        </span>
        <Row style={{ marginTop: "28px", marginBottom: "10px" }}>
          <input
            // id="id-imeis"
            className="form-control me-2"
            type="search"
            placeholder="Tìm theo imei"
            aria-label="Search"
            name="key"
            onChange={handleChangeSearch}
          />
        </Row>

        {dataCheckBill === 4 ? (
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div class="col-6">
              <span style={{ color: "red" }}>
                * Quý khách đã hết số lần trả hàng.
              </span>
            </div>
            {data3Ngay > 3 ? (
              ""
            ) : (
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-danger"
                  style={{ float: "right" }}
                  onClick={() => confirmHuyTraHang()}
                >
                  Huỷ Yêu Cầu Trả Hàng
                </button>
              </div>
            )}
          </Row>
        ) : dataCheckBill === 5 ||
          dataCheckBill === 7 ||
          dataCheckBill === 7 ? (
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div class="col-6">
              <span style={{ color: "red" }}>
                * Quý khách đã hết số lần trả hàng.
              </span>
            </div>
          </Row>
        ) : (
          ""
        )}

        <Table
          rowKey="oop"
          dataSource={dataBillDetails}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `Tổng số ${total} sản phẩm`,
            showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
          }}
        >
          {/* tên sp */}
          <Table.Column
            align="center"
            key="checked"
            dataIndex="checked"
            title="Chọn"
            render={(text, record) => {
              return (
                <div>
                  <CloseCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                </div>
              );
            }}
          />
          <Table.Column
            align="center"
            dataIndex="images"
            title="Ảnh"
            render={(text, record) => (
              <div style={{ textAlign: "center" }}>
                <AvtProduct product={record.idProduct} />
              </div>
            )}
            width={150}
          />

          {/* tên sp */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Tên Sản Phẩm"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.nameProduct}</p>
                </Form.Item>
              );
            }}
          />
          {/* sumSKU */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Phiên Bản"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>
                    {record.capacity} - {record.color}
                  </p>
                </Form.Item>
              );
            }}
          />
          {/* priceSKU  */}
          <Table.Column
            align="center"
            key="price"
            dataIndex="price"
            title="Giá Bán"
            sorter={(a, b) => a.price - b.price}
            render={(text, record) => {
              return record.price === null ? (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <WarningFilled
                    value={false}
                    style={{
                      color: "#FFCC00",
                    }}
                  />
                  {parseFloat(0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Form.Item>
              ) : (
                <Form.Item name="title" style={{ margin: 0 }}>
                  {parseFloat(record.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Form.Item>
              );
            }}
          />

          {/* sumImeiTrongKho */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Mã Imei"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.imei}</p>
                </Form.Item>
              );
            }}
          />

          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Trạng Thái"
            render={(text, record) => {
              return (
                <div>
                  {record.statusImei === 3 ? (
                    <CheckCircleOutlined
                      style={{
                        color: "#52c41a",
                      }}
                    />
                  ) : record.statusImei === 6 ? (
                    <div>
                      <CloseCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Trả hàng thành công
                      </div>
                    </div>
                  ) : record.statusImei === 4 ? (
                    <div
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      Đã gửi yêu cầu
                    </div>
                  ) : record.statusImei === 5 ? (
                    <div>
                      <WarningFilled
                        style={{
                          color: "#FFCC00",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Trả hàng không thành công
                      </div>
                    </div>
                  ) : record.statusImei === 7 ? (
                    <div>
                      <WarningFilled
                        style={{
                          color: "#FFCC00",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "#FFCC00",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Đã huỷ yêu cầu trả hàng
                      </div>
                    </div>
                  ) : (
                    "!"
                  )}
                </div>
              );
              {
                /* <Form.Item name="title" style={{ margin: 0 }}>
                    <p>{record.idImei}</p>
                  </Form.Item> */
              }
              //   </div>
              // );
            }}
          />
        </Table>
      </Modal>
      <Modal
        visible={isModalVisibleHuyTrahang}
        onCancel={handleCancelHuyTrahang}
        width={550}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <form onSubmit={handleSubmitHuyTrahang}>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Lí do hủy yêu cầu:
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1-1"
              rows="3"
              required
              onChange={handleCanneHuyTraHang}
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success">
            Xác nhận
          </button>
        </form>
      </Modal>
      <section
        style={{
          position: "relative",
          maxHeight: 400,
          width: "1200px",
          overflowY: "auto",
        }}
      >
        {result}
      </section>
      <br />
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "60px",
        }}
      >
        <Footer />
      </footer>
    </>
  );
};
export default OderUserYeuCauTraHang;
