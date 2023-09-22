import React from "react";
import Header from "../Page_Comeponet/layout/Header";
import Footer from "../Page_Comeponet/layout/Footer";
import "../../css/productDetail.css";
export default function TrangChu() {
  return (
    <React.Fragment>
      <Header />
      <section>
        <div id="productNotFound" style={{ minHeight: "50vh", textAlign: "center", margin: "50px", display: "none" }}>
          <h1 style={{ color: "red", marginBottom: "10px" }}>Không tìm thấy sản phẩm</h1>
          <a href="index.html" style={{ textDecoration: "underline" }}>Quay lại trang chủ</a>
        </div>
        <div className="chitietSanpham" style={{ marginBottom: "100px" }}>
          <h1>Điện thoại</h1>
          <div className="rating"></div>
          <div className="rowdetail group">
            <div className="picture">
              <img src=""  alt="Product Image" />
            </div>
            <div className="price_sale">
              <div className="area_price"></div>
              <div className="ship" style={{display: 'none' }}>
                <img src="img/chitietsanpham/clock-152067_960_720.png" alt="Clock Icon" />
                <div>NHẬN HÀNG TRONG 1 GIỜ</div>
              </div>

              <div className="area_promo">
                <strong>khuyến mãi</strong>
                <div className="promo">
                  <img src="img/chitietsanpham/icon-tick.png" alt="Icon Tick" />
                  <div id="detailPromo"> </div>
                </div>
              </div>

              <div className="policy">
                <div>
                  <img src="img/chitietsanpham/box.png" alt="Icon Tick" />
                  <p>Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp lưng</p>
                </div>
                <div>
                  <img src="img/chitietsanpham/icon-baohanh.png" alt="Bảo hành" />
                  <p>Bảo hành chính hãng 12 tháng.</p>
                </div>
                <div className="last">
                  <img src="img/chitietsanpham/1-1.jpg" alt="Hình sản phẩm" />
                  <p>1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1 ngày.</p>
                </div>
              </div>
              <div className="area_order">
                <a className="buy_now">
                  <b><i className="fa fa-cart-plus"></i> Thêm vào giỏ hàng</b>
                  <p>Giao trong 1 giờ hoặc nhận tại cửa hàng</p>
                </a>
              </div>
            </div>
            <div className="info_product">
              <h2>Thông số kỹ thuật</h2>
              <ul className="info"></ul>
            </div>
          </div>
          <div id="overlaycertainimg" className="overlaycertainimg">
            <div className="close" ></div>
            <div className="overlaycertainimg-content">
              <img id="bigimg" className="bigimg" src="img/chitietsanpham/oppo-f9-red-2-400x460.png" alt="bigimg" />
              <div className="div_smallimg owl-carousel">
                <img src="img/chitietsanpham/oppo-f9-mau-do-1-org.jpg"  />
                <img src="img/chitietsanpham/oppo-f9-mau-do-2-org.jpg" />
                <img src="img/chitietsanpham/oppo-f9-mau-do-3-org.jpg"/>
              </div>
            </div>
          </div>
        </div>
        <div id="goiYSanPham"></div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
