import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AvtProduct from "../../custumer_componet/avtProduct";
import { readAll } from "../../../service/BillDetail/billDetailCustomer.service";
import { readAllByIdAndStatus } from "../../../service/Bill/billCustomer.service";
import { deleteBillById } from "../../../service/Bill/bill.service";
import { Modal, notification, Row } from "antd";

const OderUserChoThanhToan = () => {
  const [billDetails, setBillDetails] = useState([]);
  const [bills, setBills] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    readAllByIdAndStatus(storedUser?.id, "CHO_XAC_NHAN")
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

  const result = bills.map((b, index) => {
    return (
      <>
        <div>
          <Row>
            <div className="col-10" style={{ paddingTop: "20px" }}>
              <strong>AppleTenStore - {b.code}</strong>{" "}
            </div>
            <div className="col-2">
              <span
                style={{ paddingTop: "20px", float: "right", color: "red" }}
              >
                Chờ xác nhận
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
                  onClick={() => handleCannelOrderClick(b)}
                >
                  Hủy đơn
                </button>
              </div>
            </div>
          </Row>
        </div>
        <hr />
      </>
    );
  });

  const [isModalVisibleCannelOrder, setIsModalVisibleCannelOrder] =
    useState(false);

  const [billReturn, setBillReturn] = useState({
    id: null,
    note: null,
  });

  const handleCannelOrderClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.id,
    });
    setIsModalVisibleCannelOrder(true);
  };

  const handleCannelOrderCancel = () => {
    setIsModalVisibleCannelOrder(false);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
  };

  const handleCannelOrder = (event) => {
    setBillReturn({
      ...billReturn,
      note: event.target.value,
    });
  };

  const handleSubmitReturns = (event) => {
    event.preventDefault();
    deleteBillById(billReturn.id, billReturn.note, -1).then((response) =>
      console.log(response.data)
    );
    setIsModalVisibleCannelOrder(false);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
    notification.success({
      message: "Hủy đơn",
      description: "Hủy đơn thành công",
    });
  };

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
            <Link class="nav-link active" aria-current="page" to="/oderUserCTT">
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
            <Link class="nav-link" to="/oderUserDH">
              Đã hủy
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/oderUserYCTH">
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
      <Modal
        visible={isModalVisibleCannelOrder}
        onCancel={handleCannelOrderCancel}
        width={550}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <form onSubmit={handleSubmitReturns}>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Lí do hủy đơn:
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              onChange={handleCannelOrder}
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success">
            Xác nhận
          </button>
        </form>
      </Modal>
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
export default OderUserChoThanhToan;
