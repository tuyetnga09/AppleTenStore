import * as React from "react";
import "../Checkout/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../Page_Comeponet/layout/Header";
import Footer from "../../Page_Comeponet/layout/Footer";
import { useState } from "react";

const Checkout = () => {
  const [isLogin, setIsGLogin] = useState([false]);

  useEffect(() => {}, [isLogin]);

  function giaoTanNoi() {
    const select = document.getElementById("floatingSelect1");
    select.hidden = true;
    const input = document.getElementById("floatingSelect2");
    input.hidden = false;
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = true;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = false;
  }

  function nhanTaiCuaHang() {
    const select = document.getElementById("floatingSelect1");
    select.hidden = false;
    const input = document.getElementById("floatingSelect2");
    input.hidden = true;
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = true;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = false;
  }

  function diaChiMacDinh() {
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = false;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = true;
  }

  function test() {
    setIsGLogin(true);
    if (isLogin == true) {
      const divDcmd = document.getElementById("dcmd");
      divDcmd.hidden = false;
    }
  }

  return (
    <>
      <Header />
      <button onClick={() => test()}>test</button>
      <main role="main">
        <div class="container mt-4">
          <form
            class="needs-validation"
            name="frmthanhtoan"
            method="post"
            action="#"
          >
            <input type="hidden" name="kh_tendangnhap" value="dnpcuong"></input>
            <div class="py-5 text-center">
              <i class="fa fa-credit-card fa-4x" aria-hidden="true"></i>
              <h2>Thanh toán</h2>
              <p class="lead">
                Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước
                khi Đặt hàng.
              </p>
            </div>
            <div class="row">
              <div class="col-md-4 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="text-muted">Giỏ hàng</span>
                  <span class="badge badge-secondary badge-pill">2</span>
                </h4>
                <ul class="list-group mb-3">
                  <input
                    type="hidden"
                    name="sanphamgiohang[1][sp_ma]"
                    value="2"
                  ></input>
                  <input
                    type="hidden"
                    name="sanphamgiohang[1][gia]"
                    value="11800000.00"
                  ></input>
                  <input
                    type="hidden"
                    name="sanphamgiohang[1][soluong]"
                    value="2"
                  ></input>
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">Apple Ipad 4 Wifi 16GB</h6>
                      <small class="text-muted">11800000.00 x 2</small>
                    </div>
                    <span class="text-muted">23600000</span>
                  </li>
                  <input
                    type="hidden"
                    name="sanphamgiohang[2][sp_ma]"
                    value="4"
                  ></input>
                  <input
                    type="hidden"
                    name="sanphamgiohang[2][gia]"
                    value="14990000.00"
                  ></input>
                  <input
                    type="hidden"
                    name="sanphamgiohang[2][soluong]"
                    value="8"
                  ></input>
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">Apple iPhone 5 16GB White</h6>
                      <small class="text-muted">14990000.00 x 8</small>
                    </div>
                    <span class="text-muted">119920000</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Tổng thành tiền</span>
                    <strong>143520000</strong>
                  </li>
                </ul>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Mã khuyến mãi"
                  ></input>
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-secondary">
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-8 order-md-1">
                <h4 class="mb-3">Thông tin khách hàng</h4>
                <div class="row">
                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tên"
                    ></input>
                    <br />
                  </div>
                  <div className="row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Số điện thoại"
                      ></input>
                    </div>
                    <div class="col-md-6">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                      ></input>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <br />
                    <b for="kh_ngaysinh">Hình thức nhận hàng</b>
                    <div class="custom-control custom-radio">
                      <input
                        id="htnn_4"
                        name="htnn_ma"
                        type="radio"
                        class="custom-control-input"
                        required=""
                        value="1"
                        checked
                        onClick={() => nhanTaiCuaHang()}
                      ></input>
                      <label class="custom-control-label" for="htnn_4">
                        Nhận tại cửa hàng
                      </label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        id="htnn_5"
                        name="htnn_ma"
                        type="radio"
                        class="custom-control-input"
                        required=""
                        value="2"
                        onClick={() => giaoTanNoi()}
                      ></input>
                      <label class="custom-control-label" for="htnn_5">
                        Giao tận nơi
                      </label>
                    </div>
                    <div class="custom-control custom-radio" id="dcmd" hidden>
                      <input
                        id="htnn_6"
                        name="htnn_ma"
                        type="radio"
                        class="custom-control-input"
                        required=""
                        value="3"
                        onClick={() => diaChiMacDinh()}
                        hidden
                      ></input>
                      <label class="custom-control-label" for="htnn_6">
                        Địa chỉ mặc định
                      </label>
                    </div>
                  </div>
                  <div className="row" id="notDcmd">
                    <div class="col-md-6">
                      <br />
                      <label for="kh_cmnd">Tỉnh, thành phố:</label>
                      <select
                        class="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                      >
                        <option selected>Chọn tỉnh, thành phố</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <br />
                      <label for="kh_cmnd">Quận, huyện:</label>
                      <select
                        class="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                      >
                        <option selected>Chọn quận, huyện</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div class="col-md-12">
                      <br />
                      <select
                        class="form-select"
                        id="floatingSelect1"
                        aria-label="Floating label select example"
                      >
                        <option selected>Mời bạn chọn địa chỉ cửa hàng</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div class="col-md-12">
                      <input
                        hidden
                        id="floatingSelect2"
                        class="form-control"
                        type="text"
                        placeholder="Địa chỉ cụ thể"
                        aria-label="default input example"
                      />
                    </div>
                  </div>
                  <div id="dcmd2" hidden>
                    <br />
                    <label for="kh_cmnd">Mời bạn chọn địa chỉ mặc định:</label>
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      <option selected>Chọn tỉnh, thành phố</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <br />
                <h4 class="mb-3">Hình thức thanh toán</h4>
                <div class="d-block my-3">
                  <div class="custom-control custom-radio">
                    <input
                      id="httt-1"
                      name="httt_ma"
                      type="radio"
                      class="custom-control-input"
                      required=""
                      value="1"
                      checked
                    ></input>
                    <label class="custom-control-label" for="httt-1">
                      Tiền mặt
                    </label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input
                      id="httt-2"
                      name="httt_ma"
                      type="radio"
                      class="custom-control-input"
                      required=""
                      value="2"
                    ></input>
                    <label class="custom-control-label" for="httt-2">
                      VN Pay
                    </label>
                  </div>
                  <hr class="mb-4" />
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                    name="btnDatHang"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
