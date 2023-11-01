import React, { useState, useEffect, useRef } from "react";
import { useTranslate } from "@refinedev/core";
import { ShoppingCartOutlined, GiftOutlined } from "@ant-design/icons";
import "../SellOffline/style.css";
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
  Badge,
  Space,
} from "antd";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getVoucher,
  getVoucherFreeShip,
} from "../../../service/Voucher/voucher.service";
import {
  getSKUProductFormSell,
  getSKUProductFormSellByCateogory,
} from "../../../service/sku.service";
import { readAllCategory } from "../../../service/product.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AvtProduct from "../../custumer_componet/avtProduct";
import queryString from "query-string";
import Pagination from "./Paging";
import { NumberField } from "@refinedev/antd";
import {
  addToCartOffline,
  readAllCartOff,
  updateQuantityOff,
  deleteCartDetailOff,
} from "../../../service/cart.service";
import { getOneSKU } from "../../../service/sku.service";
import {
  addCustomerOffline,
  getCustomer,
} from "../../../service/Customer/customer.service";

import {
  createBillOffLine,
  checkAccount,
  // checkRolesAccount,
  addOrUpdateBillDetail,
  getBillDetailOfBill,
  getImeisOfSku,
  getOneSkuSelected,
  addImeiDaBan,
  getListImeiDaBanOfSku,
  getListImeiThatLac,
  getBillChoThanhToan,
  updateQuantitySellOff,
  getBillCTTByCodeBill,
  getBillCTTByCodeBillS2,
  deleteImeiDaBan,
  seachImeisDaBan,
  seachImeis,
  deleteImeisDaBanOffLineCheckBox,
  deleteAllImeisDaBanOffLine,
  getAllImeisDaBanOffLine,
  deleteBillOneDetail,
  searchBillCTT,
} from "../../../service/SellOffLine/sell_off_line.service";
import { useHistory } from "react-router-dom";
import { DateField } from "@refinedev/antd";
import { Toast } from "primereact/toast";

