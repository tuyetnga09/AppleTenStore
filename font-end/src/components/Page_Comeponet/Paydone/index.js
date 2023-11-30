import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import {
  createBill,
  createBillAccount,
  findBillByCode,
} from "../../../service/Bill/bill.service";
import { notification } from "antd";

const Paydone = () => {
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const storedBill = JSON.parse(localStorage.getItem("bill"));
  const storedBill2 = JSON.parse(localStorage.getItem("bill2"));
  const idAccount = storedUser !== null ? storedUser.id : "";
  const [bill, setBill] = useState({});
  const [test, setTest] = useState(false);
  const { code } = useParams();
  const history = useHistory();
  let url = window.location.href;

  // Tách các tham số truyền vào từ URL
  let params = new URLSearchParams(url.split("?")[1]);

  // Lấy giá trị của tham số vnp_ResponseCode
  let vnpResponseCode = params.get("vnp_ResponseCode");

  // Chuỗi URL
  console.log(vnpResponseCode); // Kết quả: "00"
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (parseInt(vnpResponseCode) === 24) {
      setTest(true);
    }

    if (test === true) {
      if (parseInt(vnpResponseCode) === 24) {
        notification.error({
          message: "THANH TOÁN",
          description: "Thanh toán thất bại, mời bạn mua hàng",
        });
        history.push("/");
      } else {
        setLoading(true);
        // Lấy URL hiện tại
        var currentURL = window.location.href;

        // Xóa tất cả các tham số
        var newURL = currentURL.split("?")[0];

        // Cập nhật URL
        window.history.replaceState({}, document.title, newURL);

        if (idAccount !== "") {
          createBillAccount(storedBill)
            .then((response) => {
              console.log(response.data);
              findBillByCode(storedBill?.code)
                .then((response) => {
                  setBill(response.data);
                  console.log(response.data);
                  localStorage.removeItem("bill");
                  setLoading(false);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          createBill(storedBill)
            .then((response) => {
              console.log(response.data);
              findBillByCode(storedBill?.code)
                .then((response) => {
                  setBill(response.data);
                  console.log(response.data);
                  localStorage.removeItem("bill");
                  setLoading(false);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
          sessionStorage.removeItem("cartItems");
        }
      }
    } else {
      findBillByCode(storedBill2?.code)
        .then((response) => {
          setBill(response.data);
          console.log(response.data);
          localStorage.removeItem("bill2");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setTest(true);
  }, [test]);

  return (
    <>
      <Header />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "10px",
            zIndex: "9999", // Đặt z-index lớn hơn phần nền
          }}
        >
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div class="ctn2">
        <h1>Thanh toán thành công!</h1>
        <img
          src="https://static.vecteezy.com/system/resources/previews/010/152/358/non_2x/tick-icon-sign-symbol-design-free-png.png"
          alt="Dấu tích"
          width="100px"
        />
        <p>Cảm ơn bạn đã thực hiện thanh toán.</p>
        <div class="row">
          <div class="col-6">
            <p>Hình thức thanh toán:</p>
          </div>
          <div class="col-6">
            <p>
              {bill.paymentMethod === "TIEN_MAT" ? "Tiền mặt" : "Chuyển khoản"}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p>Địa chỉ nhận hàng:</p>
          </div>
          <div class="col-6">
            <p>{bill.address}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p>Số điện thoại:</p>
          </div>
          <div class="col-6">
            <p>{bill.phoneNumber}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p>Mã hóa đơn:</p>
          </div>
          <div class="col-6">
            <p>{bill.code}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <b>Số tiền:</b>
          </div>
          <div class="col-6">
            <b>
              {parseFloat(bill.totalMoney).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </b>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6">
            <Link to="/">
              {" "}
              <button type="button" class="btn btn-outline-success">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        </div>
        <br />
        <p>
          Mọi thắc mắc, hỗ trợ vui lòng gọi <b>0365.231.256</b> hoặc
          <b>1900.6626</b>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Paydone;
