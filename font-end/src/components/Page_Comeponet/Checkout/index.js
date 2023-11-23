import * as React from "react";
import "../Checkout/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Header from "../../Page_Comeponet/layout/Header";
import Footer from "../../Page_Comeponet/layout/Footer";
import { readAll, getbysku } from "../../../service/cart.service";
import { readQuantityInCart } from "../../../service/cart.service";
import {
  GiftOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Image, Checkbox, Modal, notification, Button, Input } from "antd";
import {
  getVoucher,
  getVoucherFreeShip,
} from "../../../service/Voucher/voucher.service";
import { getPay } from "../../../service/Vnpay/vnpay.service";
import { readAllWard } from "../../../service/AddressAPI/ward.service";
import { readAllDistrict } from "../../../service/AddressAPI/district.service";
import { readAllProvince } from "../../../service/AddressAPI/province.service";
import { getFee } from "../../../service/AddressAPI/fee.service";
import { get } from "jquery";
import { Link, useHistory } from "react-router-dom";
import {
  createBill,
  createBillAccount,
} from "../../../service/Bill/bill.service";
import { DateField } from "@refinedev/antd";
import { readAllByIdUser } from "../../../service/AddressAPI/address.service";
import { getOne } from "../../../service/Point/point.service";
import { getOneSKU } from "../../../service/sku.service";

