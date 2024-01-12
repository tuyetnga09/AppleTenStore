import React, { useEffect, useRef, useState } from "react";
import { useTranslate } from "@refinedev/core";
import {
  AppstoreAddOutlined,
  BellOutlined,
  CloseCircleOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FormOutlined,
  GiftOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  SearchOutlined,
  SettingOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
  WarningFilled,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Grid,
  Input,
  Layout,
  Menu,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Switch,
  Table,
  theme,
  Typography,
} from "antd";
import { DateField, List, NumberField } from "@refinedev/antd";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  acceptReturn,
  deleteBillById,
  deliveryFailed,
  getAllBillCXN,
  getAllBillOFFLINECXN,
  getCountBillChoXacNhan,
  noAcceptReturn,
  returnBillById,
  returnStatusBill,
  searchBillByCode,
  searchNoDate,
  searchWithDate,
  updateAllCVC,
  updateStatusBill,
  voucherTruocUpdate,
  soDiemTruocUpdate,
  xacNhanSuaHoaDonKhiKhachGoiYeuCau,
} from "../../../service/Bill/bill.service";
import { readAllUser } from "../../../service/User/user.service";
import queryString from "query-string";
import { Option } from "antd/es/mentions";
import {
  addImeiDaBan,
  deleteAllImeisDaBanOffLine,
  deleteImeiDaBan,
  deleteImeisDaBanOffLineCheckBox,
  getAllImeisDaBanOffLine,
  getBilDetailOfBillWhereIdBill,
  getIdBill,
  getImeisOfSku,
  getListImeiDaBanOfSku,
  getListImeiThatLac,
  getOneSkuSelected,
  listImeiDaBanByIdBillDetail,
  seachImeis,
  seachImeisDaBan,
  xoahoaDonCho,
} from "../../../service/SellOffLine/sell_off_line.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AvatarProduct from "../../product_component/Product/AvatarProduct";
import { Toast } from "primereact/toast";
import {
  findBillDetails,
  getAllBillDetailReturn,
} from "../../../service/BillDetail/billDetail.service";
import AvtProduct from "../../custumer_componet/avtProduct";
import HeaderDashBoard from "../header/index";
import {
  getSKUForBillDetail,
  searchSKUForBillDetail,
} from "../../../service/sku.service";
import { readAllWard } from "../../../service/AddressAPI/ward.service";
import { readAllDistrict } from "../../../service/AddressAPI/district.service";
import { readAllProvince } from "../../../service/AddressAPI/province.service";
import { readAllByIdUser } from "../../../service/AddressAPI/address.service";
import { getFee } from "../../../service/AddressAPI/fee.service";
import { data } from "jquery";
import {
  getVoucher,
  getVoucherFreeShip,
} from "../../../service/Voucher/voucher.service";
import { Image } from "antd";
import { red } from "@material-ui/core/colors";

