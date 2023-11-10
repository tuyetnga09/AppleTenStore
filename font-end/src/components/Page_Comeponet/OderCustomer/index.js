import React, { useEffect, useRef, useState } from "react";
import { readByCodeBill } from "../../../service/Bill/billCustomer.service";
import { readAllByCustomer } from "../../../service/BillDetail/billDetailCustomer.service";
import AvtProduct from "../../custumer_componet/avtProduct";
import { Toast } from "primereact/toast";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const OderCustomerAll = () => {
  const toast = useRef(null);
  const [bill, setBill] = useState([]);
  const [code, setCode] = useState();
  const [billDetails, setBillDetails] = useState([]);
  const [isShowContent, setIsShowContent] = useState(true);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  useEffect(() => {}, [code]);

  const handleSubmit = (event) => {
    event.preventDefault();
    readByCodeBill(code)
      .then((res) => {
        setBill(res.data);
        console.log(res.data);
        readAllByCustomer(res.data.id)
          .then((res) => {
            setBillDetails(res.data);
            console.log(res.data);
            setIsShowContent(false);
          })
          .catch((err) => {
            console.log(err);
            toast.current.show({
              severity: "error",
              summary: "TÌM HÓA ĐƠN",
              detail: "Không tìm thấy hóa đơn",
              life: 3000,
            });
            setIsShowContent(true);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(bill);
  };

  return (
    <>
      <Toast ref={toast} />
      <Header />
      <div className="container" style={{ marginTop: "30px" }}>
        <h1>Tìm kiếm đơn hàng</h1>
        <form class="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Nhập mã hóa đơn"
            aria-label="Search"
            required
            onChange={handleChange}
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <section hidden={isShowContent}>
          <div className="row">
            <div className="col-10" style={{ paddingTop: "20px" }}>
              <strong>AppleTenStore</strong>{" "}
            </div>
            <div className="col-2">
              <span
                style={{ paddingTop: "20px", float: "right", color: "red" }}
              >
                {bill.statusBill === "CHO_XAC_NHAN"
                  ? "Chờ xác nhận"
                  : bill.statusBill === "CHO_VAN_CHUYEN"
                  ? "Chờ vận chuyển"
                  : bill.statusBill === "VAN_CHUYEN"
                  ? "Vận chuyển"
                  : bill.statusBill === "DA_THANH_TOAN"
                  ? "Hoàn thành"
                  : "Đã hủy"}
              </span>
            </div>
          </div>
          <hr />
          {billDetails?.map((bd) => {
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
                    {parseFloat(bd.price).toLocaleString("vi-VN", {
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
              {bill.statusBill === "CHO_XAC_NHAN" ? (
                <p>
                  Sản phẩm sẽ được giao trước ngày <u>23-07-2003</u>
                </p>
              ) : bill.statusBill === "CHO_VAN_CHUYEN" ? (
                <p>
                  Dự kiến giao hàng ngày <u>23-07-2003</u>
                </p>
              ) : bill.statusBill === "VAN_CHUYEN" ? (
                <p>
                  Dự kiến giao hàng ngày <u>23-07-2003</u>
                </p>
              ) : bill.statusBill === "DA_THANH_TOAN" ? (
                ""
              ) : (
                ""
              )}
            </div>
            <div className="col-6">
              <span style={{ float: "right" }}>
                Thành tiền:{" "}
                {parseFloat(bill.totalMoney).toLocaleString("vi-VN", {
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
                {bill.statusBill === "CHO_XAC_NHAN" ? (
                  <button type="button" class="btn btn-light">
                    Hủy đơn
                  </button>
                ) : bill.statusBill === "CHO_VAN_CHUYEN" ? (
                  ""
                ) : bill.statusBill === "VAN_CHUYEN" ? (
                  ""
                ) : bill.statusBill === "DA_THANH_TOAN" ? (
                  <button type="button" class="btn btn-light">
                    Mua lại
                  </button>
                ) : (
                  <button type="button" class="btn btn-light">
                    Mua lại
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default OderCustomerAll;
