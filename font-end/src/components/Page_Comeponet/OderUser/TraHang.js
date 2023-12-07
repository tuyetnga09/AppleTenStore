import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AvtProduct from "../../custumer_componet/avtProduct";
import { readAll } from "../../../service/BillDetail/billDetailCustomer.service";
import { readAllByIdAndStatus } from "../../../service/Bill/billCustomer.service";
import { account } from "../Login/login";
import { Form, Modal, Row, Table } from "antd";
import { getAllBillDetailReturn } from "../../../service/BillDetail/billDetail.service";
import { WarningFilled } from "@ant-design/icons";

const OderUserTraHang = () => {
  const [billDetails, setBillDetails] = useState([]);
  const [bills, setBills] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    readAllByIdAndStatus(storedUser?.id, "TRA_HANG")
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

  const [isModalVisibleReturnedProducts, setIsModalVisibleReturnedProducts] =
    useState(false); // Trạng thái hiển thị Modal

  const [dataBillDetails, setDataBillDetails] = useState([]); // lisst bill detail cuar idbill
  const [idBill, setIdBill] = useState(); //

  const handleClickReturnedProducts = (record) => {
    setIsModalVisibleReturnedProducts(true);
    setIdBill(record.id);
    getAllBillDetailReturn(6, record.id, "")
      .then((response) => {
        setDataBillDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Hàm để ẩn Modal
  const handleCannelReturnedProducts = () => {
    setIsModalVisibleReturnedProducts(false);
  };

  function handleChangeSearch(event) {
    getAllBillDetailReturn(6, idBill, event.target.value)
      .then((response) => {
        setDataBillDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
                Trả hàng
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
                  onClick={() => handleClickReturnedProducts(b)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </Row>
        </div>
        <hr />
        <Modal
          visible={isModalVisibleReturnedProducts}
          onCancel={handleCannelReturnedProducts}
          width={900}
          footer={null}
          bodyStyle={{ minHeight: "150px" }}
        >
          <label for="exampleFormControlTextarea2" class="form-label">
            Sản phẩm đã trả:
          </label>
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
              dataIndex="images"
              title="Ảnh"
              render={(text, record) => (
                <div style={{ textAlign: "center" }}>
                  <AvtProduct product={record.productId} />
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
                    <p>{record.codeImei}</p>
                  </Form.Item>
                );
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
            <Link class="nav-link " aria-current="page" to="/oderUserYCTH">
              Yêu cầu trả hàng
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/oderUserTH">
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
export default OderUserTraHang;
