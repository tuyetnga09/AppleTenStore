import React, { useState, useEffect, useRef } from "react";
import { useTranslate } from "@refinedev/core";
import { ShoppingCartOutlined, GiftOutlined } from "@ant-design/icons";
import {
  Layout,
  theme,
  DatePicker,
  FallOutlined,
  RiseOutlined,
  Modal,
  Select,
  Image,
  Button,
  Table,
  notification,
} from "antd";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getVoucher,
  getVoucherFreeShip,
} from "../../../service/Voucher/voucher.service";
import { getSKUProductFormSell } from "../../../service/sku.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AvtProduct from "../../custumer_componet/avtProduct";
import queryString from "query-string";
import Pagination from "./Paging";
import {
  addToCartOffline,
  readAllCartOff,
  updateQuantityOff,
  deleteCartDetailOff,
} from "../../../service/cart.service";
import { getOneSKU } from "../../../service/sku.service";
import { addCustomerOffline } from "../../../service/Customer/customer.service";
import { useHistory } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export default function SellSmart() {
  const idNhanVien = 5; // truyền id nhân viên đăng nhập vào đây
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal khách hàng
  const [isModalVisibleVoucher, setIsModalVisibleVoucher] = useState(false); // Trạng thái hiển thị Modal Voucher
  const [voucher, setVoucher] = useState([]);
  const [selecteVoucher, setSelectedVoucher] = useState(0);
  const [voucherFreeShip, setVoucherFreeShip] = useState([true]);
  const [selecteVoucherFreeShip, setSelectedVoucherFreeShip] = useState(0);
  const [skuProduct, setSkuProduct] = useState([]);
  const [cartIemts, setCartItems] = useState([]);
  const [quantitySKU, setQuantitySKU] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);//tổng tiền sản phẩm
  const [priceShip, setPriceShip] = useState([]);//tiền ship
  const [soTienThanhToan, setSoTienThanhToan] = useState([]);//số tiền khách cần trả
  const[tienThua, setTienThua] = useState([]);//tiền thiếu

  const [customer, setCustomer] = useState({
    fullName: '', // Đổi từ 'full_name' thành 'fullName'
    email: '', // Giữ nguyên
    phoneNumber: '', // Đổi từ 'phone_number' thành 'phoneNumber'
  });
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    totalRows: 1,
  });
  const [filters, setFilters] = useState({
    page: 0,
    key: "",
  });

  useEffect(() => {
    //lấy danh sách voucher
    getVoucher()
      .then((response) => {
        console.log(response.data);
        setVoucher(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    //lấy danh sách voucher
    getVoucherFreeShip()
      .then((response) => {
        console.log(response.data);
        setVoucherFreeShip(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    //lấy danh sách sanr phaam
    const paramsString = queryString.stringify(filters);
    getSKUProductFormSell(paramsString)
      .then((response) => {
        console.log(response.data.content);
        setSkuProduct(response.data.content);
        setPagination(response.data.content);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    //lấy danh sách giỏ hàng
    readAllCartOff(idNhanVien)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  // Hàm để hiển thị Modal khi cần
  const handleEditClick = (record) => {
    setIsModalVisible(true);
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm để hiển thị Modal khi cần
  const handleEditClickVoucher = (record) => {
    setIsModalVisibleVoucher(true);
  };

  // Hàm để ẩn Modal
  const handleCancelVoucher = () => {
    setIsModalVisibleVoucher(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };
  const history = useHistory();
  const handleSave = () => {
    addCustomerOffline(customer)
        .then((response) => {
          alert('Thêm khách hàng thành công');
          history.push('/sell');
          setCustomer({
            fullName: '',
            email: '',
            phoneNumber: '',
          });
        })
        .catch((error) => {
          alert('Thêm khách hàng thất bại');
        });
  };
  function giaoTanNoi() {
    const select = document.getElementById("floatingSelect2");
    select.hidden = false;
    const input = document.getElementById("floatingSelect3");
    input.hidden = false;
    const selectTT = document.getElementById("floatingSelect4");
    selectTT.hidden = false;
  }

  function taiCuaHang() {
    const select = document.getElementById("floatingSelect2");
    select.hidden = true;
    const input = document.getElementById("floatingSelect3");
    input.hidden = true;
    const selectTT = document.getElementById("floatingSelect4");
    selectTT.hidden = true;
  }

  const toast = useRef(null);
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  const confirm2 = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: "/",
      reject,
    });
  };

  const handleAddToCart = (idsku, priceSku) => {
    // Tạo một đối tượng AddCart để gửi lên API
    const addToCartData = {
      idAccount: idNhanVien,
      idSKU: idsku,
      price: priceSku,
      quantity: 1,
    };
    addToCartOffline(addToCartData)
      .then((response) => {
        console.log("Sản phẩm đã được thêm vào giỏ hàng.", response.data);
        readAllCartOff(idNhanVien) //sau truyền id nhân viên vào đây
          .then((response) => {
            setCartItems(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      })
      .catch((error) => {
        console.log("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      });
  };

  const handleUpdateQuantity = (cartItemId, newQuantity, idSKU) => {
    if (newQuantity == 0) {
      newQuantity = 1;
    } else if (newQuantity < 0) {
      // xóa sản phẩm khỏi giỏ hàng khi so luong bang 0
      notification.error({
        message: "ADD TO CART",
        description: "Không được nhập số lượng âm",
      });
    } else {
      updateQuantityOff(cartItemId, newQuantity)
        .then((response) => {
          console.log("Phản hồi từ máy chủ:", response.data);
          readAllCartOff(idNhanVien)
            .then((response) => {
              setCartItems(response.data);
            })
            .catch((error) => {
              console.log(`${error}`);
            });
        })
        .catch((error) => {
          console.log(`Lỗi khi cập nhật số lượng: ${error}`);
        });
    }
  };

  async function remove(id) {
    deleteCartDetailOff(id).then(() => {
      let newArr = [...cartIemts].filter((s) => s.id !== id);
      setCartItems(newArr);
      window.location.reload();
    });
  }

// TÍNH TIỀN TỔNG SẢN PHẨN - ADD VOUCHER
  useEffect(() => {
    calculateTotalPrice();
    calculateChange();
  }, [cartIemts]);
  const calculateTotalPrice = () => {
    let total = 0;
    cartIemts.forEach((product) => {
      // Chuyển đổi giá trị total từ dạng chuỗi sang số và cộng vào tổng
      const productTotal = parseFloat(product.total);
      total += productTotal;
    });
    // Đặt lại giá trị tổng giá tiền
    setTotalPrice(total);

    //tính phí ship
    let priceS = 0;
    setPriceShip(priceS);
    //tính số tiền cẩn thanh toán
    let price = 0;

    if (selecteVoucherFreeShip && selecteVoucher) {
      const voucherValue = parseFloat(selecteVoucher.valueVoucher);
      const voucherVoucherFree = parseFloat(
        selecteVoucherFreeShip.valueVoucher
      );
      price = total + priceS - (voucherValue + voucherVoucherFree);
    } else if (selecteVoucher) {
      // Nếu selectedVoucher có giá trị, sử dụng giá trị voucher
      const voucherValue = parseFloat(selecteVoucher.valueVoucher);
      price = total + priceS - voucherValue;
    } else if (selecteVoucherFreeShip) {
      // Nếu chỉ có selectedVoucherFreeShip có giá trị, sử dụng giá trị voucherfreeship
      const voucherVoucherFree = parseFloat(
        selecteVoucherFreeShip.valueVoucher
      );
      price = total + priceS - voucherVoucherFree;
    } else {
      // Nếu cả hai đều không có giá trị, không sử dụng giảm giá
      price = total + priceS;
    }
    setSoTienThanhToan(price);
  };

 // TÍNH TIỀN Thiếu
  function calculateChange() {
    // Lấy giá trị số tiền khách đưa
    const amountGiven = parseFloat(document.getElementById("amountGiven").value);
    // Lấy giá trị số tiền cần trả (bạn có thể sử dụng biến soTienThanhToan)
    const amountToReturn = parseFloat(soTienThanhToan);
    // Tính số tiền thừa
    const change =  amountToReturn - amountGiven;
    setTienThua(change)
  }

  //click Voucher
  const handleVoucherClick = (voucher) => {
    if (
      totalPrice < voucher.valueMinimum ||
      totalPrice > voucher.valueMaximum
    ) {
      notification.error({
        message: "VOUCHER",
        description: "Không thể áp dụng do đơn hàng không đủ điều kiện",
      });
    } else {
      setSelectedVoucher(voucher);
      readAllCartOff(idNhanVien)
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  //clear voucher
  const handleClearVoucher = (id) => {
    if (selecteVoucher.id === id) {
      setSelectedVoucher(null);
      readAllCartOff(idNhanVien)
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  //click Voucher freeship
  const handleVoucherFreeShipClick = (voucher) => {
    if (
      totalPrice < voucher.valueMinimum ||
      totalPrice > voucher.valueMaximum
    ) {
      notification.error({
        message: "VOUCHER",
        description: "Không thể áp dụng do đơn hàng không đủ điều kiện",
      });
    } else {
      setSelectedVoucherFreeShip(voucher);
      readAllCartOff(idNhanVien)
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  //clear voucher freeship
  const handleClearVoucherFreeShip = (id) => {
    if (selecteVoucherFreeShip.id === id) {
      setSelectedVoucherFreeShip(null);
      readAllCartOff(idNhanVien)
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  return (
    <React.Fragment>
      <>
        <Layout>
          <Layout>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <main className="app app-ban-hang">
                <div className="row">
                  <div className="col-md-12">
                    <div className="app-title">
                      <ul className="app-breadcrumb breadcrumb">
                        <li className="breadcrumb-item">
                          <a href="#">
                            <b>POS bán hàng</b>
                          </a>
                        </li>
                      </ul>
                      <div id="clock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    {/* <div className="tile"> */}
                    <div className="row">
                      <div className="col-md-4">
                        <label
                          className="control-label"
                          style={{ fontWeight: "bold" }}
                        >
                          Tìm kiếm sản phẩm
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Tìm kiếm sản phẩm"
                        />
                      </div>
                      <div className="col-md-4">
                        <label
                          className="control-label"
                          style={{ fontWeight: "bold" }}
                        >
                          Phân loại sản phẩm
                        </label>
                        <select className="form-control" id="exampleSelect1">
                          <option>--- Chọn sản phẩm ---</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label
                          className="control-label"
                          style={{ fontWeight: "bold" }}
                        >
                          +
                        </label>{" "}
                        <br />
                        <button
                          type="button"
                          class="btn btn-secondary"
                          style={{ marginRight: "10px" }}
                        >
                          {/* <FallOutlined /> */}DANH SÁCH HOÁ ĐƠN
                        </button>
                        {/* <button type="button" class="btn btn-secondary">
                                    {/* <RiseOutlined /> */}
                        {/* </button> */}
                      </div>
                    </div>

                    <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
                      Sản phẩm
                    </h5>
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th className="so--luong">Ảnh</th>
                          <th className="so--luong">Tên sản phẩm</th>
                          <th className="so--luong">Giá bán</th>
                          <th className="so--luong">Kho</th>
                          <th className="so--luong text-center" />
                        </tr>
                      </thead>
                      <tbody>
                        {skuProduct.map((product) => (
                          <tr>
                            <td style={{ width: "200px" }}>
                              <AvtProduct
                                product={product.idProduct}
                              ></AvtProduct>
                            </td>
                            <td>
                              <h6 className="text-primary">
                                {product.nameProduct} {product.nameCapacity}{" "}
                                {product.nameColor}
                              </h6>
                            </td>
                            <td>
                              {parseFloat(product.price).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </td>
                            <td>{product.quantitySKU}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm trash"
                                type="button"
                                onClick={() =>
                                  handleAddToCart(product.idSKU, product.price)
                                }
                              >
                                <ShoppingCartOutlined />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination
                      pagination={pagination}
                      onPageChange={handlePageChange}
                    />

                    <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
                      Giỏ hàng
                    </h5>
                    <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th className="so--luong">Ảnh</th>
                          <th className="so--luong">Tên sản phẩm</th>
                          <th className="so--luong">Giá</th>
                          <th className="so--luong">SL</th>
                          <th className="so--luong">Thành tiền</th>
                          <th className="so--luong">Emei</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartIemts.map((cart, index) => (
                          <tr>
                            <td style={{ width: "200px" }}>
                              <AvtProduct product={cart.idProduct}></AvtProduct>
                            </td>
                            <td>
                              <h6 className="text-primary">
                                {cart.nameProduct} {cart.capacity} {cart.color}
                              </h6>
                            </td>
                            <td>
                              {parseFloat(cart.price).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td>
                              <div
                                className="def-number-input number-input safari_only"
                                style={{ paddingRight: "10px" }}
                              >
                                <button
                                  onClick={() => {
                                    const quantity = document.getElementById(
                                      `quantity-${index}`
                                    );
                                    quantity.value = cart.quantity - 1;
                                    console.log(quantity.value);
                                    if (quantity.value <= 0) {
                                      notification.error({
                                        message: "ADD TO CART",
                                        description: "Số lượng phải lớn hơn 0",
                                      });
                                      quantity.value = 1;
                                    }
                                    handleUpdateQuantity(
                                      cart.idCartDetail,
                                      cart.quantity - 1,
                                      cart.idSKU
                                    );
                                  }}
                                  className="minus"
                                />
                                <input
                                  id={`quantity-${index}`}
                                  className="quantity fw-bold text-black"
                                  min={0}
                                  name="quantity"
                                  // value={product.quantity}
                                  type="number"
                                  placeholder={cart.quantity}
                                  onChange={() => {
                                    getOneSKU(cart.idSKU).then((res) => {
                                      setQuantitySKU(res.data.quantity);
                                    });
                                  }}
                                  onBlur={(event) => {
                                    if (event.target.value <= 0) {
                                      notification.error({
                                        message: "ADD TO CART",
                                        description: "Số lượng phải lớn hơn 0",
                                      });
                                      const quantity = document.getElementById(
                                        `quantity-${index}`
                                      );
                                      quantity.value = cart.quantity;
                                      handleUpdateQuantity(
                                        cart.idCartDetail,
                                        cart.quantity,
                                        cart.idSKU
                                      );
                                    } else if (
                                      event.target.value > parseInt(quantitySKU)
                                      // +
                                      //   parseInt(product.quantity)
                                    ) {
                                      notification.error({
                                        message: "ADD TO CART",
                                        description:
                                          "Không thể nhập quá số lượng đang có",
                                      });
                                      const quantity = document.getElementById(
                                        `quantity-${index}`
                                      );
                                      quantity.value = cart.quantity;
                                      handleUpdateQuantity(
                                        cart.idCartDetail,
                                        cart.quantity,
                                        cart.idSKU
                                      );
                                    } else {
                                      const quantity = document.getElementById(
                                        `quantity-${index}`
                                      );
                                      quantity.value = event.target.value;
                                      handleUpdateQuantity(
                                        cart.idCartDetail,
                                        event.target.value,
                                        cart.idSKU
                                      );
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    getOneSKU(cart.idSKU).then((res) => {
                                      const quantity = document.getElementById(
                                        `quantity-${index}`
                                      );
                                      quantity.value =
                                        parseInt(cart.quantity) + 1;
                                      if (
                                        quantity.value >
                                        parseInt(res.data.quantity)
                                        // + parseInt(product.quantity)
                                      ) {
                                        notification.error({
                                          message: "ADD TO CART",
                                          description:
                                            "Không thể nhập quá số lượng đang có",
                                        });
                                        quantity.value = parseInt(
                                          res.data.quantity
                                        );
                                      }
                                    });
                                    handleUpdateQuantity(
                                      cart.idCartDetail,
                                      parseInt(cart.quantity) + 1,
                                      cart.idSKU
                                    );
                                  }}
                                  className="plus"
                                />
                              </div>
                            </td>
                            <td>
                              {parseFloat(cart.total).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                              }}
                            >
                              <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                                onClick={() => remove(cart.idCartDetail)}
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
                    {/* </div> */}
                  </div>
                  <div className="col-md-3">
                    <div className="tile">
                      <h3 className="tile-title">Thông tin thanh toán</h3>
                      <div className="row">
                        <div className="form-group  col-md-10">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Họ tên khách hàng
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Tìm kiếm khách hàng"
                          />
                        </div>
                        <div className="form-group  col-md-2">
                          <label
                            style={{ textAlign: "center" }}
                            className="control-label"
                          >
                            NEW
                          </label>
                          <button
                            className="btn btn-secondary btn-them"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            onClick={() => handleEditClick()}
                          >
                            +
                          </button>
                        </div>
                        <div className="form-group  col-md-12">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Nhân viên bán hàng
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            disabled
                          />
                        </div>
                        <div className="form-group  col-md-12">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Ghi chú đơn hàng
                          </label>
                          <textarea
                            className="form-control"
                            rows={4}
                            placeholder="Ghi chú thêm đơn hàng"
                            defaultValue={""}
                          />
                        </div>
                        <div className="form-group  col-md-12">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Địa chỉ nhận hàng
                          </label>
                          <br />
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio1"
                              value="option1"
                              checked
                              onClick={() => taiCuaHang()}
                            />
                            <label class="form-check-label" for="inlineRadio1">
                              Tại cửa hàng
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="inlineRadioOptions"
                              id="inlineRadio2"
                              value="option2"
                              onClick={() => giaoTanNoi()}
                            />
                            <label class="form-check-label" for="inlineRadio2">
                              Ship hàng
                            </label>
                          </div>
                          <input
                            hidden
                            id="floatingSelect2"
                            class="form-control"
                            type="text"
                            placeholder="Địa chỉ cụ thể"
                            aria-label="default input example"
                          />
                        </div>
                        <div
                          className="form-group  col-md-12"
                          hidden
                          id="floatingSelect3"
                        >
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Phí vận chuyển:{" "}
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            defaultValue={0}
                          />
                        </div>
                        <div
                          className="form-group  col-md-12"
                          hidden
                          id="floatingSelect4"
                        >
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Ngày giao hàng:{" "}
                          </label>
                          <DatePicker
                            id="dateFilter"
                            style={{ width: "100%" }}
                            // onChange={handleChangeDate}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group  col-md-12">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Hình thức thanh toán
                          </label>
                          {/* <select className="form-control" id="exampleSelect2" mode="multiple">
                                <option>Thanh toán chuyển khoản</option>
                                <option>Trả tiền mặt tại quầy</option>
                            </select> */}
                          <Select mode="multiple" style={{ width: "100%" }}>
                            <Select.Option>
                              Thanh toán chuyển khoản
                            </Select.Option>
                            <Select.Option>Trả tiền mặt tại quầy</Select.Option>
                          </Select>
                        </div>
                        <div
                          className="form-group  col-md-6"
                          style={{ color: "red" }}
                        >
                          <label className="control-label">
                            Tổng tiền hàng:{" "}
                          </label>
                          <p className="control-all-money-tamtinh">
                            ={" "}
                            {totalPrice?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                        <div className="form-group  col-md-6">
                          <label className="control-label">Giảm giá: </label>
                          <p
                            className="control-all-money-tamtinh"
                            onClick={() => handleEditClickVoucher()}
                          >
                            Chọn Voucher
                          </p>
                        </div>
                        <div
                          className="form-group  col-md-6"
                          style={{ color: "red" }}
                        >
                          <label className="control-label">
                            Giảm giá Voucher:{" "}
                          </label>
                          <p className="control-all-money-total">
                            ={" "}
                            {selecteVoucher && selecteVoucher.valueVoucher
                              ? selecteVoucher?.valueVoucher?.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )
                              : 0?.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                          </p>
                        </div>
                        <div className="form-group  col-md-6">
                          <label className="control-label">
                            Khách hàng đưa tiền:{" "}
                          </label>
                          <input
                            id="amountGiven"
                            className="form-control"
                            type="number"
                            // defaultValue={290000}
                            onChange={calculateChange}
                          />
                        </div>
                        <div
                          className="form-group  col-md-6"
                          style={{ color: "red" }}
                        >
                          <label className="control-label">
                            Khách cần trả:{" "}
                          </label>
                          <p className="control-all-money">
                            {" "}
                            = {soTienThanhToan?.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                          </p>
                        </div>
                        <div
                          className="form-group  col-md-6"
                          style={{ fontWeight: "bold" }}
                        >
                          <label className="control-label">Thiếu: </label>
                          <p className="control-all-money">
                            {" "}
                            {tienThua?.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                          </p>
                        </div>
                        <div className="tile-footer col-md-12">
                          <button
                            className="btn btn-danger luu-san-pham"
                            type="button"
                            style={{
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            {" "}
                            Chờ thanh toán
                          </button>
                          <button
                            className="btn btn-danger luu-va-in"
                            type="button"
                            style={{
                              marginRight: "10px",
                              marginBottom: "10px",
                            }}
                            onClick={() => confirm2()}
                          >
                            Lưu hóa đơn
                          </button>
                          <a
                            className="btn btn-secondary luu-va-in"
                            href="/dashboard"
                            style={{ marginBottom: "10px" }}
                          >
                            Quay về
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </Content>
          </Layout>
        </Layout>
        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          width={1000}
          footer={null}
          bodyStyle={{ minHeight: "400px" }}
        >
          {/* <div className="modal-body"> */}
          <div className="row">
            <div className="form-group  col-md-12">
              <span className="thong-tin-thanh-toan">
                <h5>Tạo mới khách hàng</h5>
              </span>
            </div>
            <div className="form-group col-md-12">
              <label className="control-label">Họ và tên</label>
              <input
                  className="form-control"
                  type="text"
                  name="fullName"
                  value={customer.fullName}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Email</label>
              <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Số điện thoại</label>
              <input
                  className="form-control"
                  type="number"
                  name="phoneNumber"
                  value={customer.phoneNumber}
                  onChange={handleChange}
                  required
              />
            </div>
          </div>
          <br />
          <button className="btn btn-save" type="button" onClick={handleSave}>
            Lưu lại
          </button>
          <a class="btn btn-cancel" data-dismiss="modal" href="#">
            Hủy bỏ
          </a>
          <br />
          {/* </div> */}
        </Modal>

        <Modal
          visible={isModalVisibleVoucher}
          onCancel={handleCancelVoucher}
          width={550}
          footer={null}
          bodyStyle={{ minHeight: "700px" }}
        >
          <div className="container py-5">
            <div className="row d-flex justify-content-center">
              {/* <div className="card"> */}
              <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid #ffa900" }}
              >
                <h5 className="mb-0">VOUCHER CỦA SHOP</h5>
              </div>
              <p style={{ marginTop: "10px" }}>Mã FreeShip</p>
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={{ position: "relative", height: 200, overflowY: "auto" }}
              >
                {voucherFreeShip.map((voucher) => (
                  <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between">
                      <span>
                        <Image
                          style={{
                            width: "100px",
                          }}
                          src="https://bizweb.dktcdn.net/100/377/231/articles/freeship.png?v=1588928233387"
                        />
                      </span>
                      <span style={{ paddingLeft: "10px" }}>
                        {voucher.name}
                        <br />
                        <p style={{ color: "red", fontSize: "15px" }}>
                          Giảm{" "}
                          {voucher?.valueVoucher?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                        <p>
                          Đơn giá trị tối thiểu {voucher.valueMinimum}
                          <br />
                          Đơn giá trị tối đa {voucher.valueMaximum}
                        </p>
                      </span>
                      <strong>
                        {/* <Checkbox
                        onClick={() => handleVoucherClick(voucher)}
                      /> */}
                        <Button
                          type="text"
                          danger
                          onClick={() => handleVoucherFreeShipClick(voucher)}
                        >
                          Áp dụng
                        </Button>
                        <br />
                        <Button
                          type="text"
                          danger
                          onClick={() => handleClearVoucherFreeShip(voucher.id)}
                        >
                          Hủy
                        </Button>
                      </strong>
                    </li>
                  </ul>
                ))}
              </div>
              <p style={{ marginTop: "10px" }}>Mã Giảm giá</p>
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={{ position: "relative", height: 330, overflowY: "auto" }}
              >
                {voucher.map((voucher) => (
                  <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between">
                      <span>
                        <Image
                          style={{
                            width: "100px",
                          }}
                          src="https://help.turitop.com/hc/article_attachments/360007926459/voucher.png"
                        />
                      </span>
                      <span style={{ paddingLeft: "10px" }}>
                        {voucher.name}
                        <br />
                        <p style={{ color: "red", fontSize: "15px" }}>
                          Giảm{" "}
                          {voucher?.valueVoucher?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                        <p>
                          Đơn giá trị tối thiểu {voucher.valueMinimum}
                          <br />
                          Đơn giá trị tối đa {voucher.valueMaximum}
                        </p>
                      </span>
                      <strong>
                        <Button
                          type="text"
                          danger
                          onClick={() => handleVoucherClick(voucher)}
                        >
                          Áp dụng
                        </Button>
                        <br />
                        <Button
                          type="text"
                          danger
                          onClick={() => handleClearVoucher(voucher.id)}
                        >
                          Hủy
                        </Button>
                      </strong>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </>
    </React.Fragment>
  );
}
