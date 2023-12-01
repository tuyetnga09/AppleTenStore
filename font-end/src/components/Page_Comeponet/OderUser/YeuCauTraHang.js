import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AvtProduct from "../../custumer_componet/avtProduct";
import {
  readAll,
  checkBillTraHang,
  getAllBillDetail,
} from "../../../service/BillDetail/billDetailCustomer.service";
import { readAllByIdAndStatus } from "../../../service/Bill/billCustomer.service";
import { account } from "../Login/login";
import { Form, Modal, Row, Table } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningFilled,
} from "@ant-design/icons";

const OderUserYeuCauTraHang = () => {
  const [billDetails, setBillDetails] = useState([]);
  const [bills, setBills] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
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
  const handleNoteReturnsClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.id,
    });
    checkBillTraHang(record.id)
      .then((res) => {
        setCheckDataBill(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBillDetail(record.id)
      .then((res) => {
        setDataBillDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setIsModalVisibleNoteReturns(true);
    handleOpenXemHoaDonChiTiet();
  };

  const [isModalVisibleXemHoaDonChiTiet, setIsModalVisibleXemHoaDonChiTiet] =
    useState(false); // Trạng thái hiển thị Modal

  // Hàm để mở Modal
  const handleOpenXemHoaDonChiTiet = () => {
    setIsModalVisibleXemHoaDonChiTiet(true);
  };
  // Hàm để ẩn Modal
  const handleCancelXemHoaDonChiTiet = () => {
    setCheckDataBill();
    setDataBillDetails([]);
    setSelectedCheckboxes([]);
    setIsModalVisibleXemHoaDonChiTiet(false);
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
                <button type="button" class="btn btn-danger">
                  Liên hệ người bán
                </button>{" "}
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
          <span
            style={{ color: "red", marginBottom: "15px", marginTop: "15px" }}
          >
            * Lưu ý: Quý khách chỉ được trả hàng một lần duy nhất trên một hoá
            đơn trong vòng 3 ngày kể từ lúc nhận được hàng.
          </span>
          <Row style={{ marginTop: "28px", marginBottom: "10px" }}>
            <input
              // id="id-imeis"
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="key"
              // onChange={handleChangeImeis}
            />
          </Row>

          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <div class="col-6">
              <span style={{ color: "red" }}>
                * Quý khách đã hết số lần trả hàng.
              </span>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-danger"
                style={{ float: "right" }}
              >
                Huỷ Yêu Cầu Trả Hàng
              </button>
            </div>
          </Row>

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
                      <CloseCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
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
                      <div
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        Chờ kiểm tra
                      </div>
                    ) : (
                      <WarningFilled
                        style={{
                          color: "#FFCC00",
                        }}
                      />
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
      </>
    );
  });

  return (
    <>
      <Header />
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
