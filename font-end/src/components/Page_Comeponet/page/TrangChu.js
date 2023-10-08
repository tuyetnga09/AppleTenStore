import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import NewProduct from "./newProduct/NewProduct";
import ChipProduct from "./newProduct/ChipProduct";

export default function TrangChu(){

  const VND = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND'
  });

  return(
    <React.Fragment>
       <>
       <Header/>

      <section>
      {/* Start Banner */}
      <div className="banner">
            <div className="owl-carousel owl-theme owl-loaded owl-drag">
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transition: "all 0.45s ease 0s",
                    width: 17400,
                    transform: "translate3d(-4132px, 0px, 0px)"
                  }}
                >
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner5.png">
                        <img src="img/banners/banner5.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner6.png">
                        <img src="img/banners/banner6.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner7.png">
                        <img src="img/banners/banner7.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner8.png">
                        <img src="img/banners/banner8.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner9.png">
                        <img src="img/banners/banner9.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item active center"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner0.gif">
                        <img src="img/banners/banner0.gif" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner1.png">
                        <img src="img/banners/banner1.png" />
                      </a>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: 770, marginRight: 100 }}>
                    <div className="item">
                      <a target="_blank" href="img/banners/banner2.png">
                        <img src="img/banners/banner2.png" />
                      </a>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: 770, marginRight: 100 }}>
                    <div className="item">
                      <a target="_blank" href="img/banners/banner3.png">
                        <img src="img/banners/banner3.png" />
                      </a>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: 770, marginRight: 100 }}>
                    <div className="item">
                      <a target="_blank" href="img/banners/banner4.png">
                        <img src="img/banners/banner4.png" />
                      </a>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: 770, marginRight: 100 }}>
                    <div className="item">
                      <a target="_blank" href="img/banners/banner5.png">
                        <img src="img/banners/banner5.png" />
                      </a>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: 770, marginRight: 100 }}>
                    <div className="item">
                      <a target="_blank" href="img/banners/banner6.png">
                        <img src="img/banners/banner6.png" />
                      </a>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: 770, marginRight: 100 }}>
                    <div className="item">
                      <a target="_blank" href="img/banners/banner7.png">
                        <img src="img/banners/banner7.png" />
                      </a>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: 770, marginRight: 100 }}>
                    <div className="item">
                      <a target="_blank" href="img/banners/banner8.png">
                        <img src="img/banners/banner8.png" />
                      </a>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: 770, marginRight: 100 }}>
                    <div className="item">
                      <a target="_blank" href="img/banners/banner9.png">
                        <img src="img/banners/banner9.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner0.gif">
                        <img src="img/banners/banner0.gif" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner1.png">
                        <img src="img/banners/banner1.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner2.png">
                        <img src="img/banners/banner2.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner3.png">
                        <img src="img/banners/banner3.png" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="owl-item cloned"
                    style={{ width: 770, marginRight: 100 }}
                  >
                    <div className="item">
                      <a target="_blank" href="img/banners/banner4.png">
                        <img src="img/banners/banner4.png" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav disabled">
                <button type="button" role="presentation" className="owl-prev">
                  <span aria-label="Previous">‹</span>
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <span aria-label="Next">›</span>
                </button>
              </div>
              <div className="owl-dots">
                <button role="button" className="owl-dot active">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
                <button role="button" className="owl-dot">
                  <span />
                </button>
              </div>
            </div>
      </div>
          {" "}
        {/* End Banner */}
        <img src="img/banners/blackFriday.gif" alt="" style={{ width: "100%" }} />
        <br />
        <div class="companyMenu group flexContain">
          <a href="index.html?company=Apple"><img src="img/company/Apple.jpg"/></a>
          <a href="index.html?company=Samsung"><img src="img/company/Samsung.jpg"/></a>
          <a href="index.html?company=Samsung"><img src="img/company/Oppo.jpg"/></a>
          <a href="index.html?company=Samsung"><img src="img/company/Xiaomi.png"/></a>
          <a href="index.html?company=Samsung"><img src="img/company/Huawei.jpg"/></a>
         </div>
        <div className="flexContain">
          <div className="pricesRangeFilter dropdown">
            <button className="dropbtn">Giá tiền</button>
            <div class="dropdown-content">
              <a href="index.html?price=0-2000000">Dưới 2 triệu</a>
              <a href="index.html?price=2000000-4000000">Từ 2 - 4 triệu</a>
              <a href="index.html?price=4000000-7000000">Từ 4 - 7 triệu</a>
              <a href="index.html?price=7000000-13000000">Từ 7 - 13 triệu</a>
              <a href="index.html?price=13000000-0">Trên 13 triệu</a>
            </div>
          </div>
          <div className="promosFilter dropdown">
            <button className="dropbtn">Khuyến mãi</button>
            <div class="dropdown-content">
              <a href="index.html?promo=giamgia">Giảm giá</a>
              <a href="index.html?promo=tragop">Trả góp</a>
              <a href="index.html?promo=moiramat">Mới ra mắt</a>
              <a href="index.html?promo=giareonline">Giá rẻ online</a>
            </div>
          </div>
          <div className="starFilter dropdown">
            <button className="dropbtn">Số lượng sao</button>
            <div class="dropdown-content">
              <a href="index.html?star=3">Trên 2 sao</a>
              <a href="index.html?star=4">Trên 3 sao</a>
              <a href="index.html?star=5">Trên 4 sao</a>
            </div>
          </div>
          <div className="sortFilter dropdown">
            <button className="dropbtn">Sắp xếp</button>
            <div class="dropdown-content">
              <a href="index.html?sort=price-ascending">Giá tăng dần</a>
              <a href="index.html?sort=price-decrease">Giá giảm dần</a>
              <a href="index.html?sort=star-ascending">Sao tăng dần</a>
              <a href="index.html?sort=star-decrease">Sao giảm dần</a>
              <a href="index.html?sort=rateCount-ascending">Đánh giá tăng dần</a>
              <a href="index.html?sort=rateCount-decrease">Đánh giá giảm dần</a>
              <a href="index.html?sort=name-ascending">Tên A-Z</a>
              <a href="index.html?sort=name-decrease">Tên Z-A</a>
            </div>
          </div>
        </div>{" "}
        {/* End khung chọn bộ lọc */}
        <div className="choosedFilter flexContain">
          <a id="deleteAllFilter" style={{ display: "none" }}>
            <h3>Xóa bộ lọc</h3>
          </a>
        </div>{" "}
        {/* Những bộ lọc đã chọn */}
        <hr />
        {/* Mặc định mới vào trang sẽ ẩn đi, nế có filter thì mới hiện lên */}
        <div className="contain-products" style={{ display: "none" }}>
          <div className="filterName">
            <input
              type="text"
              placeholder="Lọc trong trang theo tên..."
              onkeyup="filterProductsName(this)"
            />
          </div>{" "}
          {/* End FilterName */}
          <ul id="products" className="homeproduct group flexContain">
            <div id="khongCoSanPham">
              <i className="fa fa-times-circle" />
              Không có sản phẩm nào
            </div>{" "}
            {/* End Khong co san pham */}
          </ul>
          {/* End products */}
          <div className="pagination" />
        </div>

        {/* Div hiển thị khung san pham hot, khuyến mãi, mới ra mắt ... */}
        <div className="contain-khungSanPham">
          <div className="khungSanPham" style={{ borderColor: "#ff9c00" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ff9c00 0%, #ec1f1f 50%, #ff9c00 100%)"
              }}
            >
              * NỔI BẬT NHẤT *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <li className="sanPham">
                <a href="/singleProduct">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/22701/dien-thoai-di-dong-Nokia-1280-dienmay.com-l.jpg"
                    alt=""
                  />
                  <h3>Nokia black future</h3>
                  <div className="price">
                    <strong>999.999.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>9999 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 1.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Nok1', 'Nokia black future'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Huawei-Nova-2i">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/157031/samsung-galaxy-a6-2018-2-600x600.jpg"
                    alt=""
                  />
                  <h3>Huawei Nova 2i</h3>
                  <div className="price">
                    <strong>3.990.000₫</strong>
                    <span>4.490.000₫</span>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>804 đánh giá</span>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Hua3', 'Huawei Nova 2i'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Xiaomi-Redmi-Note-5">
                  <img src="img/products/xiaomi-redmi-note-5-pro-600x600.jpg" alt="" />
                  <h3>Xiaomi Redmi Note 5</h3>
                  <div className="price">
                    <strong>5.690.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>372 đánh giá</span>
                  </div>
                  <label className="moiramat">Mới ra mắt</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Xia2', 'Xiaomi Redmi Note 5'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Xiaomi-Redmi-5-Plus-4GB">
                  <img src="img/products/xiaomi-redmi-5-plus-600x600.jpg" alt="" />
                  <h3>Xiaomi Redmi 5 Plus 4GB</h3>
                  <div className="price">
                    <strong>4.790.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>347 đánh giá</span>
                  </div>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Xia3', 'Xiaomi Redmi 5 Plus 4GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Itel-it2123">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/146651/itel-it2123-d-300-300x300.jpg"
                    alt=""
                  />
                  <h3>Itel it2123</h3>
                  <div className="price">
                    <strong>160.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>302 đánh giá</span>
                  </div>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Ite2', 'Itel it2123'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>{" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?star=3&sort=rateCount-decrease"
              style={{
                borderLeft: "2px solid #ff9c00",
                borderRight: "2px solid #ff9c00"
              }}
            >
              Xem tất cả 39 sản phẩm
            </a>
          </div>{" "}
          <hr />
          <NewProduct format={VND}></NewProduct>
          {" "}
          <hr />
          <div className="khungSanPham" style={{ borderColor: "#ff9c00" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ff9c00 0%, #ec1f1f 50%, #ff9c00 100%)"
              }}
            >
              * TRẢ GÓP 0% *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-8-Plus-64GB">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/114110/iphone-8-plus-hh-600x600.jpg"
                    alt=""
                  />
                  <h3>iPhone 8 Plus 64GB</h3>
                  <div className="price">
                    <strong>20.990.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>230 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App4', 'iPhone 8 Plus 64GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Vivo-Y71">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/158585/vivo-y71-docquyen-600x600.jpg"
                    alt=""
                  />
                  <h3>Vivo Y71</h3>
                  <div className="price">
                    <strong>3.290.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>60 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Viv3', 'Vivo Y71'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?SamSung-Galaxy-J4+">
                  <img
                    src="img/products/samsung-galaxy-j4-plus-pink-400x400.jpg"
                    alt=""
                  />
                  <h3>SamSung Galaxy J4+</h3>
                  <div className="price">
                    <strong>3.490.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <span>26 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Sam0', 'SamSung Galaxy J4+'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Samsung-Galaxy-A7-(2018)">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/194327/samsung-galaxy-a7-2018-128gb-black-400x400.jpg"
                    alt=""
                  />
                  <h3>Samsung Galaxy A7 (2018)</h3>
                  <div className="price">
                    <strong>8.990.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>22 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Sam3', 'Samsung Galaxy A7 (2018)'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Huawei-Nova-3">
                  <img src="img/products/huawei-nova-3-2-600x600.jpg" alt="" />
                  <h3>Huawei Nova 3</h3>
                  <div className="price">
                    <strong>9.990.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>22 đánh giá</span>
                  </div>
                  <label className="tragop">Trả góp 0%</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Hua1', 'Huawei Nova 3'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>{" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?promo=tragop&sort=rateCount-decrease"
              style={{
                borderLeft: "2px solid #ff9c00",
                borderRight: "2px solid #ff9c00"
              }}
            >
              Xem tất cả 11 sản phẩm
            </a>
          </div>{" "}
          <hr />
          <div className="khungSanPham" style={{ borderColor: "#5de272" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #5de272 0%, #007012 50%, #5de272 100%)"
              }}
            >
              * GIÁ SỐC ONLINE *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <li className="sanPham">
                <a href="chitietsanpham.html?Huawei-Nova-2i">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/157031/samsung-galaxy-a6-2018-2-600x600.jpg"
                    alt=""
                  />
                  <h3>Huawei Nova 2i</h3>
                  <div className="price">
                    <strong>3.990.000₫</strong>
                    <span>4.490.000₫</span>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>804 đánh giá</span>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Hua3', 'Huawei Nova 2i'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-X-256GB-Silver">
                  <img src="img/products/iphone-x-256gb-silver-400x400.jpg" alt="" />
                  <h3>iPhone X 256GB Silver</h3>
                  <div className="price">
                    <strong>27.990.000₫</strong>
                    <span>31.990.000₫</span>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>10 đánh giá</span>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App0', 'iPhone X 256GB Silver'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-Xr-64GB">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/190325/iphone-xr-black-400x460.png"
                    alt=""
                  />
                  <h3>iPhone Xr 64GB</h3>
                  <div className="price">
                    <strong>19.990.000₫</strong>
                    <span>22.990.000₫</span>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                    <span>5 đánh giá</span>
                  </div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App6', 'iPhone Xr 64GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-Xr-128GB">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-red-600x600.jpg"
                    alt=""
                  />
                  <h3>iPhone Xr 128GB</h3>
                  <div className="price">
                    <strong>22.990.000₫</strong>
                    <span>24.990.000₫</span>
                  </div>
                  <div className="ratingresult"></div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App3', 'iPhone Xr 128GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?iPhone-7-Plus-32GB">
                  <img src="img/products/iphone-7-plus-32gb-hh-600x600.jpg" alt="" />
                  <h3>iPhone 7 Plus 32GB</h3>
                  <div className="price">
                    <strong>16.990.000₫</strong>
                    <span>17.000.000₫</span>
                  </div>
                  <div className="ratingresult"></div>
                  <label className="giareonline">Giá rẻ online</label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('App2', 'iPhone 7 Plus 32GB'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>{" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?promo=giareonline&sort=rateCount-decrease"
              style={{
                borderLeft: "2px solid #5de272",
                borderRight: "2px solid #5de272"
              }}
            >
              Xem tất cả 5 sản phẩm
            </a>
          </div>{" "}
          <hr />
          <div className="khungSanPham" style={{ borderColor: "#ff9c00" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ff9c00 0%, #ec1f1f 50%, #ff9c00 100%)"
              }}
            >
              * GIẢM GIÁ LỚN *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <li className="sanPham">
                <a href="chitietsanpham.html?Oppo-F9">
                  <img src="img/products/oppo-f9-red-600x600.jpg" alt="" />
                  <h3>Oppo F9</h3>
                  <div className="price">
                    <strong>7.690.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>188 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 500.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Opp0', 'Oppo F9'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Nokia-5.1-Plus">
                  <img
                    src="img/products/nokia-51-plus-black-18thangbh-400x400.jpg"
                    alt=""
                  />
                  <h3>Nokia 5.1 Plus</h3>
                  <div className="price">
                    <strong>4.790.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>7 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 250.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Nok0', 'Nokia 5.1 Plus'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Samsung-Galaxy-A8+-(2018)">
                  <img
                    src="img/products/samsung-galaxy-a8-plus-2018-gold-600x600.jpg"
                    alt=""
                  />
                  <h3>Samsung Galaxy A8+ (2018)</h3>
                  <div className="price">
                    <strong>11.990.000₫</strong>
                  </div>
                  <div className="ratingresult"></div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 1.500.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Sam1', 'Samsung Galaxy A8+ (2018)'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Samsung-Galaxy-J8">
                  <img
                    src="img/products/samsung-galaxy-j8-600x600-600x600.jpg"
                    alt=""
                  />
                  <h3>Samsung Galaxy J8</h3>
                  <div className="price">
                    <strong>6.290.000₫</strong>
                  </div>
                  <div className="ratingresult"></div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 500.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Sam2', 'Samsung Galaxy J8'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>
              <li className="sanPham">
                <a href="chitietsanpham.html?Nokia-black-future">
                  <img
                    src="https://cdn.tgdd.vn/Products/Images/42/22701/dien-thoai-di-dong-Nokia-1280-dienmay.com-l.jpg"
                    alt=""
                  />
                  <h3>Nokia black future</h3>
                  <div className="price">
                    <strong>999.999.000₫</strong>
                  </div>
                  <div className="ratingresult">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <span>9999 đánh giá</span>
                  </div>
                  <label className="giamgia">
                    <i className="fa fa-bolt" /> Giảm 1.000₫
                  </label>
                  <div className="tooltip">
                    <button
                      className="themvaogio"
                      onclick="themVaoGioHang('Nok1', 'Nokia black future'); return false;"
                    >
                      <span className="tooltiptext" style={{ fontSize: 15 }}>
                        Thêm vào giỏ
                      </span>
                      +
                    </button>
                  </div>
                </a>
              </li>{" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?promo=giamgia"
              style={{
                borderLeft: "2px solid #ff9c00",
                borderRight: "2px solid #ff9c00"
              }}
            >
              Xem tất cả 8 sản phẩm
            </a>
          </div>{" "}
          <hr />
          <div className="khungSanPham" style={{ borderColor: "#5de272" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #5de272 0%, #007012 50%, #5de272 100%)"
              }}
            >
              * GIÁ RẺ CHO MỌI NHÀ *
            </h3>
            <div className="listSpTrongKhung flexContain">
              <ChipProduct format={VND}></ChipProduct>
              {" "}
            </div>
            <a
              className="xemTatCa"
              href="index.html?price=0-3000000&sort=price"
              style={{
                borderLeft: "2px solid #5de272",
                borderRight: "2px solid #5de272"
              }}
            >
              Xem tất cả 19 sản phẩm
            </a>
          </div>{" "}
          <hr />
        </div>

      </section>{" "}

      <i className="fa fa-arrow-up" id="goto-top-page" onclick="gotoTop()" />

      <Footer/>

    </>
    </React.Fragment>
  )
}
