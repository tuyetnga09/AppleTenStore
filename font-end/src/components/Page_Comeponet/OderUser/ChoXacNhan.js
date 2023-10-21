import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AvtProduct from "../../custumer_componet/avtProduct";
const OderUserChoThanhToan = () => {
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
      <section>
        <div className="row">
          <div className="col-10" style={{ paddingTop: "20px" }}>
            <strong>AppleTenStore</strong>{" "}
          </div>
          <div className="col-2">
            <span style={{ paddingTop: "20px", float: "right", color: "red" }}>
              Chờ xác nhận
            </span>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-10">
            <p style={{ width: "300px" }}>
              <AvtProduct product={7} />
            </p>
            <strong>Iphone 11 512GB White</strong>
            <p style={{ fontSize: "13px", color: "gray" }}>
              Phân loại hàng: Iphone
            </p>
            <strong>x1</strong>
          </div>
          <div className="col-2">
            <p style={{ float: "right" }}>60000</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            Sản phẩm sẽ được giao trước ngày <u>23-07-2003</u>
          </div>
          <div className="col-6">
            <span style={{ float: "right" }}>Thành tiền: 3000000</span>
            <br />
            <br />
            <div style={{ float: "right" }}>
              <button type="button" class="btn btn-danger">
                Liên hệ người bán
              </button>{" "}
              <button type="button" class="btn btn-light">
                Hủy đơn hàng
              </button>
            </div>
          </div>
        </div>
      </section>
      <br />
      <Footer />
    </>
  );
};
export default OderUserChoThanhToan;
