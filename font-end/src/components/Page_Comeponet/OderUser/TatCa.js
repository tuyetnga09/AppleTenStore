import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AvtProduct from "../../custumer_componet/avtProduct";
import { readAll } from "../../../service/BillDetail/billDetailCustomer.service";
import { readAllById } from "../../../service/Bill/billCustomer.service";
import {
  deleteBillById,
  returnBillById,
} from "../../../service/Bill/bill.service";
import { Avatar, Modal, Select, notification } from "antd";
const { Option } = Select;

const OderUserAll = () => {
  const [billDetails, setBillDetails] = useState([]);
  const [bills, setBills] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    readAllById(storedUser?.id)
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

    const loadBankList = async () => {
      const apiUrl = "https://api.vietqr.io/v2/banks";

      try {
        const response = await fetch(apiUrl);
        const data = response.json();
        data.then((res) => setBanks(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    loadBankList();
  }, [bills]);

  const result = bills.map((b, index) => {
    const completionDate = new Date(b.completionDate);
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
    return (
      <>
        <div className="row">
          <div className="col-10" style={{ paddingTop: "20px" }}>
            <strong>AppleTenStore</strong>{" "}
          </div>
          <div className="col-2">
            <span style={{ paddingTop: "20px", float: "right", color: "red" }}>
              {b.statusBill === "CHO_XAC_NHAN"
                ? "Chờ xác nhận"
                : b.statusBill === "CHO_VAN_CHUYEN"
                ? "Chờ vận chuyển"
                : b.statusBill === "VAN_CHUYEN"
                ? "Vận chuyển"
                : b.statusBill === "DA_THANH_TOAN"
                ? "Hoàn thành"
                : b.statusBill === "TRA_HANG"
                ? "Trả hàng"
                : "Đã hủy"}
            </span>
          </div>
        </div>
        <hr />
        {billDetails[index]?.map((bd) => {
          return (
            <div className="row">
              <div className="col-10">
                <p style={{ width: "300px" }}>
                  <AvtProduct product={6} />
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
            </div>
          );
        })}
        <hr />
        <div className="row">
          <div className="col-6">
            {b.statusBill === "CHO_XAC_NHAN" ? (
              <p>
                Sản phẩm sẽ được giao trước ngày <u>23-07-2003</u>
              </p>
            ) : b.statusBill === "CHO_VAN_CHUYEN" ? (
              <p>
                Dự kiến giao hàng ngày <u>23-07-2003</u>
              </p>
            ) : b.statusBill === "VAN_CHUYEN" ? (
              <p>
                Dự kiến giao hàng ngày <u>23-07-2003</u>
              </p>
            ) : b.statusBill === "DA_THANH_TOAN" ? (
              <p>
                Ngày hoàn thành đơn hàng <u>{formattedDateStart}</u>
              </p>
            ) : (
              ""
            )}
          </div>
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
              {b.statusBill === "CHO_XAC_NHAN" ? (
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={() => handleCannelOrderClick(b)}
                >
                  Hủy đơn
                </button>
              ) : b.statusBill === "CHO_VAN_CHUYEN" ? (
                ""
              ) : b.statusBill === "VAN_CHUYEN" ? (
                ""
              ) : b.statusBill === "DA_THANH_TOAN" && khoangCachNgay <= 3 ? (
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={() => handleNoteReturnsClick(b)}
                >
                  Trả hàng
                </button>
              ) : (
                <button type="button" class="btn btn-light">
                  Mua lại
                </button>
              )}
            </div>
          </div>
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
    deleteBillById(billReturn.id, billReturn.note).then((response) =>
      console.log(response.data)
    );
    setIsModalVisibleCannelOrder(false);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
    notification.error({
      message: "Hủy đơn",
      description: "Hủy đơn thành công",
    });
  };

  const [isModalVisibleNoteReturns, setIsModalVisibleNoteReturns] =
    useState(false); // Trạng thái hiển thị Modal

  const handleNoteReturnsClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.id,
    });
    setIsModalVisibleNoteReturns(true);
  };

  // Hàm để ẩn Modal
  const handleNoteReturnsCancel = () => {
    setIsModalVisibleNoteReturns(false);
    console.log(billReturn);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
    const stk = document.getElementById("stk");
    stk.value = "";
  };
  const [idNganHang, setIdNganHang] = useState();
  const handleNoteReturns = (event) => {
    const stk = document.getElementById("stk").value;
    const updatedNote = `${event.target.value}, Ngân hàng: ${idNganHang}, STK: ${stk}`;
    setBillReturn({
      ...billReturn,
      note: updatedNote,
    });
  };

  function returnBill(id, noteReturn) {
    returnBillById(id, null, noteReturn).then((response) =>
      console.log(response.data)
    );
  }

  function handleSelectBank(value) {
    const note = document.getElementById("exampleFormControlTextarea1").value;
    const stk = document.getElementById("stk").value;
    setIdNganHang(value);
    const updatedNote = `${note}, Ngân hàng: ${value}, STK: ${stk}`;
    setBillReturn({
      ...billReturn,
      note: updatedNote,
    });
    console.log(billReturn);
    console.log(updatedNote);
  }

  function handleSoTaiKhoan(event) {
    const note = document.getElementById("exampleFormControlTextarea1").value;
    const updatedNote = `${note}, Ngân hàng: ${idNganHang}, STK: ${event.target.value}`;
    setBillReturn({
      ...billReturn,
      note: updatedNote,
    });
    console.log(billReturn);
  }

  const handleSubmitReturns2 = (event) => {
    event.preventDefault();
    returnBill(billReturn.id, billReturn.note);
    setIsModalVisibleNoteReturns(false);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
    notification.success({
      message: "Trả hàng",
      description: "Bạn sẽ nhận được tiền khi người bán nhận lại hàng",
    });
  };

  return (
    <>
      <Header />
      <br />
      <section>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/oderUserAll">
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
            <Link class="nav-link" to="/oderUserDH">
              Đã hủy
            </Link>
          </li>
        </ul>
      </section>
      <section>{result}</section>
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
      <Modal
        visible={isModalVisibleNoteReturns}
        onCancel={handleNoteReturnsCancel}
        width={550}
        footer={null}
        bodyStyle={{ minHeight: "150px" }}
      >
        <form onSubmit={handleSubmitReturns2}>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Lí do trả hàng:
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              required
              onChange={handleNoteReturns}
            ></textarea>
            <label for="exampleFormControlTextarea1" class="form-label">
              Ngân hàng:
            </label>
            <Select
              style={{ width: "100%", height: "100%" }}
              onChange={handleSelectBank}
            >
              {banks.map((option) => (
                <Option key={option.id} value={option.shortName} id={option.id}>
                  <Avatar
                    size="small"
                    src={option.logo}
                    style={{ width: "50%", height: "100%" }}
                  />
                  {option.shortName}
                </Option>
              ))}
            </Select>
            <br />
            <label for="exampleFormControlTextarea1" class="form-label">
              Nhập số tài khoản:
            </label>
            <div class="input-group mb-3">
              <input
                type="number"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                id="stk"
                onChange={handleSoTaiKhoan}
              />
            </div>
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
export default OderUserAll;
