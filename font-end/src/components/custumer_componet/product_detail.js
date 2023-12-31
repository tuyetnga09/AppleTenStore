import React, { useState, useEffect } from "react";
import Header from "../Page_Comeponet/layout/Header";
import Footer from "../Page_Comeponet/layout/Footer";
import { Button, Tag, notification } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Slide } from "react-slideshow-image";
import {
  Link,
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { detail } from "../../service/product.service";
import {
  addToCart,
  getQuantityCartDetailBySku,
  addToCartSession,
} from "../../service/cart.service";
import { getSKUProduct } from "../../service/sku.service";
import queryString from "query-string";
import AvtProduct from "./avtProduct";
import { readAll } from "../../service/product.service";
import Pagination from "../../components/product_component/Size/Paging";
import ImageProduct from "../../components/Page_Comeponet/page/ImageProduct";
import PriceProduct from "../../components/Page_Comeponet/page/PriceProducts";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/topnav.css";
import "../../css/header.css";
import "../../css/banner.css";
import "../../css/taikhoan.css";
import "../../css/home_products.css";
import "../../css/cart.css";
import "../../css/chitietsanpham.css";
import "../../css/pagination_phantrang.css";
import "../../css/topnav.css";
import "../../css/gioHang.css";
import "../../css/footer.css";
import "../../css/trangchu.css";
import "../../css/style2.css";
import "../../css/slide.css";
import "../../css/owl.theme.default.min.css";
import { getAllImage } from "../../service/image.service";

export default function ProductDetail() {
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const idAccount = storedUser !== null ? storedUser.id : ""; //sau khi đăng nhập thì truyền idAccount vào đây

  const { id } = useParams();

  const [item, setItem] = useState({});

  const [item2, setItem2] = useState({});

  const [listImages, setListImages] = useState([]);

  const [index, setIndex] = useState(0);

  const [imageTemp, setImageTemp] = useState("");

  const [filtersSKU, setFiltersSKU] = useState({
    capacity: "",
    color: "",
    idProduct: "",
  });

  const [filters, setFilters] = useState({
    page: 0,
    key: "",
  });

  const history = useHistory();

  const [display, setDisplay] = useState([]);

  const [productFilter, setProductFilter] = useState([]);

  const [quantityNoiBat, setQuantityNoiBat] = useState([]);
  const [loaded, setLoaded] = useState(false);
  function goToTop() {
    window.scrollTo({
      top: 0, // Cuộn lên vị trí đầu trang
      behavior: "smooth", // Hiệu ứng cuộn mượt
    });
    setLoaded(!loaded);
  }

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    totalRows: 1,
  });

  useEffect(() => {
    detail(id)
      .then((response) => {
        setItem(response.data);
        console.log(response.data.colors);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    const paramsString = queryString.stringify(filtersSKU);
    getSKUProduct(paramsString)
      .then((response) => {
        setItem2(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    getAllImage(id)
      .then((response) => {
        setListImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const paramsStringProduct = queryString.stringify(filters);
    readAll(paramsStringProduct)
      .then((response) => {
        setDisplay(response.data.content);
        setProductFilter(
          response.data.content.map((dl) => {
            return (
              <li className="sanPham" onClick={() => goToTop()}>
                <Link to={`/productDetail/${dl.id}`}>
                  <ImageProduct product={dl.id}></ImageProduct>
                  <h3>{dl.name}</h3>
                  <div className="price">
                    <PriceProduct product={dl.id}></PriceProduct>
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
                </Link>
              </li>
            );
          })
        );
        setQuantityNoiBat(response.data.totalElements);
        setPagination(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filtersSKU, loaded]);

  const [selectedDungLuong, setSelectedDungLuong] = useState(null);

  const dungLuong = item.capacities
    ? item.capacities
        .map((cp) => cp.name)
        .sort((a, b) => {
          // Trích xuất giá trị số từ chuỗi, ví dụ: '512GB' -> 512
          const aGB = parseInt(a);
          const bGB = parseInt(b);

          // So sánh dựa trên giá trị số
          return aGB - bGB;
        })
    : [];

  const handleDungLuongClick = (dungLuong) => {
    setSelectedDungLuong(dungLuong);
    let item = { ...filtersSKU };
    item["capacity"] = dungLuong;
    setFiltersSKU(item);
  };

  const [selectedMauSac, setSelectedMauSac] = useState(null);

  const MauSac = item.colors ? item.colors.map((cl) => cl.name) : [];

  const handleMauSacClick = (MauSac) => {
    setSelectedMauSac(MauSac);
    let itemS = { ...filtersSKU };
    itemS["color"] = MauSac;
    itemS["idProduct"] = item.id;
    setFiltersSKU(itemS);
    console.log("ttt" + filtersSKU);
  };

  const handleAddToCart = () => {
    if (selectedDungLuong && selectedMauSac) {
      // Tạo một đối tượng AddCart để gửi lên API
      // Kiểm tra xem người dùng đã đăng nhập hay chưa
      if (idAccount !== null && idAccount !== "") {
        const addToCartData = {
          idAccount: idAccount,
          idSKU: item2.id,
          price: item2.price,
          quantity: 1,
        };
        // Nếu người dùng đã đăng nhập, sử dụng API để thêm vào DB
        getQuantityCartDetailBySku(item2.id, idAccount)
          .then((response) => {
            console.log(response.data);
            if (item2.quantity <= response.data) {
              notification.error({
                message: "Thêm vào giỏ hàng",
                description: "Số lượng trong kho không đủ",
              });
            } else if (item2.status === 1) {
              notification.error({
                message: "Thêm vào giỏ hàng",
                description: "Sản phẩm đã ngừng bán",
              });
            } else {
              addToCart(addToCartData)
                .then((response) => {
                  console.log(
                    "Sản phẩm đã được thêm vào giỏ hàng.",
                    response.data
                  );
                  history.push("/cart");
                })
                .catch((error) => {
                  console.log("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
                });
            }
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        const addToCartData = {
          idAccount: idAccount,
          idSKU: item2.id,
          price: item2.price,
          quantity: 1,
          nameProduct: item.name,
          capacity: item2.capacity,
          color: item2.color,
          idProduct: item.id,
          total: item2.price,
          quantitySKU: item2.quantity,
        };
        // Nếu chưa đăng nhập, lưu vào Session Storage
        const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
        let found = false;

        for (let i = 0; i < cartItems.length; i++) {
          if (cartItems[i].idSKU === addToCartData.idSKU) {
            // Tìm thấy sản phẩm với cùng idSKU, tăng số lượng
            cartItems[i].quantity += addToCartData.quantity;
            found = true;
            break;
          }
        }
        if (!found) {
          // Không tìm thấy sản phẩm, thêm sản phẩm vào giỏ hàng
          cartItems.push(addToCartData);
        }
        // Kiểm tra số lượng sản phẩm trong giỏ hàng
        const existingCartItem = cartItems.find(
          (item) => item.idSKU === addToCartData.idSKU
        );
        if (
          item2.quantity <= 0 ||
          existingCartItem.quantity - addToCartData.quantity >= item2.quantity
        ) {
          notification.error({
            message: "Thêm vào giỏ hàng",
            description: "Số lượng trong kho không đủ",
          });
        } else {
          sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
          history.push("/cart");
        }
      }
    } else {
      notification.warning({
        message: "Thêm vào giỏ hàng",
        description: "Vui lòng chọn Dung Lương và Màu sắc",
      });
    }
  };

  function noiBatNhat() {
    let item = { page: 0, key: "" };
    setFilters(item);
  }

  const outstandingProducts = display.map((dl) => {
    return (
      <li className="sanPham" onClick={() => goToTop()}>
        <Link to={`/productDetail/${dl.id}`}>
          <ImageProduct product={dl.id}></ImageProduct>
          <h3>{dl.name}</h3>
          <div className="price">
            <PriceProduct product={dl.id}></PriceProduct>
          </div>
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
        </Link>
      </li>
    );
  });

  function previousValue() {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(listImages.length - 1);
    }
  }

  function nextValue() {
    if (index < listImages.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function setValueForImageTemp(name) {
    setImageTemp(name);
  }

  return (
    <React.Fragment>
      <Header />
      <section>
        <div className="breadcrumbs_area">
          <div className="row" style={{ marginTop: "10px" }}>
            <div id="detailPromo">
              <Link to={"/"}>Home</Link>
              <RightOutlined />
              <Link to={`/productDetail/${item.id}`}>Singer Product</Link>
            </div>
          </div>
        </div>
        {/* <span>tttt {item2[0].quantity}</span> */}
        <div className="chitietSanpham" style={{ marginBottom: 100 }}>
          <h1>
            {item.name && item.name} {item2.capacity} {item2.color}
          </h1>
          <div className="rowdetail group">
            {imageTemp === "" ? (
              <AvtProduct product={id}></AvtProduct>
            ) : (
              <div className="picture">
                <img src={`/imageUpload/` + imageTemp} alt="" />
              </div>
            )}
            <div className="slide-container" style={{ marginLeft: "85px" }}>
              <div className="previous">
                <button onClick={previousValue}>
                  <i className="bi bi-caret-left-fill"></i>
                </button>
              </div>
              <div
                className="small-picture"
                onClick={() => setValueForImageTemp(listImages.at(index)?.name)}
              >
                <img
                  src={`/imageUpload/` + listImages.at(index)?.name}
                  alt=""
                />
              </div>
              {index < listImages.length - 1 ? (
                <div
                  className="small-picture"
                  onClick={() =>
                    setValueForImageTemp(listImages.at(index + 1)?.name)
                  }
                >
                  <img
                    src={`/imageUpload/${listImages.at(index + 1)?.name}`}
                    alt=""
                  />
                </div>
              ) : (
                <div
                  className="small-picture"
                  onClick={() => setValueForImageTemp(listImages.at(0)?.name)}
                >
                  <img src={`/imageUpload/${listImages.at(0)?.name}`} alt="" />
                </div>
              )}

              <div className="next">
                <button onClick={nextValue}>
                  <i className="bi bi-caret-right-fill"></i>
                </button>
              </div>
            </div>
            <div className="price_sale">
              <div className="area_price">
                {item2 && item2.price ? (
                  <strong>
                    {item2.price?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strong>
                ) : item && item.price ? (
                  <PriceProduct product={id}></PriceProduct>
                ) : (
                  <PriceProduct product={id}></PriceProduct>
                )}
                {item2.status === 0 ? (
                  <label className="giamgia">
                    Số lượng:{" "}
                    {item2 && item2.quantity
                      ? item2.quantity && item2.quantity
                      : item2 && item2.quantity === 0
                      ? item2.quantity && item2.quantity
                      : item && item.quantity
                      ? item.quantity && item.quantity
                      : null}
                  </label>
                ) : (
                  ""
                )}
                {item2.status === 1 ? (
                  <label className="giamgia">Ngừng bán</label>
                ) : (
                  ""
                )}
                {item2.quantity === 0 ? (
                  <label className="giamgia">Hết hàng</label>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="ship" style={{ display: "none" }}>
                <img src="img/chitietsanpham/clock-152067_960_720.png" />
                <div>NHẬN HÀNG TRONG 1 GIỜ</div>
              </div> */}
              <div className="area_promo">
                <strong style={{ marginLeft: "10px" }}>DUNG LƯỢNG</strong>
                <div className="button-container">
                  {dungLuong.map((dungLuong, index) => (
                    <Button
                      key={index}
                      type={
                        selectedDungLuong === dungLuong ? "primary" : "default"
                      }
                      onClick={() => handleDungLuongClick(dungLuong)}
                      style={{
                        marginLeft: "5px",
                        marginBottom: "10px",
                        marginRight: "5px",
                      }}
                    >
                      {dungLuong}
                    </Button>
                  ))}
                </div>
                <strong style={{ marginLeft: "10px" }}>MÀU SẮC</strong>
                <div className="button-container">
                  {MauSac.map((MauSac, index) => (
                    <Button
                      key={index}
                      type={selectedMauSac === MauSac ? "primary" : "default"}
                      onClick={() => handleMauSacClick(MauSac)}
                      style={{
                        marginLeft: "5px",
                        marginBottom: "10px",
                        marginRight: "5px",
                      }}
                    >
                      {MauSac}
                    </Button>
                  ))}
                </div>
              </div>
              {/* <div className="area_price">
                <label className="giamgia">
                  Số lượng phân loại: {item2.quantity && item2.quantity}
                </label>
              </div> */}
              {/* </div> */}
              <div className="area_promo">
                <strong>khuyến mãi</strong>
                <div className="promo">
                  <img src="/img/chitietsanpham/icon-tick.png" />
                  <div id="detailPromo">
                    Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể trả
                    máy lỗi trong vòng 3 ngày.
                  </div>
                </div>
              </div>
              <div className="policy">
                <div>
                  <img src="/img/chitietsanpham/box.png" />
                  <p>
                    Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp
                    lưng{" "}
                  </p>
                </div>
                <div>
                  <img src="/img/chitietsanpham/icon-baohanh.png" />
                  <p>Bảo hành chính hãng 12 tháng.</p>
                </div>
                <div className="last">
                  <img src="/img/chitietsanpham/1-1.jpg" />
                  <p>
                    Trả hàng trong vòng 3 ngày kể từ khi thanh toán nếu sản phẩm
                    có lỗi.
                  </p>
                </div>
              </div>
              <div className="area_order">
                {/* nameProduct là biến toàn cục được khởi tạo giá trị trong phanTich_URL_chiTietSanPham */}
                <a className="buy_now" onClick={() => handleAddToCart()}>
                  <b>
                    <i className="fa fa-cart-plus" /> Thêm vào giỏ hàng
                  </b>
                  <p>Giao trong 1 giờ hoặc nhận tại cửa hàng</p>
                </a>
              </div>
            </div>
            <div className="info_product" style={{ marginTop: "35px" }}>
              <h2>Thông số kỹ thuật</h2>
              <ul className="info">
                <li>
                  <p>Màn hình</p>
                  <div>{item.idscreen && item.idscreen.name}</div>
                </li>
                {/* <li>
                  <p>Hệ điều hành</p>
                  <div>Android 8.1 (Oreo)</div>
                </li>
                <li>
                  <p>Camara sau</p>
                  <div>12 MP và 5 MP (2 camera)</div>
                </li>
                <li>
                  <p>Camara trước</p>
                  <div>13 MP</div>
                </li> */}
                <li>
                  <p>CPU</p>
                  <div>{item.idchip && item.idchip.name}</div>
                </li>
                <li>
                  <p>RAM</p>
                  <div>{item.idRam && item.idRam.name}</div>
                </li>
                <li>
                  <p>Bộ nhớ trong</p>
                  <div>{dungLuong[0]}</div>
                </li>
                {/* <li>
                  <p>Thẻ nhớ</p>
                  <div>MicroSD, hỗ trợ tối đa 128 GB</div>
                </li> */}
                <li>
                  <p>Dung lượng pin</p>
                  <div>{item.idbattery && item.idbattery.name}</div>
                </li>
              </ul>
            </div>
          </div>
          <div id="overlaycertainimg" className="overlaycertainimg">
            <div className="close" onclick="closecertain()">
              ×
            </div>
            <div className="overlaycertainimg-content">
              <img
                id="bigimg"
                className="bigimg"
                src="img/products/xiaomi-redmi-note-5-pro-600x600.jpg"
              />
              <div className="div_smallimg owl-carousel owl-loaded owl-drag">
                {/* <img src="img/chitietsanpham/oppo-f9-mau-do-1-org.jpg" onclick="changepic(this.src)">
                          <img src="img/chitietsanpham/oppo-f9-mau-do-2-org.jpg" onclick="changepic(this.src)">
                          <img src="img/chitietsanpham/oppo-f9-mau-do-3-org.jpg" onclick="changepic(this.src)"> */}
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transition: "all 0s ease 0s",
                      width: 2135,
                      transform: "translate3d(610px, 0px, 0px)",
                    }}
                  >
                    <div
                      className="owl-item active center"
                      style={{ width: "304.96px" }}
                    >
                      <div className="item">
                        <a>
                          <img
                            src="img/products/huawei-mate-20-pro-green-600x600.jpg"
                            onclick="changepic(this.src)"
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "304.96px" }}
                    >
                      <div className="item">
                        <a>
                          <img
                            src="img/chitietsanpham/oppo-f9-mau-do-1-org.jpg"
                            onclick="changepic(this.src)"
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: "304.96px" }}
                    >
                      <div className="item">
                        <a>
                          <img
                            src="img/chitietsanpham/oppo-f9-mau-do-2-org.jpg"
                            onclick="changepic(this.src)"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: "304.96px" }}>
                      <div className="item">
                        <a>
                          <img
                            src="img/chitietsanpham/oppo-f9-mau-do-3-org.jpg"
                            onclick="changepic(this.src)"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: "304.96px" }}>
                      <div className="item">
                        <a>
                          <img
                            src="img/products/huawei-mate-20-pro-green-600x600.jpg"
                            onclick="changepic(this.src)"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: "304.96px" }}>
                      <div className="item">
                        <a>
                          <img
                            src="img/chitietsanpham/oppo-f9-mau-do-3-org.jpg"
                            onclick="changepic(this.src)"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: "304.96px" }}>
                      <div className="item">
                        <a>
                          <img
                            src="img/products/huawei-mate-20-pro-green-600x600.jpg"
                            onclick="changepic(this.src)"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="owl-nav disabled">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <span aria-label="Previous">‹</span>
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* hien thi san pham           */}
        <div id="goiYSanPham">
          <div className="khungSanPham" style={{ borderColor: "#434aa8" }}>
            <h3
              className="tenKhung"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #434aa8 0%, #ec1f1f 50%, #434aa8 100%)",
              }}
            >
              * Bạn có thể thích *
            </h3>
            <div className="listSpTrongKhung flexContain">
              {outstandingProducts}
            </div>
            {/* {quantityNoiBat > 10 ? (
              <Link
                className="xemTatCa"
                to="/"
                onClick={() => noiBatNhat()}
                style={{
                  borderLeft: "2px solid #ff9c00",
                  borderRight: "2px solid #ff9c00",
                }}
              >
                Xem tất cả {quantityNoiBat} sản phẩm
              </Link>
            ) : (
              ""
            )} */}
          </div>
        </div>
      </section>
      <i
        className="fa fa-arrow-up"
        id="goto-top-page"
        onClick={() => goToTop()}
      />
      <Footer />
    </React.Fragment>
  );
}
