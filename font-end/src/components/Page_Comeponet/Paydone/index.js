import "./style.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Paydone = () => {
  return (
    <>
      <Header />
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
            <p>VN Pay</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p>Địa chỉ nhận hàng:</p>
          </div>
          <div class="col-6">
            <p>Ngõ 2 Đại Lộ Thăng Long, Mễ Trì, Nam Từ Liêm, Hà Nội</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p>Số điện thoại:</p>
          </div>
          <div class="col-6">
            <p>0123456789</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p>Mã hóa đơn:</p>
          </div>
          <div class="col-6">
            <p>641239894131</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <b>Số tiền:</b>
          </div>
          <div class="col-6">
            <b>10.000.000đ</b>
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
