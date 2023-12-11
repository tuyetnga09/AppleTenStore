import React, { useEffect, useRef, useState } from "react";
import { FormOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "../SellOffline/style.css";
import {
  Badge,
  Button,
  DatePicker,
  Form,
  Grid,
  Image,
  Layout,
  Menu,
  Modal,
  notification,
  Select,
  Space,
  Table,
  theme,
} from "antd";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getVoucher,
  getVoucherFreeShip,
  searchVoucher,
} from "../../../service/Voucher/voucher.service";
import {
  getOneSKU,
  getSKUProductFormSell,
  getSKUProductFormSellByCateogory,
} from "../../../service/sku.service";
import { readAllCategory } from "../../../service/product.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AvtProduct from "../../custumer_componet/avtProduct";
import queryString from "query-string";
import { DateField, List, NumberField } from "@refinedev/antd";
import {
  readAllCartOff,
  getQuantityCartDetailBySku,
} from "../../../service/cart.service";
import {
  addCustomerOffline,
  getCustomer,
  getOne,
} from "../../../service/Customer/customer.service";

import {
  addImeiDaBan,
  addOrUpdateBillDetail,
  checkAccount,
  createBillOffLine,
  deleteAllImeisDaBanOffLine,
  deleteBillOneDetail,
  deleteImeiDaBan,
  deleteImeisDaBanOffLineCheckBox,
  doneBill,
  getAllImeisDaBanOffLine,
  getBilDetailOfBillWhereIdBill,
  getBillChoThanhToan,
  getBillCTTByCodeBill,
  getBillCTTByCodeBillInDate,
  getBillCTTByCodeBillS2,
  getBillDetailOfBill,
  getBillInDate,
  getIdBill,
  getImeisOfSku,
  getListImeiDaBanOfSku,
  getListImeiThatLac,
  getOneSkuSelected,
  getThongTinTT,
  listImeiDaBanByIdBillDetail,
  seachImeis,
  seachImeisDaBan,
  searchBillCTT,
  searchBillDTT,
  updateQuantitySellOff,
  xoahoaDonCho,
} from "../../../service/SellOffLine/sell_off_line.service";
import { useHistory, Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { readAllWard } from "../../../service/AddressAPI/ward.service";
import { readAllDistrict } from "../../../service/AddressAPI/district.service";
import { readAllProvince } from "../../../service/AddressAPI/province.service";
import { getFee } from "../../../service/AddressAPI/fee.service";

const { Header, Sider, Content } = Layout;
let arrCodeImeiDaBan = [];
let arrIdSku = [];
let arr = [];
export default function SellSmart() {
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const idAccount = storedUser !== null ? storedUser.id : ""; //sau khi đăng nhập thì truyền idAccount vào đây
  const roleAccount = storedUser !== null ? storedUser.roles : ""; //sau khi đăng nhập thì truyền idAccount vào đây

  const idNhanVien = 5; // truyền id nhân viên đăng nhập vào đây
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  // const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal khách hàng
  const [isModalVisibleVoucher, setIsModalVisibleVoucher] = useState(false); // Trạng thái hiển thị Modal Voucher
  const [isModalVisibleBill, setIsModalVisibleBill] = useState(false); // Trạng thái hiển thị Modal Bill chờ
  const [isModalVisibleBillInDate, setIsModalVisibleBillInDate] =
    useState(false); // Trạng thái hiển thị Modal Bill trong Ngày
  const [voucher, setVoucher] = useState([]);
  const [selecteVoucher, setSelectedVoucher] = useState(0);
  const [voucherFreeShip, setVoucherFreeShip] = useState([true]);
  const [selecteVoucherFreeShip, setSelectedVoucherFreeShip] = useState(0);
  const [skuProduct, setSkuProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartIemts, setCartItems] = useState([]);
  const [quantitySKU, setQuantitySKU] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); //tổng tiền sản phẩm
  const [priceShip, setPriceShip] = useState([]); //tiền ship
  const [soTienThanhToan, setSoTienThanhToan] = useState([]); //số tiền khách cần trả
  const [tienThua, setTienThua] = useState([]); //tiền thiếu
  const [khachHang, setKhachHang] = useState([]);

  const [dataBillOffLine, setDataBillOffline] = useState({}); //taoj bill off line phongnh
  const [dataCheckAccount, setDataCheckAccount] = useState({}); // check account offline phongnh
  const [dataCheckRoleAccount, setDataCheckRoleAccount] = useState(); // check role account offline phongnh
  const [dataBillDetailOffline, setDataBillDetailOffline] = useState([]); // lấy ra list sp trong bill_detail của bill phongnh

  const [hoaDonCho, setHoaDonCho] = useState([]); // lấy danh sách hóa đơn chờ
  const [slHoaDonCho, setDlHoaDonCho] = useState([]); // lấy danh sách hóa đơn chờ
  const [slHoaDonNgay, setDlHoaDonChoNgay] = useState([]); // lấy danh sách hóa đơn trong ngày

  const [dataTest, setDataTest] = useState(false); // tesst so luong
  const [indexTest, setIndexTest] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province_id, setProvince_id] = useState();
  const [district_id, setDistrict_id] = useState();
  const [showProvinces, setShowProvinces] = useState(true);
  const [showDistricts, setShowDistricts] = useState(true);
  const [showWards, setShowWards] = useState(true);
  const [fee, setFee] = useState([]);
  const [transportationFeeDTO, setTransportationFeeDTO] = useState({
    toDistrictId: null,
    toWardCode: null,
    insuranceValue: null,
    quantity: 1,
  });
  const [address, setAddress] = useState({
    province: "",
    district: "",
    wards: "",
  });
  const [customer, setCustomer] = useState({
    fullName: "", // Đổi từ 'full_name' thành 'fullName'
    email: "", // Giữ nguyên
    phoneNumber: "", // Đổi từ 'phone_number' thành 'phoneNumber'
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
  const [filtersCategory, setFiltersCategory] = useState({
    page: 0,
    key: "",
    id: null,
  });

  const [dataDoneBill, setDataDoneBill] = useState({
    idBill: null,
    codeImeiDaBan: [],
    moneyShip: 0,
    totalMoney: 0,
    address: null,
    note: null,
    personUpdate: null,
    dateUpdate: null,
    idSku: [],
    idCustomer: null,
    methodPayments: ["TIEN_MAT"],
    moneyPayment: 0,
    notePayment: null,
    cash: 0,
    transfer: 0,
    formOfReceipt: "TAI_CUA_HANG",
    itemDiscount: 0,
    itemDiscountFreeShip: 0,
    idVoucher: null,
    idVoucherFreeShip: null,
    beforePrice: 0,
  });

  //hóa đơn trong ngày
  const [collapsedBill, setCollapsedBill] = useState(false);
  const {
    token: { colorBgContainerBill },
  } = theme.useToken();
  const [billInDate, setBillInDate] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState(["TIEN_MAT"]);
  const [showCashInput, setShowCashInput] = useState(false);
  const [showTransferInput, setShowTransferInput] = useState(false);

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
        quantity: 1,
      };
      setTransportationFeeDTO(item);
      setAddress({
        province: document.getElementById(value).innerText,
        district: "",
        wards: "",
      });
      setShowDistricts(true);
    } else {
      setShowDistricts(false);
      setShowWards(false);
      setTransportationFeeDTO({
        toDistrictId: null,
        toWardCode: null,
        insuranceValue: soTienThanhToan,
        quantity: 1,
      });
    }
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
      setAddress({
        ...address,
        district: document.getElementById(value).innerText,
        wards: "",
      });
      setShowWards(true);
    } else {
      setShowWards(false);
      setTransportationFeeDTO({
        toDistrictId: event.target.value,
        toWardCode: null,
        insuranceValue: soTienThanhToan,
        quantity: 1,
      });
    }
  };

  const handleWard = (event) => {
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      let item = { ...transportationFeeDTO };
      item["toWardCode"] = value;
      setTransportationFeeDTO(item);
      console.log(transportationFeeDTO);
      setAddress({
        ...address,
        wards: document.getElementById(value).innerText,
      });
      console.log(dataDoneBill);
    } else {
      setTransportationFeeDTO({
        ...transportationFeeDTO,
        toWardCode: event.target.value,
      });
    }
  };

  const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
  const unidecode = require("unidecode");

  async function createPDFWithInvoice(codeBill, codeAccount) {
    // Tạo một tài liệu PDF mới
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    // Lấy ngữ cảnh để vẽ
    const { width, height } = page.getSize();

    const customFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Chuỗi chưa dấu
    const unaccentedCodeBill = unidecode(codeBill);
    const unaccentedCodeAccount = unidecode(codeAccount);

    // Vẽ thông tin hóa đơn lên trang
    page.drawText("APPLETENSTORE", {
      x: 200,
      y: height - 50,
      size: 24,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Hoa don so: ${unaccentedCodeBill}`, {
      x: 50,
      y: height - 100,
      size: 22,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Nhan vien BH: ${unaccentedCodeAccount}`, {
      x: 50,
      y: height - 150,
      size: 18,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Cam on quy khach da tin tuong APPLETENSTORE`, {
      x: 100,
      y: height - 250,
      size: 18,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    // Lưu tài liệu PDF ra dạng dữ liệu nhị phân
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  //Tạo hoá đơn off - phongnh
  async function handleCreateOrder() {
    // Kiểm tra xem đã có mã hóa đơn trước đó hay chưa
    if (dataBillOffLine.codeBill) {
      // Nếu có mã hóa đơn trước đó, tạo PDF với mã hóa đơn đó
      const pdfBytes = await createPDFWithInvoice(
        dataBillOffLine.codeBill,
        dataBillOffLine.codeAccount
      );

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url);

      if (idAccount == null || idAccount == "") {
        notification.error({
          message: "Bạn Chưa Đăng Nhập!",
          // description: "Add product successfully",
        });
      } else {
        arr = [];
        //nếu  đăng nhập thì idAccount là khác null vì thế cho add giỏ hàng
        const checkVarAccount = await checkAccount(idAccount);
        setDataCheckAccount(checkVarAccount);
        if (checkVarAccount == null) {
          notification.error({
            message: "Bạn Chưa Đăng Nhập!!",
            // description: "Add product successfully",
          });
        } else {
          //check role tài khoản
          if (roleAccount === "CUSTOMER") {
            notification.error({
              message: "Bạn Không Có Quyền!",
            });
          } else {
            notification.success({
              message: "Mời Thêm Sản Phẩm",
              // description: "Add product successfully",
            });
            createBillOffLine(idAccount)
              .then((response) => {
                console.log(response.data);
                setDataBillOffline(response.data);

                //set gior hàng là rỗng
                setDataBillDetailOffline([]);
                setDataDoneBill({
                  ...dataDoneBill,
                  idBill: response.data.idBill,
                  // idSku: arrIdSku,
                  // codeImeiDaBan: arrCodeImeiDaBan,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
            getBillChoThanhToanOff();
          }
        }
      }
      return;
    }
    //nếu chưa đăng nhập thì idAccount là null vì thế không cho add giỏ hàng
    if (idAccount == null || idAccount == "") {
      notification.error({
        message: "Bạn Chưa Đăng Nhập!",
        // description: "Add product successfully",
      });
    } else {
      arr = [];
      //nếu  đăng nhập thì idAccount là khác null vì thế cho add giỏ hàng
      const checkVarAccount = await checkAccount(idAccount);
      setDataCheckAccount(checkVarAccount);
      if (checkVarAccount == null) {
        notification.error({
          message: "Bạn Chưa Đăng Nhập!!",
          // description: "Add product successfully",
        });
      } else {
        //check role tài khoản
        if (roleAccount === "CUSTOMER") {
          notification.error({
            message: "Bạn Không Có Quyền!",
          });
        } else {
          notification.success({
            message: "Mời Thêm Sản Phẩm",
            // description: "Add product successfully",
          });
          createBillOffLine(idAccount)
            .then((response) => {
              console.log(response.data);
              setDataBillOffline(response.data);

              //set gior hàng là rỗng
              setDataBillDetailOffline([]);
              setDataDoneBill({
                ...dataDoneBill,
                idBill: response.data.idBill,
                // idSku: arrIdSku,
                // codeImeiDaBan: arrCodeImeiDaBan,
              });
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          getBillChoThanhToanOff();
        }
      }
    }
  }

  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  useEffect(() => {
    if (storedUser?.roles === "CUSTOMER" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      const checked1 = document.getElementById("inlineRadio1");
      checked1.checked = isChecked1;
      const checked2 = document.getElementById("inlineRadio2");
      checked2.checked = isChecked2;
      const phanloai = document.getElementById("exampleSelect1");
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
      // lay danh sach category
      readAllCategory()
        .then((response) => {
          console.log(response.data);
          setCategories(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });

      if (phanloai.value != -1) {
        const paramsString2 = queryString.stringify(filtersCategory);
        getSKUProductFormSellByCateogory(paramsString2)
          .then((res) => {
            console.log(res.data);
            setSkuProduct(res.data);
            setPagination(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const paramsString = queryString.stringify(filters);
        getSKUProductFormSell(paramsString)
          .then((response) => {
            console.log(response.data.content);
            setSkuProduct(response.data);
            setPagination(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }
      readAllCartOff(idNhanVien)
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });

      //lấy danh sách khach hang
      getCustomer()
        .then((response) => {
          setKhachHang(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });

      //lấy danh sách hóa đơn chờ
      getBillChoThanhToan()
        .then((response) => {
          setHoaDonCho(response.data);
          const totalQuantity = hoaDonCho.length;
          setDlHoaDonCho(totalQuantity);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      readAllProvince()
        .then((response) => {
          // setProvinces(response.data.data);
          if (showProvinces === true) {
            setProvinces(response.data.data);
          } else {
            setProvinces([]);
          }
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
      //lấy danh sách hóa đơn trong ngày
      getBillInDate()
        .then((res) => {
          setBillInDate(res.data);
          const totalQuantity = billInDate.length;
          setDlHoaDonChoNgay(totalQuantity);
        })
        .catch((err) => {
          console.log(err);
        });

      // Kiểm tra xem "cash" đã được chọn mặc định hay không
      if (selectedOptions.includes("TIEN_MAT")) {
        setShowCashInput(true);
      }
      // Kiểm tra xem "transfer" đã được chọn mặc định hay không
      if (selectedOptions.includes("CHUYEN_KHOAN")) {
        setShowTransferInput(true);
      }

      //tu dong xoa hoa don cho
      xoahoaDonCho()
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [
    filters,
    filtersCategory,
    dataTest,
    province_id,
    district_id,
    showProvinces,
    showDistricts,
    showWards,
    transportationFeeDTO,
    slHoaDonCho,
    slHoaDonNgay,
  ]);

  function getBillChoThanhToanOff() {
    getBillChoThanhToan(idAccount)
      .then((response) => {
        setHoaDonCho(response.data);
        const totalQuantity = hoaDonCho.length;
        setDlHoaDonCho(totalQuantity);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }

  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    const phanloai = document.getElementById("exampleSelect1");
    if (phanloai.value != -1) {
      setFiltersCategory({
        ...filtersCategory,
        page: newPage,
      });
    } else {
      setFilters({
        ...filters,
        page: newPage,
      });
    }
  }

  function handleChangeOne(event) {
    const phanloai = document.getElementById("exampleSelect1");
    if (phanloai.value != -1) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let item = { ...filtersCategory, key: "" };
      item[name] = value;
      setFiltersCategory(item);
    } else {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let item = { page: 0, key: "" };
      item[name] = value;
      setFilters(item);
    }
  }

  function handleChangeCategory(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { page: 0, id: null, key: "" };
    item[name] = parseInt(value);
    setFiltersCategory(item);
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

  // Hàm để hiển thị Modal khi cần
  const handleEditClickBill = (record) => {
    setIsModalVisibleBill(true);
  };

  // Hàm để ẩn Modal
  const handleCancelBill = () => {
    setIsModalVisibleBill(false);
    document.getElementById("id-bill-ctt").value = "";
  };

  // Hàm để hiển thị Modal hóa đơn trong ngày
  const handleClickHoaDonTrongNgay = (record) => {
    setIsModalVisibleBillInDate(true);
  };

  // Hàm để ẩn Modal hóa đơn trong ngày
  const handleCancelHoaDonTrongNgay = () => {
    setIsModalVisibleBillInDate(false);
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
    const items = { ...khachHang };
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const fullNameCodes = new Set();
    const emailCodes = new Set();
    const phoneNumberCodes = new Set();
    const phoneNumberRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Kiểm tra trùng lặp khi thêm mới hoặc chỉnh sửa
    for (let i = 0; i < khachHang.length; i++) {
      const { phoneNumber, email, fullName } = khachHang[i];
      fullNameCodes.add(fullName);
      emailCodes.add(email);
      phoneNumberCodes.add(phoneNumber);
    }
    if (
      fullname == null &&
      fullname == "" &&
      email == null &&
      email == "" &&
      phoneNumber == null &&
      phoneNumber == ""
    ) {
      notification.error({
        message: "Vui lòng nhập thông tin khách hàng!",
      });
      return;
    }
    // if (fullNameCodes.has(fullname)) {
    //   notification.error({
    //     message: "Thêm khách hàng",
    //     description: "Trùng tên",
    //   });
    //   return;
    // }
    if (emailCodes.has(email)) {
      notification.error({
        message: "Thêm khách hàng",
        description: "Trùng email",
      });
      return;
    }
    if (phoneNumberCodes.has(phoneNumber)) {
      notification.error({
        message: "Thêm khách hàng",
        description: "Trùng số điện thoại",
      });
      return;
    }
    if (!phoneNumberRegex.test(phoneNumber)) {
      notification.error({
        message: "Số điện thoại sai định dạng!",
      });
      return;
    }
    if (!emailRegex.test(email)) {
      notification.error({
        message: "Email sai định dạng!",
      });
      return;
    }
    addCustomerOffline(customer)
      .then((response) => {
        history.push("/sell");
        setCustomer({
          fullName: "",
          email: "",
          phoneNumber: "",
        });
        getCustomer()
          .then((response) => {
            setKhachHang(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
        setIsModalVisible(false);
        notification.success({
          message: "Thêm khách hàng",
          description: "Thêm thành công",
        });
      })
      .catch((error) => {
        alert("Thêm khách hàng thất bại");
      });
    // } else {
    //   notification.error({
    //     message: "Vui lòng nhập thông tin khách hàng!",
    //   });
    // }
  };

  function giaoTanNoi() {
    const select = document.getElementById("floatingSelect2");
    select.hidden = false;
    const input = document.getElementById("floatingSelect3");
    input.hidden = false;
    // const selectTT = document.getElementById("floatingSelect4");
    // selectTT.hidden = false;
    const select5 = document.getElementById("floatingSelect5");
    select5.hidden = false;
    const select6 = document.getElementById("floatingSelect6");
    select6.hidden = false;
    const select7 = document.getElementById("floatingSelect7");
    select7.hidden = false;
    setShowProvinces(true);
    setIsChecked1(false);
    setIsChecked2(true);
    setDataDoneBill({
      ...dataDoneBill,
      formOfReceipt: "SHIP_HANG",
    });
  }

  function taiCuaHang() {
    const select = document.getElementById("floatingSelect2");
    select.hidden = true;
    const input = document.getElementById("floatingSelect3");
    input.hidden = true;
    // const selectTT = document.getElementById("floatingSelect4");
    // selectTT.hidden = true;
    const select5 = document.getElementById("floatingSelect5");
    select5.hidden = true;
    const select6 = document.getElementById("floatingSelect6");
    select6.hidden = true;
    const select7 = document.getElementById("floatingSelect7");
    select7.hidden = true;
    setTransportationFeeDTO({
      toDistrictId: null,
      toWardCode: null,
      insuranceValue: null,
      quantity: 1,
    });
    // setDataDoneBill({
    //   ...dataDoneBill,
    //   address: "",
    //   moneyShip: 0,
    //   formOfReceipt: "TAI_CUA_HANG",
    // });
    if (tienThua > 0) {
      setDataDoneBill({
        ...dataDoneBill,
        address: "",
        moneyShip: 0,
        formOfReceipt: "TAI_CUA_HANG",
        totalMoney: totalPrice,
      });
    } else {
      setDataDoneBill({
        ...dataDoneBill,
        address: "",
        moneyShip: 0,
        formOfReceipt: "TAI_CUA_HANG",
        totalMoney: 0,
      });
    }
    setShowProvinces(false);
    setShowDistricts(false);
    setShowWards(false);
    select.value = "";
    setIsChecked1(true);
    setIsChecked2(false);
  }

  const toast = useRef(null);
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "THANH TOÁN",
      detail: "Mời bạn tiếp tục mua hàng",
      life: 3000,
    });
    console.log(arrIdSku);
  };

  function checkSoluongImei() {
    for (let index = 0; index < dataBillDetailOffline.length; index++) {
      if (
        dataBillDetailOffline[index]?.quantity !==
        dataBillDetailOffline[index]?.soLuongImeiDaChon
      ) {
        return false;
      }
    }
    return true;
  }

  function setDataCheckSoLuongImei(index, idBillDetail, idSKU) {
    setIndexTest(index);
    getListImeiDaBanOfSku(idBillDetail, idSKU)
      .then((response) => {
        setDataImeiSelected(response.data);
      })
      .catch((error) => {
        console.log(`Lỗi đọc sku: ${error}`);
      });
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const [user, setUser] = useState(true);
  async function createBillSusses(
    codeBill,
    codeAccount,
    productList,
    selectedValues,
    selectedOptions
  ) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    //bộ font chữ
    const customFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const customFontItalic = await pdfDoc.embedFont(
      StandardFonts.TimesRomanBoldItalic
    );
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    //dữ liệu
    const unaccentedCodeBill = unidecode(codeBill);
    const unaccentedCodeAccount = unidecode(codeAccount);
    const formattedDate = new Date();
    const dateCreateText = formattedDate.toLocaleDateString();
    const totalPriceCode = unidecode(formatCurrency(totalPrice));
    const totalSoTienThanhToan = unidecode(formatCurrency(soTienThanhToan));
    const nameCustomer = unidecode(user.fullName);
    const phoneNumber = user.phoneNumber;

    const drawText = (text, options) =>
      page.drawText(text, { font: customFont, ...options });
    const drawLine = (start, end, thickness, color) =>
      page.drawLine({ start, end, thickness, color: rgb(...color) });

    drawText("APPLE TEN STORE", {
      x: 200,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0),
    });
    drawText("HOA DON BAN HANG", {
      x: 180,
      y: height - 80,
      size: 24,
      font: customFontItalic,
      color: rgb(0, 0, 0),
    });
    drawText(`Hoa don so: ${unaccentedCodeBill}`, {
      x: 50,
      y: height - 120,
      size: 15,
      font: font,
      color: rgb(0, 0, 0),
    });
    drawText(`Ngay mua: ${dateCreateText}`, {
      x: 50,
      y: height - 150,
      size: 15,
      font: font,
      color: rgb(0, 0, 0),
    });
    drawText(
      `Khach hang: ${nameCustomer}` +
        `                               SDT: ${phoneNumber}`,
      {
        x: 50,
        y: height - 180,
        size: 15,
        font: font,
        color: rgb(0, 0, 0),
      }
    );
    drawText(`Hinh thuc thanh toan: ${selectedOptions}`, {
      x: 50,
      y: height - 210,
      size: 15,
      font: font,
      color: rgb(0, 0, 0),
    });
    drawText(`Nhan vien ban hang: ${unaccentedCodeAccount}`, {
      x: 50,
      y: height - 240,
      size: 15,
      font: font,
      color: rgb(0, 0, 0),
    });

    const drawTable = (
      tableX,
      tableY,
      tableWidth,
      tableHeight,
      columns,
      data
    ) => {
      const columnWidth = tableWidth / columns.length;
      const rowHeight = tableHeight / (data.length + 1); // Số dòng bằng số dòng dữ liệu cộng thêm 1 dòng tiêu đề

      // Vẽ tiêu đề cho từng cột
      columns.forEach((column, index) => {
        const x = tableX + columnWidth * index;
        const y = tableY - rowHeight; // Vẽ tiêu đề ở phía trên table
        drawText(column, {
          x: x + columnWidth / 2 - column.length * 2,
          y: y + rowHeight / 2,
          size: 12,
          color: rgb(0, 0, 0),
          font: customFontItalic,
        });
      });

      // Vẽ dữ liệu từ mảng
      data.forEach((row, rowIndex) => {
        const y = tableY - (rowIndex + 2) * rowHeight; // Bắt đầu từ hàng thứ 2 (hàng tiêu đề cộng thêm 1)
        row.forEach((cell, columnIndex) => {
          const x = tableX + columnWidth * columnIndex;
          page.drawText(cell.toString(), {
            x: x + 5,
            y: y + rowHeight / 2,
            width: columnWidth - 10,
            size: 10,
            color: rgb(0, 0, 0),
            font: customFont,
            lineHeight: 12,
          });
        });
      });

      // Vẽ đường ngang
      for (let i = 0; i <= data.length + 1; i++) {
        const y = tableY - i * rowHeight;
        drawLine({ x: tableX, y }, { x: tableX + tableWidth, y }, 1, [0, 0, 0]);
      }

      // Vẽ đường dọc
      for (let i = 0; i <= columns.length; i++) {
        const x = tableX + i * columnWidth;
        drawLine(
          { x, y: tableY },
          { x, y: tableY - tableHeight },
          1,
          [0, 0, 0]
        );
      }
    };

    const columns = [
      "Ten SP",
      "Dung luong",
      "Mau sac",
      "Gia SP",
      "So luong",
      "Thanh Tien",
    ];
    const data = productList.map((product) => [
      product.nameProduct,
      product.skuCapacity,
      product.skuColor,
      unidecode(formatCurrency(product.price)),
      product.quantity,
      unidecode(formatCurrency(product.totalManyOneBillDetail)),
    ]);

    drawTable(50, height - 260, 500, 150, columns, data);

    drawText(`Tong tien hang: ${totalPriceCode}`, {
      x: 50,
      y: height - 440,
      size: 15,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    drawText(`Tong cong tien thanh toan: ${totalSoTienThanhToan}`, {
      x: 50,
      y: height - 470,
      size: 15,
      font: customFont,
      color: rgb(0, 0, 0),
    });
    drawText(`Nhan vien ban hang` + "                Nguoi mua", {
      x: 250,
      y: height - 500,
      size: 15,
      font: font,
      color: rgb(0, 0, 0),
    });
    drawText(
      `(Ky ro ho ten)` +
        "                                             (Ky ro ho ten)",
      {
        x: 270,
        y: height - 520,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
      }
    );
    drawText(`Cam on quy khach da tin tuong APPLETENSTORE`, {
      x: 100,
      y: height - 700,
      size: 18,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  const [checked, setChecked] = useState(false);

  function checkQuantitySubmit() {
    dataBillDetailOffline.map((bd) => {
      getOneSKU(bd.idSKU)
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

  // const [productList, setProductList] = useState([]);
  const [customBill, setCustomBill] = useState([]);

  async function accept() {
    if (checked) {
      if (dataDoneBill.idBill === null) {
        toast.current.show({
          severity: "error",
          summary: "THANH TOÁN",
          detail: "Thanh toán thất bại, hãy tạo/chọn hóa đơn",
          life: 3000,
        });
      } else if (dataBillDetailOffline.length === 0) {
        toast.current.show({
          severity: "error",
          summary: "THANH TOÁN",
          detail: "Thanh toán thất bại, hãy thêm sản phẩm để thanh toán",
          life: 3000,
        });
      } else if (dataDoneBill.idCustomer === null) {
        toast.current.show({
          severity: "error",
          summary: "THANH TOÁN",
          detail: "Thanh toán thất bại, chưa chọn khách hàng?",
          life: 3000,
        });
      } else {
        const pdfBytes = await createBillSusses(
          dataBillOffLine.codeBill,
          dataBillOffLine.codeAccount,
          dataBillDetailOffline,
          selectedValues,
          selectedOptions
        );
        if (checkSoluongImei() === true) {
          if (tienThua <= 0) {
            doneBill(dataDoneBill)
              .then((res) => {
                if (res.status === 200) {
                  toast.current.show({
                    severity: "success",
                    summary: "THANH TOÁN",
                    detail: "Thanh toán thành công",
                    life: 3000,
                  });
                  // getBillCTTByCodeBill(dataBillOffLine.codeBill).then(
                  //   (response) => {
                  //     setProductList(response.data);
                  //   }
                  // );
                  // getThongTinTT(dataBillOffLine.codeBill).then((response) => {
                  //   setCustomBill(response.data);
                  // });
                  const blob = new Blob([pdfBytes], {
                    type: "application/pdf",
                  });
                  const url = URL.createObjectURL(blob);
                  window.open(url);

                  setDataBillDetailOffline([]);
                  setDataTest(!dataTest);
                  setDataBillOffline([]);
                  document.getElementById("amountGiven").value = 0;
                  document.getElementById("transferAmount").value = 0;
                  getBillChoThanhToanOff();
                  setSelectedVoucher(0);
                  setSelectedVoucherFreeShip(0);

                  const totalQuantity = billInDate.length;
                  setDlHoaDonChoNgay(totalQuantity);
                  const totalQuantity1 = hoaDonCho.length;
                  setDlHoaDonCho(totalQuantity1);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            console.log("ok");
          } else {
            toast.current.show({
              severity: "error",
              summary: "THANH TOÁN",
              detail: "Chưa thanh toán đủ tiền",
              life: 3000,
            });
          }
        } else {
          toast.current.show({
            severity: "error",
            summary: "KIỂM TRA IMEI",
            detail: "Vui lòng kiểm tra lại imei",
            life: 3000,
          });
        }
      }
    } else {
      notification.error({
        message: "Mặt hàng đã có người mua hết!",
      });
    }
  }

  const handleGhiChu = (event) => {
    setDataDoneBill({
      ...dataDoneBill,
      note: event.target.value,
    });
  };
  const handleDiaChi = (event) => {
    setDataDoneBill({
      ...dataDoneBill,
      address:
        event.target.value +
        ", " +
        address.wards +
        ", " +
        address.district +
        ", " +
        address.province,
      moneyShip: fee?.total,
      totalMoney: fee?.total + totalPrice,
    });
  };
  const handlePhiVanChuyen = (event) => {
    setDataDoneBill({
      ...dataDoneBill,
      moneyShip: parseInt(event.target.value),
      totalMoney: totalPrice + parseInt(event.target.value),
    });
  };
  const confirm2 = () => {
    // setDataDoneBill({
    //   ...dataDoneBill,
    //   totalMoney: totalPrice + dataDoneBill.moneyShip,
    //   // methodPayments: selectedOptions,
    // });
    confirmDialog({
      message: "Bạn chắc chắn muốn thanh toán?",
      header: "THANH TOÁN",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(),
      reject,
    });
  };

  // phongnh
  // thêm sp vào giỏ hàng bán off
  async function handleAddBillDetail(idSKU, priceSku, codeBill) {
    // Tạo một đối tượng AddCart để gửi lên API
    const addToCartData = {
      // idAccount: idNhanVien,
      codeBill: codeBill,
      idSKU: idSKU,
      price: priceSku,
      quantity: 1,
      idAccount: idAccount,
    };
    addOrUpdateBillDetail(addToCartData)
      .then((response) => {
        getBillDetailOfBill(codeBill)
          .then((response) => {
            setDataBillDetailOffline(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      })
      .catch((error) => {
        console.log("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      });
    setDataTest(!dataTest);
  }

  //phongnh - imei
  // mở modal imei
  const [isModalVisibleImei, setIsModalVisibleImei] = useState(false); // Trạng thái hiển thị Modal

  //lấy ra idBillDetail khi mở modal để thê imei vào bảng imei đã bán
  const [dataIdBillDetail, setDataIdBillDetail] = useState(null);
  //lấy ra idSKU khi mở modal để thêm imei vào bảng imei đã bán
  const [dataIdSKU, setDataIdSKU] = useState(null);
  // Hàm để hiển thị Modal imei khi cần
  const handleImeiOpen = (idBillDetail, idSKU) => {
    // load ra tất cả imei đã đucowj thêm vào bảng imei đã bán --->

    setDataIdBillDetail(idBillDetail);
    setDataIdSKU(idSKU);
    getListImeiDaBanOfSku(idBillDetail, idSKU)
      .then((response) => {
        setDataImeiSelected(response.data);
      })
      .catch((error) => {
        console.log(`Lỗi đọc sku: ${error}`);
      });
    setIsModalVisibleImei(true);
  };
  // Hàm để ẩn Modal imei
  const handleCancelImei = () => {
    setDataSKuSelected({});
    setDataImeiClick([]);
    setDataIdBillDetail([]);
    // setDataImeiSelected([]);
    setDataIdSKU([]);
    setDataImeiThatLac([]);
    document.getElementById("id-imeithatlac").value = "";
    document.getElementById("id-imeis").value = "";
    document.getElementById("id-imei-da-ban").value = "";
    setDataSeachImeiDaBan([]);
    setDataSeachImeis([]);
    setSelectedCheckboxes([]);

    setIsModalVisibleImei(false);
    // khi đóng modal thì lấy ra được thông tin cần để update
    // let arrCodeImeiDaBan = [];
    dataImeiSelected.map((item) => {
      // Kiểm tra xem phần tử mới có tồn tại trong mảng không trước khi thêm vào
      if (!arrCodeImeiDaBan.includes(item.codeImeiDaBan)) {
        arrCodeImeiDaBan.push(item.codeImeiDaBan);
      }
    });
    const isUnique = arr.every(
      (arr1) => !arr1.every((value, index) => value === dataImeiSelected[index])
    );
    if (isUnique) {
      arr.push(dataImeiSelected); // Thêm mảng mới vào mảng 2D
    }
    // if (!arr.includes(dataImeiSelected)) {
    //   arr.push(dataImeiSelected);
    // }
    if (fee === undefined) {
      setDataDoneBill({
        ...dataDoneBill,
        codeImeiDaBan: arrCodeImeiDaBan,
        note: document.getElementById("ghiChu").value,
        personUpdate: storedUser?.code + " - " + storedUser?.user?.fullName,
        dateUpdate: null,
        totalMoney: totalPrice,
      });
    } else {
      setDataDoneBill({
        ...dataDoneBill,
        codeImeiDaBan: arrCodeImeiDaBan,
        note: document.getElementById("ghiChu").value,
        personUpdate: storedUser?.code + " - " + storedUser?.user?.fullName,
        dateUpdate: null,
        totalMoney: fee?.total + totalPrice,
      });
    }
    // setDataDoneBill({
    //   ...dataDoneBill,
    //   codeImeiDaBan: arrCodeImeiDaBan,
    //   note: document.getElementById("ghiChu").value,
    //   personUpdate: storedUser?.code + " - " + storedUser?.user?.fullName,
    //   dateUpdate: null,
    //   totalMoney: totalPrice,
    // });
  };

  //danh sách imei - của sku được chọn
  const [dataImeiClick, setDataImeiClick] = useState([]);
  //danh sách imei được thêm vào bill - của sku được chọn
  const [dataImeiSelected, setDataImeiSelected] = useState([]);
  //lấy ra sku được chọn
  const [dataSkuSelected, setDataSKuSelected] = useState({});

  //phongnh -- lấy ra sku được chọn và danh sách imei  của sku đó
  async function handleAddImei(idSKU, idBillDetail) {
    getImeisOfSku(idSKU)
      .then((response) => {
        setDataImeiClick(response.data);
      })
      .catch((error) => {
        console.log(`Lỗi đọc imei của sku: ${error}`);
      });

    getOneSkuSelected(idSKU)
      .then((response) => {
        setDataSKuSelected(response.data);
      })
      .catch((error) => {
        console.log(`Lỗi đọc sku: ${error}`);
      });

    handleImeiOpen(idBillDetail, idSKU);
  }

  //add imei vào bảng imei dã bán - phongnh
  const handleImeiClick = (codeImei, idBillDetail) => {
    // Tạo một đối tượng AddCart để gửi lên API
    const item = {
      codeImei: codeImei,
      idBillDetail: idBillDetail,
      codeAccount: idAccount,
    };
    addImeiDaBan(item)
      .then((response) => {
        if (response.data === "") {
          notification.error({
            message: "Thêm Imei Thất Bại!",
            description: "imei đã có trong giỏ hàng hoặc đã bán!",
          });
        } else {
          getListImeiDaBanOfSku(idBillDetail, dataIdSKU)
            .then((response) => {
              setDataImeiSelected(response.data);
            })
            .catch((error) => {
              console.log(`Lỗi đọc sku: ${error}`);
            });
          getImeisOfSku(dataIdSKU)
            .then((response) => {
              setDataImeiClick(response.data);
            })
            .catch((error) => {
              console.log(`Lỗi đọc imei của sku: ${error}`);
            });
          seachImeis(dataIdSKU, codeImei)
            .then((response) => {
              setDataSeachImeis(response.data);
            })
            .catch((error) => {
              console.log(`${error}`);
            });

          //load lại bill_detaill để update số lượng imei_da_chon -phongnh
          getIdBill(idBillDetail)
            .then((response) => {
              getBilDetailOfBillWhereIdBill(response.data)
                .then((response) => {
                  setDataBillDetailOffline(response.data);
                })
                .catch((error) => {
                  console.log(`${error}`);
                });
            })
            .catch((error) => {
              console.log(`${error}`);
            });

          notification.success({
            message: "Thêm Imei Thành Công",
          });
        }
      })
      .catch((error) => {
        console.log(`Lỗi khi cập nhật số lượng: ${error}`);
      });
  };

  // xoá imei đã bán ra khỏi bảng imei đã bán và cập nhật lại status imei trong bảng imei - phongnh
  const handleClearImeiDaBan = (idImeiDaBan, codeImeiDaBan) => {
    deleteImeiDaBan(idImeiDaBan, codeImeiDaBan)
      .then((response) => {
        getListImeiDaBanOfSku(dataIdBillDetail, dataIdSKU)
          .then((response) => {
            setDataImeiSelected(response.data);
          })
          .catch((error) => {
            console.log(`Lỗi đọc sku: ${error}`);
          });
        getImeisOfSku(dataIdSKU)
          .then((response) => {
            setDataImeiClick(response.data);
          })
          .catch((error) => {
            console.log(`Lỗi đọc imei của sku: ${error}`);
          });
        seachImeisDaBan(dataIdBillDetail, dataIdSKU, codeImeiDaBan)
          .then((response) => {
            setDataSeachImeiDaBan(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
        //load lại bill_detaill để update số lượng imei_da_chon -phongnh
        getIdBill(dataIdBillDetail)
          .then((response) => {
            getBilDetailOfBillWhereIdBill(response.data)
              .then((response) => {
                setDataBillDetailOffline(response.data);
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
        notification.success({
          message: "Xoá Imei Thành Công",
        });
      })
      .catch((error) => {
        console.log(`Lỗi xoá imei_da_ban: ${error}`);
      });
  };

  //tạo danh sach imei thất lạc
  const [dataImeiThatLac, setDataImeiThatLac] = useState([]);

  //tìm kiếm imei thất lạc - phongnh
  function handleChangeImeiThatLac(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target + " check imei");
    console.log(value + " check imei - name");

    // let item = { key: "" };
    // item[name] = value;
    // setDataImeiThatLac(item);
    if (value !== undefined) {
      getListImeiThatLac(value)
        .then((response) => {
          setDataImeiThatLac(response.data);
          console.log(response.data + " check imei - response.data");
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }

  //tìm kiếm imei đã bán - phongnh
  const [dataSeachImeiDaBan, setDataSeachImeiDaBan] = useState([]);

  function handleChangeImeisDaBan(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target + " check imei");
    console.log(value + " check imei - name");

    // let item = { key: "" };
    // item[name] = value;
    // setDataImeiThatLac(item);
    if (value !== undefined) {
      seachImeisDaBan(dataIdBillDetail, dataIdSKU, value)
        .then((response) => {
          setDataSeachImeiDaBan(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }

  //tìm kiếm imei - phongnh
  const [dataSeachImeis, setDataSeachImeis] = useState([]);

  function handleChangeImeis(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target + " check imei");
    console.log(value + " check imei - name");

    // let item = { key: "" };
    // item[name] = value;
    // setDataImeiThatLac(item);
    if (value !== undefined) {
      seachImeis(dataIdSKU, value)
        .then((response) => {
          setDataSeachImeis(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }

  //check box imei để xoá đi - phongnh
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  function handleCheckboxChange(e) {
    const checkboxValue = e.target.value;
    // setIsChecked(e.target.checked);

    // if (e.target.checked) {
    //   // Nếu được chọn, thêm giá trị vào danh sách
    //   setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    // } else {
    //   // Nếu bỏ chọn, loại bỏ giá trị khỏi danh sách
    //   setSelectedCheckboxes(
    //     selectedCheckboxes.filter((item) => item !== checkboxValue)
    //   );
    // }
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (e.target.checked) {
        // Nếu được chọn, thêm giá trị vào danh sách
        return [...prevSelectedCheckboxes, checkboxValue];
      } else {
        // Nếu bỏ chọn, loại bỏ giá trị khỏi danh sách
        return prevSelectedCheckboxes.filter((item) => item !== checkboxValue);
      }
    });
  }

  // Sử dụng useEffect để theo dõi thay đổi của selectedCheckboxes và in giá trị mới
  // useEffect(() => {
  //   console.log(selectedCheckboxes + " :imei da ban ++--");
  // }, [selectedCheckboxes]);

  //xoá các imei đã được chọn - checkbox - phongnh
  const handleClearImeiDaBanCheckBox = () => {
    if (selectedCheckboxes.length > 0) {
      deleteImeisDaBanOffLineCheckBox(selectedCheckboxes)
        .then((response) => {
          setSelectedCheckboxes([]);
          getListImeiDaBanOfSku(dataIdBillDetail, dataIdSKU)
            .then((response) => {
              setDataImeiSelected(response.data);
            })
            .catch((error) => {
              console.log(`Lỗi đọc sku: ${error}`);
            });
          getImeisOfSku(dataIdSKU)
            .then((response) => {
              setDataImeiClick(response.data);
            })
            .catch((error) => {
              console.log(`Lỗi đọc imei của sku: ${error}`);
            });

          setDataSeachImeiDaBan([]);
          //load lại bill_detaill để update số lượng imei_da_chon -phongnh
          getIdBill(dataIdBillDetail)
            .then((response) => {
              getBilDetailOfBillWhereIdBill(response.data)
                .then((response) => {
                  setDataBillDetailOffline(response.data);
                })
                .catch((error) => {
                  console.log(`${error}`);
                });
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          toast.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Đã Xoá Danh Sách Imei.",
            life: 3000,
          });
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    } else {
      notification.error({
        message: "Xoá Thất Bại!",
        description: "Hãy Chọn Danh Sách Imei.",
      });
    }
  };
  //config khi xoá cehckbox imei  của bill_detail - phongnh
  const rejectDeleteImeiCheckBoxBillDetail = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const confirmDeleteImeiCheckBoxBillDetail = (idBillDetail, codeBill) => {
    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "XOÁ TẤT CẢ IMEI ĐÃ CHỌN",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleClearImeiDaBanCheckBox(),
      reject: () => rejectDeleteImeiCheckBoxBillDetail(),
    });
  };

  //xoá all imei của bill_detail - phongnh
  const handleClearAllImeiDaBan = () => {
    getAllImeisDaBanOffLine(dataIdBillDetail)
      .then((response) => {
        if (response.data.length > 0) {
          deleteAllImeisDaBanOffLine(dataIdBillDetail)
            .then((response) => {
              setSelectedCheckboxes([]);
              getListImeiDaBanOfSku(dataIdBillDetail, dataIdSKU)
                .then((response) => {
                  setDataImeiSelected(response.data);
                })
                .catch((error) => {
                  console.log(`Lỗi đọc sku: ${error}`);
                });
              getImeisOfSku(dataIdSKU)
                .then((response) => {
                  setDataImeiClick(response.data);
                })
                .catch((error) => {
                  console.log(`Lỗi đọc imei của sku: ${error}`);
                });

              setDataSeachImeiDaBan([]);

              //load lại bill_detaill để update số lượng imei_da_chon -phongnh
              getIdBill(dataIdBillDetail)
                .then((response) => {
                  getBilDetailOfBillWhereIdBill(response.data)
                    .then((response) => {
                      setDataBillDetailOffline(response.data);
                    })
                    .catch((error) => {
                      console.log(`${error}`);
                    });
                })
                .catch((error) => {
                  console.log(`${error}`);
                });
              toast.current.show({
                severity: "success",
                summary: "THÔNG BÁO THÀNH CÔNG",
                detail: "Đã Xoá Tất Cả Imei.",
                life: 3000,
              });
            })
            .catch((error) => {
              console.log(`Lỗi đọc imei_da_ban: ${error}`);
            });
        } else {
          notification.error({
            message: "Xoá Thất Bại!",
            description: "Danh Sách Imei Rỗng.",
          });
        }
      })
      .catch((error) => {
        console.log(`Lỗi đọc bill_detail: ${error}`);
      });
  };
  //config khi xoá all imei của bill_detail - phongnh
  const rejectDeleteAllImeiBillDetail = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const confirmDeleteAllImeiBillDetail = (idBillDetail, codeBill) => {
    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "XOÁ TẤT CẢ IMEI ĐÃ CHỌN",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleClearAllImeiDaBan(),
      reject: () => rejectDeleteAllImeiBillDetail(),
    });
  };

  // xoá one bill_detail cảu 1 hoá đơn - phongnh
  const removeBillDetail = (idBillDetail, codeBill) => {
    deleteBillOneDetail(idBillDetail)
      .then((response) => {
        console.log(" xaos kkk");
        getBillDetailOfBill(codeBill)
          .then((response) => {
            setDataBillDetailOffline(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
        toast.current.show({
          severity: "success",
          summary: "THÔNG BÁO",
          detail: "Xoá thành công.",
          life: 3000,
        });
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  };
  //config khi xoá bill_detail - phongnh
  const rejectDeleteBillDetail = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const confirmDeleteBillDetail = (idBillDetail, codeBill) => {
    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "THÔNG BÁO XOÁ SẢN PHẨM",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => removeBillDetail(idBillDetail, codeBill),
      reject: () => rejectDeleteBillDetail(),
    });
  };

  const handleUpdateQuantity = (billDetailID, newQuantity, codeBill) => {
    if (newQuantity == 0) {
      newQuantity = 1;
    } else if (newQuantity < 0) {
      // xóa sản phẩm khỏi giỏ hàng khi so luong bang 0
      notification.error({
        message: "ADD TO CART",
        description: "Không được nhập số lượng âm",
      });
    } else {
      updateQuantitySellOff(billDetailID, newQuantity)
        .then((response) => {
          console.log(response.data);
          getBillDetailOfBill(codeBill)
            .then((response) => {
              setDataBillDetailOffline(response.data);
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

  // async function remove(id) {
  //   deleteCartDetailOff(id).then(() => {
  //     let newArr = [...cartIemts].filter((s) => s.id !== id);
  //     setCartItems(newArr);
  //     window.location.reload();
  //   });
  // }

  // TÍNH TIỀN TỔNG SẢN PHẨN - ADD VOUCHER
  useEffect(() => {
    calculateTotalPrice();
    calculateChange();
    setDataDoneBill({
      ...dataDoneBill,
      beforePrice: totalPrice,
    });
  }, [
    dataBillDetailOffline,
    dataTest,
    fee,
    tienThua,
    soTienThanhToan,
    selecteVoucher,
    selecteVoucherFreeShip,
  ]);

  const calculateTotalPrice = () => {
    let total = 0;
    dataBillDetailOffline.forEach((product) => {
      // Chuyển đổi giá trị total từ dạng chuỗi sang số và cộng vào tổng
      const productTotal = parseFloat(product.totalManyOneBillDetail);
      total += productTotal;
    });
    // Đặt lại giá trị tổng giá tiền
    setTotalPrice(total);

    //tính phí ship
    let priceS = 0;
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
    const amountGivenInput = document.getElementById("amountGiven");
    const transferAmountInput = document.getElementById("transferAmount");

    if (showCashInput && showTransferInput) {
      // Tính tiền khi cả hai hình thức được chọn
      const amountGiven = parseFloat(amountGivenInput.value);
      const transferAmount = parseFloat(transferAmountInput.value);
      if (!isNaN(amountGiven) && !isNaN(transferAmount)) {
        const amountToReturn = parseFloat(soTienThanhToan);
        if (!isNaN(amountToReturn)) {
          const change = amountToReturn - (transferAmount + amountGiven);
          setTienThua(change);
        } else {
          setTienThua(soTienThanhToan);
        }
      } else {
        setTienThua(soTienThanhToan);
      }
    } else if (showCashInput) {
      // Tính tiền khi chỉ tiền mặt được chọn
      const amountGiven = parseFloat(amountGivenInput.value);
      if (!isNaN(amountGiven)) {
        const amountToReturn = parseFloat(soTienThanhToan);
        if (!isNaN(amountToReturn)) {
          const change = amountToReturn - amountGiven;
          setTienThua(change);
        } else {
          setTienThua(soTienThanhToan);
        }
      } else {
        setTienThua(soTienThanhToan);
      }
    } else if (showTransferInput) {
      // Tính tiền khi chỉ chuyển khoản được chọn
      const transferAmount = parseFloat(transferAmountInput.value);
      if (!isNaN(transferAmount)) {
        const amountToReturn = parseFloat(soTienThanhToan);
        if (!isNaN(amountToReturn)) {
          const change = amountToReturn - transferAmount;
          setTienThua(change);
        } else {
          setTienThua(soTienThanhToan);
        }
      } else {
        setTienThua(soTienThanhToan);
      }
    }
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
    } else if (voucher.quantity <= 0) {
      notification.error({
        message: "VOUCHER",
        description: "Voucher đã hết lượt sử dụng",
      });
    } else {
      setSelectedVoucher(voucher);
      setDataDoneBill({
        ...dataDoneBill,
        itemDiscount: voucher.valueVoucher,
        idVoucher: voucher.id,
      });
      readAllCartOff(idNhanVien) //sau truyền id nhân viên vào đây
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
      readAllCartOff(idNhanVien) //sau truyền id nhân viên vào đây
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
      setDataDoneBill({
        ...dataDoneBill,
        itemDiscountFreeShip: voucher.valueVoucher,
        idVoucherFreeShip: voucher.id,
      });
      readAllCartOff(idNhanVien) //sau truyền id nhân viên vào đây
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
      readAllCartOff(idNhanVien) //sau truyền id nhân viên vào đây
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  const [searchValue, setSearchValue] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSelect = (value) => {
    setSelectedValues(value);
    setDataDoneBill({
      ...dataDoneBill,
      idCustomer: value,
    });
    getOne(value)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  };

  const handleClear = () => {
    setSelectedValues(null);
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const clickHoaDonCho = (codeBill) => {
    setDataBillOffline([]);
    let totalMoney = 0;
    getBillCTTByCodeBill(codeBill)
      .then((response) => {
        setDataBillDetailOffline(response.data);
        console.log(response.data);
        response.data.map((data) => {
          console.log(data.price);
          totalMoney += data.price;
        });
        response.data.map((data) => {
          if (!arrIdSku.includes(data.idSKU)) {
            arrIdSku.push(data.idSKU);
          }
          listImeiDaBanByIdBillDetail(data.id)
            .then((response) => {
              response.data.map((data) => {
                if (!arrCodeImeiDaBan.includes(data.codeImei)) {
                  arrCodeImeiDaBan.push(data.codeImei);
                }
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    getBillCTTByCodeBillS2(codeBill)
      .then((response) => {
        setDataBillOffline(response.data);
        setDataDoneBill({
          ...dataDoneBill,
          idBill: response.data.idBill,
          idSku: arrIdSku,
          codeImeiDaBan: arrCodeImeiDaBan,
          totalMoney: totalMoney,
          personUpdate: storedUser?.code + " - " + storedUser?.user?.fullName,
        });
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    arrIdSku = [];
    setIsModalVisibleBill(false);
    getBillChoThanhToanOff();
    arrCodeImeiDaBan = [];
  };

  const rejectHDC = () => {
    toast.current.show({
      severity: "warn",
      summary: "Thanh Toán",
      detail: "Xin mời tiếp tục.",
      life: 3000,
    });
    setIsModalVisibleBill(false);
  };

  const confirmCallUpdateStatusVoucher = (codeBill) => {
    confirmDialog({
      message: "Bạn có muốn tiếp tục thanh toán hóa đơn này không?",
      header: "Thanh Toán",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => clickHoaDonCho(codeBill),
      rejectHDC,
    });
  };

  //tìm kiếm hóa đơn chờ thanh toán
  const handleChangeBillCTT = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (value !== undefined) {
      searchBillCTT(idAccount, value)
        .then((response) => {
          setHoaDonCho(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues); // Cập nhật state khi có sự thay đổi trong việc chọn option

    // Kiểm tra nếu "cash" nằm trong danh sách lựa chọn
    if (selectedValues.includes("TIEN_MAT")) {
      setShowCashInput(true);
    } else {
      setShowCashInput(false);
    }

    // Kiểm tra nếu "transfer" nằm trong danh sách lựa chọn
    if (selectedValues.includes("CHUYEN_KHOAN")) {
      setShowTransferInput(true);
    } else {
      setShowTransferInput(false);
    }
  };

  //tìm kiếm voucher
  const handleChangeVoucher = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (value !== undefined) {
      searchVoucher(value)
        .then((response) => {
          setVoucher(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  const moreMenu = (categories) => (
    <Menu
      mode="vertical"
      onClick={({ domEvent }) => domEvent.stopPropagation()}
    >
      <Menu.Item
        key="accept"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          <FormOutlined
            style={{
              color: "#52c41a",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          //   setEditId(record.id);
        }}
      >
        Edit
      </Menu.Item>
    </Menu>
  );

  const breakpoint = Grid.useBreakpoint();

  const BillDetailTable = ({ record }) => {
    const [billDetail, setBillDetail] = useState([]);

    useEffect(() => {
      getBillCTTByCodeBillInDate(record.code)
        .then((res) => {
          setBillDetail(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const moreMenu = (record) => (
      <Menu
        mode="vertical"
        onClick={({ domEvent }) => domEvent.stopPropagation()}
      >
        <Menu.Item
          key="edit"
          style={{
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
          }}
          icon={
            <FormOutlined
              style={{
                color: "#52c41a",
                fontSize: 17,
                fontWeight: 500,
              }}
            />
          }
          // onClick={() => editShow(record)}
        >
          DELETE
        </Menu.Item>
      </Menu>
    );

    return (
      <List title="Sản phẩm" createButtonProps={undefined}>
        <Table
          rowKey="idSKU"
          dataSource={billDetail}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `Tổng số ${total} mục`,
            showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
          }}
        >
          <Table.Column
            dataIndex="images"
            title="Ảnh"
            render={(text, record) => (
              <div style={{ width: "150px" }}>
                <AvtProduct product={record.idProduct} />
              </div>
            )}
          />
          <Table.Column
            key="nameProduct"
            dataIndex="nameProduct"
            title="Tên sản phẩm"
            render={(text, record) => {
              return `${record.nameProduct} - ${record.skuCapacity} - ${record.skuColor}`;
            }}
          />
          <Table.Column
            align="right"
            key="price"
            dataIndex="price"
            title="Giá bán"
            render={(value) => {
              return (
                <NumberField
                  options={{
                    currency: "VND",
                    style: "currency",
                    //   notation: "compact",
                  }}
                  value={value}
                />
              );
            }}
            sorter={(a, b) => a.price - b.price}
          />
          <Table.Column
            align="right"
            key="quantity"
            dataIndex="quantity"
            title="Số lượng"
            render={(value) => {
              return <NumberField value={value} />;
            }}
            sorter={(a, b) => a.quantity - b.quantity}
          />
          <Table.Column
            align="right"
            key="totalManyOneBillDetail"
            dataIndex="totalManyOneBillDetail"
            title="Thành tiền"
            render={(value) => {
              return (
                <NumberField
                  options={{
                    currency: "VND",
                    style: "currency",
                    //   notation: "compact",
                  }}
                  value={value}
                />
              );
            }}
            sorter={(a, b) =>
              a.totalManyOneBillDetail - b.totalManyOneBillDetail
            }
          />
        </Table>
      </List>
    );
  };

  const expandedRowRender = (record) => {
    return <BillDetailTable record={record} />;
  };

  //tìm kiếm hóa đơn trong ngày
  const handleChangeBillDTT = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (value !== undefined) {
      searchBillDTT(idAccount, value)
        .then((response) => {
          setBillInDate(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  return (
    <React.Fragment>
      <>
        <Toast ref={toast} />
        <ConfirmDialog />
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
                          {roleAccount === "NHAN_VIEN_BAN_HANG" ? (
                            <button
                              className="btn btn-secondary luu-va-in"
                              onClick={() => {
                                localStorage.removeItem("account");
                                window.location.replace("/login");
                              }}
                            >
                              Đăng xuất tài khoản
                            </button>
                          ) : (
                            <Link
                              to={
                                roleAccount === "NHAN_VIEN_QUAN_LY"
                                  ? "/orders"
                                  : roleAccount === "ADMIN"
                                  ? "/dashboard"
                                  : "/sell"
                              }
                            >
                              <button className="btn btn-secondary luu-va-in">
                                Quay về
                              </button>
                            </Link>
                          )}

                          <br />
                          <b>POS bán hàng</b>
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
                          name="key"
                          onChange={handleChangeOne}
                        />
                      </div>

                      <div className="col-md-3">
                        <label
                          className="control-label"
                          style={{ fontWeight: "bold" }}
                        >
                          Phân loại sản phẩm
                        </label>
                        <select
                          className="form-control"
                          id="exampleSelect1"
                          name="id"
                          onChange={handleChangeCategory}
                        >
                          <option value={-1} selected>
                            --- Chọn sản phẩm ---
                          </option>
                          {categories.map((ct) => {
                            return (
                              <option key={ct?.id} value={ct?.id}>
                                {ct?.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label
                          className="control-label"
                          style={{ fontWeight: "bold" }}
                        >
                          +
                        </label>{" "}
                        <br />
                        <Space size="middle">
                          <Badge count={slHoaDonNgay} overflowCount={10}>
                            <button
                              type="button"
                              class="btn btn-secondary"
                              style={{ marginRight: "10px" }}
                              onClick={() => handleClickHoaDonTrongNgay()}
                            >
                              {/* <FallOutlined /> */}DANH SÁCH HOÁ ĐƠN
                            </button>
                          </Badge>
                        </Space>
                      </div>
                      <div className="col-md-2">
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
                          style={{
                            marginRight: "10px",
                            backgroundColor: "green",
                          }}
                          onClick={() => handleCreateOrder()}
                        >
                          {/* <FallOutlined /> */}TẠO HOÁ ĐƠN
                        </button>
                        {/* <button type="button" class="btn btn-secondary">
                                    {/* <RiseOutlined /> */}
                        {/* </button> */}
                      </div>
                    </div>

                    <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
                      Sản phẩm
                    </h5>
                    <Table
                      rowKey="idSKU"
                      dataSource={skuProduct}
                      pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                        showTotal: (total) => `Tổng số ${total} mục`,
                        showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                      }}
                    >
                      <Table.Column
                        align="center"
                        title="STT"
                        render={(text, record, index) => index + 1}
                      />
                      <Table.Column
                        dataIndex="images"
                        title="Ảnh"
                        render={(text, record) => (
                          <div style={{ width: "150px" }}>
                            <AvtProduct product={record.idProduct} />
                          </div>
                        )}
                      />
                      <Table.Column
                        key="nameProduct"
                        dataIndex="nameProduct"
                        title="Tên sản phẩm"
                        render={(text, record) => {
                          return `${record.nameProduct} - ${record.nameCapacity} - ${record.nameColor}`;
                        }}
                      />
                      <Table.Column
                        align="right"
                        key="price"
                        dataIndex="price"
                        title="Giá bán"
                        render={(value) => {
                          return (
                            <NumberField
                              options={{
                                currency: "VND",
                                style: "currency",
                                //   notation: "compact",
                              }}
                              value={value}
                            />
                          );
                        }}
                        sorter={(a, b) => a.price - b.price}
                      />
                      <Table.Column
                        align="right"
                        key="quantitySKU"
                        dataIndex="quantitySKU"
                        title="Kho"
                        render={(value) => {
                          return value == 0 ? (
                            <Badge
                              className="site-badge-count-109"
                              count={"Hết hàng"}
                              style={{ backgroundColor: "orangered" }}
                            />
                          ) : (
                            <NumberField value={value} />
                          );
                        }}
                        sorter={(a, b) => a.quantitySKU - b.quantitySKU}
                      />
                      {/* test nút mới add sp vào bill detai */}
                      <Table.Column
                        align="center"
                        title="Action"
                        render={(record) => {
                          return (
                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              onClick={() => {
                                console.log(
                                  record.idSKU +
                                    "  - " +
                                    record.price +
                                    " ----record ----" +
                                    record.quantitySKU
                                );
                                if (dataBillOffLine?.codeBill != null) {
                                  if (record.quantitySKU <= 0) {
                                    notification.error({
                                      message: "ADD TO CART",
                                      description:
                                        "Sản phẩm tạm thời hết hàng!",
                                    });
                                  } else {
                                    handleAddBillDetail(
                                      record.idSKU,
                                      record.price,
                                      dataBillOffLine?.codeBill
                                    );
                                    if (!arrIdSku.includes(record.idSKU)) {
                                      arrIdSku.push(record.idSKU);
                                    }
                                    setDataDoneBill({
                                      ...dataDoneBill,
                                      idSku: arrIdSku,
                                    });
                                    for (
                                      let index = 0;
                                      index < dataBillDetailOffline.length;
                                      index++
                                    ) {
                                      if (
                                        dataBillDetailOffline[index].idSKU ===
                                        record.idSKU
                                      ) {
                                        const quantity =
                                          document.getElementById(
                                            `quantity-${index}`
                                          );
                                        quantity.value =
                                          parseInt(quantity.value) + 1;
                                      }
                                    }
                                  }
                                } else {
                                  notification.error({
                                    message: "ADD TO CART",
                                    description: "HÃY TẠO HOÁ ĐƠN!",
                                  });
                                }
                              }}
                            >
                              <ShoppingCartOutlined />
                            </button>
                          );
                        }}
                      />
                    </Table>

                    {/* test phongnh  */}
                    <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
                      Giỏ hàng
                    </h5>
                    <Table
                      dataSource={dataBillDetailOffline}
                      pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                        showTotal: (total) => `Tổng số ${total} mục`,
                        showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                      }}
                      rowKey="id"
                    >
                      <Table.Column
                        align="center"
                        title="STT"
                        render={(text, record, index) => index + 1}
                      />
                      <Table.Column
                        dataIndex="images"
                        title="Ảnh"
                        render={(text, record) => (
                          <div style={{ width: "150px" }}>
                            <AvtProduct product={record.idProduct} />
                          </div>
                        )}
                      />
                      <Table.Column
                        key="nameProduct"
                        dataIndex="nameProduct"
                        title="Tên sản phẩm"
                        render={(text, record) => {
                          return `${record.nameProduct} - ${record.skuCapacity} - ${record.skuColor}`;
                        }}
                      />
                      <Table.Column
                        align="right"
                        key="price"
                        dataIndex="price"
                        title="Giá bán"
                        render={(value) => {
                          return (
                            <NumberField
                              options={{
                                currency: "VND",
                                style: "currency",
                                //   notation: "compact",
                              }}
                              value={value}
                            />
                          );
                        }}
                        sorter={(a, b) => a.price - b.price}
                      />
                      <Table.Column
                        key="quantity"
                        dataIndex="quantity"
                        title="Số lượng"
                        render={(text, record, index) => {
                          return (
                            <div
                              className="def-number-input number-input safari_only"
                              style={{ paddingRight: "10px" }}
                            >
                              <button
                                onClick={() => {
                                  const quantity = document.getElementById(
                                    `quantity-${index}`
                                  );
                                  quantity.value = record.quantity - 1;
                                  if (quantity.value <= 0) {
                                    notification.error({
                                      message: "ADD TO CART",
                                      description: "Số lượng phải lớn hơn 0",
                                    });
                                    quantity.value = 1;
                                  }
                                  handleUpdateQuantity(
                                    record.id,
                                    record.quantity - 1,
                                    record.codeBill
                                  );
                                  setDataCheckSoLuongImei(
                                    index,
                                    record.id,
                                    record.idSKU
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
                                defaultValue={record.quantity}
                                onChange={() => {
                                  getOneSKU(record.idSKU).then((res) => {});
                                  setDataCheckSoLuongImei(
                                    index,
                                    record.id,
                                    record.idSKU
                                  );
                                }}
                                onBlur={(event) => {
                                  getOneSKU(record.idSKU)
                                    .then((res) => {
                                      console.log(res.data);
                                      if (event.target.value <= 0) {
                                        notification.error({
                                          message: "ADD TO CART",
                                          description:
                                            "Số lượng phải lớn hơn 0",
                                        });
                                        const quantity =
                                          document.getElementById(
                                            `quantity-${index}`
                                          );
                                        quantity.value = record.quantity;
                                        handleUpdateQuantity(
                                          record.id,
                                          record.quantity,
                                          record.codeBill
                                        );
                                      } else if (
                                        event.target.value >
                                        parseInt(res.data.quantity)
                                        // parseInt(skuProduct[index].quantitySKU)
                                        // +
                                        //   parseInt(product.quantity)
                                      ) {
                                        notification.error({
                                          message: "ADD TO CART",
                                          description:
                                            "Không thể nhập quá số lượng đang có",
                                        });
                                        const quantity =
                                          document.getElementById(
                                            `quantity-${index}`
                                          );
                                        quantity.value = res.data.quantity;
                                        handleUpdateQuantity(
                                          record.id,
                                          record.quantity,
                                          record.codeBill
                                        );
                                      } else {
                                        const quantity =
                                          document.getElementById(
                                            `quantity-${index}`
                                          );
                                        quantity.value = event.target.value;
                                        handleUpdateQuantity(
                                          record.id,
                                          quantity.value,
                                          record.codeBill
                                        );
                                      }
                                      setDataCheckSoLuongImei(
                                        index,
                                        record.id,
                                        record.idSKU
                                      );
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }}
                              />
                              <button
                                onClick={() => {
                                  getOneSKU(record.idSKU).then((res) => {
                                    const quantity = document.getElementById(
                                      `quantity-${index}`
                                    );
                                    quantity.value =
                                      parseInt(record.quantity) + 1;
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
                                    record.id,
                                    record.quantity + 1,
                                    record.codeBill
                                  );
                                  setDataCheckSoLuongImei(
                                    index,
                                    record.id,
                                    record.idSKU
                                  );
                                }}
                                className="plus"
                              />
                            </div>
                          );
                        }}
                        sorter={(a, b) => a.quantity - b.quantity}
                      />
                      <Table.Column
                        key="totalMoney"
                        dataIndex="totalMoney"
                        title="Thành tiền"
                        render={(text, record) => {
                          return parseFloat(
                            record.totalManyOneBillDetail
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          });
                        }}
                        sorter={(a, b) =>
                          a.totalManyOneBillDetail - b.totalManyOneBillDetail
                        }
                      />
                      <Table.Column
                        key="totalImei"
                        dataIndex="totalImei"
                        title="Imei"
                        render={(text, record, index) => {
                          return (
                            <>
                              <div style={{ width: "100px" }}>
                                Tổng số imei: {record.soLuongImeiDaChon}
                                <button
                                  type="button"
                                  // class="btn btn-secondary"
                                  className="btn btn-primary btn-sm trash"
                                  style={{
                                    // marginRight: "10px",
                                    backgroundColor: "green",
                                  }}
                                  onClick={() => {
                                    handleAddImei(record.idSKU, record.id);
                                    setIndexTest(index);
                                  }}
                                >
                                  Chọn imei
                                </button>
                              </div>
                            </>
                          );
                        }}
                        sorter={(a, b) =>
                          a.soLuongImeiDaChon - b.soLuongImeiDaChon
                        }
                      />
                      <Table.Column
                        title="Actions"
                        render={(text, record) => {
                          return (
                            <>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                                onClick={() =>
                                  confirmDeleteBillDetail(
                                    record.id,
                                    dataBillOffLine?.codeBill
                                  )
                                }
                              >
                                <span aria-hidden="true">
                                  <FontAwesomeIcon
                                    icon={faTimes}
                                    style={{ paddingRight: "10px" }}
                                  />
                                </span>
                              </button>
                            </>
                          );
                        }}
                      />
                    </Table>
                    {/* </div> */}
                  </div>
                  <div className="col-md-3">
                    <div className="tile">
                      <h3 className="tile-title">Thông tin thanh toán</h3>
                      <div className="row">
                        <div className="form-group  col-md-12">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Mã Hoá Đơn
                          </label>
                          <input
                            id="codeBill"
                            className="form-control"
                            type="text"
                            defaultValue={dataBillOffLine?.codeBill}
                            name="codeBill"
                            disabled
                          />
                        </div>
                        <div className="form-group  col-md-10">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Họ tên khách hàng
                            <span aria-hidden="true" onClick={handleClear}>
                              <FontAwesomeIcon
                                icon={faTimes}
                                style={{ paddingLeft: "10px", color: "red" }}
                              />
                            </span>
                          </label>
                          <Select
                            mode="single"
                            style={{
                              width: "100%",
                              maxHeight: "100px",
                              overflowY: "auto",
                            }}
                            showSearch
                            optionFilterProp="children"
                            filterOption={filterOption}
                            onSearch={handleSearch}
                            onChange={handleSelect}
                            value={selectedValues}
                          >
                            {khachHang.map((khachHang) => {
                              return (
                                <Select.Option
                                  key={khachHang.id}
                                  value={khachHang.id}
                                >
                                  {`${khachHang.fullName} - ${khachHang.phoneNumber}`}
                                </Select.Option>
                              );
                            })}
                          </Select>
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
                            defaultValue={dataBillOffLine?.codeAccount}
                            name="codeAccount"
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
                            id="ghiChu"
                            className="form-control"
                            rows={4}
                            placeholder="Ghi chú thêm đơn hàng"
                            defaultValue={""}
                            onChange={handleGhiChu}
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
                        </div>
                        <div
                          className="form-group  col-md-12"
                          hidden
                          id="floatingSelect5"
                        >
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Tỉnh, thành phố
                          </label>
                          <select
                            class="form-select"
                            id="provinces"
                            aria-label="Floating label select example"
                            onChange={handleProvince}
                          >
                            <option value={"undefined"} selected></option>
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
                        <div
                          className="form-group  col-md-12"
                          hidden
                          id="floatingSelect6"
                        >
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Quân, Huyện
                          </label>
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
                        <div
                          className="form-group  col-md-12"
                          hidden
                          id="floatingSelect7"
                        >
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Xã, Phường
                          </label>
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
                        <div
                          className="form-group  col-md-12"
                          // hidden
                          // id="floatingSelect7"
                        >
                          <input
                            hidden
                            id="floatingSelect2"
                            class="form-control"
                            type="text"
                            placeholder="Địa chỉ cụ thể"
                            aria-label="default input example"
                            onChange={handleDiaChi}
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
                          <p className="fw-bold" id="phiVanChuyen">
                            {fee == null
                              ? 0 + "₫"
                              : fee?.total?.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                          </p>
                          {/* <input
                            id="phiVanChuyen"
                            className="form-control"
                            type="number"
                            defaultValue={0}
                            onChange={handlePhiVanChuyen}
                          /> */}
                        </div>
                        {/* <div
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
                        </div> */}
                      </div>
                      <div className="row">
                        <div className="form-group  col-md-12">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Hình thức thanh toán
                          </label>
                          <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            value={selectedOptions} // Đặt giá trị được chọn dựa trên state
                            onChange={handleSelectChange} // Sử dụng hàm xử lý sự kiện
                          >
                            <Select.Option value="CHUYEN_KHOAN">
                              Thanh toán chuyển khoản
                            </Select.Option>
                            <Select.Option value="TIEN_MAT">
                              Trả tiền mặt tại quầy
                            </Select.Option>
                          </Select>
                        </div>
                        <div
                          className="form-group  col-md-6"
                          style={{ color: "red", fontWeight: "bold" }}
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
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Giảm giá:{" "}
                          </label>
                          <p
                            className="control-all-money-tamtinh"
                            onClick={() => handleEditClickVoucher()}
                            style={{ color: "blue" }}
                          >
                            Chọn Voucher
                          </p>
                        </div>
                        <div
                          className="form-group  col-md-6"
                          style={{ color: "red", fontWeight: "bold" }}
                        >
                          <label className="control-label">
                            Giảm giá Voucher:{" "}
                          </label>
                          <p
                            className="control-all-money-total"
                            style={{ fontWeight: "bold" }}
                          >
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

                        {showCashInput && (
                          <div className="form-group col-md-6">
                            <label
                              className="control-label"
                              style={{ fontWeight: "bold" }}
                            >
                              Khách hàng đưa tiền:
                            </label>
                            <input
                              id="amountGiven"
                              className="form-control"
                              type="number"
                              min={0}
                              // defaultValue={0}
                              onChange={calculateChange}
                              onBlur={(event) => {
                                if (event.target.value <= 0) {
                                  const quantity =
                                    document.getElementById(`amountGiven`);
                                  quantity.value = 0;
                                  setTienThua(soTienThanhToan);
                                }
                                if (tienThua > 0) {
                                  setDataDoneBill({
                                    ...dataDoneBill,
                                    totalMoney: soTienThanhToan,
                                    methodPayments: selectedOptions,
                                    notePayment:
                                      document.getElementById(
                                        "control-all-money"
                                      ).innerText,
                                    cash: event.target.value,
                                  });
                                } else {
                                  setDataDoneBill({
                                    ...dataDoneBill,
                                    totalMoney: soTienThanhToan,
                                    methodPayments: selectedOptions,
                                    notePayment:
                                      document.getElementById(
                                        "control-all-money"
                                      ).innerText,
                                    cash: event.target.value,
                                  });
                                }
                              }}
                            />
                          </div>
                        )}

                        <div
                          className="form-group  col-md-6"
                          style={{ color: "red", fontWeight: "bold" }}
                        >
                          <label className="control-label">
                            Khách cần trả:{" "}
                          </label>
                          <p className="control-all-money">
                            {" "}
                            ={" "}
                            {soTienThanhToan?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </p>
                        </div>
                        {showTransferInput && (
                          <div className="form-group col-md-6">
                            <label
                              className="control-label"
                              style={{ fontWeight: "bold" }}
                            >
                              Khách hàng chuyển khoản:
                            </label>
                            <input
                              id="transferAmount"
                              className="form-control"
                              type="number"
                              min={0}
                              // defaultValue={0}
                              onChange={calculateChange}
                              onBlur={(event) => {
                                if (event.target.value <= 0) {
                                  const quantity =
                                    document.getElementById(`transferAmount`);
                                  quantity.value = 0;
                                  setTienThua(soTienThanhToan);
                                }
                                if (tienThua > 0) {
                                  setDataDoneBill({
                                    ...dataDoneBill,
                                    totalMoney: soTienThanhToan,
                                    methodPayments: selectedOptions,
                                    notePayment:
                                      document.getElementById(
                                        "control-all-money"
                                      ).innerText,
                                    transfer: event.target.value,
                                  });
                                } else {
                                  setDataDoneBill({
                                    ...dataDoneBill,
                                    totalMoney: soTienThanhToan,
                                    methodPayments: selectedOptions,
                                    notePayment:
                                      document.getElementById(
                                        "control-all-money"
                                      ).innerText,
                                    transfer: event.target.value,
                                  });
                                }
                              }}
                            />
                          </div>
                        )}
                        <div
                          className="form-group  col-md-6"
                          style={{
                            fontWeight: "bold",
                            color:
                              tienThua === 0
                                ? "green" // Nếu đủ tiền, màu xanh lá cây
                                : tienThua > 0
                                ? "red" // Nếu thiếu tiền, màu đỏ
                                : "green", // Nếu thừa tiền, màu xanh biển
                          }}
                        >
                          <label className="control-label">*** </label>
                          <p
                            className="control-all-money"
                            id="control-all-money"
                          >
                            {" "}
                            {tienThua === 0
                              ? "Đã thu đủ tiền"
                              : tienThua > 0
                              ? `Thiếu ${Math.abs(tienThua).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}`
                              : `Thừa ${Math.abs(tienThua).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}`}
                          </p>
                        </div>
                        <div className="tile-footer col-md-12">
                          <button
                            className="btn btn-danger btn-block btn-lg"
                            type="button"
                            style={{
                              marginRight: "10px",
                              marginBottom: "10px",
                              height: "90px",
                              fontSize: "50px",
                            }}
                            onClick={() => confirm2()}
                            onMouseOver={() => checkQuantitySubmit()}
                          >
                            Thanh Toán
                          </button>
                          <div style={{ marginTop: "35px" }}>
                            <Space size="middle">
                              <Badge count={slHoaDonCho} overflowCount={10}>
                                <button
                                  className="btn btn-success btn-block btn-lg"
                                  type="button"
                                  style={{
                                    marginRight: "10px",
                                    marginBottom: "10px",
                                    width: "359px",
                                  }}
                                  onClick={() => handleEditClickBill()}
                                >
                                  Danh Sách Hóa Đơn Chờ
                                </button>
                              </Badge>
                            </Space>
                          </div>
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
          width={600}
          footer={null}
          bodyStyle={{ minHeight: "300px" }}
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
                id="fullname"
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
                id="email"
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
                id="phoneNumber"
                className="form-control"
                type="text"
                name="phoneNumber"
                value={customer.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <br />
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            type="button"
            onClick={handleSave}
          >
            Lưu lại
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancel}
          >
            Hủy bỏ
          </button>
          {/* <a class="btn btn-cancel" data-dismiss="modal" href="#">
            Hủy bỏ
          </a> */}
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
              <input
                id="voucher-offline"
                className="form-control"
                type="search"
                placeholder="Nhập mã Voucher"
                aria-label="Search"
                name="key"
                onChange={handleChangeVoucher}
              />
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                Mã FreeShip
              </p>
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
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                Mã Giảm giá
              </p>
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
                          Áp dụng cho đơn hàng có giá trị từ{" "}
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
          visible={isModalVisibleImei}
          onCancel={handleCancelImei}
          width={550}
          footer={null}
          bodyStyle={{ minHeight: "800px" }}
        >
          <div className="container py-5">
            <div className="row d-flex justify-content-center">
              {/* <div className="card"> */}
              <div>
                <h4
                  className="mb-0"
                  style={{ textAlign: "center", margin: "auto" }}
                >
                  DANH SÁCH IMEI
                </h4>
              </div>
              <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid #ffa900" }}
              ></div>
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  backgroundColor: "orange",
                }}
              >
                Imei Thất Lạc
              </p>
              <input
                id="id-imeithatlac"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="key"
                onChange={handleChangeImeiThatLac}
              />
              <p></p>
              {dataImeiThatLac.length > 0 ? (
                <ul class="list-group mb-3">
                  <li
                    class="list-group-item d-flex justify-content-between"
                    style={{ backgroundColor: "yellowgreen" }}
                  >
                    <span>STT</span>
                    <span style={{ paddingLeft: "10px" }}>Mã Hoá Đơn</span>
                    <span style={{ paddingLeft: "10px" }}>Tên Sản Phẩm</span>
                    <span style={{ paddingLeft: "10px" }}>Dung Lượng</span>
                    <span style={{ paddingLeft: "10px" }}>Màu Sắc</span>
                    <span style={{ paddingLeft: "10px" }}>Giá</span>
                    <span style={{ paddingLeft: "10px" }}>Trạng Thái HĐ</span>
                  </li>
                  {dataImeiThatLac.map((imei, index) => (
                    <ul class="list-group mb-3">
                      <li class="list-group-item d-flex justify-content-between">
                        <span>{index + 1}:</span>
                        <span>{imei.codeBill}</span>
                        <span style={{ paddingLeft: "10px" }}>{""}</span>
                        <span style={{ paddingLeft: "10px" }}>{""}</span>
                        <span style={{ paddingLeft: "10px" }}>{""}</span>
                        <span style={{ paddingLeft: "10px" }}>{""}</span>
                        <span style={{ paddingLeft: "10px" }}>{""}</span>
                        <span style={{ paddingLeft: "10px" }}>{""}</span>
                        <span style={{ paddingLeft: "10px" }}>{""}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between">
                        <span style={{ paddingLeft: "25px" }}>
                          {" - "} {imei.nameProduct}
                          {" - "}
                          {imei.capacitySKU}
                          {" - "} {imei.colorSKU}
                          {" - "} {imei.priceSKU}
                          {" - "}
                          {imei.statusBill}
                        </span>
                      </li>
                    </ul>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "red" }}>* Không có dữ liệu!</p>
              )}
              <div
                className="card-header d-flex justify-content-between align-items-center"
                style={{ borderTop: "4px solid #ffa900" }}
              ></div>
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  backgroundColor: "orange",
                }}
              >
                Danh Sách Imei Đã Chọn Của {dataSkuSelected.nameProduct}{" "}
                {dataSkuSelected.capacitySKU} - {dataSkuSelected.colorSKU}
              </p>

              <input
                id="id-imei-da-ban"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="key"
                onChange={handleChangeImeisDaBan}
              />
              <p></p>
              <p style={{ textAlign: "right" }}>
                <Button
                  type="text"
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#ff7700",
                    color: "white",
                  }}
                  className="col-3 btn-xoa"
                  danger
                  onClick={() => confirmDeleteImeiCheckBoxBillDetail()}
                >
                  Xoá Checkbox
                </Button>
                <span className="col-1"></span>
                <Button
                  type="text"
                  danger
                  style={{
                    border: "2px solid black",
                    backgroundColor: "red",
                    color: "white",
                  }}
                  className="col-3 btn-xoa"
                  onClick={() => confirmDeleteAllImeiBillDetail()}
                >
                  Xoá All Imei
                </Button>
              </p>
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={{ position: "relative", height: 250, overflowY: "auto" }}
              >
                {/* dataSeachImeiDaBan */}
                {dataSeachImeiDaBan.length === 0 ? (
                  <ul class="list-group mb-3">
                    {dataImeiSelected.map((imei, index) => (
                      <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between">
                          <span>{index + 1}</span>

                          <input
                            type="checkbox"
                            value={imei.codeImeiDaBan}
                            checked={selectedCheckboxes.includes(
                              imei.codeImeiDaBan
                            )}
                            onChange={handleCheckboxChange}
                          />
                          <span style={{ paddingLeft: "10px" }}>
                            {imei.codeImeiDaBan}
                          </span>
                          <strong>
                            <Button
                              type="text"
                              danger
                              onClick={() => {
                                handleClearImeiDaBan(
                                  imei.idImeiDaBan,
                                  imei.codeImeiDaBan
                                );
                                let filteredArray = arrCodeImeiDaBan.filter(
                                  (item) => item !== imei.codeImeiDaBan
                                );
                                arrCodeImeiDaBan = filteredArray;
                              }}
                            >
                              Hủy
                            </Button>
                          </strong>
                        </li>
                      </ul>
                    ))}
                  </ul>
                ) : (
                  <ul class="list-group mb-3">
                    {dataSeachImeiDaBan.map((imei, index) => (
                      <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between">
                          <span>{index + 1}</span>
                          <span style={{ paddingLeft: "10px" }}>
                            {imei.codeImeiDaBan}
                          </span>
                          <strong>
                            <Button
                              type="text"
                              danger
                              onClick={() =>
                                handleClearImeiDaBan(
                                  imei.idImeiDaBan,
                                  imei.codeImeiDaBan
                                )
                              }
                            >
                              Hủy
                            </Button>
                          </strong>
                        </li>
                      </ul>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className="card-header d-flex justify-content-between align-items-center"
                style={{ borderTop: "4px solid #ffa900" }}
              ></div>
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  backgroundColor: "orange",
                }}
              >
                Danh Sách Imei Của {dataSkuSelected.nameProduct}{" "}
                {dataSkuSelected.capacitySKU} - {dataSkuSelected.colorSKU}
              </p>
              <input
                id="id-imeis"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="key"
                onChange={handleChangeImeis}
              />
              <p></p>
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={{ position: "relative", height: 330, overflowY: "auto" }}
              >
                {/* dataSeachImeis */}
                {dataSeachImeis.length === 0 ? (
                  <ul class="list-group mb-3">
                    {dataImeiClick.map((imei, index) => (
                      <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between">
                          <span>{index + 1}</span>
                          <span style={{ paddingLeft: "10px" }}>
                            {imei.codeImei}
                            <br />
                          </span>
                          <strong>
                            <Button
                              type="text"
                              danger
                              onClick={() =>
                                handleImeiClick(imei.codeImei, dataIdBillDetail)
                              }
                            >
                              Chọn
                            </Button>
                          </strong>
                        </li>
                      </ul>
                    ))}
                  </ul>
                ) : (
                  <ul class="list-group mb-3">
                    {dataSeachImeis.map((imei, index) => (
                      <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between">
                          <span>{index + 1}</span>
                          <span style={{ paddingLeft: "10px" }}>
                            {imei.codeImei}
                            <br />
                          </span>
                          <strong>
                            <Button
                              type="text"
                              danger
                              onClick={() =>
                                handleImeiClick(imei.codeImei, dataIdBillDetail)
                              }
                            >
                              Chọn
                            </Button>
                          </strong>
                        </li>
                      </ul>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          visible={isModalVisibleBill}
          onCancel={handleCancelBill}
          width={230}
          footer={null}
          bodyStyle={{ minHeight: "550px" }}
        >
          <div className="container py-5">
            <div className="row d-flex justify-content-center">
              <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid #1979a9" }}
              >
                <h5 className="mb-0">HÓA ĐƠN CHỜ</h5>
              </div>
              <input
                id="id-bill-ctt"
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="key"
                style={{
                  marginBottom: "10px",
                  borderTop: "4px solid red",
                }}
                onChange={handleChangeBillCTT}
              />
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={{ position: "relative", height: 330, overflowY: "auto" }}
              >
                {hoaDonCho.map((hoadon) => (
                  <button
                    className="btn btn-danger luu-va-in"
                    type="button"
                    style={{
                      width: "170px",
                      height: "60px",
                      marginBottom: "10px",
                    }}
                    onClick={() => {
                      // const shouldContinue = window.confirm(
                      //   "Bạn có muốn tiếp tục thanh toán không?"
                      // );
                      // if (shouldContinue) {
                      // arrIdSku = [];
                      // Thực hiện hành động sau khi xác nhận
                      confirmCallUpdateStatusVoucher(hoadon.code);
                      // setIsModalVisibleBill(false);
                      // getBillChoThanhToanOff();
                      // notification.success({
                      //   message: "Tiếp tục thanh toán",
                      // });
                      // arrCodeImeiDaBan = [];
                      // } else {
                      //   setIsModalVisibleBill(false);
                      //   // Hủy bỏ hành động nếu người dùng không muốn tiếp tục
                      // }
                    }}
                  >
                    {hoadon.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          visible={isModalVisibleBillInDate}
          onCancel={handleCancelHoaDonTrongNgay}
          width={900}
          footer={null}
          bodyStyle={{ minHeight: "800px" }}
        >
          <h3 className="tile-title">Danh sách hóa đơn</h3>
          <input
            id="id-bill-ctt"
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="key"
            onChange={handleChangeBillDTT}
          />
          <List>
            <Form>
              <Table
                dataSource={billInDate}
                expandable={{
                  expandedRowRender: !breakpoint.xs
                    ? expandedRowRender
                    : undefined,
                }}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: false,
                  showTotal: (total) => `Tổng số ${total} mục`,
                  showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                }}
                rowKey="id"
              >
                <Table.Column
                  key="title"
                  dataIndex="title"
                  title="Mã hóa đơn"
                  render={(text, record) => {
                    return (
                      <Form.Item
                        name="title"
                        style={{ margin: 0, fontWeight: "bold" }}
                      >
                        {record.code}
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  key="isActive"
                  dataIndex="isActive"
                  title="Ngày tạo"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <DateField
                          value={record.dateCreate}
                          format="DD/MM/YYYY"
                        />
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  key="isActive"
                  dataIndex="isActive"
                  title="Nhân viên bán hàng"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        {record.personUpdate}
                      </Form.Item>
                    );
                  }}
                />
                {/* <Table.Column
                  title="Actions"
                  dataIndex="actions"
                  key="actions"
                  align="center"
                  render={(_text, record) => {
                    return (
                      <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
                        <MoreOutlined
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontSize: 24,
                          }}
                        />
                      </Dropdown>
                    );
                  }}
                /> */}
              </Table>
            </Form>
          </List>
        </Modal>
      </>
    </React.Fragment>
  );
}