const Checkout = () => {
  const history = useHistory();
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const idAccount = storedUser !== null ? storedUser.id : ""; //sau khi đăng nhập thì truyền idAccount vào đây
  const [products, setProducts] = useState([]);
  const [quantityCart, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceShip, setPriceShip] = useState(0);
  const [soTienThanhToan, setSoTienThanhToan] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [voucher, setVoucher] = useState([]);
  const [selecteVoucher, setSelectedVoucher] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState([true]);
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [voucherFreeShip, setVoucherFreeShip] = useState([true]);
  const [selecteVoucherFreeShip, setSelectedVoucherFreeShip] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province_id, setProvince_id] = useState();
  const [district_id, setDistrict_id] = useState();
  const [fee, setFee] = useState([]);
  const [transportationFeeDTO, setTransportationFeeDTO] = useState({
    toDistrictId: null,
    toWardCode: null,
    insuranceValue: null,
    quantity: 1,
  });
  const [bill, setBill] = useState({
    code: Math.floor(Math.random() * 100000000000000000001) + "",
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    province: "",
    district: "",
    moneyShip: 0,
    itemDiscount: 0,
    itemDiscountFreeShip: 0,
    totalMoney: 0,
    paymentMethod: "TIEN_MAT",
    billDetail: [],
    quantity: 0,
    afterPrice: 0,
    idVoucher: null,
    idVoucherFreeShip: null,
    account: idAccount,
    wards: "",
    idUser: null,
    point: 0,
    pointHistory: 0,
    pointConversionAmount: 0,
  });
  const [defaultAddress, setDefaultAddress] = useState([]);
  const [showDistricts, setShowDistricts] = useState(true);
  const [showWards, setShowWards] = useState(true);

  // Sử dụng dữ liệu cartItems để hiển thị giỏ hàng
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  const skuIds = cartItems.map((item) => item.idSKU); // Lấy danh sách idSKU từ mảng cartItems

  const requests = skuIds.map((idSKU) => getbysku(idSKU)); // Tạo mảng các promise từ việc gọi API

  const [ponit, setPonit] = useState(0);
  const [isModalVisiblePoint, setIsModalVisiblePoint] = useState(false); // Trạng thái hiển thị Modal
  const [pointMoney, setPointMoney] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const checked1 = document.getElementById("htnn_4");
    checked1.checked = isChecked1;
    const checked2 = document.getElementById("htnn_5");
    checked2.checked = isChecked2;
    const checked3 = document.getElementById("htnn_6");
    checked3.checked = isChecked3;
    //hiển thị giỏ hàng
    if (idAccount !== null && idAccount !== "") {
      readAll(idAccount)
        .then((response) => {
          const list = response.data;
          setProducts(list);
          const adidaphat = [];
          list.map((item) => {
            adidaphat.push({
              sku: item.idSKU,
              price: item.price,
              quantity: item.quantity,
            });
          });
          setBill({
            ...bill,
            billDetail: adidaphat,
          });
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      //số lượng sản phẩm trong giỏ hàng
      readQuantityInCart(idAccount)
        .then((response) => {
          console.log(response.data);
          setQuantity(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    } else {
      Promise.all(requests)
        .then((responses) => {
          const productsData = responses.map((response, index) => {
            const productInfo = response.data[0];
            const cartItem = cartItems[index];
            // Tạo một đối tượng sản phẩm mới có thông tin từ API và số lượng từ giỏ hàng
            return {
              ...productInfo,
              quantity: cartItem.quantity,
              price: cartItem.price,
              total: cartItem.quantity * cartItem.price,
            };
          });
          setProducts(productsData);
          const list = [];
          productsData.map((item) => {
            list.push({
              sku: item.idSku,
              price: item.price,
              quantity: item.quantity,
            });
          });
          setBill({
            ...bill,
            billDetail: list,
          });
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      const totalQuantity = cartItems.reduce(
        (total, product) => total + product.quantity,
        0
      );
      setQuantity(totalQuantity);
    }

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
    readAllProvince()
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readAllDistrict(province_id)
      .then((response) => {
        // setDistricts(response.data.data);
        if (showDistricts === true) {
          setDistricts(response.data.data);
        } else {
          setDistricts([]);
        }
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    readAllWard(district_id)
      .then((response) => {
        // setWards(response.data.data);
        if (showWards === true) {
          setWards(response.data.data);
        } else {
          setWards([]);
        }
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    if (transportationFeeDTO != []) {
      getFee(transportationFeeDTO)
        .then((response) => {
          setFee(response.data.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
    readAllByIdUser(storedUser?.user?.id)
      .then((res) => {
        setDefaultAddress(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getOne()
      .then((response) => {
        if (response.data.data !== null) {
          setPointMoney(response.data.data.pointsConsumptionMoney);
        } else {
          setPointMoney(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [province_id, district_id, transportationFeeDTO, priceShip]);

  function giaoTanNoi() {
    const select = document.getElementById("floatingSelect1");
    select.hidden = true;
    const input = document.getElementById("floatingSelect2");
    input.hidden = false;
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = true;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = false;
    document.getElementById("htnn_4").checked = false;
    document.getElementById("htnn_6").checked = false;
  }

  function nhanTaiCuaHang() {
    const select = document.getElementById("floatingSelect1");
    select.hidden = false;
    const input = document.getElementById("floatingSelect2");
    input.hidden = true;
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = true;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = true;
    setTransportationFeeDTO({
      toDistrictId: null,
      toWardCode: null,
      insuranceValue: null,
      quantity: 1,
    });
    setIsChecked1(true);
    setIsChecked2(false);
    setIsChecked3(false);
  }

  function diaChiMacDinh() {
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = false;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = true;
    document.getElementById("htnn_4").checked = false;
    document.getElementById("htnn_5").checked = false;
  }

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const storedEmail = localStorage.getItem("email");
    calculatePriceSucsses();
    setBill({
      ...bill,
      totalMoney: totalPrice,
      moneyShip: priceShip,
      afterPrice: soTienThanhToan,
      userName:
        storedName !== null
          ? storedName
          : storedUser !== null
          ? storedUser.user.fullName
          : "",
      phoneNumber:
        storedPhoneNumber !== null
          ? storedPhoneNumber
          : storedUser !== null
          ? storedUser.user.phoneNumber
          : "",
      email:
        storedEmail !== null
          ? storedEmail
          : storedUser !== null
          ? storedUser.user.email
          : "",
    });
  }, [products, fee, soTienThanhToan, ponit]);
  //tính số tiền cẩn thanh toán
  const calculatePriceSucsses = () => {
    //tính thành tiền sản phẩm
    let total = 0;
    products.forEach((product) => {
      // Chuyển đổi giá trị total từ dạng chuỗi sang số và cộng vào tổng
      const productTotal = parseFloat(product.total);
      total += productTotal;
    });
    setTotalPrice(total);
    //tính phí ship
    let priceS = 0;
    // if (total <= 20000000) {
    //   priceS = 30000;
    // } else if (total > 20000000 && total <= 60000000) {
    //   priceS = 40000;
    // } else if (total > 60000000 && total <= 100000000) {
    //   priceS = 60000;
    // } else if (total > 100000000) {
    //   priceS = 80000;
    // }
    if (fee != null) {
      priceS = fee?.total;
      // setBill({
      //   ...bill,
      //   moneyShip: priceS,
      // });
    }
    setPriceShip(priceS);
    //tính số tiền cẩn thanh toán
    let price = 0;
    let pointValue = parseFloat(ponit);

    if (selecteVoucherFreeShip && selecteVoucher) {
      const voucherValue = parseFloat(selecteVoucher.valueVoucher);
      const voucherVoucherFree = parseFloat(
        selecteVoucherFreeShip.valueVoucher
      );
      price = total + priceS - (voucherValue + voucherVoucherFree) - pointValue;
    } else if (selecteVoucher) {
      // Nếu selectedVoucher có giá trị, sử dụng giá trị voucher
      const voucherValue = parseFloat(selecteVoucher.valueVoucher);
      price = total + priceS - voucherValue - pointValue;
    } else if (selecteVoucherFreeShip) {
      // Nếu chỉ có selectedVoucherFreeShip có giá trị, sử dụng giá trị voucherfreeship
      const voucherVoucherFree = parseFloat(
        selecteVoucherFreeShip.valueVoucher
      );
      price = total + priceS - voucherVoucherFree - pointValue;
    } else {
      // Nếu cả hai đều không có giá trị, không sử dụng giảm giá
      price = total + priceS - pointValue;
    }
    setSoTienThanhToan(price);
  };
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
    } else if (voucher.quantity <= 0) {
      notification.error({
        message: "VOUCHER",
        description: "Voucher đã hết lượt sử dụng",
      });
    } else {
      setSelectedVoucher(voucher);
      setBill({
        ...bill,
        itemDiscount: voucher.valueVoucher,
        idVoucher: voucher.id,
      });
      if (storedUser !== null) {
        readAll(idAccount)
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        setProducts(cartItems);
      }
    }
  };

  //clear voucher
  const handleClearVoucher = (id) => {
    if (selecteVoucher.id === id) {
      setSelectedVoucher(null);
      if (storedUser !== null) {
        readAll(idAccount)
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        setProducts(cartItems);
      }
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
    } else if (voucher.quantity <= 0) {
      notification.error({
        message: "VOUCHER",
        description: "Voucher đã hết lượt sử dụng",
      });
    } else if (fee == null) {
      notification.error({
        message: "VOUCHER",
        description: "Vui lòng chọn địa chỉ giao hàng để áp dụng",
      });
    } else {
      setSelectedVoucherFreeShip(voucher);
      setBill({
        ...bill,
        itemDiscountFreeShip: voucher.valueVoucher,
        idVoucherFreeShip: voucher.id,
      });
      if (storedUser !== null) {
        readAll(idAccount)
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        setProducts(cartItems);
      }
    }
  };

  //clear voucher freeship
  const handleClearVoucherFreeShip = (id) => {
    if (selecteVoucherFreeShip.id === id) {
      setSelectedVoucherFreeShip(null);
      if (storedUser !== null) {
        readAll(idAccount)
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        setProducts(cartItems);
      }
    }
  };

  // Hàm để hiển thị Modal khi cần
  const handleEditClick = (record) => {
    if (totalPrice < 20000000) {
      notification.error({
        message: "VOUCHER",
        description: "Đơn hàng chưa đủ điều kiện (Tối thiểu 20.000.000 đ)",
      });
    } else {
      setIsModalVisible(true);
    }
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function datHang() {
    const tienMat = document.getElementById("httt-1");
    if (tienMat.checked === true) {
      setIsChecked(true);
      setBill({
        ...bill,
        paymentMethod: "TIEN_MAT",
      });
    }
    const vnpay = document.getElementById("httt-2");
    if (vnpay.checked == true) {
      setIsChecked(false);
      setBill({
        ...bill,
        paymentMethod: "VN_PAY",
      });
    }
  }

  const handleProvince = (event) => {
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      setProvince_id(value);
      console.log(value);
      setDistrict_id(null);
      setWards([]);
      let item = {
        toDistrictId: null,
        toWardCode: null,
        insuranceValue: null,
        quantity: quantityCart,
      };
      setTransportationFeeDTO(item);
      setBill({
        ...bill,
        province: document.getElementById(value).innerText,
      });
      setShowDistricts(true);
    } else {
      setShowDistricts(false);
      setShowWards(false);
      setTransportationFeeDTO({
        toDistrictId: null,
        toWardCode: null,
        insuranceValue: soTienThanhToan,
        quantity: quantityCart,
      });
    }
    setIsChecked1(false);
    setIsChecked2(true);
    setIsChecked3(false);
  };

  const handleDistrict = (event) => {
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      setDistrict_id(value);
      let item = { ...transportationFeeDTO };
      item["toDistrictId"] = parseInt(value);
      item["insuranceValue"] = parseInt(soTienThanhToan);
      setTransportationFeeDTO(item);
      console.log(transportationFeeDTO);
      setBill({
        ...bill,
        district: document.getElementById(value).innerText,
      });
      setShowWards(true);
    } else {
      setShowWards(false);
      setTransportationFeeDTO({
        toDistrictId: event.target.value,
        toWardCode: null,
        insuranceValue: soTienThanhToan,
        quantity: quantityCart,
      });
    }
    setIsChecked1(false);
    setIsChecked2(true);
    setIsChecked3(false);
  };

  const handleWard = (event) => {
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      let item = { ...transportationFeeDTO };
      item["toWardCode"] = value;
      setTransportationFeeDTO(item);
      console.log(transportationFeeDTO);
      setBill({
        ...bill,
        wards: document.getElementById(value).innerText,
      });
      console.log(bill);
    } else {
      setTransportationFeeDTO({
        ...transportationFeeDTO,
        toWardCode: event.target.value,
      });
    }
    console.log(transportationFeeDTO);
    setIsChecked1(false);
    setIsChecked2(true);
    setIsChecked3(false);
  };

  function hanldeName(event) {
    setBill({
      ...bill,
      userName: event.target.value,
    });
    // setFormData({
    //   ...formData,
    //   name: event.target.value,
    // });
    localStorage.setItem("name", event.target.value); // Lưu trữ tên vào localStorage
  }

  function hanldPhone(event) {
    setBill({
      ...bill,
      phoneNumber: event.target.value,
    });
    // setFormData({
    //   ...formData,
    //   phoneNumber: event.target.value,
    // });
    localStorage.setItem("phoneNumber", event.target.value); // Lưu trữ tên vào localStorage
  }

  function hanldeMail(event) {
    setBill({
      ...bill,
      email: event.target.value,
    });
    // setFormData({
    //   ...formData,
    //   email: event.target.value,
    // });
    localStorage.setItem("email", event.target.value); // Lưu trữ tên vào localStorage
  }

  function handleAddress(event) {
    setBill({
      ...bill,
      address:
        event.target.value +
        ", " +
        bill.wards +
        ", " +
        bill.district +
        ", " +
        bill.province,
    });
  }
  const [checked, setChecked] = useState(false);
  function checkQuantitySubmit() {
    bill.billDetail.map((bd) => {
      getOneSKU(bd.sku)
        .then((response) => {
          if (response.data.quantity < bd.quantity) {
            setChecked(false);
          } else {
            setChecked(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (checked) {
      setLoading(true);
      const tienMat = document.getElementById("httt-1");
      if (tienMat.checked === true) {
        localStorage.removeItem("bill");
        if (idAccount !== "") {
          createBillAccount(bill)
            .then((response) => {
              console.log(response.data);
              setLoading(false);
              localStorage.setItem("bill2", JSON.stringify(bill));
              history.push(`/paydone`);
            })
            .catch((error) => {
              console.log(error);
            });
          localStorage.removeItem("name");
          localStorage.removeItem("phoneNumber");
          localStorage.removeItem("email");
        } else {
          createBill(bill)
            .then((response) => {
              console.log(response.data);
              setLoading(false);
              localStorage.setItem("bill2", JSON.stringify(bill));
              history.push(`/paydone`);
            })
            .catch((error) => {
              console.log(error);
            });
          sessionStorage.removeItem("cartItems");
          setProducts([]);
          setTotalPrice(0);
        }
      }
      const vnpay = document.getElementById("httt-2");
      if (vnpay.checked == true) {
        localStorage.setItem("bill", JSON.stringify(bill));
        getPay(soTienThanhToan)
          .then((res) => {
            setLoading(false);
            window.location.replace(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      notification.error({
        message: "Mặt hàng đã có người mua hết!",
      });
    }
  }

  function handleDefaultAddress(event) {
    const inputString = document.getElementById(event.target.value).innerText;
    if (inputString !== "") {
      const dataArray = inputString.split(",").map((item) => item.trim());
      setBill({
        ...bill,
        province: dataArray[dataArray.length - 1],
        district: dataArray[dataArray.length - 2],
        wards: dataArray[dataArray.length - 3],
        address: inputString,
      });
      let province_id = [...provinces].filter(
        (pr) => pr.ProvinceName === dataArray[dataArray.length - 1]
      )[0].ProvinceID;
      readAllDistrict(province_id)
        .then((response) => {
          let district_id = [...response.data.data].filter(
            (dt) => dt.DistrictName === dataArray[dataArray.length - 2]
          )[0].DistrictID;
          readAllWard(district_id)
            .then((response) => {
              let ward_code = [...response.data.data].filter(
                (w) => w.WardName === dataArray[dataArray.length - 3]
              )[0].WardCode;
              setTransportationFeeDTO({
                toDistrictId: district_id,
                toWardCode: ward_code,
                insuranceValue: soTienThanhToan,
                quantity: quantityCart,
              });
            })
            .catch((error) => {
              console.log(`${error}`);
            });
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      getFee(transportationFeeDTO)
        .then((response) => {
          setFee(response.data.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      console.log(bill);
    } else {
      setTransportationFeeDTO({
        toDistrictId: null,
        toWardCode: null,
        insuranceValue: soTienThanhToan,
        quantity: quantityCart,
      });
    }
    setIsChecked1(false);
    setIsChecked2(false);
    setIsChecked3(true);
  }

  function clickPonit() {
    const pointElement = document.getElementById("point");
    const pointValue = parseFloat(pointElement.value);
    const pointCustomer = parseFloat(storedUser?.user?.points);
    // if (pointValue == "" || pointValue == null) {
    //   notification.error({
    //     message: "Nhập số điểm bạn cần dùng!",
    //   });
    //   setPonit(0);
    // } else {
    if (pointValue > pointCustomer) {
      notification.error({
        message: "Số điểm của bạn không đủ!",
      });
      setPonit(0);
    } else if (pointValue == null) {
      notification.error({
        message: "Mời nhập số điểm bạn muốn sử dụng!",
      });
    } else {
      setPonit(pointValue * pointMoney);
      setBill({
        ...bill,
        idUser: storedUser?.user?.id,
        point: pointValue,
        pointHistory: pointValue,
        pointConversionAmount: pointValue * pointMoney,
      });
      console.log(bill);
    }
    // }
  }

  function clearPoint() {
    setPonit(0);
    setBill({
      ...bill,
      idUser: storedUser?.user?.id,
      point: 0,
      pointHistory: 0,
    });
    document.getElementById("point").value = 0;
  }

  // Hàm để hiển thị Modal khi cần
  const handleEditClickPoint = (record) => {
    setIsModalVisiblePoint(true);
  };

  // Hàm để ẩn Modal
  const handleCancelPoint = () => {
    setIsModalVisiblePoint(false);
  };

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
      <main role="main">
        <div class="container mt-4">
          <form
            class="needs-validation"
            name="frmthanhtoan"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="kh_tendangnhap" value="dnpcuong"></input>
            <div
              class="py-5 text-center"
              style={{ color: "#f68f2c", marginBottom: "50px" }}
            >
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
                  <span class="badge badge-secondary badge-pill">
                    {quantityCart}
                  </span>
                </h4>
                <ul class="list-group mb-3">
                  {products.map((product) => (
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">
                          {product.nameProduct} {product.capacity}{" "}
                          {product.color}
                        </h6>
                        <small class="text-muted">
                          {product?.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}{" "}
                          x {product.quantity}
                        </small>
                      </div>
                      <span class="text-muted">
                        {parseFloat(product.total).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </li>
                  ))}
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Tổng thành tiền</span>
                    <strong>
                      {totalPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </li>
                </ul>
                <ul class="list-group mb-3">
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Voucher của Shop</span>
                    <strong>
                      <GiftOutlined onClick={() => handleEditClick()} />
                    </strong>
                  </li>
                </ul>
                <div hidden={storedUser !== null ? false : true}>
                  <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between">
                      <span>
                        <input
                          id="point"
                          type="number"
                          min={0}
                          class="form-control"
                          defaultValue={0}
                          // placeholder="Nhập điểm muốn áp dụng"
                          // onChange={hanldeName}
                          onBlur={(event) => {
                            if (event.target.value <= 0) {
                              const quantity = document.getElementById(`point`);
                              quantity.value = 0;
                              setPonit(0);
                            }
                            if (
                              totalPrice >= 100000 &&
                              totalPrice <= 50000000
                            ) {
                              if (event.target.value > 50000 / pointMoney) {
                                const quantity =
                                  document.getElementById(`point`);
                                quantity.value = 0;
                                setPonit(0);
                                notification.error({
                                  message: "Đơn hàng không đủ điều kiện!",
                                });
                              }
                            }
                            if (
                              totalPrice >= 51000000 &&
                              totalPrice <= 100000000
                            ) {
                              if (event.target.value > 100000 / pointMoney) {
                                const quantity =
                                  document.getElementById(`point`);
                                quantity.value = 0;
                                setPonit(0);
                                notification.error({
                                  message: "Đơn hàng không đủ điều kiện!",
                                });
                              }
                            }
                            if (
                              totalPrice >= 110000000 &&
                              totalPrice <= 150000000
                            ) {
                              if (event.target.value > 150000 / pointMoney) {
                                const quantity =
                                  document.getElementById(`point`);
                                quantity.value = 0;
                                setPonit(0);
                                notification.error({
                                  message: "Đơn hàng không đủ điều kiện!",
                                });
                              }
                            }
                            if (
                              totalPrice >= 151000000 &&
                              totalPrice <= 200000000
                            ) {
                              if (event.target.value > 200000 / pointMoney) {
                                const quantity =
                                  document.getElementById(`point`);
                                quantity.value = 0;
                                setPonit(0);
                                notification.error({
                                  message: "Đơn hàng không đủ điều kiện!",
                                });
                              }
                            }
                            if (totalPrice > 200000000) {
                              if (event.target.value > 250000 / pointMoney) {
                                const quantity =
                                  document.getElementById(`point`);
                                quantity.value = 0;
                                setPonit(0);
                                notification.error({
                                  message: "Đơn hàng không đủ điều kiện!",
                                });
                              }
                              if (totalPrice > 200000000) {
                                if (event.target.value > 250000) {
                                  const quantity =
                                    document.getElementById(`point`);
                                  quantity.value = 0;
                                  setPonit(0);
                                  notification.error({
                                    message: "Đơn hàng không đủ điều kiện!",
                                  });
                                }
                              }
                            }
                          }}
                        ></input>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "red",
                            fontWeight: "bold",
                          }}
                        >
                          Số điểm đang có là {storedUser?.user?.points} Point
                        </p>
                      </span>
                      <strong>
                        <button
                          class="btn btn-warning"
                          type="button"
                          onClick={() => clickPonit()}
                        >
                          Áp dụng
                        </button>
                      </strong>
                      <strong>
                        <CloseCircleOutlined
                          style={{
                            color: "red",
                            fontSize: 17,
                            fontWeight: 500,
                            marginRight: "10px",
                          }}
                          onClick={() => clearPoint()}
                        />
                        <InfoCircleOutlined
                          style={{
                            color: "red",
                            fontSize: 17,
                            fontWeight: 500,
                          }}
                          onClick={() => handleEditClickPoint()}
                        />
                      </strong>
                    </li>
                  </ul>
                </div>
                <div hidden={storedUser !== null ? false : true}>
                  <div className="d-flex justify-content-between px-x">
                    <p className="fw-bold">Số điểm sử dụng:</p>
                    <p className="fw-bold">
                      -
                      {ponit
                        ? ponit?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : 0?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between px-x">
                  <p className="fw-bold">Giảm giá Voucher:</p>
                  <p className="fw-bold">
                    -
                    {selecteVoucher && selecteVoucher.valueVoucher
                      ? selecteVoucher?.valueVoucher?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : 0?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                  </p>
                </div>
                <div className="d-flex justify-content-between px-x">
                  <p className="fw-bold">Tiền vận chuyển:</p>
                  <p className="fw-bold">
                    {fee == null
                      ? 0 + "₫"
                      : fee?.total?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                  </p>
                </div>
                <div className="d-flex justify-content-between px-x">
                  <p className="fw-bold">Giảm giá tiền vận chuyển:</p>
                  <p className="fw-bold">
                    -
                    {selecteVoucherFreeShip &&
                    selecteVoucherFreeShip.valueVoucher
                      ? selecteVoucherFreeShip?.valueVoucher?.toLocaleString(
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
                <div
                  className="d-flex justify-content-between p-2 mb-2"
                  style={{ backgroundColor: "#e1f5fe" }}
                >
                  <h5 className="fw-bold mb-0">THANH TOÁN:</h5>
                  <h5 className="fw-bold mb-0" style={{ color: "red" }}>
                    {soTienThanhToan?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
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
                      name="name"
                      value={bill.userName}
                      onChange={hanldeName}
                      required
                    ></input>
                    <br />
                  </div>
                  <div className="row">
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Số điện thoại"
                        name="phoneNumber"
                        value={bill.phoneNumber}
                        onChange={hanldPhone}
                        required
                      ></input>
                    </div>
                    <div class="col-md-6">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        name="email"
                        value={bill.email}
                        onChange={hanldeMail}
                        required
                      ></input>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <br />
                    <b for="kh_ngaysinh">Hình thức nhận hàng</b>
                    <div class="custom-control custom-radio">
                      <input
                        id="htnn_4"
                        type="radio"
                        class="custom-control-input"
                        required=""
                        value="1"
                        onClick={() => nhanTaiCuaHang()}
                      ></input>
                      <label class="custom-control-label" for="htnn_4">
                        Nhận tại cửa hàng
                      </label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        id="htnn_5"
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
                    <div
                      class="custom-control custom-radio"
                      id="dcmd"
                      hidden={storedUser !== null ? false : true}
                    >
                      <input
                        id="htnn_6"
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
                  <div hidden className="row" id="notDcmd">
                    <div class="col-md-4">
                      <br />
                      <label for="kh_cmnd">Tỉnh, thành phố:</label>
                      <select
                        class="form-select"
                        id="provinces"
                        aria-label="Floating label select example"
                        onChange={handleProvince}
                      >
                        <option selected></option>
                        {provinces.map((pr) => {
                          return (
                            <option
                              id={pr.ProvinceID}
                              key={pr.ProvinceID}
                              value={pr.ProvinceID}
                            >
                              {pr.ProvinceName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div class="col-md-4">
                      <br />
                      <label for="kh_cmnd">Quận, huyện:</label>
                      <select
                        class="form-select"
                        id="districts"
                        aria-label="Floating label select example"
                        onChange={handleDistrict}
                      >
                        <option selected></option>
                        {districts.map((dt) => {
                          return (
                            <option
                              id={dt.DistrictID}
                              key={dt.DistrictID}
                              value={dt.DistrictID}
                            >
                              {dt.DistrictName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div class="col-md-4">
                      <br />
                      <label for="kh_cmnd">Phường, xã:</label>
                      <select
                        class="form-select"
                        id="wards"
                        aria-label="Floating label select example"
                        onChange={handleWard}
                      >
                        <option selected></option>
                        {wards.map((w) => {
                          return (
                            <option
                              id={w.WardCode}
                              key={w.WardID}
                              value={w.WardCode}
                            >
                              {w.WardName}
                            </option>
                          );
                        })}
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
                        onChange={handleAddress}
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
                      onChange={handleDefaultAddress}
                    >
                      <option selected id="0" value={0}></option>
                      {defaultAddress.map((da) => {
                        return (
                          <option id={da.id} key={da.id} value={da.id}>
                            {da.address}, {da.xaPhuong}, {da.quanHuyen},{" "}
                            {da.tinhThanhPho}
                          </option>
                        );
                      })}
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
                      checked={isChecked}
                      onChange={datHang}
                    />
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
                      checked={!isChecked}
                      onChange={datHang}
                    />
                    <label class="custom-control-label" for="httt-2">
                      VN Pay
                    </label>
                  </div>
                  <hr class="mb-4" />
                  {/* <a href={linkPay}> */}
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    // type="submit"
                    name="btnDatHang"
                    type="submit"
                    onMouseOver={() => checkQuantitySubmit()}
                  >
                    Đặt hàng
                  </button>
                  {/* </a> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
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
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>Mã FreeShip</p>
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
                      <p
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Giảm{" "}
                        {voucher?.valueVoucher?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      <p style={{ fontSize: "13px" }}>
                        Áp dụng cho đơn hàng giá trị từ{" "}
                        {voucher?.valueMinimum?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      <p style={{ color: "red", fontSize: "10px" }}>
                        Từ{" "}
                        <DateField
                          style={{ color: "red", fontSize: "10px" }}
                          value={voucher.dateStart}
                          format="DD/MM/YYYY"
                        />{" "}
                        đến{" "}
                        <DateField
                          style={{ color: "red", fontSize: "10px" }}
                          value={voucher.dateEnd}
                          format="DD/MM/YYYY"
                        />{" "}
                        - SL: {voucher.quantity}
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
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>Mã Giảm giá</p>
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
                      <p
                        style={{
                          color: "red",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        Giảm{" "}
                        {voucher?.valueVoucher?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      <p style={{ fontSize: "13px" }}>
                        Áp dụng cho đơn hàng giá trị từ{" "}
                        {voucher?.valueMinimum?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      <p style={{ color: "red", fontSize: "10px" }}>
                        Từ{" "}
                        <DateField
                          style={{ color: "red", fontSize: "10px" }}
                          value={voucher.dateStart}
                          format="DD/MM/YYYY"
                        />{" "}
                        đến{" "}
                        <DateField
                          style={{ color: "red", fontSize: "10px" }}
                          value={voucher.dateEnd}
                          format="DD/MM/YYYY"
                        />{" "}
                        - SL: {voucher.quantity}
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

      <Modal
        visible={isModalVisiblePoint}
        onCancel={handleCancelPoint}
        width={550}
        footer={null}
        bodyStyle={{ minHeight: "500px" }}
      >
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div
              className="card-header d-flex justify-content-between align-items-center p-3"
              style={{ borderTop: "4px solid #ffa900", fontWeight: "bold" }}
            >
              <h5 className="mb-0">HƯỚNG DẪN SỬ DỤNG ĐIỂM</h5>
            </div>
            <div
              className="card-body"
              data-mdb-perfect-scrollbar="true"
              style={{ position: "relative", height: 380, overflowY: "auto" }}
            >
              <h6
                className="mb-0"
                style={{ fontWeight: "bold", color: "#ffa900" }}
              >
                KHI MUA HÀNG
              </h6>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng dưới 30.000.000 vnđ *
              </p>
              <p>- Quý khách được cộng 100 Point</p>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng từ 31.000.000 vnđ đển 50.000.000 vnđ *
              </p>
              <p>- Quý khách được cộng 200 Point</p>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng từ 51.000.000 vnđ đển 70.000.000 vnđ *
              </p>
              <p>- Quý khách được cộng 300 Point</p>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng trên 70.000.000 vnđ *
              </p>
              <p>- Quý khách được cộng 500 Point</p>

              <h6
                className="mb-0"
                style={{ fontWeight: "bold", color: "#ffa900" }}
              >
                SỬ DỤNG ĐIỂM
              </h6>
              <p style={{ fontWeight: "bold", color: "red", fontSize: "15px" }}>
                1 Point = {pointMoney} vnđ *
              </p>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng từ 10.000.000 vnđ đến 50.000.000 vnđ *
              </p>
              <p>- Được sử dụng tối đa {50000 / pointMoney} Point</p>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng từ 51.000.000 vnđ đến 100.000.000 vnđ *
              </p>
              <p>- Được sử dụng tối đa {100000 / pointMoney} Point</p>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng từ 110.000.000 vnđ đến 150.000.000 vnđ *
              </p>
              <p>- Được sử dụng tối đa {150000 / pointMoney} Point</p>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng từ 151.000.000 vnđ đến 200.000.000 vnđ *
              </p>
              <p>- Được sử dụng tối đa {200000 / pointMoney} Point</p>
              <p style={{ fontWeight: "bold" }}>
                Đơn hàng trên 250.000.000 vnđ *
              </p>
              <p>- Được sử dụng tối đa {250000 / pointMoney} Point</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