const { Header, Sider, Content } = Layout;

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

  const [dataTest, setDataTest] = useState(false); // tesst so luong

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

  //Tạo hoá đơn off - phongnh
  async function handleCreateOrder() {
    //nếu chưa đăng nhập thì idAccount là null vì thế không cho add giỏ hàng
    if (idAccount == null || idAccount == "") {
      notification.error({
        message: "Bạn Chưa Đăng Nhập!",
        // description: "Add product successfully",
      });
    } else {
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
            })
            .catch((error) => {
              console.log(`${error}`);
            });
        }
      }
    }
  }

  useEffect(() => {
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
    getBillChoThanhToan(idAccount)
      .then((response) => {
        setHoaDonCho(response.data);
        const totalQuantity = hoaDonCho.length;
        setDlHoaDonCho(totalQuantity);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters, filtersCategory, dataTest]);

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
        alert("Thêm khách hàng thành công");
        history.push("/sell");
        setCustomer({
          fullName: "",
          email: "",
          phoneNumber: "",
        });
      })
      .catch((error) => {
        alert("Thêm khách hàng thất bại");
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
    setDataImeiSelected([]);
    setDataIdSKU([]);
    setDataImeiThatLac([]);
    document.getElementById("id-imeithatlac").value = "";
    document.getElementById("id-imeis").value = "";
    document.getElementById("id-imei-da-ban").value = "";
    setDataSeachImeiDaBan([]);
    setDataSeachImeis([]);
    setSelectedCheckboxes([]);
    setIsModalVisibleImei(false);
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
              // seachImeisDaBan(dataIdBillDetail, dataIdSKU, codeImeiDaBan)
              //   .then((response) => {
              setDataSeachImeiDaBan([]);
              //   })
              //   .catch((error) => {
              //     console.log(`${error}`);
              //   });
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
  }, [dataBillDetailOffline, dataTest]);

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
    const amountGiven = parseFloat(
      document.getElementById("amountGiven").value
    );
    // Lấy giá trị số tiền cần trả (bạn có thể sử dụng biến soTienThanhToan)
    const amountToReturn = parseFloat(soTienThanhToan);
    // Tính số tiền thừa
    const change = amountToReturn - amountGiven;
    setTienThua(change);
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
    } else {
      setSelectedVoucherFreeShip(voucher);
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
  };

  const handleClear = () => {
    setSelectedValues(null);
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const clickHoaDonCho = (codeBill) => {
    setDataBillOffline([]);
    getBillCTTByCodeBill(codeBill)
      .then((response) => {
        setDataBillDetailOffline(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    getBillCTTByCodeBillS2(codeBill)
      .then((response) => {
        setDataBillOffline(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
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
  }

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
                          return <NumberField value={value} />;
                        }}
                        sorter={(a, b) => a.quantitySKU - b.quantitySKU}
                      />

                      {/* test nút mới add sp vào bill detai */}
                      <Table.Column
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
                                    " ----record ----1"
                                );
                                if (dataBillOffLine?.codeBill != null) {
                                  handleAddBillDetail(
                                    record.idSKU,
                                    record.price,
                                    dataBillOffLine?.codeBill
                                  );
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
                    <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th className="so--luong">Ảnh</th>
                          <th className="so--luong">Sản Phẩm</th>
                          <th className="so--luong">Giá</th>
                          <th className="so--luong">Số Lượng</th>
                          <th className="so--luong">Thành Tiền</th>
                          <th className="so--luong">Imei</th>
                          <th className="so--luong">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataBillDetailOffline.map((billDetail, index) => (
                          <tr>
                            <td style={{ width: "200px" }}>
                              <AvtProduct
                                product={billDetail.idProduct}
                              ></AvtProduct>
                            </td>
                            <td>
                              <p>
                                <h6 className="text-primary">
                                  {billDetail.nameProduct}{" "}
                                </h6>
                              </p>
                              {billDetail.skuCapacity} - {billDetail.skuColor}
                            </td>
                            <td>
                              {parseFloat(billDetail.price).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
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
                                    quantity.value = billDetail.quantity - 1;
                                    if (quantity.value <= 0) {
                                      notification.error({
                                        message: "ADD TO CART",
                                        description: "Số lượng phải lớn hơn 0",
                                      });
                                      quantity.value = 1;
                                    }
                                    handleUpdateQuantity(
                                      billDetail.id,
                                      billDetail.quantity - 1,
                                      billDetail.codeBill
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
                                  defaultValue={billDetail.quantity}
                                  onChange={() => {
                                    getOneSKU(billDetail.idSKU).then(
                                      (res) => {}
                                    );
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
                                      quantity.value = billDetail.quantity;
                                      handleUpdateQuantity(
                                        billDetail.id,
                                        billDetail.quantity,
                                        billDetail.codeBill
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
                                      quantity.value = billDetail.quantity;
                                      handleUpdateQuantity(
                                        billDetail.id,
                                        billDetail.quantity,
                                        billDetail.codeBill
                                      );
                                    } else {
                                      const quantity = document.getElementById(
                                        `quantity-${index}`
                                      );
                                      quantity.value = event.target.value;
                                      handleUpdateQuantity(
                                        billDetail.id,
                                        billDetail.quantity,
                                        billDetail.codeBill
                                      );
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    getOneSKU(billDetail.idSKU).then((res) => {
                                      const quantity = document.getElementById(
                                        `quantity-${index}`
                                      );
                                      quantity.value =
                                        parseInt(billDetail.quantity) + 1;
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
                                      billDetail.id,
                                      billDetail.quantity + 1,
                                      billDetail.codeBill
                                    );
                                  }}
                                  className="plus"
                                />
                              </div>
                            </td>
                            <td>
                              {parseFloat(
                                billDetail.totalManyOneBillDetail
                              ).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td>
                              <p>số imei </p>
                              <p>
                                <button
                                  type="button"
                                  // class="btn btn-secondary"
                                  className="btn btn-primary btn-sm trash"
                                  style={{
                                    // marginRight: "10px",
                                    backgroundColor: "green",
                                  }}
                                  onClick={
                                    () =>
                                      handleAddImei(
                                        billDetail.idSKU,
                                        billDetail.id
                                      )
                                    // handleImeiOpen(
                                    //   billDetail.idSKU,
                                    //   billDetail.id
                                    // )
                                  }
                                >
                                  imei
                                </button>
                              </p>
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
                                onClick={() =>
                                  confirmDeleteBillDetail(
                                    billDetail.id,
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
                        <div className="form-group  col-md-12">
                          <label
                            className="control-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Mã Hoá Đơn
                          </label>
                          <input
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
                            ={" "}
                            {soTienThanhToan?.toLocaleString("vi-VN", {
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
                              backgroundColor: "orange",
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

                        <Space size="middle">
                          <Badge count={slHoaDonCho} overflowCount={10}>
                            <button
                              className="btn btn-success luu-va-in"
                              type="button"
                              style={{
                                marginRight: "10px",
                                marginBottom: "10px",
                              }}
                              onClick={() => handleEditClickBill()}
                            >
                              Hóa đơn chờ
                            </button>
                          </Badge>
                        </Space>
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
                          Cho đơn hàng giá trị từ{" "}
                          {voucher?.valueMinimum?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}{" "}
                          đến{" "}
                          {voucher?.valueMaximum?.toLocaleString("vi-VN", {
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
                          Cho đơn hàng giá trị từ{" "}
                          {voucher?.valueMinimum?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}{" "}
                          đến{" "}
                          {voucher?.valueMaximum?.toLocaleString("vi-VN", {
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
                      const shouldContinue = window.confirm(
                        "Bạn có muốn tiếp tục thanh toán không?"
                      );
                      if (shouldContinue) {
                        // Thực hiện hành động sau khi xác nhận
                        clickHoaDonCho(hoadon.code);
                        setIsModalVisibleBill(false);
                        notification.success({
                          message: "Tiếp tục thanh toán",
                        });
                      } else {
                        setIsModalVisibleBill(false);
                        // Hủy bỏ hành động nếu người dùng không muốn tiếp tục
                      }
                    }}
                  >
                    {hoadon.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </>
    </React.Fragment>
  );
}
