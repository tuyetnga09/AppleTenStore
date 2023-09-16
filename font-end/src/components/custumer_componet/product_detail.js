import React from "react";
import Header from "../Page_Comeponet/layout/Header";
import Footer from "../Page_Comeponet/layout/Footer";

export default function TrangChu() {
  return (
    <React.Fragment>
      <>
        <Header />
        <section>
        <div id="productNotFound" style="min-height: 50vh; text-align: center; margin: 50px; display: none;">
            <h1 style="color: red; margin-bottom: 10px;">Không tìm thấy sản phẩm</h1>
            <a href="index.html" style="text-decoration: underline;">Quay lại trang chủ</a>
        </div>
        <div className="chitietSanpham" style="margin-bottom: 100px">
            <h1>Điện thoại </h1>
            <div className="rating"></div>
            <div className="rowdetail group">
                <div className="picture">
                 <img src="" onClick={opencertain} />
                </div>
                <div class="price_sale">
                    <div class="area_price"> </div>
                    <div className="ship" style={{ display: shouldDisplay ? 'block' : 'none' }}>
    <img src="img/chitietsanpham/clock-152067_960_720.png" alt="Clock Icon" />
    <div>NHẬN HÀNG TRONG 1 GIỜ</div>
</div>

                    <div class="area_promo">
                        <strong>khuyến mãi</strong>
                        <div class="promo">
                            <img src="img/chitietsanpham/icon-tick.png" >
                            <div id="detailPromo"> </div>
                        </div>
                    </div>
                    <div class="policy">
                        <div>
                            <img src="img/chitietsanpham/box.png">
                            <p>Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp lưng </p>
                        </div>
                        <div>
                            <img src="img/chitietsanpham/icon-baohanh.png">
                            <p>Bảo hành chính hãng 12 tháng.</p>
                        </div>
                        <div class="last">
                            <img src="img/chitietsanpham/1-1.jpg">
                            <p>1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1 ngày.</p>
                        </div>
                    </div>
                    <div class="area_order">
                        <!-- nameProduct là biến toàn cục được khởi tạo giá trị trong phanTich_URL_chiTietSanPham -->
                        <a class="buy_now" onclick="themVaoGioHang(maProduct, nameProduct);">
                            <b><i class="fa fa-cart-plus"></i> Thêm vào giỏ hàng</b>
                            <p>Giao trong 1 giờ hoặc nhận tại cửa hàng</p>
                        </a>
                    </div>
                </div>
                <div class="info_product">
                    <h2>Thông số kỹ thuật</h2>
                    <ul class="info">
                    </ul>
                </div>
            </div>
            <div id="overlaycertainimg" class="overlaycertainimg">
                <div class="close" onclick="closecertain()">&times;</div>
                <div class="overlaycertainimg-content">
                    <img id="bigimg" class="bigimg" src="img/chitietsanpham/oppo-f9-red-2-400x460.png">
                    <div class="div_smallimg owl-carousel">
                        <!-- <img src="img/chitietsanpham/oppo-f9-mau-do-1-org.jpg" onclick="changepic(this.src)">
                        <img src="img/chitietsanpham/oppo-f9-mau-do-2-org.jpg" onclick="changepic(this.src)">
                        <img src="img/chitietsanpham/oppo-f9-mau-do-3-org.jpg" onclick="changepic(this.src)"> -->
                    </div>
                </div>
            </div>
        </div>
        </section>
        <Footer />
      </>
    </React.Fragment>
  );
}