const { RangePicker } = DatePicker;
const { SubMenu } = Menu;
const { Text } = Typography;
const { Header, Sider, Content } = Layout;
let loadDisplay = false;
const OderDisplay = ({}) => {
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const idAccount = storedUser !== null ? storedUser.id : ""; //sau khi đăng nhập thì truyền idAccount vào đây

  const t = useTranslate();
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [oder, setOder] = useState([]);
  const [user, setUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [isModalVisibleNoteReturns, setIsModalVisibleNoteReturns] =
    useState(false); // Trạng thái hiển thị Modal
  const [isModalVisibleCannelOrder, setIsModalVisibleCannelOrder] =
    useState(false); // Trạng thái hiển thị Modal
  const [isModalVisibleReturnDetails, setIsModalVisibleReturnDetails] =
    useState(false); // Trạng thái hiển thị Modal
  const [isModalVisibleReturnedProducts, setIsModalVisibleReturnedProducts] =
    useState(false); // Trạng thái hiển thị Modal
  const [isModalVisibleDeliveryFailed, setIsModalVisibleDeliveryFailed] =
    useState(false); // Trạng thái hiển thị Modal
  const breakpoint = Grid.useBreakpoint();
  const [load, setLoad] = useState(true);
  const [billCXN, setBillCXN] = useState([]);
  const [pendingBills, setPendingBills] = useState(0);
  const [playSound, setPlaySound] = useState(true);
  const [show, setShow] = useState(true);
  const [billReturn, setBillReturn] = useState({
    id: null,
    note: null,
  });
  const [billOFFCXN, setBillOFFCXN] = useState([]);
  const [dataBillDetails, setDataBillDetails] = useState([]); // lisst bill detail cuar idbill
  const [returnStatus, setReturnStatus] = useState(1);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked3, setIsChecked3] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province_id, setProvince_id] = useState();
  const [district_id, setDistrict_id] = useState();
  const [showDistricts, setShowDistricts] = useState(true);
  const [showWards, setShowWards] = useState(true);
  const [fee, setFee] = useState([]);
  const [transportationFeeDTO, setTransportationFeeDTO] = useState({
    toDistrictId: null,
    toWardCode: null,
    insuranceValue: null,
    quantity: 1,
  });
  const [defaultAddress, setDefaultAddress] = useState([]);

  const orderSelectProps = {
    options: [
      { label: "Tạo hóa đơn", value: "TAO_HOA_DON" },
      {
        label: "Chờ xác nhận",
        value: "CHO_XAC_NHAN",
      },
      { label: "Chờ vận chuyển", value: "CHO_VAN_CHUYEN" },
      {
        label: "Vận chuyển",
        value: "VAN_CHUYEN",
      },
      { label: "Đã thanh toán", value: "DA_THANH_TOAN" },
      {
        label: "Không trả hàng",
        value: "KHONG_TRA_HANG",
      },
      { label: "Trả hàng", value: "TRA_HANG" },
      { label: "Đã hủy", value: "DA_HUY" },
      {
        label: "Yêu cầu trả hàng",
        value: "YEU_CAU_TRA_HANG",
      },
      { label: "Giao hàng thất bại", value: "GIAO_HANG_THAT_BAI" },
      {
        label: "Đã huỷ hoá đơn chờ",
        value: "HUY_HOA_DON_CHO",
      }, // Thêm các giá trị khác nếu cần
    ],
  };

  // Hàm để hiển thị Modal khi cần
  const handleEditClick = (record) => {
    setIsModalVisible(true);
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNoteReturnsClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.id,
    });
    setIsModalVisibleNoteReturns(true);
  };

  // Hàm để ẩn Modal
  const handleNoteReturnsCancel = () => {
    setIsModalVisibleNoteReturns(false);
    console.log(billReturn);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
  };

  const handleCannelOrderClick = (record) => {
    setBillReturn({
      ...billReturn,
      id: record.id,
    });
    setIsModalVisibleCannelOrder(true);
  };

  // Hàm để ẩn Modal
  const handleCannelOrderCancel = () => {
    setIsModalVisibleCannelOrder(false);
    console.log(billReturn);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea2"
    );
    textNoteReturn.value = "";
  };

  const [filtersNoDate, setFiltersNoDate] = useState({
    key: "",
    status: "", // user: "",
  });

  const [filtersWithDate, setFiltersWithDate] = useState({
    key: "",
    status: "", // user: "",
    dateStart: "",
    dateEnd: "",
  });

  const toggleSound = () => {
    setPlaySound(!playSound);
  };

  useEffect(() => {
    if (
      storedUser?.roles === "CUSTOMER" ||
      storedUser === null ||
      storedUser?.roles === "NHAN_VIEN_BAN_HANG"
    ) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      const paramsString = queryString.stringify(filtersNoDate);
      const paramsString2 = queryString.stringify(filtersWithDate);
      const dateFilter = document.getElementById("dateFilter");
      if (dateFilter.value == "") {
        searchNoDate(paramsString)
          .then((response) => {
            console.log(response.data);
            setOder(response.data);
            // setEditedVoucher(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        searchWithDate(paramsString2)
          .then((response) => {
            // console.log(response.data);
            setOder(response.data);
            // setEditedVoucher(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }
      readAllUser()
        .then((response) => {
          // console.log(response.data);
          setUser(response.data);
          // setEditedVoucher(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      //lấy toàn bộ bill chờ xác nhận để check
      getAllBillCXN()
        .then((response) => {
          setBillCXN(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      //lấy toàn bộ billOFF chờ xác nhận để check
      getAllBillOFFLINECXN()
        .then((response) => {
          setBillOFFCXN(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      getCountBillChoXacNhan()
        .then((response) => {
          setPendingBills(response.data);
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
      //thông báo khi có hóa đơn mới
      let lastPendingBills = null;
      let timeout = null;
      let originalTitle = document.title;

      const interval = setInterval(async () => {
        getCountBillChoXacNhan()
          .then((response) => {
            const newPendingBills = response.data;

            if (
              lastPendingBills !== null &&
              newPendingBills > lastPendingBills &&
              playSound
            ) {
              // Nếu có hóa đơn mới, thì phát âm thanh thông báo
              // const audio = new Audio(AudioTT);
              // audio.play();

              // Cập nhật số hóa đơn chờ xác nhận
              setPendingBills(newPendingBills);

              // Hiển thị thông báo trong tiêu đề
              document.title = "🟢 Có đơn hàng mới!";

              // Clear timeout cũ (nếu có)
              if (timeout) {
                clearTimeout(timeout);
              }

              // Sau 5 giây, tiêu đề sẽ trở về ban đầu
              timeout = setTimeout(() => {
                document.title = originalTitle;
              }, 5000);
            } else {
              // Cập nhật số hóa đơn chờ xác nhận
              setPendingBills(newPendingBills);
            }

            // Cập nhật giá trị cuối cùng
            lastPendingBills = newPendingBills;
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }, 5000);
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

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    //tu dong xoa hoa don cho
    xoahoaDonCho()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [
    filtersNoDate,
    filtersWithDate,
    load,
    playSound,
    province_id,
    district_id,
    showDistricts,
    showWards,
    transportationFeeDTO,
  ]);

  function handleChangeSearch(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {};
    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter.value == "") {
      item = { ...filtersNoDate };
      item[name] = value;
      setFiltersNoDate(item);
    } else {
      item = { ...filtersWithDate };
      item[name] = value;
      setFiltersWithDate(item);
    }
  }

  function handleChangeStatus(value) {
    let item = {};
    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter.value == "") {
      item = { ...filtersNoDate };
      item["status"] = value;
      setFiltersNoDate(item);
      if (value == null) {
        item = { ...filtersNoDate };
        item["status"] = "";
        setFiltersNoDate(item);
      }
      console.log(filtersNoDate);
    } else {
      item = { ...filtersWithDate };
      item["status"] = value;
      setFiltersWithDate(item);
      if (value == null) {
        item = { ...filtersWithDate };
        item["status"] = "";
        setFiltersWithDate(item);
      }
    }
  }

  // function handleChangeUser(value) {
  //   let item = {};
  //   const dateFilter = document.getElementById("dateFilter");
  //   if (dateFilter.value == "") {
  //     item = { ...filtersNoDate };
  //     item["user"] = value;
  //     setFiltersNoDate(item);
  //     if (value == null) {
  //       item = { ...filtersNoDate };
  //       item["user"] = "";
  //       setFiltersNoDate(item);
  //     }
  //   } else {
  //     item = { ...filtersWithDate };
  //     item["user"] = value;
  //     setFiltersWithDate(item);
  //     if (value == null) {
  //       item = { ...filtersWithDate };
  //       item["user"] = "";
  //       setFiltersWithDate(item);
  //     }
  //   }
  // }

  function handleChangeDate(value) {
    let item = {};
    if (value != null) {
      const dateStart = new Date(value[0]);
      const yearStart = dateStart.getFullYear();
      const monthStart = dateStart.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
      const dayStart = dateStart.getDate();
      const formattedDateStart = `${yearStart}-${monthStart
        .toString()
        .padStart(2, "0")}-${dayStart.toString().padStart(2, "0")}`;
      const dateEnd = new Date(value[1]);
      const yearEnd = dateEnd.getFullYear();
      const monthEnd = dateEnd.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
      const dayEnd = dateEnd.getDate();
      const formattedDateEnd = `${yearEnd}-${monthEnd
        .toString()
        .padStart(2, "0")}-${dayEnd.toString().padStart(2, "0")}`;
      item = { ...filtersWithDate };
      item["dateStart"] = formattedDateStart;
      item["dateEnd"] = formattedDateEnd;
      setFiltersWithDate(item);
      console.log(filtersWithDate);
    } else {
      item = { ...filtersNoDate };
      setFiltersNoDate(item);
    }
  }

  function search1() {
    const paramsString = queryString.stringify(filtersNoDate);
    searchNoDate(paramsString)
      .then((response) => {
        // console.log(response.data);
        setOder(response.data);
        // setEditedVoucher(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }

  function search2() {
    const paramsString = queryString.stringify(filtersWithDate);
    searchWithDate(paramsString)
      .then((response) => {
        // console.log(response.data);
        setOder(response.data);
        // setEditedVoucher(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }

  function search() {
    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter.value == "") {
      search1();
    } else {
      search2();
    }
  }

  const statusBadgeMapping = {
    TAO_HOA_DON: (
      <Badge
        className="site-badge-count-109"
        count={"Tạo hóa đơn"}
        style={{ backgroundColor: "#52c41a" }}
      />
    ),
    CHO_XAC_NHAN: (
      <Badge
        className="site-badge-count-109"
        count={"Chờ xác nhận"}
        style={{ backgroundColor: "orange" }}
      />
    ),
    CHO_VAN_CHUYEN: (
      <Badge
        className="site-badge-count-109"
        count={"Chờ vận chuyển"}
        style={{ backgroundColor: "orangered" }}
      />
    ),
    VAN_CHUYEN: (
      <Badge
        className="site-badge-count-109"
        count={"Vận chuyển"}
        style={{ backgroundColor: "aqua" }}
      />
    ),
    DA_THANH_TOAN: (
      <Badge
        className="site-badge-count-109"
        count={"Đã thanh toán"}
        style={{ backgroundColor: "#52c41a" }}
      />
    ),
    KHONG_TRA_HANG: (
      <Badge
        className="site-badge-count-109"
        count={"Không trả hàng"}
        style={{ backgroundColor: "grey" }}
      />
    ),
    TRA_HANG: (
      <Badge
        className="site-badge-count-109"
        count={"Trả hàng"}
        style={{ backgroundColor: "khaki" }}
      />
    ),
    DA_HUY: (
      <Badge
        className="site-badge-count-109"
        count={"Đã hủy"}
        style={{ backgroundColor: "red" }}
      />
    ),
    YEU_CAU_TRA_HANG: (
      <Badge
        className="site-badge-count-109"
        count={"Yêu cầu trả hàng"}
        style={{ backgroundColor: "pink" }}
      />
    ),
    GIAO_HANG_THAT_BAI: (
      <Badge
        className="site-badge-count-109"
        count={"Giao hàng thất bại"}
        style={{ backgroundColor: "black" }}
      />
    ),
    HUY_HOA_DON_CHO: (
      <Badge
        className="site-badge-count-109"
        count={"Đã huỷ hoá đơn chờ"}
        style={{ backgroundColor: "#FF99FF" }}
      />
    ),
  };

  const confirm2 = async (id) => {
    if (checkProductSelectBillDetail(id) === false) {
      notification.error({
        message: "Hóa đơn chưa thể xác nhận! - Hóa Đơn Bán Offline",
      });
    } else {
      if ((await checkImeiSelectInBillDetail(id)) === true) {
        confirmDialog({
          message: "Bạn có muốn xác nhận không? ",
          header: "Xác nhận",
          icon: "pi pi-info-circle",
          acceptClassName: "p-button-danger",
          accept: () =>
            updateStatusBill(idAccount, id)
              .then((response) => {
                notification.success({
                  message: "Xác nhận thành công!",
                });
                setLoad(!load);
                loadDisplay = !loadDisplay;
              })
              .catch((error) => {
                console.error("Error updating status:", error);
              }),
          reject,
        });
      } else {
        notification.error({
          message: "Kiểm tra lại số lượng imei!",
        });
      }
    }
  };

  function returnBill(id, noteReturn) {
    returnBillById(id, idAccount, noteReturn).then((response) =>
      console.log(response.data)
    );
    setLoad(!load);
  }

  function checkSoluongImei() {
    for (let index = 0; index < billCXN.length; index++) {
      if (billCXN[index]?.quantity !== billCXN[index]?.soLuongImeiDaChon) {
        return false;
      }
    }
    return true;
  }

  const checkImeiSelectInBillDetail = async (id) => {
    try {
      let tempObj = {};
      const responses = await getAllBillCXN();
      console.log(responses.data);

      for (let index = 0; index < responses.data.length; index++) {
        if (responses.data[index]?.bill === id) {
          tempObj = responses.data[index];
          break;
        }
      }
      return tempObj?.quantity === tempObj?.soLuongImeiDaChon;
    } catch (error) {
      console.log(`${error}`);
      return false; // Xử lý lỗi nếu cần
    }
  };

  function checkProductSelectBillDetail(id) {
    for (let index = 0; index < billOFFCXN.length; index++) {
      if (billOFFCXN[index]?.id === id) {
        if (billOFFCXN[index]?.typeBill === "OFFLINE") {
          if (
            billOFFCXN[index]?.totalMoney === null ||
            billOFFCXN[index]?.totalMoney === 0
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function handUpdateTrangThai() {
    if (pendingBills === 0 || pendingBills === null || pendingBills === "") {
      notification.success({
        message: "Accept",
        description: "Tất cả đơn hàng đã được xác nhận thanh công",
      });
      loadDisplay = !loadDisplay;
    } else {
      if (checkSoluongImei() === true) {
        const personUpdate = storedUser.code + " - " + storedUser.user.fullName;
        updateAllCVC(personUpdate)
          .then((response) => {
            setLoad(!load);
            loadDisplay = !loadDisplay;
            notification.success({
              message: "Accept",
              description: "Xác nhận thành công",
            });
          })
          .catch((error) => {
            console.error("Error updating data:", error);
          });
      } else {
        notification.error({
          message: "KIỂM TRA IMEI",
          description: "Vui lòng kiểm tra lại imei của các đơn hàng ",
        });
      }
    }
  }

  // State để lưu trữ dữ liệu từ component con
  const [dataFromChild, setDataFromChild] = useState(null);

  // Hàm callback để nhận dữ liệu từ component con
  const receiveDataFromChild = (data) => {
    // Xử lý dữ liệu từ component con ở đây
    // Lưu trữ dữ liệu vào state
    setDataFromChild(data);
    if (data === true) {
      getAllBillCXN()
        .then((response) => {
          setBillCXN(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  };

  const handleNoteReturns = (event) => {
    setBillReturn({
      ...billReturn,
      note: event.target.value,
    });
  };

  const handleCannelOrder = (event) => {
    setBillReturn({
      ...billReturn,
      note: event.target.value,
    });
  };

  const handleSubmitReturns = (event) => {
    event.preventDefault();
    returnBill(billReturn.id, billReturn.note);
    setIsModalVisibleNoteReturns(false);
    setLoad(!load);
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea1"
    );
    textNoteReturn.value = "";
    notification.success({
      message: "Trả hàng",
      description: "Xác nhận trả hàng",
    });
  };

  const handleSubmitCannelOrder = (event) => {
    event.preventDefault();
    deleteBillById(billReturn.id, billReturn.note, idAccount).then((response) =>
      console.log(response.data)
    );
    setIsModalVisibleCannelOrder(false);
    setLoad(!load);
    loadDisplay = !loadDisplay;
    const textNoteReturn = document.getElementById(
      "exampleFormControlTextarea2"
    );
    textNoteReturn.value = "";
    notification.success({
      message: "Hủy đơn",
      description: "Hủy đơn thành công",
    });
  };
  const [noteReturnDetail, setNoteReturnDetail] = useState(null);
  const [acceptReturnBill, setAcceptReturnBill] = useState({
    idBill: null,
    codeImeiDaBan: [],
    personUpdate: storedUser?.code + " - " + storedUser?.user?.fullName,
  });
  const handleClickReturnDetails = (record) => {
    let arrCodeImeiDaBan = [];
    setIsModalVisibleReturnDetails(true);
    console.log(record);
    setNoteReturnDetail(record.noteReturn);
    getAllBillDetailReturn(4, record.id, "")
      .then((response) => {
        setDataBillDetails(response.data);
        console.log(response.data);
        response.data.map((item) => {
          if (!arrCodeImeiDaBan.includes(item.codeImei)) {
            arrCodeImeiDaBan.push(item.codeImei);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setAcceptReturnBill({
      ...acceptReturnBill,
      idBill: record.id,
      codeImeiDaBan: arrCodeImeiDaBan,
    });
  };

  const toast1 = useRef(null);

  const reject = () => {
    toast1?.current.show({
      severity: "warn",
      summary: "Hủy thao tác",
      detail: "Bạn đã huy thao tác",
      life: 3000,
    });
  };

  // Hàm để ẩn Modal
  const handleCannelReturnDetails = () => {
    setIsModalVisibleReturnDetails(false);
    setAcceptReturnBill({
      ...acceptReturnBill,
      idBill: null,
      codeImeiDaBan: [],
    });
  };

  function returnConfirmation() {
    acceptReturn(acceptReturnBill)
      .then((res) => {
        notification.success({
          message: "Trả hàng!",
          description: "Trả hàng thành công",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalVisibleReturnDetails(false);
    setLoad(!load);
  }

  function noReturnConfirmation() {
    noAcceptReturn(acceptReturnBill)
      .then((res) => {
        notification.success({
          message: "Trả hàng!",
          description: "Đã hủy yêu cầu",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalVisibleReturnDetails(false);
    setLoad(!load);
  }

  const [idBillDaTra, setIdBillDaTra] = useState();
  const handleClickReturnedProducts = (record) => {
    setIsModalVisibleReturnedProducts(true);
    setIdBillDaTra(record.id);
    getAllBillDetailReturn(6, record.id, "")
      .then((response) => {
        setDataBillDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Hàm để ẩn Modal
  const handleCannelReturnedProducts = () => {
    setIsModalVisibleReturnedProducts(false);
  };

  function handleChangeSearchYCTH(event) {
    getAllBillDetailReturn(4, acceptReturnBill.idBill, event.target.value)
      .then((response) => {
        setDataBillDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChangeSearchDaTra(event) {
    getAllBillDetailReturn(6, idBillDaTra, event.target.value)
      .then((response) => {
        setDataBillDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [dataDeliveryFailed, setDataDeliveryFailed] = useState({
    idAcc: idAccount,
    idBill: "",
    note: "",
  });

  const handleClickDeliveryFailed = (record) => {
    setIsModalVisibleDeliveryFailed(true);
    setDataDeliveryFailed({
      ...dataDeliveryFailed,
      idBill: record.id,
    });
  };

  // Hàm để ẩn Modal
  const handleCannelDeliveryFailed = () => {
    setIsModalVisibleDeliveryFailed(false);
  };

  function handleDeliveryFailed(event) {
    setDataDeliveryFailed({
      ...dataDeliveryFailed,
      note: `Giao hàng thất bại: ${event.target.value}`,
    });
  }

  function handleSubmitDeliveryFailed(event) {
    event.preventDefault();
    deliveryFailed(
      dataDeliveryFailed.idAcc,
      dataDeliveryFailed.idBill,
      dataDeliveryFailed.note
    )
      .then((res) => {
        if (res.data !== null) {
          notification.success({
            message: "Hoàn tất",
          });
          setIsModalVisibleDeliveryFailed(false);
          setLoad(!load);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const expandedRowRender = (record) => {
    return (
      <UserAccountTable record={record} onSomeAction={receiveDataFromChild} />
    );
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        Thông báo:{" "}
        <Switch
          checked={show}
          onChange={() => {
            setShow(!show);
            toggleSound();
          }}
        />
      </Menu.Item>
    </Menu>
  );

  const returnStatusBillPrev = async (id) => {
    confirmDialog({
      message: "Xác nhận thao tác?",
      header: "Xác nhận",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () =>
        returnStatusBill(id)
          .then((response) => {
            notification.success({
              message: "Hoàn trả trạng thái thành công!",
              description: "Đã xác nhận hoàn trả",
            });
            setLoad(!load);
            loadDisplay = !loadDisplay;
          })
          .catch((error) => {
            console.error("Error updating status:", error);
          }),
      reject,
    });
  };

  // Tạo biến bill sau khi tìm đc
  const [billUpdate, setBillUpdate] = useState({});
  const [hideForm, setHideForm] = useState(false);

  let [newBillDetails, setNewBillDetails] = useState([]);
  const [idBillTemp, setIdBillTemp] = useState(null);
  let temp = [];

  const [priceProductBillUpdate, setPriceProductBillUpdate] = useState(0);

  function searchBill(id) {
    setIdBillTemp(id);
    searchBillByCode(id)
      .then((response) => {
        setBillUpdate(response.data);
        console.log(response.data.account);
        if (response.data.account != null) {
          readAllByIdUser(response.data.account.id)
            .then((res) => {
              setDefaultAddress(res.data);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setDefaultAddress([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    findBillDetails(id)
      .then((response) => {
        setDataBillDetails(response.data);
        response.data.map((item) =>
          temp.push({
            id: item.id,
            idProduct: item.idProduct,
            nameProduct: item.nameProduct,
            version: item.skuColor + "-" + item.skuCapacity,
            bill: item.bill,
            sku: item.idSKU,
            price: item.price,
            quantity: item.quantity,
            status: "CHO_XAC_NHAN",
          })
        );
        setNewBillDetails(temp);
        console.log(temp);
        setHideForm(true);
        let priceProductBillUpdate1 = 0;
        temp.map((data) => {
          priceProductBillUpdate1 += data.price * data.quantity;
        });
        setPriceProductBillUpdate(priceProductBillUpdate1);
      })
      .catch((error) => {
        console.log(error);
      });
    getSKUForBillDetail()
      .then((response) => {
        setListSku(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCancelHideForm() {
    temp.length = 0;
    setIdBillTemp(null);
    setHideForm(false);
    document.getElementById("hoVaTen").disabled = true;
    document.getElementById("phoneNumber").disabled = true;
    document.getElementById("chinhSua1").hidden = true;
    document.getElementById("notDcmd").hidden = true;
  }

  function hanldeName(event) {
    setBillUpdate({
      ...billUpdate,
      userName: event.target.value,
    });
  }

  function hanldPhone(event) {
    setBillUpdate({
      ...billUpdate,
      phoneNumber: event.target.value,
    });
  }

  //   const [hideFormSearchSku, setHideFormSearchSku] = useState(false);
  //   const [listSku, setListSku] = useState([]);

  function handleCancelHideFormSearchSku() {
    getSKUForBillDetail()
      .then((response) => {
        setListSku(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setHideFormSearchSku(!hideFormSearchSku);
  }

  //   const handleSearchSku = (event) => {
  //     searchSKUForBillDetail(event.target.value)
  //       .then((response) => {
  //         setListSku(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   const handleDeleteSkuFromBillDetail = (record) => {
  //     setNewBillDetails([
  //       ...newBillDetails.filter((item) => item.sku !== record.sku),
  //     ]);
  //   };

  //   const handleAddSkuToBill = (record) => {
  //     if (newBillDetails.find((item) => item.sku === record.id) !== undefined) {
  //       newBillDetails.map((item, index) => {
  //         if (item.sku === record.id) {
  //           newBillDetails[newBillDetails.indexOf(item)] = {
  //             ...item,
  //             quantity: item.quantity + 1,
  //           };
  //           document.getElementById(`quantitySKU_${index}`).value =
  //             item.quantity + 1;
  //         }
  //       });
  //       setNewBillDetails((newBillDetails) => [...newBillDetails]);
  //     } else {
  //       const billTemp = {
  //         id: null,
  //         idProduct: record.productId,
  //         nameProduct: record.name,
  //         version: record.color + "-" + record.capacity,
  //         bill: idBillTemp,
  //         sku: record.id,
  //         price: record.price,
  //         quantity: 1,
  //         status: "CHO_XAC_NHAN",
  //       };
  //       setNewBillDetails((newBillDetails) => [...newBillDetails, billTemp]);
  //     }
  //   };

  //   const handleChangeQuantity = (record) => {
  //     newBillDetails.map((item, index) => {
  //       if (item.sku === record.sku) {
  //         newBillDetails[newBillDetails.indexOf(item)] = {
  //           ...item,
  //           quantity: Number(
  //             document.getElementById(`quantitySKU_${index}`).value
  //           ),
  //         };
  //       }
  //     });
  //     setNewBillDetails((newBillDetails) => [...newBillDetails]);

  //     let totalQuantity = 0;
  //     newBillDetails.map((data) => {
  //       totalQuantity += data.quantity;
  //     });
  //     let priceTotal = 0;
  //     newBillDetails.map((data) => {
  //       priceTotal += data.price * data.quantity;
  //     });

  //     setTransportationFeeDTO({
  //       ...transportationFeeDTO,
  //       quantity: totalQuantity,
  //       insuranceValue: priceTotal,
  //     });

  //     getFee(transportationFeeDTO)
  //       .then((response) => {
  //         setFee(response.data.data);
  //         console.log(response.data.data);
  //       })
  //       .catch((error) => {
  //         console.log(`${error}`);
  //       });
  //     let priceProductBillUpdate1 = 0;
  //     newBillDetails.map((data) => {
  //       priceProductBillUpdate1 += data.price * data.quantity;
  //     });
  //     setPriceProductBillUpdate(priceProductBillUpdate1);
  //   };

  function handleAddress(event) {
    setBillUpdate({
      ...billUpdate,
      address:
        event.target.value +
        ", " +
        wardBillUpdate +
        ", " +
        districtBillUpdate +
        ", " +
        proviceBillUpdate,
    });
  }

  function giaoTanNoi() {
    const select0 = document.getElementById("0");
    select0.selected = true;
    // const select = document.getElementById("floatingSelect1");
    // select.hidden = true;
    const input = document.getElementById("floatingSelect2");
    input.hidden = false;
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = true;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = false;
    // setTransportationFeeDTO({
    //   toDistrictId: null,
    //   toWardCode: null,
    //   insuranceValue: null,
    //   quantity: 1,
    // });
    // setIsChecked1(false);
    setIsChecked2(true);
    setIsChecked3(false);
    // document.getElementById("htnn_4").checked = false;
    document.getElementById("htnn_6").checked = false;
  }

  function diaChiMacDinh() {
    const input = document.getElementById("floatingSelect2");
    input.value = "";
    const select_1 = document.getElementById("-1");
    select_1.selected = true;
    const select_2 = document.getElementById("-2");
    select_2.selected = true;
    const select_3 = document.getElementById("-3");
    select_3.selected = true;
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = false;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = true;
    // setTransportationFeeDTO({
    //   toDistrictId: null,
    //   toWardCode: null,
    //   insuranceValue: null,
    //   quantity: 1,
    // });
    setIsChecked2(false);
    setIsChecked3(true);
    // document.getElementById("htnn_4").checked = false;
    document.getElementById("htnn_5").checked = false;
  }

  //   const [proviceBillUpdate, setProviceBillUpdate] = useState();
  //   const [districtBillUpdate, setDistrictBillUpdate] = useState();
  //   const [wardBillUpdate, setWardBillUpdate] = useState();
  //   const handleProvince = (event) => {
  //     if (document.getElementById(event.target.value) !== null) {
  //       const target = event.target;
  //       const value = target.value;
  //       setProvince_id(value);
  //       console.log(value);
  //       setDistrict_id(null);
  //       setWards([]);
  //       let totalQuantity = 0;
  //       newBillDetails.map((data) => {
  //         totalQuantity += data.quantity;
  //       });
  //       let item = {
  //         toDistrictId: null,
  //         toWardCode: null,
  //         insuranceValue: null,
  //         quantity: totalQuantity,
  //       };
  //       setTransportationFeeDTO(item);
  //       //   setBill({
  //       //     ...bill,
  //       //     province: document.getElementById(value).innerText,
  //       //   });
  //       setProviceBillUpdate(document.getElementById(value).innerText);
  //       setShowDistricts(true);
  //     } else {
  //       setShowDistricts(false);
  //       setShowWards(false);
  //       setTransportationFeeDTO({
  //         toDistrictId: null,
  //         toWardCode: null,
  //         // insuranceValue: soTienThanhToan,
  //         // quantity: quantityCart,
  //       });
  //     }
  //     setIsChecked2(true);
  //     setIsChecked3(false);
  //   };

  //   const handleDistrict = (event) => {
  //     if (document.getElementById(event.target.value) !== null) {
  //       const target = event.target;
  //       const value = target.value;
  //       setDistrict_id(value);
  //       let item = { ...transportationFeeDTO };
  //       item["toDistrictId"] = parseInt(value);
  //       let priceTotal = 0;
  //       newBillDetails.map((data) => {
  //         priceTotal += data.price * data.quantity;
  //       });
  //       item["insuranceValue"] = parseInt(priceTotal);
  //       setTransportationFeeDTO(item);
  //       console.log(transportationFeeDTO);
  //       //   setBill({
  //       //     ...bill,
  //       //     district: document.getElementById(value).innerText,
  //       //   });
  //       setDistrictBillUpdate(document.getElementById(value).innerText);
  //       setShowWards(true);
  //     } else {
  //       setShowWards(false);
  //       setTransportationFeeDTO({
  //         toDistrictId: event.target.value,
  //         toWardCode: null,
  //         // insuranceValue: soTienThanhToan,
  //         // quantity: quantityCart,
  //       });
  //     }
  //     setIsChecked2(true);
  //     setIsChecked3(false);
  //   };

  //   const handleWard = (event) => {
  //     if (document.getElementById(event.target.value) !== null) {
  //       const target = event.target;
  //       const value = target.value;
  //       let item = { ...transportationFeeDTO };
  //       item["toWardCode"] = value;
  //       setTransportationFeeDTO(item);
  //       console.log(transportationFeeDTO);
  //       //   setBill({
  //       //     ...bill,
  //       //     wards: document.getElementById(value).innerText,
  //       //   });
  //       //   console.log(bill);
  //       setWardBillUpdate(document.getElementById(value).innerText);
  //     } else {
  //       setTransportationFeeDTO({
  //         ...transportationFeeDTO,
  //         toWardCode: event.target.value,
  //       });
  //     }
  //     console.log(transportationFeeDTO);
  //     setIsChecked2(true);
  //     setIsChecked3(false);
  //   };

  function chinhSuaThongTinDatHang() {
    document.getElementById("hoVaTen").disabled = false;
    document.getElementById("phoneNumber").disabled = false;
    document.getElementById("chinhSua1").hidden = false;
    document.getElementById("notDcmd").hidden = false;
  }

  //xác nhận sửa hoá đơn
  const [dataSuaHoaDon, setDataSuaHoaDon] = useState({
    idHoaDon: null,
    hoVaTen: null,
    sdt: null,
    diaChi: null,
    products: [],
    tongTienSanPham: 0,
    tienShipMoi: 0,
    voucherGiamGia: { id: null, value: 0 },
    voucherShip: { id: null, value: 0 },
    soDiemSuDung: 0,
    tongTienKhachPhaiTra: 0,
    idAccount: idAccount,
  });
  const [dataSumTongTien, setDataSumTongTien] = useState(0);
  const [dataVouCherTruocUpdateHoaDon, setDataVouCherTruocUpdateHoaDon] =
    useState([]);
  const [dataTongTienKhachHangPhaiTra, setDataTongTienKhachHangPhaiTra] =
    useState(0);
  const suaHoaDon = (newBillDetails) => {
    const gtn = document.getElementById("htnn_5");
    const dcmd = document.getElementById("htnn_6");
    const wards = document.getElementById("wards");
    const dcct = document.getElementById("floatingSelect2");
    const dcmdSelect = document.getElementById("floatingSelect");
    if (gtn?.checked) {
      console.log(newBillDetails);
      if (newBillDetails.length === 0) {
        notification.error({
          message: "THÔNG BÁO",
          description: "Hãy chọn sản phẩm",
        });
      } else {
        let sumTongTien = 0;
        for (let i = 0; i < newBillDetails.length; i++) {
          sumTongTien =
            sumTongTien + newBillDetails[i].price * newBillDetails[i].quantity;
        }
        setDataSumTongTien(sumTongTien);
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            setDataVouCherTruocUpdateHoaDon(response.data);
            let sum = sumTongTien + fee?.total;
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (sumTongTien > response.data[i].valueMin) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }
            // chưa cộng tiền ship
            // setDataTongTienKhachHangPhaiTra(sum + tien ship);
            // console.log(sum + " yyyy2 ");
            // tính số điểm ra tiền
            // const voucherGG = { idVC: null, value: 0 };
            // const voucherFS = { idVC: null, value: 0 };

            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: sumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: { id: null, value: 0 },
                  voucherShip: { id: null, value: 0 },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
        if (wards?.value === "" || dcct?.value === "") {
          notification.error({
            message: "Bạn chưa chọn địa chỉ!",
          });
        } else {
          // doneOrder();
          handleOpenSuaHoaDon();
        }
      }
    } else if (dcmd?.checked) {
      console.log(newBillDetails);
      if (newBillDetails.length === 0) {
        notification.error({
          message: "THÔNG BÁO",
          description: "Hãy chọn sản phẩm",
        });
      } else {
        let sumTongTien = 0;
        for (let i = 0; i < newBillDetails.length; i++) {
          sumTongTien =
            sumTongTien + newBillDetails[i].price * newBillDetails[i].quantity;
        }
        setDataSumTongTien(sumTongTien);
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            setDataVouCherTruocUpdateHoaDon(response.data);
            let sum = sumTongTien + fee?.total;
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (sumTongTien > response.data[i].valueMin) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }
            // chưa cộng tiền ship
            // setDataTongTienKhachHangPhaiTra(sum + tien ship);
            // console.log(sum + " yyyy2 ");
            // tính số điểm ra tiền
            // const voucherGG = { idVC: null, value: 0 };
            // const voucherFS = { idVC: null, value: 0 };

            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: sumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: { id: null, value: 0 },
                  voucherShip: { id: null, value: 0 },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
        if (dcmdSelect?.value == 0) {
          notification.error({
            message: "Bạn chưa chọn địa chỉ!",
          });
        } else {
          // doneOrder();
          handleOpenSuaHoaDon();
        }
      }
    } else {
      // doneOrder();
      console.log(newBillDetails);
      if (newBillDetails.length === 0) {
        notification.error({
          message: "THÔNG BÁO",
          description: "Hãy chọn sản phẩm",
        });
      } else {
        let sumTongTien = 0;
        for (let i = 0; i < newBillDetails.length; i++) {
          sumTongTien =
            sumTongTien + newBillDetails[i].price * newBillDetails[i].quantity;
        }
        setDataSumTongTien(sumTongTien);
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            setDataVouCherTruocUpdateHoaDon(response.data);
            let sum = sumTongTien + fee?.total;
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (sumTongTien > response.data[i].valueMin) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }
            // chưa cộng tiền ship
            // setDataTongTienKhachHangPhaiTra(sum + tien ship);
            // console.log(sum + " yyyy2 ");
            // tính số điểm ra tiền
            // const voucherGG = { idVC: null, value: 0 };
            // const voucherFS = { idVC: null, value: 0 };

            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: sumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: { id: null, value: 0 },
                  voucherShip: { id: null, value: 0 },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }
    }
    // if (newBillDetails.length > 0) {
    //   handleOpenSuaHoaDon();
    // }
  };

  const rejectXacNhanSuaHoaDon = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const confirmXacNhanSuaHoaDon = (newBillDetails) => {
    confirmDialog({
      message: "Bạn chắc chắn sửa hoá đơn?",
      header: "XÁC NHẬN SỬA HOÁ ĐƠN",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => suaHoaDon(newBillDetails),
      reject: () => rejectXacNhanSuaHoaDon(),
    });
  };
  // mở modal sau kh ấn xác nhận để sửa voucher và điểm
  const [isModalVisibleSuaHoaDon, setIsModalVisibleSuaHoaDon] = useState(false);

  const [dataVoucher, setDataVoucher] = useState({ id: null, value: 0 });
  const [dataVoucherShip, setDataVoucherShip] = useState({
    id: null,
    value: 0,
  });

  const handleOpenSuaHoaDon = () => {
    setDataVoucher({ id: null, value: 0 });
    setDataVoucherShip({ id: null, value: 0 });
    // if(dataSumTongTien > dataVouCherTruocUpdateHoaDon.valueMin){

    // }
    console.log(dataSuaHoaDon);
    setIsModalVisibleSuaHoaDon(true);
  };
  // Hàm để ẩn Modal
  const handleCancelSuaHoaDon = () => {
    setDataTongTienKhachHangPhaiTra(0);
    setIsModalVisibleSuaHoaDon(false);
  };

  // Hàm để hiển thị Modal khi cần
  const handleEditClickVoucher = (record) => {
    // if (totalPrice < 5000000) {
    //   notification.error({
    //     message: "VOUCHER",
    //     description: "Đơn hàng chưa đủ điều kiện (Tối thiểu 5.000.000 đ)",
    //   });
    // } else {
    setIsModalVisibleVoucher(true);
    // }
  };
  //mow modal chonj voucher
  const [voucher, setVoucher] = useState([]);
  const [voucherFreeShip, setVoucherFreeShip] = useState([true]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selecteVoucherFreeShip, setSelectedVoucherFreeShip] = useState(0);
  const [selecteVoucher, setSelectedVoucher] = useState(0);
  const [bill, setBill] = useState({
    code: Math.floor(Math.random() * 100000000000000000001) + "",
    userName: "",
    email: "",
    phoneNumber: "",
    address: "Nhận tại cửa hàng",
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
  const [products, setProducts] = useState([]);
  const [isModalVisibleVoucher, setIsModalVisibleVoucher] = useState(false); // Trạng thái hiển thị Modal
  // Hàm để ẩn Modal
  const handleCancelVoucher = () => {
    setIsModalVisibleVoucher(false);
  };
  // cònig chọn lại voucher
  const rejectChonLaiVoucher1 = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const confirmChonLaiVoucher1 = (voucher) => {
    confirmDialog({
      message: "Chọn lại voucher mới - Voucher cũ sẽ bị huỷ?",
      header: "XÁC NHẬN CHỌN LẠI VOUCHER",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleVoucherFreeShipClick(voucher),
      reject: () => rejectChonLaiVoucher1(),
    });
  };
  //click Voucher freeship
  const handleVoucherFreeShipClick = (voucher) => {
    if (dataSumTongTien < voucher.valueMinimum) {
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
      //   setBill({
      //     ...bill,
      //     itemDiscountFreeShip: voucher.valueVoucher,
      //     idVoucherFreeShip: voucher.id,
      //   });

      setDataVoucherShip({
        ...dataVoucherShip,
        id: voucher.id,
        value: voucher.valueVoucher,
      });

      let sum = dataSumTongTien + fee.total;
      sum = sum - voucher.valueVoucher; // trừ tiền voucher ship

      if (dataVoucher.value > 0 && dataVoucher.id !== null) {
        sum = sum - dataVoucher.value;
        // tính số điểm ra tiền
        soDiemTruocUpdate(billUpdate.id)
          .then((response) => {
            let quyDoi = response.data * 1000;
            sum = sum - quyDoi;
            setDataTongTienKhachHangPhaiTra(sum);
            setDataSuaHoaDon({
              ...dataSuaHoaDon,
              idHoaDon: billUpdate.id,
              hoVaTen: billUpdate.userName,
              sdt: billUpdate.phoneNumber,
              diaChi: billUpdate.address,
              products: newBillDetails,
              tongTienSanPham: dataSumTongTien,
              tienShipMoi: fee.total,
              voucherGiamGia: { id: dataVoucher.id, value: dataVoucher.value },
              voucherShip: { id: voucher.id, value: voucher.valueVoucher },
              soDiemSuDung: billUpdate.numberOfPointsUsed,
              tongTienKhachPhaiTra: sum,
            });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            //   setDataVouCherTruocUpdateHoaDon(response.data);
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (
                  dataSumTongTien > response.data[i].valueMin &&
                  response.data[i].valueVoucher > 100000
                ) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }

            // tính số điểm ra tiền
            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: dataSumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: { id: null, value: 0 },
                  voucherShip: { id: voucher.id, value: voucher.valueVoucher },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }

      notification.success({
        message: "VOUCHER",
        description: "Áp dụng voucher thành công",
      });
    }
  };

  // cònig chọn lại voucher
  const rejectChonLaiVoucher11 = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const confirmChonLaiVoucher11 = (id) => {
    confirmDialog({
      message: "Chọn lại voucher mới?",
      header: "XÁC NHẬN HUỶ VOUCHER",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleClearVoucherFreeShip(id),
      reject: () => rejectChonLaiVoucher11(),
    });
  };
  //clear voucher freeship
  const handleClearVoucherFreeShip = (id) => {
    if (selecteVoucherFreeShip?.id === id) {
      setSelectedVoucherFreeShip(null);
      //   if (storedUser !== null) {
      //     readAll(idAccount)
      //       .then((response) => {
      //         console.log(response.data);
      //         setProducts(response.data);
      //       })
      //       .catch((error) => {
      //         console.log(`${error}`);
      //       });
      //   } else {
      //     setProducts(cartItems);
      //   }
      setDataVoucherShip({
        ...dataVoucherShip,
        id: null,
        value: 0,
      });

      let sum = dataSumTongTien + fee.total;
      //   sum = sum - voucher.valueVoucher;
      // alert(sum);
      if (dataVoucher.value > 0 && dataVoucher.id !== null) {
        sum = sum - dataVoucher.value;
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (
                  dataSumTongTien > response.data[i].valueMin &&
                  response.data[i].valueVoucher <= 100000
                ) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }
            // tính số điểm ra tiền
            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: dataSumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: {
                    id: dataVoucher.id,
                    value: dataVoucher.value,
                  },
                  voucherShip: { id: null, value: 0 },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            //   setDataVouCherTruocUpdateHoaDon(response.data);
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (
                  dataSumTongTien > response.data[i].valueMin &&
                  response.data[i].valueVoucher <= 100000
                ) {
                  sum = sum - response.data[i].valueVoucher;
                }
                if (
                  dataSumTongTien > response.data[i].valueMin &&
                  response.data[i].valueVoucher > 100000
                ) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }

            // tính số điểm ra tiền
            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: dataSumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: { id: null, value: 0 },
                  voucherShip: { id: null, value: 0 },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }

      notification.success({
        message: "VOUCHER",
        description: "Hủy voucher thành công",
      });
    } else {
      notification.success({
        message: "VOUCHER",
        description: "Hủy voucher thất bại!",
      });
    }
  };

  // cònig chọn lại voucher
  const rejectChonLaiVoucher2 = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const confirmChonLaiVoucher2 = (voucher) => {
    confirmDialog({
      message: "Chọn lại voucher mới - Voucher cũ sẽ bị huỷ?",
      header: "XÁC NHẬN CHỌN LẠI VOUCHER",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleVoucherClick(voucher),
      reject: () => rejectChonLaiVoucher2(),
    });
  };
  //click Voucher - giamr tieenf
  const handleVoucherClick = (voucher) => {
    if (dataSumTongTien < voucher.valueMinimum) {
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
      //   setBill({
      //     ...bill,
      //     itemDiscount: voucher.valueVoucher,
      //     idVoucher: voucher.id,
      //   });
      //   if (storedUser !== null) {
      //     readAll(idAccount)
      //       .then((response) => {
      //         console.log(response.data);
      //         setProducts(response.data);
      //       })
      //       .catch((error) => {
      //         console.log(`${error}`);
      //       });
      //   } else {
      //     setProducts(cartItems);
      //   }
      setDataVoucher({
        ...dataVoucher,
        id: voucher.id,
        value: voucher.valueVoucher,
      });

      let sum = dataSumTongTien + fee.total;
      sum = sum - voucher.valueVoucher;
      // chuaw coong tien ship
      if (dataVoucherShip.value > 0 && dataVoucherShip.id !== null) {
        sum = sum - dataVoucherShip.value;
        // tính số điểm ra tiền
        soDiemTruocUpdate(billUpdate.id)
          .then((response) => {
            let quyDoi = response.data * 1000;
            sum = sum - quyDoi;
            setDataTongTienKhachHangPhaiTra(sum);
            setDataSuaHoaDon({
              ...dataSuaHoaDon,
              idHoaDon: billUpdate.id,
              hoVaTen: billUpdate.userName,
              sdt: billUpdate.phoneNumber,
              diaChi: billUpdate.address,
              products: newBillDetails,
              tongTienSanPham: dataSumTongTien,
              tienShipMoi: fee.total,
              voucherGiamGia: { id: voucher.id, value: voucher.valueVoucher },
              voucherShip: {
                id: dataVoucherShip.id,
                value: dataVoucherShip.value,
              },
              soDiemSuDung: billUpdate.numberOfPointsUsed,
              tongTienKhachPhaiTra: sum,
            });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            //   setDataVouCherTruocUpdateHoaDon(response.data);
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (
                  dataSumTongTien > response.data[i].valueMin &&
                  response.data[i].valueVoucher <= 100000
                ) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }

            // tính số điểm ra tiền
            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: dataSumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: {
                    id: voucher.id,
                    value: voucher.valueVoucher,
                  },
                  voucherShip: {
                    id: null,
                    value: 0,
                  },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }
      notification.success({
        message: "VOUCHER",
        description: "Áp dụng voucher thành công",
      });
    }
  };

  // cònig chọn lại voucher
  const rejectChonLaiVoucher22 = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const confirmChonLaiVoucher22 = (id) => {
    confirmDialog({
      message: "Chọn lại voucher mới?",
      header: "XÁC NHẬN HUỶ VOUCHER",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleClearVoucher(id),
      reject: () => rejectChonLaiVoucher22(),
    });
  };
  //clear voucher
  const handleClearVoucher = (id) => {
    if (selecteVoucher?.id === id) {
      setSelectedVoucher(null);

      setDataVoucher({
        ...dataVoucher,
        id: null,
        value: 0,
      });

      let sum = dataSumTongTien + fee.total;
      //   sum = sum - voucher.valueVoucher;
      // alert(sum);
      if (dataVoucherShip.value > 0 && dataVoucherShip.id !== null) {
        sum = sum - dataVoucherShip.value;
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (
                  dataSumTongTien > response.data[i].valueMin &&
                  response.data[i].valueVoucher > 100000
                ) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }
            // tính số điểm ra tiền
            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: dataSumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: {
                    id: null,
                    value: 0,
                  },
                  voucherShip: {
                    id: dataVoucherShip.id,
                    value: dataVoucherShip.value,
                  },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        voucherTruocUpdate(billUpdate.id)
          .then((response) => {
            //   setDataVouCherTruocUpdateHoaDon(response.data);
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                if (
                  dataSumTongTien > response.data[i].valueMin &&
                  response.data[i].valueVoucher <= 100000
                ) {
                  sum = sum - response.data[i].valueVoucher;
                }
                if (
                  dataSumTongTien > response.data[i].valueMin &&
                  response.data[i].valueVoucher > 100000
                ) {
                  sum = sum - response.data[i].valueVoucher;
                }
              }
              console.log(sum + " yyyy ");
            }

            // tính số điểm ra tiền
            soDiemTruocUpdate(billUpdate.id)
              .then((response) => {
                let quyDoi = response.data * 1000;
                sum = sum - quyDoi;
                setDataTongTienKhachHangPhaiTra(sum);
                setDataSuaHoaDon({
                  ...dataSuaHoaDon,
                  idHoaDon: billUpdate.id,
                  hoVaTen: billUpdate.userName,
                  sdt: billUpdate.phoneNumber,
                  diaChi: billUpdate.address,
                  products: newBillDetails,
                  tongTienSanPham: dataSumTongTien,
                  tienShipMoi: fee.total,
                  voucherGiamGia: { id: null, value: 0 },
                  voucherShip: { id: null, value: 0 },
                  soDiemSuDung: billUpdate.numberOfPointsUsed,
                  tongTienKhachPhaiTra: sum,
                });
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }

      notification.success({
        message: "VOUCHER",
        description: "Hủy voucher thành công",
      });
    } else {
      notification.success({
        message: "VOUCHER",
        description: "Hủy voucher thất bại!",
      });
    }
  };

  //     });
  //   };

  // Tạo biến bill sau khi tìm đc
  //   const [billUpdate, setBillUpdate] = useState({});
  //   const [hideForm, setHideForm] = useState(false);

  //   let [newBillDetails, setNewBillDetails] = useState([]);
  //   const [idBillTemp, setIdBillTemp] = useState(null);
  //   let temp = [];

  //   const [priceProductBillUpdate, setPriceProductBillUpdate] = useState(0);

  function searchBill(id) {
    setIdBillTemp(id);
    searchBillByCode(id)
      .then((response) => {
        setBillUpdate(response.data);
        console.log(response.data.account);
        if (response.data.account != null) {
          readAllByIdUser(response.data.account.id)
            .then((res) => {
              setDefaultAddress(res.data);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setDefaultAddress([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    findBillDetails(id)
      .then((response) => {
        setDataBillDetails(response.data);
        response.data.map((item) =>
          temp.push({
            id: item.id,
            idProduct: item.idProduct,
            nameProduct: item.nameProduct,
            version: item.skuColor + "-" + item.skuCapacity,
            bill: item.bill,
            sku: item.idSKU,
            price: item.price,
            quantity: item.quantity,
            status: "CHO_XAC_NHAN",
          })
        );
        setNewBillDetails(temp);
        setHideForm(true);
        let priceProductBillUpdate1 = 0;
        temp.map((data) => {
          priceProductBillUpdate1 += data.price * data.quantity;
        });
        setPriceProductBillUpdate(priceProductBillUpdate1);
      })
      .catch((error) => {
        console.log(error);
      });
    getSKUForBillDetail()
      .then((response) => {
        setListSku(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCancelHideForm() {
    temp.length = 0;
    setIdBillTemp(null);
    setHideForm(false);
  }

  function hanldeName(event) {
    setBillUpdate({
      ...billUpdate,
      userName: event.target.value,
    });
  }

  function hanldPhone(event) {
    setBillUpdate({
      ...billUpdate,
      phoneNumber: event.target.value,
    });
  }

  const [hideFormSearchSku, setHideFormSearchSku] = useState(false);
  const [listSku, setListSku] = useState([]);

  function handleCancelHideFormSearchSku() {
    getSKUForBillDetail()
      .then((response) => {
        setListSku(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setHideFormSearchSku(!hideFormSearchSku);
  }

  const handleSearchSku = (event) => {
    searchSKUForBillDetail(event.target.value)
      .then((response) => {
        setListSku(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete product from bill
  const handleDeleteSkuFromBillDetail = (record) => {
    // Đặt giá trị mới cho quantitySKU sau khi cập nhật state
    const index = newBillDetails.findIndex((item) => item.sku === record.sku);
    if (index !== -1) {
      document.getElementById(`quantitySKU_${index}`).value =
        newBillDetails[index + 1].quantity;
    }
    setNewBillDetails((prevBillDetails) => {
      const updatedBillDetails = prevBillDetails.filter(
        (item) => item.sku !== record.sku
      );

      let totalQuantity = 0;
      updatedBillDetails.forEach((data) => {
        totalQuantity += data.quantity;
      });

      let priceTotal = 0;
      updatedBillDetails.forEach((data) => {
        priceTotal += data.price * data.quantity;
        setPriceProductBillUpdate(priceTotal);
      });

      setTransportationFeeDTO((prevTransportationFeeDTO) => ({
        ...prevTransportationFeeDTO,
        quantity: totalQuantity,
        insuranceValue: priceTotal,
      }));

      return updatedBillDetails;
    });
  };

  // Add product to bill
  // const handleAddSkuToBill = (record) => {
  //   if (newBillDetails.find((item) => item.sku === record.id) !== undefined) {
  //     newBillDetails.map((item, index) => {
  //       if (item.sku === record.id) {
  //         newBillDetails[newBillDetails.indexOf(item)] = {
  //           ...item,
  //           quantity: item.quantity + 1,
  //         };
  //         document.getElementById(`quantitySKU_${index}`).value =
  //           item.quantity + 1;
  //       }
  //     });
  //     setNewBillDetails((newBillDetails) => [...newBillDetails]);
  //     let totalQuantity = 0;
  //     newBillDetails.map((data) => {
  //       totalQuantity += data.quantity;
  //     });
  //     let priceTotal = 0;
  //     newBillDetails.map((data) => {
  //       priceTotal += data.price * data.quantity;
  //     });

  //     setTransportationFeeDTO({
  //       ...transportationFeeDTO,
  //       quantity: totalQuantity,
  //       insuranceValue: priceTotal,
  //     });
  //   } else {
  //     const billTemp = {
  //       id: null,
  //       idProduct: record.productId,
  //       nameProduct: record.name,
  //       version: record.color + "-" + record.capacity,
  //       bill: idBillTemp,
  //       sku: record.id,
  //       price: record.price,
  //       quantity: 1,
  //       status: "CHO_XAC_NHAN",
  //     };
  //     setNewBillDetails((newBillDetails) => [...newBillDetails, billTemp]);
  //     let totalQuantity = 0;
  //     newBillDetails.map((data) => {
  //       totalQuantity += data.quantity;
  //     });
  //     let priceTotal = 0;
  //     newBillDetails.map((data) => {
  //       priceTotal += data.price * data.quantity;
  //     });

  //     setTransportationFeeDTO({
  //       ...transportationFeeDTO,
  //       quantity: totalQuantity,
  //       insuranceValue: priceTotal,
  //     });
  //   }
  // };
  const handleAddSkuToBill = (record) => {
    setNewBillDetails((prevBillDetails) => {
      const existingItem = prevBillDetails.find(
        (item) => item.sku === record.id
      );

      if (existingItem) {
        const updatedDetails = prevBillDetails.map((item) =>
          item.sku === record.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        let totalQuantity = 0;
        updatedDetails.forEach((data) => {
          totalQuantity += data.quantity;
        });

        let priceTotal = 0;
        updatedDetails.forEach((data) => {
          priceTotal += data.price * data.quantity;
          setPriceProductBillUpdate(priceTotal);
        });

        setTransportationFeeDTO((prevTransportationFeeDTO) => ({
          ...prevTransportationFeeDTO,
          quantity: totalQuantity,
          insuranceValue: priceTotal,
        }));

        return updatedDetails;
      } else {
        const billTemp = {
          id: null,
          idProduct: record.productId,
          nameProduct: record.name,
          version: record.color + "-" + record.capacity,
          bill: idBillTemp,
          sku: record.id,
          price: record.price,
          quantity: 1,
          status: "CHO_XAC_NHAN",
        };

        const updatedDetails = [...prevBillDetails, billTemp];

        let totalQuantity = 0;
        updatedDetails.forEach((data) => {
          totalQuantity += data.quantity;
        });

        let priceTotal = 0;
        updatedDetails.forEach((data) => {
          priceTotal += data.price * data.quantity;
          setPriceProductBillUpdate(priceTotal);
        });

        setTransportationFeeDTO((prevTransportationFeeDTO) => ({
          ...prevTransportationFeeDTO,
          quantity: totalQuantity,
          insuranceValue: priceTotal,
        }));

        return updatedDetails;
      }
    });
    // Đặt giá trị mới cho quantitySKU sau khi cập nhật state
    const index = newBillDetails.findIndex((item) => item.sku === record.id);
    if (index !== -1) {
      document.getElementById(`quantitySKU_${index}`).value =
        newBillDetails[index].quantity + 1;
    }
  };

  const handleChangeQuantity = (record) => {
    newBillDetails.map((item, index) => {
      if (item.sku === record.sku) {
        newBillDetails[newBillDetails.indexOf(item)] = {
          ...item,
          quantity: Number(
            document.getElementById(`quantitySKU_${index}`).value
          ),
        };
      }
    });
    setNewBillDetails((newBillDetails) => [...newBillDetails]);

    let totalQuantity = 0;
    newBillDetails.map((data) => {
      totalQuantity += data.quantity;
    });
    let priceTotal = 0;
    newBillDetails.map((data) => {
      priceTotal += data.price * data.quantity;
    });

    setTransportationFeeDTO({
      ...transportationFeeDTO,
      quantity: totalQuantity,
      insuranceValue: priceTotal,
    });
    let priceProductBillUpdate1 = 0;
    newBillDetails.map((data) => {
      priceProductBillUpdate1 += data.price * data.quantity;
    });
    setPriceProductBillUpdate(priceProductBillUpdate1);
  };

  function handleAddress(event) {
    setBillUpdate({
      ...billUpdate,
      address:
        event.target.value +
        ", " +
        wardBillUpdate +
        ", " +
        districtBillUpdate +
        ", " +
        proviceBillUpdate,
    });
  }

  function giaoTanNoi() {
    const select0 = document.getElementById("0");
    select0.selected = true;
    // const select = document.getElementById("floatingSelect1");
    // select.hidden = true;
    const input = document.getElementById("floatingSelect2");
    input.hidden = false;
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = true;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = false;
    // setTransportationFeeDTO({
    //   toDistrictId: null,
    //   toWardCode: null,
    //   insuranceValue: null,
    //   quantity: 1,
    // });
    // setIsChecked1(false);
    setIsChecked2(true);
    setIsChecked3(false);
    // document.getElementById("htnn_4").checked = false;
    document.getElementById("htnn_6").checked = false;
  }

  function diaChiMacDinh() {
    const input = document.getElementById("floatingSelect2");
    input.value = "";
    const select_1 = document.getElementById("-1");
    select_1.selected = true;
    const select_2 = document.getElementById("-2");
    select_2.selected = true;
    const select_3 = document.getElementById("-3");
    select_3.selected = true;
    const divDcmd = document.getElementById("dcmd2");
    divDcmd.hidden = false;
    const notDcmd = document.getElementById("notDcmd");
    notDcmd.hidden = true;
    setTransportationFeeDTO({
      toDistrictId: null,
      toWardCode: null,
      insuranceValue: null,
      quantity: 1,
    });
    setIsChecked2(false);
    setIsChecked3(true);
    // document.getElementById("htnn_4").checked = false;
    document.getElementById("htnn_5").checked = false;
  }

  const [proviceBillUpdate, setProviceBillUpdate] = useState();
  const [districtBillUpdate, setDistrictBillUpdate] = useState();
  const [wardBillUpdate, setWardBillUpdate] = useState();
  const handleProvince = (event) => {
    if (document.getElementById(event.target.value) !== null) {
      const target = event.target;
      const value = target.value;
      setProvince_id(value);
      console.log(value);
      setDistrict_id(null);
      setWards([]);
      let totalQuantity = 0;
      newBillDetails.map((data) => {
        totalQuantity += data.quantity;
      });
      let item = {
        toDistrictId: null,
        toWardCode: null,
        insuranceValue: null,
        quantity: totalQuantity,
      };
      setTransportationFeeDTO(item);
      //   setBill({
      //     ...bill,
      //     province: document.getElementById(value).innerText,
      //   });
      setProviceBillUpdate(document.getElementById(value).innerText);
      setShowDistricts(true);
    } else {
      setShowDistricts(false);
      setShowWards(false);
      setTransportationFeeDTO({
        toDistrictId: null,
        toWardCode: null,
        // insuranceValue: soTienThanhToan,
        // quantity: quantityCart,
      });
    }
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
      let priceTotal = 0;
      newBillDetails.map((data) => {
        priceTotal += data.price * data.quantity;
      });
      item["insuranceValue"] = parseInt(priceTotal);
      setTransportationFeeDTO(item);
      console.log(transportationFeeDTO);
      //   setBill({
      //     ...bill,
      //     district: document.getElementById(value).innerText,
      //   });
      setDistrictBillUpdate(document.getElementById(value).innerText);
      setShowWards(true);
    } else {
      setShowWards(false);
      setTransportationFeeDTO({
        toDistrictId: event.target.value,
        toWardCode: null,
        // insuranceValue: soTienThanhToan,
        // quantity: quantityCart,
      });
    }
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
      //   setBill({
      //     ...bill,
      //     wards: document.getElementById(value).innerText,
      //   });
      //   console.log(bill);
      setWardBillUpdate(document.getElementById(value).innerText);
    } else {
      setTransportationFeeDTO({
        ...transportationFeeDTO,
        toWardCode: event.target.value,
      });
    }
    console.log(transportationFeeDTO);
    setIsChecked2(true);
    setIsChecked3(false);
  };

  function chinhSuaThongTinDatHang() {
    document.getElementById("hoVaTen").disabled = false;
    document.getElementById("phoneNumber").disabled = false;
    document.getElementById("chinhSua1").hidden = false;
    document.getElementById("notDcmd").hidden = false;
  }

  function handleDefaultAddress(event) {
    let totalQuantity = 0;
    newBillDetails.map((data) => {
      totalQuantity += data.quantity;
    });
    let priceTotal = 0;
    newBillDetails.map((data) => {
      priceTotal += data.price * data.quantity;
    });
    const inputString = document.getElementById(event.target.value).innerText;
    if (inputString !== "") {
      const dataArray = inputString.split(",").map((item) => item.trim());
      setBillUpdate({
        ...billUpdate,
        // province: dataArray[dataArray.length - 1],
        // district: dataArray[dataArray.length - 2],
        // wards: dataArray[dataArray.length - 3],
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
                insuranceValue: priceTotal,
                quantity: totalQuantity,
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
    } else {
      setTransportationFeeDTO({
        toDistrictId: null,
        toWardCode: null,
        insuranceValue: priceTotal,
        quantity: totalQuantity,
      });
    }
    setIsChecked2(false);
    setIsChecked3(true);
  }

  //xasc nhan sua hoa don tu nhan vien
  const rejectXacNhanSuaHoaDonTuNhanVien = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const configXacNhanSuaHoaDonTuNhanVien = (dataSuaHoaDon) => {
    confirmDialog({
      message: "Bạn Chắc Chắn Sửa Hoá Đơn - Lưu Lại Hoá Đơn?",
      header: "XÁC NHẬN CẬP NHẬT LẠI HOÁ ĐƠN?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleXacNhanSuaHoaDonTuNhanVien(dataSuaHoaDon),
      reject: () => rejectXacNhanSuaHoaDonTuNhanVien(),
    });
  };

  // Hàm làm mới trang sau 2 giây
  const reloadPage = () => {
    window.location.reload();
  };

  // Thiết lập thời gian chạy là 2000 milliseconds (2 giây)
  const delayInMilliseconds = 1000;

  // Sử dụng setTimeout để gọi hàm reloadPage sau khoảng thời gian được thiết lập

  const handleXacNhanSuaHoaDonTuNhanVien = (dataSuaHoaDon) => {
    console.log(dataSuaHoaDon);

    xacNhanSuaHoaDonKhiKhachGoiYeuCau(dataSuaHoaDon)
      .then((response) => {
        if (response.data === 1) {
          notification.success({
            message: "THÔNG BÁO",
            description: "Sửa hoá đơn thành công",
          });
          handleCancelHideForm();
          handleCancelSuaHoaDon();
          setTimeout(reloadPage, delayInMilliseconds);
        }
        if (response.data === -1) {
          notification.error({
            message: "THÔNG BÁO",
            description: "Sửa hoá đơn thất bại!",
          });
        }
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  };

  // huy thao tac configXacNhanHuyThaoTacNhanVien
  const rejectXacNhanHuyThaoTacNhanVien = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục bán hàng.",
      life: 3000,
    });
  };
  const configXacNhanHuyThaoTacNhanVien = () => {
    confirmDialog({
      message: "Bạn Chắc Chắn Huỷ Thao Tác?",
      header: "XÁC NHẬN HUỶ CẬP NHẬT LẠI HOÁ ĐƠN?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => xacNhanHuyThaoTacTuNhanVien(),
      reject: () => rejectXacNhanHuyThaoTacNhanVien(),
    });
    console.log(dataSuaHoaDon);
  };

  const xacNhanHuyThaoTacTuNhanVien = () => {
    handleCancelHideForm();
    handleCancelSuaHoaDon();
    notification.warning({
      message: "THÔNG BÁO",
      description: "Tiếp tục bán hàng",
    });
  };
  return (
    <>
      <Toast ref={toast1} />
      <ConfirmDialog />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
            <Menu.Item key="0">
              <img
                src="/img/logo.jpg"
                alt="Trang chủ Smartphone Store"
                title="Trang chủ Smartphone Store"
                style={{ width: "150px" }}
              />
            </Menu.Item>
            <Menu.Item key="0" icon={<FileDoneOutlined />}>
              <Link to="/sell">BÁN HÀNG TẠI QUẦY</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Thống kê</Link>
            </Menu.Item>
            <SubMenu key="2" title="Quản lý đơn hàng" icon={<ShopOutlined />}>
              <Menu.Item key="2" icon={<ShopOutlined />}>
                <Link to="/orders">Quản lý đơn hàng</Link>
              </Menu.Item>
              <Menu.Item key="11" icon={<ShopOutlined />}>
                <Link to="/orderBackProduct">Quản lý trả hàng</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/users">Quản lý người dùng</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
              <Link to="/product">Quản lý sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<GiftOutlined />}>
              <Link to="/voucher">Quản lý Voucher</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UnorderedListOutlined />}>
              <Link to="/categories">Thể loại</Link>
            </Menu.Item>
            <SubMenu
              key="8"
              title="Chi tiết sản phẩm"
              icon={<AppstoreAddOutlined />}
            >
              <Menu.Item key="sku">
                <Link to="/admin/product-detail">SKU</Link>
              </Menu.Item>
              <Menu.Item key="color">
                <Link to="/color/display">Color</Link>
              </Menu.Item>
              <Menu.Item key="capacity">
                <Link to="/capacity/display">Capacity</Link>
              </Menu.Item>
              <Menu.Item key="ram">
                <Link to="/ram/display">Ram</Link>
              </Menu.Item>
              <Menu.Item key="chip">
                <Link to="/chip/display">Chip</Link>
              </Menu.Item>
              <Menu.Item key="size">
                <Link to="/size/display">Size</Link>
              </Menu.Item>
              <Menu.Item key="screen">
                <Link to="/screen/display">Screen</Link>
              </Menu.Item>
              <Menu.Item key="manufacture">
                <Link to="/manufacture/display">Manufacture</Link>
              </Menu.Item>
              <Menu.Item key="category">
                <Link to="/category/display">Category</Link>
              </Menu.Item>
              <Menu.Item key="battery">
                <Link to="/battery/display">Battery</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              key="8"
              icon={<LogoutOutlined />}
              onClick={() => {
                localStorage.removeItem("account");
                window.location.replace("/login");
              }}
            >
              Đăng xuất
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "#F5F5F5" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button
                type="text"
                icon={<SettingOutlined />}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Dropdown>
            <Space
              size="middle"
              style={{ float: "right", marginRight: "40px" }}
            >
              <Badge count={pendingBills} overflowCount={100}>
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{
                    fontSize: "16px",
                  }}
                />
              </Badge>
            </Space>
            <HeaderDashBoard />
          </Header>
          <br /> <br /> <br />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 600,
              background: colorBgContainer,
            }}
          >
            <Text style={{ fontSize: "24px", color: "blue" }} strong>
              QUẢN LÝ ĐƠN HÀNG
            </Text>
            <div
              class="d-grid gap-2 d-md-flex justify-content-md-end"
              style={{ marginTop: "10px" }}
            >
              <button
                class="btn btn-success"
                type="button"
                onClick={() => handUpdateTrangThai()}
              >
                XÁC NHẬN TẤT CẢ HÓA ĐƠN ONLINE
              </button>
            </div>
            <Row gutter={[16, 16]}>
              <Col
                xl={6}
                lg={24}
                xs={24}
                style={{
                  marginTop: "52px",
                }}
              >
                <Card title={t("Tìm kiếm")}>
                  <Form>
                    <Row gutter={[10, 0]} align="bottom">
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Tìm kiếm")}>
                          <Input
                            name="key"
                            placeholder={t("Code, Người tạo")}
                            prefix={<SearchOutlined />}
                            onChange={handleChangeSearch}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Trạng thái")}>
                          <Select
                            name="status"
                            onChange={handleChangeStatus}
                            allowClear
                            placeholder={"Trạng thái"}
                          >
                            {orderSelectProps.options.map((st) => {
                              return (
                                <Option value={st.value}>{st.label}</Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      {/* <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Store")} name="store">
                          <Select allowClear />
                        </Form.Item>
                      </Col> */}

                      {/* <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("User")} name="user">
                          <Select
                            name="user"
                            onChange={handleChangeUser}
                            allowClear
                            placeholder={"Users"}
                          >
                            {user.map((us) => {
                              return (
                                <Option value={us.id}>{us.fullName}</Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col> */}
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Ngày tạo")} name="createdAt">
                          <RangePicker
                            id="dateFilter"
                            style={{ width: "100%" }}
                            onChange={handleChangeDate}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item>
                          <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            block
                            onClick={() => search()}
                          >
                            {t("TÌM KIẾM")}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Col>
              <Col xl={18} xs={24}>
                <List>
                  <Table
                    rowKey="id"
                    dataSource={oder}
                    scroll={{ x: "max-content" }}
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: false,
                      showTotal: (total) => `Tổng số ${total} mục`,
                      showLessItems: true,
                    }}
                    expandable={{
                      expandedRowRender: !breakpoint.xs
                        ? expandedRowRender
                        : undefined,
                    }}
                  >
                    <Table.Column
                      key="edit"
                      dataIndex="edit"
                      render={(text, record) => (
                        <span>
                          {record.statusBill === "CHO_XAC_NHAN" &&
                          record.typeBill === "ONLINE" &&
                          record.method === "TIEN_MAT" ? (
                            <FormOutlined
                              style={{
                                color: "orange",
                              }}
                              onClick={() => {
                                searchBill(record.id);
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      )}
                    />
                    <Table.Column
                      key="code"
                      dataIndex="code"
                      title={t("Mã hóa đơn")}
                      render={(text, record) => <span>{record.code}</span>}
                    />
                    <Table.Column
                      key="status"
                      dataIndex="status"
                      title={t("Trạng thái")}
                      render={(text, record) => (
                        <span>{statusBadgeMapping[record.statusBill]}</span>
                      )}
                    />
                    <Table.Column
                      key="total"
                      dataIndex="total"
                      title={t("Tổng tiền")}
                      render={(text, record) => {
                        return (
                          <NumberField
                            options={{
                              currency: "VND",
                              style: "currency",
                            }}
                            value={record.totalMoney}
                          />
                        );
                      }}
                      sorter={(a, b) => a.totalMoney - b.totalMoney}
                    />
                    <Table.Column
                      key="method"
                      dataIndex="method"
                      title={t("HTTT")}
                      render={(text, record) => (
                        <span>
                          {record.method === "TIEN_MAT"
                            ? "Tiền mặt"
                            : record.method === "CHUYEN_KHOAN"
                            ? "Chuyển khoản"
                            : "Tiền mặt và chuyển khoản"}
                        </span>
                      )}
                    />
                    <Table.Column
                      key="cash"
                      dataIndex="cash"
                      title={t("Tiền mặt")}
                      render={(text, record) => {
                        return (
                          <NumberField
                            options={{
                              currency: "VND",
                              style: "currency",
                            }}
                            value={record.cash}
                          />
                        );
                      }}
                      // sorter={(a, b) => a.moneyPayment - b.moneyPayment}
                    />
                    <Table.Column
                      key="transferMoney"
                      dataIndex="transferMoney"
                      title={t("Tiền chuyển khoản")}
                      render={(text, record) => {
                        return (
                          <NumberField
                            options={{
                              currency: "VND",
                              style: "currency",
                            }}
                            value={record.transferMoney}
                          />
                        );
                      }}
                      // sorter={(a, b) => a.moneyPayment - b.moneyPayment}
                    />
                    <Table.Column
                      key="user"
                      dataIndex="user"
                      title={t("Thông tin khách hàng")}
                      render={(text, record) => (
                        <span>
                          {record?.userName} - {record?.phoneNumber}
                        </span>
                      )}
                    />

                    {/* <Table.Column
                      key="product"
                      dataIndex="product"
                      title={t("Products")}
                      render={(text, record) => <span>{record.price}</span>}
                    /> */}
                    <Table.Column
                      key="address"
                      dataIndex="address"
                      title={t("Địa chỉ")}
                      render={(text, record) => <span>{record.address}</span>}
                    />
                    <Table.Column
                      key="personCreate"
                      dataIndex="personCreate"
                      title={t("Người tạo HĐ")}
                      render={(text, record) => (
                        <span>{record.personCreate}</span>
                      )}
                    />
                    <Table.Column
                      key="personUpdate"
                      dataIndex="personUpdate"
                      title={t("Người cập nhật HĐ")}
                      render={(text, record) => (
                        <span>{record.personUpdate}</span>
                      )}
                    />
                    <Table.Column
                      key="dateCreate"
                      dataIndex="dateCreate"
                      title={t("Ngày tạo")}
                      render={(
                        text,
                        record // <span>{record.dateCreate}</span>
                      ) => (
                        <DateField
                          value={record.dateCreate}
                          format="DD/MM/YYYY"
                        />
                      )}
                      sorter={(a, b) => a.dateCreate > b.dateCreate}
                    />
                    <Table.Column
                      key="dateUpdate"
                      dataIndex="dateUpdate"
                      title={t("Ngày cập nhật")}
                      render={(
                        text,
                        record // <span>{record.dateUpdate}</span>
                      ) => (
                        <DateField
                          value={record.dateUpdate}
                          format="DD/MM/YYYY"
                        />
                      )}
                      sorter={(a, b) => a.dateUpdate > b.dateUpdate}
                    />
                    <Table.Column
                      key="dateUpdate"
                      dataIndex="dateUpdate"
                      title={t("Ghi chú")}
                      render={(text, record) => <span>{record.note}</span>}
                    />
                    <Table.Column
                      key="dateUpdate"
                      dataIndex="dateUpdate"
                      title={t("Ghi chú chi tiết")}
                      render={(text, record) => (
                        <span>{record.noteReturn}</span>
                      )}
                    />

                    <Table.Column
                      key="actions"
                      dataIndex="actions"
                      title={t("Sự kiện")}
                      fixed="right"
                      align="center"
                      render={(text, record) => (
                        <span>
                          {record.statusBill === "CHO_XAC_NHAN" ? (
                            <Dropdown
                              overlay={
                                <Menu mode="vertical">
                                  <Menu.Item
                                    key="1"
                                    disabled={record.stock <= 0}
                                    style={{
                                      fontWeight: 500,
                                    }}
                                    icon={
                                      <FormOutlined
                                        style={{
                                          color: "green",
                                        }}
                                      />
                                    }
                                    onClick={() => {
                                      confirm2(record.id);
                                    }}
                                  >
                                    Xác nhận
                                  </Menu.Item>
                                  <Menu.Item
                                    key="2"
                                    style={{
                                      fontWeight: 500,
                                    }}
                                    icon={
                                      <CloseCircleOutlined
                                        style={{
                                          color: "red",
                                        }}
                                      />
                                    }
                                    onClick={() =>
                                      handleCannelOrderClick(record)
                                    }
                                  >
                                    Hủy đơn
                                  </Menu.Item>
                                </Menu>
                              }
                              trigger={["click"]}
                            >
                              <MoreOutlined
                                style={{
                                  fontSize: 24,
                                }}
                              />
                            </Dropdown>
                          ) : record.statusBill === "CHO_VAN_CHUYEN" ? (
                            record.typeBill === "ONLINE" ? (
                              <Dropdown
                                overlay={
                                  <Menu mode="vertical">
                                    <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      icon={
                                        <CloseCircleOutlined
                                          style={{
                                            color: "green",
                                          }}
                                        />
                                      }
                                      onClick={() => confirm2(record.id)}
                                    >
                                      Đã lấy hàng
                                    </Menu.Item>
                                    <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      icon={
                                        <FormOutlined
                                          style={{
                                            color: "orange",
                                          }}
                                        />
                                      }
                                      onClick={() => {
                                        returnStatusBillPrev(record.id);
                                      }}
                                    >
                                      Trở lại
                                    </Menu.Item>
                                  </Menu>
                                }
                                trigger={["click"]}
                              >
                                <MoreOutlined
                                  style={{
                                    fontSize: 24,
                                  }}
                                />
                              </Dropdown>
                            ) : (
                              <Dropdown
                                overlay={
                                  <Menu mode="vertical">
                                    <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      icon={
                                        <CloseCircleOutlined
                                          style={{
                                            color: "green",
                                          }}
                                        />
                                      }
                                      onClick={() => confirm2(record.id)}
                                    >
                                      Đã lấy hàng
                                    </Menu.Item>
                                  </Menu>
                                }
                                trigger={["click"]}
                              >
                                <MoreOutlined
                                  style={{
                                    fontSize: 24,
                                  }}
                                />
                              </Dropdown>
                            )
                          ) : record.statusBill === "VAN_CHUYEN" ? (
                            record.typeBill === "ONLINE" ? (
                              <Dropdown
                                overlay={
                                  <Menu mode="vertical">
                                    <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      icon={
                                        <CloseCircleOutlined
                                          style={{
                                            color: "green",
                                          }}
                                        />
                                      }
                                      onClick={() => confirm2(record.id)}
                                    >
                                      Đã thanh toán
                                    </Menu.Item>
                                    <Menu.Item
                                      key="2"
                                      disabled={record.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      icon={
                                        <CloseCircleOutlined
                                          style={{
                                            color: "red",
                                          }}
                                        />
                                      }
                                      onClick={() =>
                                        handleClickDeliveryFailed(record)
                                      }
                                    >
                                      Giao hàng thất bại
                                    </Menu.Item>
                                    <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      icon={
                                        <FormOutlined
                                          style={{
                                            color: "orange",
                                          }}
                                        />
                                      }
                                      onClick={() => {
                                        returnStatusBillPrev(record.id);
                                      }}
                                    >
                                      Trở lại
                                    </Menu.Item>
                                  </Menu>
                                }
                                trigger={["click"]}
                              >
                                <MoreOutlined
                                  style={{
                                    fontSize: 24,
                                  }}
                                />
                              </Dropdown>
                            ) : (
                              <Dropdown
                                overlay={
                                  <Menu mode="vertical">
                                    <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      icon={
                                        <CloseCircleOutlined
                                          style={{
                                            color: "green",
                                          }}
                                        />
                                      }
                                      onClick={() => confirm2(record.id)}
                                    >
                                      Đã thanh toán
                                    </Menu.Item>
                                    <Menu.Item
                                      key="2"
                                      disabled={record.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      icon={
                                        <CloseCircleOutlined
                                          style={{
                                            color: "red",
                                          }}
                                        />
                                      }
                                      onClick={() =>
                                        handleClickDeliveryFailed(record)
                                      }
                                    >
                                      Giao hàng thất bại
                                    </Menu.Item>
                                  </Menu>
                                }
                                trigger={["click"]}
                              >
                                <MoreOutlined
                                  style={{
                                    fontSize: 24,
                                  }}
                                />
                              </Dropdown>
                            )
                          ) : record.statusBill === "DA_THANH_TOAN" &&
                            Math.floor(
                              (new Date(
                                new Date().getFullYear() +
                                  "-" +
                                  (new Date().getMonth() + 1)
                                    .toString()
                                    .padStart(2, "0") +
                                  "-" +
                                  new Date()
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")
                              ) -
                                new Date(
                                  new Date(
                                    record.completionDate[0],
                                    record.completionDate[1] - 1,
                                    record.completionDate[2]
                                  ).getFullYear() +
                                    "-" +
                                    (
                                      new Date(
                                        record.completionDate[0],
                                        record.completionDate[1] - 1,
                                        record.completionDate[2]
                                      ).getMonth() + 1
                                    )
                                      .toString()
                                      .padStart(2, "0") +
                                    "-" +
                                    new Date(
                                      record.completionDate[0],
                                      record.completionDate[1] - 1,
                                      record.completionDate[2]
                                    )
                                      .getDate()
                                      .toString()
                                      .padStart(2, "0")
                                )) /
                                (1000 * 60 * 60 * 24)
                            ) <= 3 ? ( // <Dropdown
                            //   overlay={
                            //     <Menu mode="vertical">
                            //       <Menu.Item
                            //         key="1"
                            //         disabled={record?.stock <= 0}
                            //         style={{
                            //           fontWeight: 500,
                            //         }}
                            //         icon={
                            //           <CloseCircleOutlined
                            //             style={{
                            //               color: "red",
                            //             }}
                            //           />
                            //         }
                            //         onClick={() =>
                            //           handleNoteReturnsClick(record)
                            //         }
                            //       >
                            //         Trả hàng
                            //       </Menu.Item>
                            //     </Menu>
                            //   }
                            //   trigger={["click"]}
                            // >
                            //   <MoreOutlined
                            //     style={{
                            //       fontSize: 24,
                            //     }}
                            //   />
                            // </Dropdown>
                            ""
                          ) : record.statusBill === "YEU_CAU_TRA_HANG" ? (
                            <Dropdown
                              overlay={
                                <Menu mode="vertical">
                                  <Menu.Item
                                    key="1"
                                    disabled={record.stock <= 0}
                                    style={{
                                      fontWeight: 500,
                                    }}
                                    icon={
                                      <CloseCircleOutlined
                                        style={{
                                          color: "green",
                                        }}
                                      />
                                    }
                                    onClick={() =>
                                      handleClickReturnDetails(record)
                                    }
                                  >
                                    Xem chi tiết
                                  </Menu.Item>
                                </Menu>
                              }
                              trigger={["click"]}
                            >
                              <MoreOutlined
                                style={{
                                  fontSize: 24,
                                }}
                              />
                            </Dropdown>
                          ) : record.statusBill === "TRA_HANG" ? (
                            <Dropdown
                              overlay={
                                <Menu mode="vertical">
                                  <Menu.Item
                                    key="1"
                                    disabled={record.stock <= 0}
                                    style={{
                                      fontWeight: 500,
                                    }}
                                    icon={
                                      <CloseCircleOutlined
                                        style={{
                                          color: "green",
                                        }}
                                      />
                                    }
                                    onClick={() =>
                                      handleClickReturnedProducts(record)
                                    }
                                  >
                                    Xem chi tiết
                                  </Menu.Item>
                                </Menu>
                              }
                              trigger={["click"]}
                            >
                              <MoreOutlined
                                style={{
                                  fontSize: 24,
                                }}
                              />
                            </Dropdown>
                          ) : (
                            ""
                          )}
                        </span>
                      )}
                    />
                  </Table>
                </List>
              </Col>
            </Row>
            <Modal
              visible={isModalVisibleNoteReturns}
              onCancel={handleNoteReturnsCancel}
              width={550}
              footer={null}
              bodyStyle={{ minHeight: "150px" }}
            >
              <form onSubmit={handleSubmitReturns}>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Lí do trả hàng:
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    onChange={handleNoteReturns}
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-success">
                  Xác nhận
                </button>
              </form>
            </Modal>
            <Modal
              visible={isModalVisibleCannelOrder}
              onCancel={handleCannelOrderCancel}
              width={550}
              footer={null}
              bodyStyle={{ minHeight: "150px" }}
            >
              <form onSubmit={handleSubmitCannelOrder}>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea2" class="form-label">
                    Lí do hủy đơn:
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea2"
                    rows="3"
                    required
                    onChange={handleCannelOrder}
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-success">
                  Xác nhận
                </button>
              </form>
            </Modal>
            <Modal
              visible={isModalVisibleReturnDetails}
              onCancel={handleCannelReturnDetails}
              width={900}
              footer={null}
              bodyStyle={{ minHeight: "150px" }}
            >
              <form>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea2" class="form-label">
                    Lí do trả hàng:
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea3"
                    rows="3"
                    required
                    disabled
                    value={noteReturnDetail}
                  ></textarea>
                </div>
              </form>
              <Row style={{ marginTop: "28px", marginBottom: "10px" }}>
                <input
                  // id="id-imeis"
                  className="form-control me-2"
                  type="search"
                  placeholder="Tìm theo imei"
                  aria-label="Search"
                  name="key"
                  onChange={handleChangeSearchYCTH}
                />
              </Row>
              <br />
              <Table
                rowKey="oop"
                dataSource={newBillDetails}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                  showTotal: (total) => `Tổng số ${total} sản phẩm`,
                  showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                }}
              >
                {/* tên sp */}
                <Table.Column
                  align="center"
                  dataIndex="images"
                  title="Ảnh"
                  render={(text, record) => (
                    <div style={{ textAlign: "center" }}>
                      <AvtProduct product={record.idProduct} />
                    </div>
                  )}
                  width={150}
                />

                {/* tên sp */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Tên Sản Phẩm"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>{record.nameProduct}</p>
                      </Form.Item>
                    );
                  }}
                />
                {/* sumSKU */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Phiên Bản"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>
                          {record.skuColor} - {record.skuCapacity}
                        </p>
                      </Form.Item>
                    );
                  }}
                />
                {/* priceSKU  */}
                <Table.Column
                  align="center"
                  key="price"
                  dataIndex="price"
                  title="Giá Bán"
                  sorter={(a, b) => a.price - b.price}
                  render={(text, record) => {
                    return record.price === null ? (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <WarningFilled
                          value={false}
                          style={{
                            color: "#FFCC00",
                          }}
                        />
                        {parseFloat(0).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Form.Item>
                    ) : (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        {parseFloat(record.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Form.Item>
                    );
                  }}
                />

                {/* sumImeiTrongKho */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Mã Imei"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>{record.codeImei}</p>
                      </Form.Item>
                    );
                  }}
                />
              </Table>
              <button
                type="submit"
                class="btn btn-success"
                onClick={() => returnConfirmation()}
              >
                Xác nhận
              </button>{" "}
              <button
                type="submit"
                class="btn btn-warning"
                onClick={() => noReturnConfirmation()}
              >
                Hủy yêu cầu
              </button>
            </Modal>
            <Modal
              visible={isModalVisibleReturnedProducts}
              onCancel={handleCannelReturnedProducts}
              width={900}
              footer={null}
              bodyStyle={{ minHeight: "150px" }}
            >
              <label for="exampleFormControlTextarea2" class="form-label">
                Sản phẩm đã trả:
              </label>
              <Row style={{ marginTop: "28px", marginBottom: "10px" }}>
                <input
                  // id="id-imeis"
                  className="form-control me-2"
                  type="search"
                  placeholder="Tìm theo imei"
                  aria-label="Search"
                  name="key"
                  onChange={handleChangeSearchDaTra}
                />
              </Row>
              <Table
                rowKey="oop"
                dataSource={dataBillDetails}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                  showTotal: (total) => `Tổng số ${total} sản phẩm`,
                  showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                }}
              >
                {/* tên sp */}
                <Table.Column
                  align="center"
                  dataIndex="images"
                  title="Ảnh"
                  render={(text, record) => (
                    <div style={{ textAlign: "center" }}>
                      <AvtProduct product={record.productId} />
                    </div>
                  )}
                  width={150}
                />

                {/* tên sp */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Tên Sản Phẩm"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>{record.nameProduct}</p>
                      </Form.Item>
                    );
                  }}
                />
                {/* sumSKU */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Phiên Bản"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>
                          {record.capacity} - {record.color}
                        </p>
                      </Form.Item>
                    );
                  }}
                />
                {/* priceSKU  */}
                <Table.Column
                  align="center"
                  key="price"
                  dataIndex="price"
                  title="Giá Bán"
                  sorter={(a, b) => a.price - b.price}
                  render={(text, record) => {
                    return record.price === null ? (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <WarningFilled
                          value={false}
                          style={{
                            color: "#FFCC00",
                          }}
                        />
                        {parseFloat(0).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Form.Item>
                    ) : (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        {parseFloat(record.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Form.Item>
                    );
                  }}
                />

                {/* sumImeiTrongKho */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Mã Imei"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>{record.codeImei}</p>
                      </Form.Item>
                    );
                  }}
                />
              </Table>
            </Modal>
            <Modal
              visible={isModalVisibleDeliveryFailed}
              onCancel={handleCannelDeliveryFailed}
              width={550}
              footer={null}
              bodyStyle={{ minHeight: "150px" }}
            >
              <form onSubmit={handleSubmitDeliveryFailed}>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea2" class="form-label">
                    Lí do giao hàng thất bại:
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea2"
                    rows="3"
                    required
                    onChange={handleDeliveryFailed}
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-success">
                  Xác nhận
                </button>
              </form>
            </Modal>

            <Modal
              visible={hideForm}
              onCancel={handleCancelHideForm}
              width={1500}
              footer={null}
              bodyStyle={{ minHeight: "150px" }}
            >
              <h1 style={{ textAlign: "center" }}>Thông tin hóa đơn</h1>
              <hr />
              <div className="row">
                <form
                  className="col-md-4"
                  //   onSubmit={handleSubmitDeliveryFailed}
                >
                  <div>
                    <div className="col-md-12 order-md-1">
                      <h4 className="mb-3">Thông tin đặt hàng</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <p>Họ và tên</p>
                          <input
                            id="hoVaTen"
                            type="text"
                            className="form-control"
                            placeholder="Tên"
                            name="name"
                            value={billUpdate.userName}
                            onChange={hanldeName}
                            required
                            // disabled
                          ></input>
                          <br />
                        </div>
                        <div className="col-md-6">
                          <p>Số điện thoại</p>
                          <input
                            id="phoneNumber"
                            type="text"
                            className="form-control"
                            placeholder="Số điện thoại"
                            name="phoneNumber"
                            value={billUpdate.phoneNumber}
                            onChange={hanldPhone}
                            required
                            // disabled
                          ></input>
                        </div>
                        <div className="col-md-12">
                          <p>Địa chỉ</p>
                          <textarea
                            class="form-control"
                            aria-label="With textarea"
                            value={billUpdate.address}
                            disabled
                          ></textarea>
                          {/* <input
                            id="address"
                            type="text"
                            className="form-control"
                            placeholder="Địa chỉ"
                            name="address"
                            value={billUpdate.address}
                            // onChange={hanldPhone}
                            required
                            disabled
                          ></input> */}
                        </div>
                        {/* <button
                                                    type="button"
                                                    class="btn btn-outline-warning"
                                                    onClick={() => chinhSuaThongTinDatHang()}
                                                    style={{
                                                        marginTop: "10px",
                                                    }}
                                                >
                                                    Chỉnh sửa thông tin đặt hàng
                                                </button> */}
                        <div className="col-md-12" id="chinhSua1">
                          <b htmlFor="kh_ngaysinh">Hình thức nhận hàng</b>
                          <div className="custom-control custom-radio">
                            <input
                              id="htnn_5"
                              type="radio"
                              className="custom-control-input"
                              required=""
                              value="2"
                              onClick={() => giaoTanNoi()}
                              checked={isChecked2}
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="htnn_5"
                            >
                              Giao tận nơi
                            </label>
                          </div>
                          <div
                            className="custom-control custom-radio"
                            id="dcmd"
                            // hidden={storedUser !== null ? false : true}
                          >
                            <input
                              id="htnn_6"
                              type="radio"
                              className="custom-control-input"
                              required=""
                              value="3"
                              onClick={() => diaChiMacDinh()}
                              // hidden
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="htnn_6"
                            >
                              Địa chỉ mặc định
                            </label>
                          </div>
                        </div>
                        <div className="row" id="notDcmd">
                          <div className="col-md-4">
                            <br />
                            <label htmlFor="kh_cmnd">Tỉnh, thành phố:</label>
                            <select
                              className="form-select"
                              id="provinces"
                              aria-label="Floating label select example"
                              onChange={handleProvince}
                            >
                              <option selected id="-1"></option>
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
                          <div className="col-md-4">
                            <br />
                            <label htmlFor="kh_cmnd">Quận, huyện:</label>
                            <select
                              className="form-select"
                              id="districts"
                              aria-label="Floating label select example"
                              onChange={handleDistrict}
                            >
                              <option selected id="-2"></option>
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
                          <div className="col-md-4">
                            <br />
                            <label htmlFor="kh_cmnd">Phường, xã:</label>
                            <select
                              className="form-select"
                              id="wards"
                              aria-label="Floating label select example"
                              onChange={handleWard}
                            >
                              <option selected id="-3"></option>
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
                            className="col-md-12"
                            style={{ marginTop: "10px" }}
                          >
                            <input
                              // hidden
                              id="floatingSelect2"
                              className="form-control"
                              type="text"
                              placeholder="Địa chỉ cụ thể"
                              aria-label="default input example"
                              onChange={handleAddress}
                            />
                          </div>
                        </div>
                        <div id="dcmd2" hidden>
                          <br />
                          <label htmlFor="kh_cmnd">
                            Mời bạn chọn địa chỉ mặc định:
                          </label>
                          <select
                            className="form-select"
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
                      <div className="row col-md-5">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() =>
                            confirmXacNhanSuaHoaDon(newBillDetails)
                          }
                          //   confirmXacNhanSuaHoaDon
                          //   console.log(newBillDetails)
                        >
                          Xác nhận
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <br />
                <div className="col-md-8">
                  {/* <div className="row col-md-3"> */}
                  <h4>Giỏ hàng của khách hàng</h4>

                  {/* <button
                    type="button"
                    onClick={handleCancelHideFormSearchSku}
                    className="btn btn-warning"
                  >
                    +
                  </button> */}
                  {/* </div> */}
                  <br />
                  <Table
                    rowKey="oop"
                    dataSource={newBillDetails}
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: false,
                      showTotal: (total) => `Tổng số ${total} sản phẩm`,
                      showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                    }}
                  >
                    {/* tên sp */}
                    <Table.Column
                      align="center"
                      dataIndex="images"
                      title="Ảnh"
                      render={(text, record) => (
                        <div style={{ textAlign: "center" }}>
                          <AvtProduct product={record.idProduct} />
                        </div>
                      )}
                      width={150}
                    />

                    {/* tên sp */}
                    <Table.Column
                      align="center"
                      key="isActive"
                      dataIndex="isActive"
                      title="Tên Sản Phẩm"
                      render={(text, record) => {
                        return (
                          <Form.Item name="title" style={{ margin: 0 }}>
                            <p>{record.nameProduct}</p>
                          </Form.Item>
                        );
                      }}
                    />
                    {/* sumSKU */}
                    <Table.Column
                      align="center"
                      key="isActive"
                      dataIndex="isActive"
                      title="Phiên Bản"
                      render={(text, record) => {
                        return (
                          <Form.Item name="title" style={{ margin: 0 }}>
                            <p>{record.version}</p>
                          </Form.Item>
                        );
                      }}
                    />
                    {/* priceSKU  */}
                    <Table.Column
                      align="center"
                      key="price"
                      dataIndex="price"
                      title="Giá Bán"
                      sorter={(a, b) => a.price - b.price}
                      render={(text, record) => {
                        return record.price === null ? (
                          <Form.Item name="title" style={{ margin: 0 }}>
                            <WarningFilled
                              value={false}
                              style={{
                                color: "#FFCC00",
                              }}
                            />
                            {parseFloat(0).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Form.Item>
                        ) : (
                          <Form.Item name="title" style={{ margin: 0 }}>
                            {parseFloat(record.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Form.Item>
                        );
                      }}
                    />

                    <Table.Column
                      align="center"
                      key="isActive"
                      dataIndex="isActive"
                      title="Số lượng"
                      render={(text, record, index) => {
                        return (
                          <input
                            type="number"
                            defaultValue={record.quantity}
                            min="1"
                            id={`quantitySKU_${index}`}
                            className="form-control"
                            onChange={() => handleChangeQuantity(record)}
                          />
                        );
                      }}
                    />

                    {/* sumImeiTrongKho */}
                    <Table.Column
                      align="center"
                      key="isActive"
                      dataIndex="isActive"
                      title="Xóa"
                      render={(text, record) => {
                        return (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                              handleDeleteSkuFromBillDetail(record)
                            }
                          >
                            Xóa
                          </button>
                        );
                      }}
                    />
                  </Table>

                  <div className="form-search">
                    <h4
                      className="align-content-center"
                      style={{ marginBottom: "10px" }}
                    >
                      Tìm kiếm sản phẩm
                    </h4>
                    <Form.Item name="name" noStyle>
                      <Input
                        style={{ width: "300px", marginBottom: "10px" }}
                        placeholder={"Product Search"}
                        suffix={<SearchOutlined />}
                        onChange={handleSearchSku}
                        name="key"
                      />
                    </Form.Item>
                  </div>
                  <div className="table-sku">
                    <Table
                      rowKey="oop"
                      dataSource={listSku}
                      pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                        showTotal: (total) => `Tổng số ${total} sản phẩm`,
                        showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                      }}
                    >
                      {/* tên sp */}
                      <Table.Column
                        align="center"
                        dataIndex="images"
                        title="Ảnh"
                        render={(text, record) => (
                          <div style={{ textAlign: "center" }}>
                            <AvtProduct product={record.productId} />
                          </div>
                        )}
                        width={150}
                      />

                      {/* tên sp */}
                      <Table.Column
                        align="center"
                        key="isActive"
                        dataIndex="isActive"
                        title="Tên Sản Phẩm"
                        render={(text, record) => {
                          return (
                            <Form.Item name="title" style={{ margin: 0 }}>
                              <p>{record.name}</p>
                            </Form.Item>
                          );
                        }}
                      />
                      {/* sumSKU */}
                      <Table.Column
                        align="center"
                        key="isActive"
                        dataIndex="isActive"
                        title="Phiên Bản"
                        render={(text, record) => {
                          return (
                            <Form.Item name="title" style={{ margin: 0 }}>
                              <p>
                                {record.color} - {record.capacity}
                              </p>
                            </Form.Item>
                          );
                        }}
                      />
                      {/* priceSKU  */}
                      <Table.Column
                        align="center"
                        key="price"
                        dataIndex="price"
                        title="Giá Bán"
                        sorter={(a, b) => a.price - b.price}
                        render={(text, record) => {
                          return record.price === null ? (
                            <Form.Item name="title" style={{ margin: 0 }}>
                              <WarningFilled
                                value={false}
                                style={{
                                  color: "#FFCC00",
                                }}
                              />
                              {parseFloat(0).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </Form.Item>
                          ) : (
                            <Form.Item name="title" style={{ margin: 0 }}>
                              {parseFloat(record.price).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </Form.Item>
                          );
                        }}
                      />

                      <Table.Column
                        align="center"
                        key="isActive"
                        dataIndex="isActive"
                        title="Số lượng"
                        render={(text, record) => {
                          return (
                            <input
                              type="number"
                              value={record.quantity}
                              readOnly
                              className="form-control"
                            />
                          );
                        }}
                        sorter={(a, b) => a.quantity - b.quantity}
                      />

                      {/* sumImeiTrongKho */}
                      <Table.Column
                        align="center"
                        key="isActive"
                        dataIndex="isActive"
                        title="Thêm"
                        render={(text, record) => {
                          return (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => handleAddSkuToBill(record)}
                            >
                              Thêm
                            </button>
                          );
                        }}
                      />
                    </Table>
                  </div>
                </div>
              </div>
              <hr />
              <p>
                Tổng tiền sản phẩm:{" "}
                {parseFloat(priceProductBillUpdate).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p>
                Tiền ship:{" "}
                {parseFloat(billUpdate.moneyShip).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p>
                Tiền voucher:{" "}
                {parseFloat(billUpdate.itemDiscount).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p>
                Số điểm sử dụng:{" "}
                {billUpdate.numberOfPointsUsed == null
                  ? "0"
                  : billUpdate.numberOfPointsUsed}
              </p>
              <p>
                Tiền ship mới:{" "}
                {fee?.total === undefined
                  ? parseFloat(0).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : parseFloat(fee?.total).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
              </p>
            </Modal>
            <Modal
              visible={hideFormSearchSku}
              onCancel={handleCancelHideFormSearchSku}
              width={800}
              footer={null}
              bodyStyle={{ minHeight: "150px" }}
            >
              <div className="form-search">
                <h3 className="align-content-center">TÌM KIẾM SẢN PHẨM</h3>
                <Form.Item name="name" noStyle>
                  <Input
                    style={{ width: "300px" }}
                    placeholder={"Product Search"}
                    suffix={<SearchOutlined />}
                    onChange={handleSearchSku}
                    name="key"
                  />
                </Form.Item>
              </div>
              <div className="table-sku">
                <Table
                  rowKey="oop"
                  dataSource={listSku}
                  pagination={{
                    pageSize: 5,
                    showSizeChanger: false,
                    showTotal: (total) => `Tổng số ${total} sản phẩm`,
                    showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                  }}
                >
                  {/* tên sp */}
                  <Table.Column
                    align="center"
                    dataIndex="images"
                    title="Ảnh"
                    render={(text, record) => (
                      <div style={{ textAlign: "center" }}>
                        <AvtProduct product={record.productId} />
                      </div>
                    )}
                    width={150}
                  />

                  {/* tên sp */}
                  <Table.Column
                    align="center"
                    key="isActive"
                    dataIndex="isActive"
                    title="Tên Sản Phẩm"
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          <p>{record.name}</p>
                        </Form.Item>
                      );
                    }}
                  />
                  {/* sumSKU */}
                  <Table.Column
                    align="center"
                    key="isActive"
                    dataIndex="isActive"
                    title="Phiên Bản"
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          <p>
                            {record.color} - {record.capacity}
                          </p>
                        </Form.Item>
                      );
                    }}
                  />
                  {/* priceSKU  */}
                  <Table.Column
                    align="center"
                    key="price"
                    dataIndex="price"
                    title="Giá Bán"
                    sorter={(a, b) => a.price - b.price}
                    render={(text, record) => {
                      return record.price === null ? (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          <WarningFilled
                            value={false}
                            style={{
                              color: "#FFCC00",
                            }}
                          />
                          {parseFloat(0).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Form.Item>
                      ) : (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {parseFloat(record.price).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Form.Item>
                      );
                    }}
                  />

                  <Table.Column
                    align="center"
                    key="isActive"
                    dataIndex="isActive"
                    title="Số lượng"
                    render={(text, record) => {
                      return (
                        <input
                          type="number"
                          value={record.quantity}
                          readOnly
                          className="form-control"
                        />
                      );
                    }}
                  />

                  {/* sumImeiTrongKho */}
                  <Table.Column
                    align="center"
                    key="isActive"
                    dataIndex="isActive"
                    title="Thêm"
                    render={(text, record) => {
                      return (
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleAddSkuToBill(record)}
                        >
                          Thêm
                        </button>
                      );
                    }}
                  />
                </Table>
              </div>
            </Modal>
            <Modal
              visible={isModalVisibleSuaHoaDon}
              onCancel={handleCancelSuaHoaDon}
              width={700}
              footer={null}
              bodyStyle={{ minHeight: "150px" }}
            >
              <h2>Xác Nhận Thông Tin Đơn Hàng</h2>

              <div>
                <p>Họ Và Tên: {billUpdate.userName}</p>
                <p>SĐT: {billUpdate.phoneNumber}</p>
                <p>Địa Chỉ: {billUpdate.address}</p>
              </div>
              <div>Sản Phẩm:</div>
              {/* <div className="row col-md-3">Giỏ hàng của khách hàng</div> */}
              <br />
              {/* {newBillDetails} */}
              <Table
                rowKey="oop"
                dataSource={newBillDetails}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                  showTotal: (total) => `Tổng số ${total} sản phẩm`,
                  showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                }}
              >
                {/* {newBillDetails} */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="STT"
                  render={(text, record, index) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>{index + 1}</p>
                      </Form.Item>
                    );
                  }}
                />
                {/* tên sp */}
                <Table.Column
                  align="center"
                  dataIndex="images"
                  title="Ảnh"
                  render={(text, record) => (
                    <div style={{ textAlign: "center" }}>
                      <AvtProduct product={record.idProduct} />
                    </div>
                  )}
                  width={150}
                />

                {/* tên sp */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Tên Sản Phẩm"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>{record.nameProduct}</p>
                      </Form.Item>
                    );
                  }}
                />
                {/* sumSKU */}
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Phiên Bản"
                  render={(text, record) => {
                    return (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>{record.version}</p>
                      </Form.Item>
                    );
                  }}
                />
                {/* priceSKU  */}
                <Table.Column
                  align="center"
                  key="price"
                  dataIndex="price"
                  title="Giá Bán"
                  sorter={(a, b) => a.price - b.price}
                  render={(text, record) => {
                    return record.price === null ? (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <WarningFilled
                          value={false}
                          style={{
                            color: "#FFCC00",
                          }}
                        />
                        {parseFloat(0).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Form.Item>
                    ) : (
                      <Form.Item name="title" style={{ margin: 0 }}>
                        {parseFloat(record.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Form.Item>
                    );
                  }}
                />

                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Số lượng"
                  render={(text, record, index) => {
                    return (
                      //   <input
                      //     type="number"
                      //     defaultValue={record.quantity}
                      //     min="1"
                      //     id={`quantitySKU_${index}`}
                      //     className="form-control"
                      //     onChange={() => handleChangeQuantity(record)}
                      //   />
                      <Form.Item name="title" style={{ margin: 0 }}>
                        <p>{record.quantity}</p>
                      </Form.Item>
                    );
                  }}
                />
                <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Thành Tiền"
                  render={(text, record, index) => {
                    return (
                      //   <Form.Item name="title" style={{ margin: 0 }}>
                      //     <p>{record.quantity * record.quantity}</p>
                      //   </Form.Item>
                      <Form.Item name="title" style={{ margin: 0 }}>
                        {parseFloat(
                          record.price * record.quantity
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Form.Item>
                    );
                  }}
                />

                {/* sumImeiTrongKho */}
                {/* <Table.Column
                  align="center"
                  key="isActive"
                  dataIndex="isActive"
                  title="Xóa"
                  render={(text, record) => {
                    return (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteSkuFromBillDetail(record.idSKU)
                        }
                      >
                        Xóa
                      </button>
                    );
                  }}
                /> */}
              </Table>
              <hr />
              <div>
                <p>
                  Tổng Tiền Sản Phẩm:{" "}
                  {parseFloat(dataSumTongTien).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <span>
                  {dataVouCherTruocUpdateHoaDon.map((item, index) => (
                    <div>
                      <span>
                        {item.valueVoucher > 100000 ? (
                          <div>
                            {dataVoucher.value !== 0 ? (
                              <p
                                style={{
                                  textDecorationLine: "line-through",
                                  color: "red",
                                }}
                              >
                                Voucher Giảm Giá:{" "}
                                {parseFloat(item.valueVoucher).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}{" "}
                                - Giá Trị Tối Thiểu Đơn Hàng:{" "}
                                {parseFloat(item.valueMin).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </p>
                            ) : (
                              <p>
                                Voucher Giảm Giá:{" "}
                                {parseFloat(item.valueVoucher).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}{" "}
                                - Giá Trị Tối Thiểu Đơn Hàng:{" "}
                                {parseFloat(item.valueMin).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            {dataVoucherShip.value !== 0 ? (
                              <p
                                style={{
                                  textDecorationLine: "line-through",
                                  color: "red",
                                }}
                              >
                                Giảm Giá Ship:{" "}
                                {parseFloat(item.valueVoucher).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}{" "}
                                - Giá Trị Tối Thiểu Đơn Hàng:{" "}
                                {parseFloat(item.valueMin).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </p>
                            ) : (
                              <p>
                                Giảm Giá Ship:{" "}
                                {parseFloat(item.valueVoucher).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}{" "}
                                - Giá Trị Tối Thiểu Đơn Hàng:{" "}
                                {parseFloat(item.valueMin).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </p>
                            )}
                          </div>
                        )}
                      </span>
                    </div>
                  ))}
                </span>
                <Button onClick={() => handleEditClickVoucher()}>
                  Chọn Voucher Mới
                </Button>
                {dataVoucher.value === 0 ? null : (
                  <p>
                    Tiền Voucher Giảm Giá Mới:{" "}
                    {parseFloat(dataVoucher.value).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                )}

                {dataVoucherShip.value === 0 ? null : (
                  <p>
                    Tiền Giảm giá tiền vận chuyển Mới:{" "}
                    {parseFloat(dataVoucherShip.value).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                )}
                <p>
                  Tiền Ship:{" "}
                  {fee?.total === undefined
                    ? parseFloat(billUpdate.moneyShip).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : parseFloat(fee?.total).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                </p>
                <p>
                  Số Điểm Sử Dụng:{" "}
                  {billUpdate.numberOfPointsUsed == null ? (
                    "0"
                  ) : (
                    <span>
                      {billUpdate.numberOfPointsUsed} - Tương Đương Được Giảm:
                      {parseFloat(
                        billUpdate.numberOfPointsUsed * 1000
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  )}
                </p>
                <p>
                  Tổng Tiền Khách Phải Trả:{" "}
                  {parseFloat(dataTongTienKhachHangPhaiTra).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}{" "}
                </p>
              </div>

              <div>
                <Button
                  type="text"
                  onClick={() =>
                    configXacNhanSuaHoaDonTuNhanVien(dataSuaHoaDon)
                  }
                >
                  Xác Nhận Sửa Hoá Đơn
                </Button>{" "}
                <Button
                  type="text"
                  onClick={() => configXacNhanHuyThaoTacNhanVien()}
                >
                  Huỷ Thao Tác
                </Button>
              </div>
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
                    style={{
                      position: "relative",
                      height: 200,
                      overflowY: "auto",
                    }}
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
                              onClick={() => confirmChonLaiVoucher1(voucher)}
                            >
                              Áp dụng
                            </Button>
                            <br />
                            <Button
                              type="text"
                              danger
                              onClick={() =>
                                confirmChonLaiVoucher11(voucher.id)
                              }
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
                    style={{
                      position: "relative",
                      height: 330,
                      overflowY: "auto",
                    }}
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
                              onClick={() => confirmChonLaiVoucher2(voucher)}
                            >
                              Áp dụng
                            </Button>
                            <br />
                            <Button
                              type="text"
                              danger
                              onClick={() =>
                                confirmChonLaiVoucher22(voucher.id)
                              }
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
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
const UserAccountTable = ({ record, onSomeAction }) => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  //   const editShow = (user) => {
  //     setUser(user);
  //     setIsModalVisible(true);
  //     console.log(user);
  //   };
  //   // Hàm để ẩn Modal
  //   const handleCancel = () => {
  //     setIsModalVisible(false);
  //   };

  const editRole = (role, idUser) => {};

  useEffect(() => {
    // readAllUserByRole(record)
    findBillDetails(record.id).then((response) => {
      setUsers(response.data);
      console.log(response.data);
      setDataBillDetailOffline(response.data);
    });
    //   .then((res) => {
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [isModalVisible, isUpdate, loadDisplay]);

  //tạo danh sach imei thất lạc
  const [dataImeiThatLac, setDataImeiThatLac] = useState([]);
  //lấy ra sku được chọn
  const [dataSkuSelected, setDataSKuSelected] = useState({});
  //danh sách imei được thêm vào bill - của sku được chọn
  const [dataImeiSelected, setDataImeiSelected] = useState([]);
  //lấy ra idBillDetail khi mở modal để thê imei vào bảng imei đã bán
  const [dataIdBillDetail, setDataIdBillDetail] = useState(null);
  //danh sách imei - của sku được chọn
  const [dataImeiClick, setDataImeiClick] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); // quên k biết nó là gì (hình như chọn ô vuông checkbox)
  // Trạng thái hiển thị Modal
  const [isModalVisibleAddImei, setIsModalVisibleAddImei] = useState(false);
  const [dataIdSKU, setDataIdSKU] = useState(null);
  const [isModalVisibleImei, setIsModalVisibleImei] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const idAccount = storedUser !== null ? storedUser.id : "";
  const [dataBillDetailOffline, setDataBillDetailOffline] = useState([]);

  function handleImeiOpen(idBillDetail, idSKU) {
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
  }

  // Hàm để hiển thị Modal khi cần
  const handleAddImei = (idSKU, idBillDetail) => {
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
    seachImeis(idSKU, "")
      .then((response) => {
        setDataSeachImeis(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    seachImeisDaBan(idBillDetail, idSKU, "")
      .then((response) => {
        setDataSeachImeiDaBan(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    handleImeiOpen(idBillDetail, idSKU);
    setIsModalVisibleAddImei(true);
  };

  // Hàm để ẩn Modal
  const handleCancelAddImei = () => {
    setIsModalVisibleAddImei(false);
  };
  //ấn nút
  const openModalAddImei = (id) => {
    getImeisOfSku(id).then((response) => {
      setDataImeiClick(response.data);
    });
  };

  //tìm kiếm imei thất lạc - phongnh
  function handleChangeImeiThatLac(event) {
    //comment lại vì chưa có dữ liệu
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
    //comment lại vì chưa có dữ liệu
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

  //config khi xoá cehckbox imei  của bill_detail - phongnh
  const toast = useRef(null); //dòng này chỉ cần khai báo 1 cái
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

  //xoá các imei đã được chọn - checkbox - phongnh
  const handleClearImeiDaBanCheckBox = () => {
    //coment lại vì chưa có dữ liệu
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
          seachImeisDaBan(dataIdBillDetail, dataIdSKU, "")
            .then((response) => {
              setDataSeachImeiDaBan(response.data);
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          seachImeis(dataIdSKU, "")
            .then((response) => {
              setDataSeachImeis(response.data);
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          // setDataSeachImeiDaBan([]);
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

  //xoá all imei của bill_detail - phongnh
  const handleClearAllImeiDaBan = () => {
    //coment lại vì chưa có dữ liệu
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

  // xoá imei đã bán ra khỏi bảng imei đã bán và cập nhật lại status imei trong bảng imei - phongnh
  const handleClearImeiDaBan = (idImeiDaBan, codeImeiDaBan) => {
    //coment lại vì chưa có dữ liệu
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
        seachImeisDaBan(dataIdBillDetail, dataIdSKU, "")
          .then((response) => {
            setDataSeachImeiDaBan(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
        seachImeis(dataIdSKU, "")
          .then((response) => {
            setDataSeachImeis(response.data);
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
    handleClick();
  };

  function handleCheckboxChange(e) {
    //comment vì chưa có dữ liệu
    const checkboxValue = e.target.value;
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

  //tìm kiếm imei - phongnh
  const [dataSeachImeis, setDataSeachImeis] = useState([]);
  const [isModelShowImei, setIsModelShowImei] = useState(false);
  const [tempStatus, setTempStatus] = useState(false);

  function handleChangeImeis(event) {
    //comment vì chưa có dữ liệu
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

  //add imei vào bảng imei dã bán - phongnh
  const handleImeiClick = (codeImei, idBillDetail) => {
    //comment vì chưa có dữ liệu
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
          seachImeis(dataIdSKU, "")
            .then((response) => {
              setDataSeachImeis(response.data);
            })
            .catch((error) => {
              console.log(`${error}`);
            });
          seachImeisDaBan(idBillDetail, dataIdSKU, "")
            .then((response) => {
              setDataSeachImeiDaBan(response.data);
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
          handleClick();
          notification.success({
            message: "Thêm Imei Thành Công",
          });
          handleClick();
        }
      })
      .catch((error) => {
        console.log(`Lỗi khi cập nhật số lượng: ${error}`);
      });
  };

  function checkSoluongImei() {
    let check = true;
    for (let index = 0; index < dataBillDetailOffline.length; index++) {
      if (
        dataBillDetailOffline[index]?.quantity !==
        dataBillDetailOffline[index]?.soLuongImeiDaChon
      ) {
        check = false;
        break;
      }
    }
    if (check) {
      toast.current.show({
        severity: "success",
        summary: "Thành công!",
        detail: "Xác nhận thành công",
        life: 3000,
      });
      setTempStatus(true);
    } else {
      toast.current.show({
        severity: "error",
        summary: "KIỂM TRA IMEI",
        detail: "Vui lòng kiểm tra lại imei",
        life: 3000,
      });
      setTempStatus(false);
    }
  }

  //truyền thông tin ra bnagr bên ngoài
  const handleClick = () => {
    // Gọi hàm callback và truyền dữ liệu cần thiết lên
    onSomeAction(true);
  };

  const showImeiSold = (id) => {
    listImeiDaBanByIdBillDetail(id)
      .then((response) => {
        setDataImeiSelected(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModelShowImei(true);
  };
  // Cancel show imei
  const hideModelShowImei = () => {
    setIsModelShowImei(false);
  };

  return (
    <>
      {" "}
      <Toast ref={toast} />
      <ConfirmDialog />
      <List title="Sản phẩm" createButtonProps={undefined}>
        <Col>
          <List>
            <Table
              rowKey="id"
              dataSource={users}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                showTotal: (total) => `Tổng số ${total} mục`,
                showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
              }}
            >
              <Table.Column
                key="code"
                dataIndex="code"
                title={"Ảnh sản phẩm"}
                render={(text, record) => (
                  <div style={{ width: "150px" }}>
                    {<AvatarProduct product={record.idProduct} />}
                  </div>
                )}
              />
              <Table.Column
                key="code"
                dataIndex="code"
                title={"Tên sản phẩm"}
                render={(text, record) => <span>{record.nameProduct}</span>}
              />
              <Table.Column
                key="code"
                dataIndex="code"
                title={"Phiên bản"}
                render={(text, record) => (
                  <span>{record.skuColor + "-" + record.skuCapacity}</span>
                )}
              />
              <Table.Column
                key="code"
                dataIndex="code"
                title={"Số lượng"}
                render={(text, record) => <span>{record.quantity}</span>}
              />
              <Table.Column
                key="code"
                dataIndex="code"
                title={"Giá"}
                render={(text, record) => {
                  return (
                    <NumberField
                      options={{
                        currency: "VND",
                        style: "currency",
                      }}
                      value={record.price}
                    />
                  );
                }}
              />

              <Table.Column
                key="code"
                dataIndex="code"
                title={"Imei"}
                render={(text, record) => (
                  <Form.Item name="title" style={{ margin: 0 }}>
                    {record.statusBill === "CHO_XAC_NHAN" ? (
                      <p>
                        <button
                          type="button"
                          // className="btn btn-secondary"
                          className="btn btn-primary btn-sm trash"
                          style={{
                            backgroundColor: "green",
                          }}
                          onClick={() => {
                            handleAddImei(record.idSKU, record.id);
                            openModalAddImei(record.idSKU);
                          }}
                        >
                          Thêm Imei
                        </button>
                      </p>
                    ) : (
                      <p>
                        <button
                          type="button"
                          // className="btn btn-secondary"
                          className="btn btn-primary btn-sm trash"
                          style={{
                            backgroundColor: "orange",
                          }}
                          onClick={() => {
                            showImeiSold(record.id);
                          }}
                        >
                          Xem Imei
                        </button>
                      </p>
                    )}
                  </Form.Item>
                )}
              />

              <Table.Column
                key="total"
                dataIndex="total"
                title={"Thành tiền"}
                render={(text, record) => {
                  return (
                    <NumberField
                      options={{
                        currency: "VND",
                        style: "currency",
                      }}
                      value={record.totalManyOneBillDetail}
                    />
                  );
                }}
                sorter={(a, b) => a.totalMoney - b.totalMoney}
              />

              {/* <Table.Column
                key="actions"
                dataIndex="actions"
                title={"Action"}
                fixed="right"
                align="center"
                //   dataIndex="products_actions"
                //   title="Actions"
                render={(_, record) => (
                  <Dropdown overlay={moreMenu2(record)} trigger={["click"]}>
                    {/* các nút delete accept ... nằm trong moreMenu2 */}
              {/* <MoreOutlined
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: 24,
                      }}
                    />
                  </Dropdown> */}
              {/* )}
              /> */}
            </Table>
          </List>
        </Col>

        {/* modal imei - phongnh */}
        <Modal
          visible={isModalVisibleAddImei}
          onCancel={handleCancelAddImei}
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
                  // <ul class="list-group mb-3">
                  //   {dataImeiSelected.map((imei, index) => (
                  //     <ul class="list-group mb-3">
                  //       <li class="list-group-item d-flex justify-content-between">
                  //         <span>{index + 1}</span>

                  //         <input
                  //           type="checkbox"
                  //           value={imei.codeImeiDaBan}
                  //           checked={selectedCheckboxes.includes(
                  //             imei.codeImeiDaBan
                  //           )}
                  //           onChange={handleCheckboxChange}
                  //         />
                  //         <span style={{ paddingLeft: "10px" }}>
                  //           {imei.codeImeiDaBan}
                  //         </span>
                  //         <strong>
                  //           <Button
                  //             type="text"
                  //             danger
                  //             onClick={() =>
                  //               handleClearImeiDaBan(
                  //                 imei.idImeiDaBan,
                  //                 imei.codeImeiDaBan
                  //               )
                  //             }
                  //           >
                  //             Hủy
                  //           </Button>
                  //         </strong>
                  //       </li>
                  //     </ul>
                  //   ))}
                  // </ul>
                  <p></p>
                ) : (
                  <ul class="list-group mb-3">
                    {dataSeachImeiDaBan.map((imei, index) => (
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
                  <h1></h1>
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
        {/*
                    Hiển thị list imei đã chọn ở bill detail
                */}
        <Modal
          visible={isModelShowImei}
          onCancel={hideModelShowImei}
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
                Danh Sách Imei Đã Chọn
              </p>
              <p></p>
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={{ position: "relative", height: 250, overflowY: "auto" }}
              >
                {/* dataSeachImeiDaBan */}
                <ul class="list-group mb-3">
                  {dataImeiSelected.map((imei, index) => (
                    <ul class="list-group mb-3">
                      <li class="list-group-item d-flex justify-content-between">
                        <span>{index + 1}</span>
                        <span style={{ paddingLeft: "10px" }}>
                          {imei.codeImei}
                        </span>
                      </li>
                    </ul>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      </List>
    </>
  );
};

export default OderDisplay;
