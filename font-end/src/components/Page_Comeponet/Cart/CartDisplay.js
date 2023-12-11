import React, { useState, useEffect, useRef } from "react";
import {
  readAll,
  deleteCartDetail,
  updateQuantity,
  update,
  getQuantityCartDetailBySku,
  getCartSession,
  getbysku,
  deleteAllCart,
} from "../../../service/cart.service";
import Header from "../../Page_Comeponet/layout/Header";
import Footer from "../../Page_Comeponet/layout/Footer";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RightOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { notification } from "antd";
import { getOneSKU } from "../../../service/sku.service";
import AvtProduct from "../../custumer_componet/avtProduct";
import { event } from "jquery";
import { DateField } from "@refinedev/antd";
import queryString from "query-string";
import { readQuantityInCart } from "../../../service/cart.service";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function CartDisplay() {
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const idAccount = storedUser !== null ? storedUser.id : ""; //sau khi đăng nhập thì truyền idAccount vào đây
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [quantitySKU, setQuantitySKU] = useState(0);
  // const [number, setNumber] = useState(0);

  // Sử dụng dữ liệu cartItems để hiển thị giỏ hàng
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  const skuIds = cartItems ? cartItems.map((item) => item.idSKU) : []; // Lấy danh sách idSKU từ mảng cartItems

  const requests = cartItems ? skuIds.map((idSKU) => getbysku(idSKU)) : []; // Tạo mảng các promise từ việc gọi API

  const [quantity, setQuantity] = useState([]);
  const storedBill = JSON.parse(localStorage.getItem("bill"));

  const toast = useRef(null);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (idAccount !== null && idAccount !== "") {
      readAll(idAccount)
        .then((response) => {
          setProducts(response.data);
          // setNumber(response.data.total);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    } else {
      Promise.all(requests)
        .then((responses) => {
          const productsData = responses.map((response, index) => {
            const cartItem = cartItems[index];
            // Tạo một đối tượng sản phẩm mới có thông tin từ API và số lượng từ giỏ hàng
            return {
              capacity: cartItem.capacity,
              color: cartItem.color,
              idProduct: cartItem.idProduct,
              idSKU: cartItem.idSKU,
              nameProduct: cartItem.nameProduct,
              quantitySKU: cartItem.quantitySKU,
              quantity: cartItem.quantity,
              price: cartItem.price,
              total: cartItem.quantity * cartItem.price,
            };
          });
          setProducts(productsData);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
    if (idAccount !== null && idAccount !== "") {
      readQuantityInCart(idAccount)
        .then((response) => {
          console.log(response.data);
          setQuantity(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    } else {
      // Tính tổng số lượng sản phẩm trong giỏ hàng
      const totalQuantity = cartItems.reduce(
        (total, product) => total + product.quantity,
        0
      );
      setQuantity(totalQuantity);
    }
  }, [storedBill, loaded]);

  async function remove(id, idSKU) {
    if (idAccount !== null && idAccount !== "") {
      await deleteCartDetail(id).then(() => {
        let newArr = [...products].filter((s) => s.idCartDetail !== id);
        setProducts(newArr);
        setLoaded(!loaded);
        console.log(products);
        console.log(newArr);
      });
    } else {
      // Xóa sản phẩm khỏi sessionStorage nếu không có idAccount
      const updatedCartItems = cartItems.filter((item) => item.idSKU !== idSKU);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // Cập nhật trạng thái trong ứng dụng React
      setProducts(updatedCartItems);
      calculateTotalPrice();
      setLoaded(!loaded);
    }
  }

  const [sku, setSKU] = useState([]);

  const handleUpdateQuantity = (cartItemId, newQuantity, idSKUC) => {
    if (newQuantity == 0) {
      newQuantity = 1;
    } else if (newQuantity < 0) {
      // xóa sản phẩm khỏi giỏ hàng khi so luong bang 0
      notification.error({
        message: "Giỏ hàng",
        description: "Không được nhập số lượng âm",
      });
    } else {
      if (idAccount !== null && idAccount !== "") {
        update(cartItemId, newQuantity)
          .then((response) => {
            readAll(idAccount)
              .then((response) => {
                setProducts(response.data);
              })
              .catch((error) => {
                console.log("Lỗi khi đọc lại giỏ hàng:", error);
              });
            readQuantityInCart(idAccount)
              .then((response) => {
                console.log(response.data);
                setQuantity(response.data);
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`Lỗi khi cập nhật số lượng: ${error}`);
          });
      } else {
        // Cập nhật số lượng sản phẩm trong sessionStorage nếu không có idAccount
        const updatedCartItems = cartItems.map((item) => {
          if (item.idSKU === idSKUC) {
            item.quantity = newQuantity;
            item.total = newQuantity * item.price;
          }
          const totalQuantity = cartItems.reduce(
            (total, product) => total + product.quantity,
            0
          );
          setQuantity(totalQuantity);
          return item;
        });

        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        setProducts(updatedCartItems);
        calculateTotalPrice();
      }
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    calculateTotalPrice();
  }, [products]);
  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      // Chuyển đổi giá trị total từ dạng chuỗi sang số và cộng vào tổng
      const productTotal = parseFloat(product.total);
      total += productTotal;
    });
    // Đặt lại giá trị tổng giá tiền
    setTotalPrice(total);
  };

  //check tien hanh đặt hàng
  const handleClickTienHangDH = () => {
    if (products === null || products.length === 0) {
      notification.error({
        message: "ĐẶT HÀNG",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng",
      });
    } else {
      history.push("/checkout");
    }
  };
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Giỏ hàng",
      detail: "Xin mời tiếp tục.",
      life: 3000,
    });
  };

  const confirmXoaAllGioHang = () => {
    confirmDialog({
      message: "Bán có muốn xóa hết giỏ hàng?",
      header: "Giỏ hàng",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleRemoveAllFromCart(),
      reject,
    });
  };
  //xóa all giỏ hàng
  const handleRemoveAllFromCart = () => {
    if (idAccount !== null && idAccount !== "") {
      if (products.length !== 0) {
        // setLoaded(!loaded);
        deleteAllCart(idAccount).then(() => {
          notification.success({
            message: "Giỏ hàng",
            description: "Xóa thành công",
          });
          readAll(idAccount)
            .then((response) => {
              setProducts(response.data);
            })
            .catch((error) => {
              console.log(`${error}`);
            });
            setQuantity("");
        });
      }
    } else {
      if (sessionStorage.getItem("cartItems") !== null) {
        // setLoaded(!loaded);
        sessionStorage.removeItem("cartItems");
        setProducts([]);
        setTotalPrice(0);
        setQuantity("");
        notification.success({
          message: "Giỏ hàng",
          description: "Xóa thành công",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <>
      <Toast ref={toast} />
      <ConfirmDialog />
        <div class="top-nav group">
          <section>
            <div class="social-top-nav">
              <a class="fa fa-facebook"></a>
              <a class="fa fa-twitter"></a>
              <a class="fa fa-google"></a>
              <a class="fa fa-youtube"></a>
            </div>
            {/* <!-- End Social Topnav --> */}

            <ul class="top-nav-quicklink flexContain">
              <li>
                <Link to="/">
                  <i className="fa fa-newspaper-o"></i> Trang chủ
                </Link>
              </li>

              <li>
                <Link to="/blog">
                  <i className="fa fa-newspaper-o"></i> Blogs
                </Link>
              </li>

              <li>
                <Link to="/chat">
                  <i className="fa fa-newspaper-o"></i> Liên hệ/Chat
                </Link>
              </li>
              <li>
                <a href="gioithieu.html">
                  <i class="fa fa-info-circle"></i> Giới thiệu
                </a>
              </li>
              <li>
                <a href="trungtambaohanh.html">
                  <i class="fa fa-wrench"></i> Bảo hành
                </a>
              </li>
              <li>
                <Link to="/policy">
                  <i className="fa fa-newspaper-o"></i>Chính sách
                </Link>
              </li>
            </ul>
            {/* <!-- End Quick link --> */}
          </section>
          {/* <!-- End Section --> */}
        </div>
        {/* <!-- End Top Nav  --> */}
        <div className="header group">
          <div className="logo">
            <Link to="/">
              <img
                src="/img/logo.jpg"
                alt="Trang chủ Smartphone Store"
                title="Trang chủ Smartphone Store"
              />
            </Link>
          </div>{" "}
          {/* End Logo */}
          <div className="content">
            <div
              className="search-header"
              style={{ position: "relative", left: 162, top: 1 }}
            >
              {/* <form className="input-search" method="get" action="index.html">
                <div className="autocomplete">
                  <input
                    id="search-box"
                    name="search"
                    autoComplete="off"
                    type="text"
                    placeholder="Tìm kiếm..."
                  />
                  <button type="submit">
                    <i className="fa fa-search" />
                    Tìm kiếm
                  </button>
                </div>
              </form>{" "} */}
              {/* End Form search */}
              {/* <div className="tags">
                <strong>Từ khóa: </strong>
                <a href="index.html?search=Samsung">Iphone 11</a>
                <a href="index.html?search=Samsung">Iphone 12</a>
                <a href="index.html?search=Samsung">Iphone 13</a>
              </div> */}
            </div>{" "}
            {/* End Search header */}
            <div className="tools-member">
              <div className="cart">
                <Link to={storedUser !== null ? "/profile" : "/login"}>
                  {storedUser?.user?.avatar == null ||
                  storedUser?.user?.avatar == "" ? (
                    <img
                      style={{ width: 36, height: 36 }}
                      class="img-account-profile rounded-circle mb-2"
                      src={
                        "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      style={{ width: 36, height: 36 }}
                      class="img-account-profile rounded-circle mb-2"
                      src={`/imageUpload/` + storedUser?.user?.avatar}
                      alt=""
                    />
                  )}{" "}
                  {/* {account == null ? "Tài khoản" : account.user.fullName} */}
                  {localStorage.getItem("account") !== null
                    ? storedUser?.user?.fullName
                    : "Tài khoản"}
                </Link>
                {/* <div className="menuMember hide">
            <a href="nguoidung.html">Trang người dùng</a>
            <a onclick="if(window.confirm('Xác nhận đăng xuất ?')) logOut();">
              Đăng xuất
            </a>
          </div> */}
              </div>{" "}
              {/* End Member */}
              <div className="cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-cart" /> <span>Giỏ hàng</span>
                  <span className="cart-number">{quantity}</span>
                </Link>
              </div>{" "}
              {/* End Cart */}
              <div class="check-order">
                {/* <Link to="/oderUserAll">
                  <i class="fa fa-truck"></i>
                  <span>Đơn hàng</span>
                </Link> */}
                <Link
                  to={storedUser === null ? "/oderCustomerAll" : "/oderUserAll"}
                >
                  <i class="fa fa-truck"></i> <span>Đơn hàng</span>
                </Link>
              </div>
            </div>
          </div>
          {/* End Tools Member */}
        </div>{" "}
        {/* End Content */} {/* End Header */}
        <section>
          <div className="breadcrumbs_area">
            <div className="row" style={{ marginTop: "10px" }}>
              <div id="detailPromo">
                <Link to={"/"}>Home</Link>
                <RightOutlined />
                <Link to={"/cart"}>Cart</Link>
              </div>
            </div>
          </div>
          <section
            className="h-100 h-custom"
            style={{ backgroundColor: "#eee", marginBottom: "20px" }}
          >
            <div className="container h-100 py-5">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col">
                  <div
                    className="card shopping-cart"
                    style={{ borderRadius: 15 }}
                  >
                    <div className="card-body text-black">
                      <div className="row">
                        {/* <div className="col-lg-6 px-5 py-4"> */}
                        <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                          Giỏ hàng
                        </h3>
                        <div style={{ maxHeight: 290, overflow: "auto" }}>
                          <table>
                            <thead>
                              <tr style={{ textAlign: "center" }}>
                                <th>
                                  <h5 className="fw-bold mb-0 me-5 pe-3">
                                    Ảnh
                                  </h5>
                                </th>
                                <th>
                                  <h5 className="fw-bold mb-0 me-5 pe-3">
                                    Sản phẩm
                                  </h5>
                                </th>
                                <th>
                                  <h5 className="fw-bold mb-0 me-5 pe-3">
                                    Giá
                                  </h5>
                                </th>
                                <th>
                                  <h5 className="fw-bold mb-0 me-5 pe-3">SL</h5>
                                </th>
                                <th>
                                  <h5 className="fw-bold mb-0 me-5 pe-3">
                                    Thành tiền
                                  </h5>
                                </th>
                                <th>
                                  <h5 className="fw-bold mb-0 me-5 pe-3">
                                    Thời gian
                                  </h5>
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.map((product, index) => (
                                <tr class="alert" role="alert">
                                  <td>
                                    <div className="flex-shrink-0">
                                      <AvtProduct
                                        product={product.idProduct}
                                      ></AvtProduct>
                                    </div>
                                  </td>
                                  <td>
                                    <h5
                                      className="text-primary"
                                      style={{ paddingTop: "15px" }}
                                    >
                                      {product.nameProduct}
                                    </h5>
                                    <p style={{ fontSize: "15px" }}>
                                      Dung lượng: {product.capacity}
                                      <br />
                                      Màu sắc: {product.color}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="fw-bold mb-0 me-5 pe-3">
                                      {parseFloat(product.price).toLocaleString(
                                        "vi-VN",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
                                    </p>
                                  </td>
                                  <td>
                                    <div
                                      className="def-number-input number-input safari_only"
                                      style={{ paddingRight: "10px" }}
                                    >
                                      <button
                                        onClick={() => {
                                          const quantity =
                                            document.getElementById(
                                              `quantity-${index}`
                                            );
                                          quantity.value = product.quantity - 1;
                                          console.log(quantity.value);
                                          if (quantity.value <= 0) {
                                            notification.error({
                                              message: "Giỏ hàng",
                                              description:
                                                "Số lượng phải lớn hơn 0",
                                            });
                                            quantity.value = 1;
                                          }
                                          handleUpdateQuantity(
                                            product.idCartDetail,
                                            product.quantity - 1,
                                            product.idSKU
                                          );
                                        }}
                                        className="minus"
                                      />
                                      <input
                                        id={`quantity-${index}`}
                                        className="quantity fw-bold text-black"
                                        min={0}
                                        name="quantity"
                                        type="number"
                                        defaultValue={product.quantity}
                                        onChange={() => {
                                          if (
                                            idAccount !== null &&
                                            idAccount !== ""
                                          ) {
                                            getOneSKU(product.idSKU).then(
                                              (res) => {
                                                setQuantitySKU(
                                                  res.data.quantity
                                                );
                                              }
                                            );
                                          }
                                        }}
                                        onBlur={(event) => {
                                          if (
                                            idAccount !== null &&
                                            idAccount !== ""
                                          ) {
                                            if (event.target.value <= 0) {
                                              notification.error({
                                                message: "Giỏ hàng",
                                                description:
                                                  "Vui lòng kiểm tra lại số lượng",
                                              });
                                              const quantity =
                                                document.getElementById(
                                                  `quantity-${index}`
                                                );
                                              quantity.value = product.quantity;
                                              handleUpdateQuantity(
                                                product.idCartDetail,
                                                product.quantity,
                                                product.idSKU
                                              );
                                            } else if (
                                              event.target.value >
                                              parseInt(quantitySKU)
                                              // +
                                              //   parseInt(product.quantity)
                                            ) {
                                              notification.error({
                                                message: "Giỏ hàng",
                                                description:
                                                  "Không thể nhập quá số lượng đang có",
                                              });
                                              const quantity =
                                                document.getElementById(
                                                  `quantity-${index}`
                                                );
                                              quantity.value = quantitySKU;
                                              handleUpdateQuantity(
                                                product.idCartDetail,
                                                product.quantity,
                                                product.idSKU
                                              );
                                            } else {
                                              const quantity =
                                                document.getElementById(
                                                  `quantity-${index}`
                                                );
                                              quantity.value =
                                                event.target.value;
                                              handleUpdateQuantity(
                                                product.idCartDetail,
                                                event.target.value,
                                                product.idSKU
                                              );
                                            }
                                          } else {
                                            const newQuantity = parseInt(
                                              event.target.value
                                            );
                                            if (newQuantity < 1) {
                                              // Kiểm tra số lượng không được nhỏ hơn 1
                                              notification.error({
                                                message: "Giỏ hàng",
                                                description:
                                                  "Vui lòng kiểm tra lại số lượng",
                                              });
                                              const quantity =
                                                document.getElementById(
                                                  `quantity-${index}`
                                                );
                                              quantity.value = 1;
                                              handleUpdateQuantity(
                                                product.idCartDetail,
                                                1,
                                                product.idSKU
                                              );
                                            } else {
                                              // Kiểm tra số lượng trong giỏ hàng với số lượng có sẵn
                                              if (
                                                newQuantity <=
                                                product.quantitySKU
                                              ) {
                                                handleUpdateQuantity(
                                                  product.idCartDetail,
                                                  newQuantity,
                                                  product.idSKU
                                                );
                                              } else {
                                                notification.error({
                                                  message: "Giỏ hàng",
                                                  description:
                                                    "Không thể nhập quá số lượng đang có",
                                                });
                                                const quantity =
                                                  document.getElementById(
                                                    `quantity-${index}`
                                                  );
                                                quantity.value =
                                                  product.quantity;
                                                handleUpdateQuantity(
                                                  product.idCartDetail,
                                                  product.quantity,
                                                  product.idSKU
                                                );
                                              }
                                            }
                                          }
                                        }}
                                      />
                                      <button
                                        onClick={() => {
                                          if (
                                            idAccount !== null &&
                                            idAccount !== ""
                                          ) {
                                            getOneSKU(product.idSKU).then(
                                              (res) => {
                                                const quantity =
                                                  document.getElementById(
                                                    `quantity-${index}`
                                                  );
                                                quantity.value =
                                                  parseInt(product.quantity) +
                                                  1;
                                                if (
                                                  quantity.value >
                                                  parseInt(res.data.quantity)
                                                  // + parseInt(product.quantity)
                                                ) {
                                                  notification.error({
                                                    message: "Giỏ hàng",
                                                    description:
                                                      "Không thể nhập quá số lượng đang có",
                                                  });
                                                  quantity.value = parseInt(
                                                    res.data.quantity
                                                  );
                                                  // +
                                                  // parseInt(product.quantity);
                                                }
                                              }
                                            );
                                            handleUpdateQuantity(
                                              product.idCartDetail,
                                              parseInt(product.quantity) + 1,
                                              product.idSKU
                                            );
                                          } else {
                                            const quantity =
                                              document.getElementById(
                                                `quantity-${index}`
                                              );
                                            const newQuantity =
                                              product.quantity + 1;

                                            // Kiểm tra số lượng trong giỏ hàng với số lượng có sẵn
                                            if (
                                              newQuantity <= product.quantitySKU
                                            ) {
                                              quantity.value = newQuantity;
                                              handleUpdateQuantity(
                                                product.idCartDetail,
                                                newQuantity,
                                                product.idSKU
                                              );
                                            } else {
                                              notification.error({
                                                message: "Giỏ hàng",
                                                description:
                                                  "Không thể nhập quá số lượng đang có",
                                              });
                                            }
                                          }
                                        }}
                                        className="plus"
                                      />
                                    </div>
                                    <p
                                      style={{ fontSize: "10px", color: "red" }}
                                    >
                                      Còn {product.quantitySKU} sản phẩm
                                    </p>
                                  </td>
                                  <td>
                                    <p className="fw-bold mb-0 me-5 pe-3">
                                      {parseFloat(product.total).toLocaleString(
                                        "vi-VN",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="fw-bold mb-0 me-5 pe-3">
                                      <DateField
                                        value={product.dateCreate}
                                        format="DD/MM/YYYY"
                                      />
                                    </p>
                                  </td>

                                  <td>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="alert"
                                      aria-label="Close"
                                      onClick={() => {
                                        remove(
                                          product.idCartDetail,
                                          product.idSKU
                                        );
                                      }}
                                    >
                                      <span aria-hidden="true">
                                        <FontAwesomeIcon
                                          icon={faTimes}
                                          style={{ paddingRight: "10px" }}
                                        />
                                      </span>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div
                          class="d-grid gap-2 d-md-flex justify-content-md-end"
                          style={{ marginTop: "10px" }}
                        >
                          {/* <button
                            class="btn btn-outline-primary me-md-2"
                            type="button"
                          >
                            Cập nhật giỏ hàng
                          </button> */}
                          <button
                            class="btn btn-outline-primary me-md-2"
                            type="button"
                            onClick={() => confirmXoaAllGioHang()}
                          >
                            Xóa hết
                          </button>
                        </div>
                        <hr
                          className="mb-4"
                          style={{
                            height: 2,
                            backgroundColor: "#1266f1",
                            opacity: 1,
                            width: "98%",
                            marginTop: "20px",
                          }}
                        />
                        <div
                          className="d-flex justify-content-between p-2 mb-2"
                          style={{ backgroundColor: "#e1f5fe" }}
                        >
                          <h5 className="fw-bold mb-0">Tồng tiền:</h5>
                          <h5 className="fw-bold mb-0">
                            {totalPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                          </h5>
                        </div>

                        <div class="d-grid gap-2 col-6 mx-auto">
                          {/* <Link to={"/checkout"}> */}
                          <button
                            type="button"
                            className="btn btn-danger btn-block btn-lg"
                            onClick={() => handleClickTienHangDH()}
                          >
                            TIẾN HÀNH ĐẶT HÀNG
                          </button>
                          {/* </Link> */}
                        </div>
                        <h5 className="fw-bold mb-5" style={{ bottom: 0 }}>
                          <Link to="/">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Tiếp tục mua hàng
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </>
    </React.Fragment>
  );
}
