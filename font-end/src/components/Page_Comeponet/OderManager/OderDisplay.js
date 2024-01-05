import React, {useEffect, useRef, useState} from "react";
import {useTranslate} from "@refinedev/core";
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
import {DateField, List, NumberField} from "@refinedev/antd";
import {Link, useHistory} from "react-router-dom/cjs/react-router-dom.min";
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
} from "../../../service/Bill/bill.service";
import {readAllUser} from "../../../service/User/user.service";
import queryString from "query-string";
import {Option} from "antd/es/mentions";
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
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import AvatarProduct from "../../product_component/Product/AvatarProduct";
import {Toast} from "primereact/toast";
import {findBillDetails, getAllBillDetailReturn,} from "../../../service/BillDetail/billDetail.service";
import AvtProduct from "../../custumer_componet/avtProduct";
import HeaderDashBoard from "../header/index";
import {getSKUForBillDetail, searchSKUForBillDetail} from "../../../service/sku.service";

const {RangePicker} = DatePicker;
const {SubMenu} = Menu;
const {Text} = Typography;
const {Header, Sider, Content} = Layout;
let loadDisplay = false;
const OderDisplay = ({}) => {
    const storedUser = JSON.parse(localStorage.getItem("account"));
    const idAccount = storedUser !== null ? storedUser.id : ""; //sau khi đăng nhập thì truyền idAccount vào đây

    const t = useTranslate();
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [oder, setOder] = useState([]);
    const [user, setUser] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
    const [isModalVisibleNoteReturns, setIsModalVisibleNoteReturns] = useState(false); // Trạng thái hiển thị Modal
    const [isModalVisibleCannelOrder, setIsModalVisibleCannelOrder] = useState(false); // Trạng thái hiển thị Modal
    const [isModalVisibleReturnDetails, setIsModalVisibleReturnDetails] = useState(false); // Trạng thái hiển thị Modal
    const [isModalVisibleReturnedProducts, setIsModalVisibleReturnedProducts] = useState(false); // Trạng thái hiển thị Modal
    const [isModalVisibleDeliveryFailed, setIsModalVisibleDeliveryFailed] = useState(false); // Trạng thái hiển thị Modal
    const breakpoint = Grid.useBreakpoint();
    const [load, setLoad] = useState(true);
    const [billCXN, setBillCXN] = useState([]);
    const [pendingBills, setPendingBills] = useState(0);
    const [playSound, setPlaySound] = useState(true);
    const [show, setShow] = useState(true);
    const [billReturn, setBillReturn] = useState({
        id: null, note: null,
    });
    const [billOFFCXN, setBillOFFCXN] = useState([]);
    const [dataBillDetails, setDataBillDetails] = useState([]); // lisst bill detail cuar idbill
    const [returnStatus, setReturnStatus] = useState(1);

    const orderSelectProps = {
        options: [{label: "Tạo hóa đơn", value: "TAO_HOA_DON"}, {
            label: "Chờ xác nhận",
            value: "CHO_XAC_NHAN"
        }, {label: "Chờ vận chuyển", value: "CHO_VAN_CHUYEN"}, {
            label: "Vận chuyển",
            value: "VAN_CHUYEN"
        }, {label: "Đã thanh toán", value: "DA_THANH_TOAN"}, {
            label: "Không trả hàng",
            value: "KHONG_TRA_HANG"
        }, {label: "Trả hàng", value: "TRA_HANG"}, {label: "Đã hủy", value: "DA_HUY"}, {
            label: "Yêu cầu trả hàng",
            value: "YEU_CAU_TRA_HANG"
        }, {label: "Giao hàng thất bại", value: "GIAO_HANG_THAT_BAI"}, {
            label: "Đã huỷ hoá đơn chờ",
            value: "HUY_HOA_DON_CHO"
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
            ...billReturn, id: record.id,
        });
        setIsModalVisibleNoteReturns(true);
    };

    // Hàm để ẩn Modal
    const handleNoteReturnsCancel = () => {
        setIsModalVisibleNoteReturns(false);
        console.log(billReturn);
        const textNoteReturn = document.getElementById("exampleFormControlTextarea1");
        textNoteReturn.value = "";
    };

    const handleCannelOrderClick = (record) => {
        setBillReturn({
            ...billReturn, id: record.id,
        });
        setIsModalVisibleCannelOrder(true);
    };

    // Hàm để ẩn Modal
    const handleCannelOrderCancel = () => {
        setIsModalVisibleCannelOrder(false);
        console.log(billReturn);
        const textNoteReturn = document.getElementById("exampleFormControlTextarea2");
        textNoteReturn.value = "";
    };

    const [filtersNoDate, setFiltersNoDate] = useState({
        key: "", status: "", // user: "",
    });

    const [filtersWithDate, setFiltersWithDate] = useState({
        key: "", status: "", // user: "",
        dateStart: "", dateEnd: "",
    });

    const toggleSound = () => {
        setPlaySound(!playSound);
    };

    useEffect(() => {
        if (storedUser?.roles === "CUSTOMER" || storedUser === null || storedUser?.roles === "NHAN_VIEN_BAN_HANG") {
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
                        // console.log(response.data);
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
            //thông báo khi có hóa đơn mới
            let lastPendingBills = null;
            let timeout = null;
            let originalTitle = document.title;

            const interval = setInterval(async () => {
                getCountBillChoXacNhan()
                    .then((response) => {
                        const newPendingBills = response.data;

                        if (lastPendingBills !== null && newPendingBills > lastPendingBills && playSound) {
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

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
        //tu dong xoa hoa don cho
        xoahoaDonCho()
            .then((res) => {
            })
            .catch((err) => {
                console.log(err);
            });
    }, [filtersNoDate, filtersWithDate, load, playSound]);

    function handleChangeSearch(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {};
        const dateFilter = document.getElementById("dateFilter");
        if (dateFilter.value == "") {
            item = {...filtersNoDate};
            item[name] = value;
            setFiltersNoDate(item);
        } else {
            item = {...filtersWithDate};
            item[name] = value;
            setFiltersWithDate(item);
        }
    }

    function handleChangeStatus(value) {
        let item = {};
        const dateFilter = document.getElementById("dateFilter");
        if (dateFilter.value == "") {
            item = {...filtersNoDate};
            item["status"] = value;
            setFiltersNoDate(item);
            if (value == null) {
                item = {...filtersNoDate};
                item["status"] = "";
                setFiltersNoDate(item);
            }
            console.log(filtersNoDate);
        } else {
            item = {...filtersWithDate};
            item["status"] = value;
            setFiltersWithDate(item);
            if (value == null) {
                item = {...filtersWithDate};
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
            item = {...filtersWithDate};
            item["dateStart"] = formattedDateStart;
            item["dateEnd"] = formattedDateEnd;
            setFiltersWithDate(item);
            console.log(filtersWithDate);
        } else {
            item = {...filtersNoDate};
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
        TAO_HOA_DON: (<Badge
            className="site-badge-count-109"
            count={"Tạo hóa đơn"}
            style={{backgroundColor: "#52c41a"}}
        />), CHO_XAC_NHAN: (<Badge
            className="site-badge-count-109"
            count={"Chờ xác nhận"}
            style={{backgroundColor: "orange"}}
        />), CHO_VAN_CHUYEN: (<Badge
            className="site-badge-count-109"
            count={"Chờ vận chuyển"}
            style={{backgroundColor: "orangered"}}
        />), VAN_CHUYEN: (<Badge
            className="site-badge-count-109"
            count={"Vận chuyển"}
            style={{backgroundColor: "aqua"}}
        />), DA_THANH_TOAN: (<Badge
            className="site-badge-count-109"
            count={"Đã thanh toán"}
            style={{backgroundColor: "#52c41a"}}
        />), KHONG_TRA_HANG: (<Badge
            className="site-badge-count-109"
            count={"Không trả hàng"}
            style={{backgroundColor: "grey"}}
        />), TRA_HANG: (<Badge
            className="site-badge-count-109"
            count={"Trả hàng"}
            style={{backgroundColor: "khaki"}}
        />), DA_HUY: (<Badge
            className="site-badge-count-109"
            count={"Đã hủy"}
            style={{backgroundColor: "red"}}
        />), YEU_CAU_TRA_HANG: (<Badge
            className="site-badge-count-109"
            count={"Yêu cầu trả hàng"}
            style={{backgroundColor: "pink"}}
        />), GIAO_HANG_THAT_BAI: (<Badge
            className="site-badge-count-109"
            count={"Giao hàng thất bại"}
            style={{backgroundColor: "black"}}
        />), HUY_HOA_DON_CHO: (<Badge
            className="site-badge-count-109"
            count={"Đã huỷ hoá đơn chờ"}
            style={{backgroundColor: "#FF99FF"}}
        />),
    };

    const confirm2 = async (id) => {
        if (checkProductSelectBillDetail(id) === false) {
            notification.error({
                message: "Hóa đơn chưa thể xác nhận! - Hóa Đơn Bán Offline",
            });
        } else {
            if ((await checkImeiSelectInBillDetail(id)) === true) {
                confirmDialog({
                    message: "Do you want to confirm this action?",
                    header: "Confirm",
                    icon: "pi pi-info-circle",
                    acceptClassName: "p-button-danger",
                    accept: () => updateStatusBill(idAccount, id)
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
        returnBillById(id, idAccount, noteReturn).then((response) => console.log(response.data));
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
            console.log(responses.data)

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
                    if (billOFFCXN[index]?.totalMoney === null || billOFFCXN[index]?.totalMoney === 0) {
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
                message: "Accept", description: "Tất cả đơn hàng đã được xác nhận thanh công",
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
                            message: "Accept", description: "Xác nhận thành công",
                        });
                    })
                    .catch((error) => {
                        console.error("Error updating data:", error);
                    });
            } else {
                notification.error({
                    message: "KIỂM TRA IMEI", description: "Vui lòng kiểm tra lại imei của các đơn hàng ",
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
            ...billReturn, note: event.target.value,
        });
    };

    const handleCannelOrder = (event) => {
        setBillReturn({
            ...billReturn, note: event.target.value,
        });
    };

    const handleSubmitReturns = (event) => {
        event.preventDefault();
        returnBill(billReturn.id, billReturn.note);
        setIsModalVisibleNoteReturns(false);
        setLoad(!load);
        const textNoteReturn = document.getElementById("exampleFormControlTextarea1");
        textNoteReturn.value = "";
        notification.success({
            message: "Trả hàng", description: "Xác nhận trả hàng",
        });
    };

    const handleSubmitCannelOrder = (event) => {
        event.preventDefault();
        deleteBillById(billReturn.id, billReturn.note, idAccount).then((response) => console.log(response.data));
        setIsModalVisibleCannelOrder(false);
        setLoad(!load);
        loadDisplay = !loadDisplay;
        const textNoteReturn = document.getElementById("exampleFormControlTextarea2");
        textNoteReturn.value = "";
        notification.success({
            message: "Hủy đơn", description: "Hủy đơn thành công",
        });
    };
    const [noteReturnDetail, setNoteReturnDetail] = useState(null);
    const [acceptReturnBill, setAcceptReturnBill] = useState({
        idBill: null, codeImeiDaBan: [], personUpdate: storedUser?.code + " - " + storedUser?.user?.fullName,
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
            ...acceptReturnBill, idBill: record.id, codeImeiDaBan: arrCodeImeiDaBan,
        });
    };

    const toast = useRef(null);

    const reject = () => {
        toast.current.show({
            severity: "warn", summary: "Hủy thao tác", detail: "Bạn đã huy thao tác", life: 3000,
        });
    }

    // Hàm để ẩn Modal
    const handleCannelReturnDetails = () => {
        setIsModalVisibleReturnDetails(false);
        setAcceptReturnBill({
            ...acceptReturnBill, idBill: null, codeImeiDaBan: [],
        });
    };

    function returnConfirmation() {
        acceptReturn(acceptReturnBill)
            .then((res) => {
                notification.success({
                    message: "Trả hàng!", description: "Trả hàng thành công",
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
                    message: "Trả hàng!", description: "Đã hủy yêu cầu",
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
        idAcc: idAccount, idBill: "", note: "",
    });

    const handleClickDeliveryFailed = (record) => {
        setIsModalVisibleDeliveryFailed(true);
        setDataDeliveryFailed({
            ...dataDeliveryFailed, idBill: record.id,
        });
    };

    // Hàm để ẩn Modal
    const handleCannelDeliveryFailed = () => {
        setIsModalVisibleDeliveryFailed(false);
    };

    function handleDeliveryFailed(event) {
        setDataDeliveryFailed({
            ...dataDeliveryFailed, note: `Giao hàng thất bại: ${event.target.value}`,
        });
    }

    function handleSubmitDeliveryFailed(event) {
        event.preventDefault();
        deliveryFailed(dataDeliveryFailed.idAcc, dataDeliveryFailed.idBill, dataDeliveryFailed.note)
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
        return (<UserAccountTable record={record} onSomeAction={receiveDataFromChild}/>);
    };

    const menu = (<Menu>
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
    </Menu>);

    const returnStatusBillPrev = async (id) => {
        confirmDialog({
            message: "Xác nhận thao tác?",
            header: "Xác nhận",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => returnStatusBill(id).then((response) => {
                notification.success({
                    message: "Hoàn trả trạng thái thành công!", description: "Đã xác nhận hoàn trả",
                });
                setLoad(!load);
                loadDisplay = !loadDisplay;
            })
                .catch((error) => {
                    console.error("Error updating status:", error);
                }),
            reject,
        });

    }

    // Tạo biến bill sau khi tìm đc
    const [billUpdate, setBillUpdate] = useState({});
    const [hideForm, setHideForm] = useState(false);

    let [newBillDetails, setNewBillDetails] = useState([]);
    const [idBillTemp, setIdBillTemp] = useState(null);
    let temp = [];

    function searchBill(id) {
        setIdBillTemp(id);
        searchBillByCode(id).then((response) => {
            setBillUpdate(response.data);
        }).catch((error) => {
            console.log(error)
        });

        findBillDetails(id).then((response) => {
            setDataBillDetails(response.data);
            response.data.map(item => temp.push({
                id: item.id,
                bill: item.bill,
                sku: item.idSKU,
                price: item.price,
                quantity: item.quantity,
                status: 'CHO_XAC_NHAN'
            }))
            setNewBillDetails(temp);
            setHideForm(true);
        }).catch((error) => {
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
            ...billUpdate, userName: event.target.value
        })
    }

    function hanldPhone(event) {
        setBillUpdate({
            ...billUpdate, phoneNumber: event.target.value
        })
    }

    const [hideFormSearchSku, setHideFormSearchSku] = useState(false);
    const [listSku, setListSku] = useState([]);


    function handleCancelHideFormSearchSku() {
        getSKUForBillDetail().then((response) => {
            setListSku(response.data)
        }).catch((error) => {
            console.log(error)
        })
        setHideFormSearchSku(!hideFormSearchSku);
    }

    const handleSearchSku = (event) => {
        searchSKUForBillDetail(event.target.value).then((response) => {
            setListSku(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleAddSkuToBill = (record) => {
        const billTemp = {
            id: null,
            bill: idBillTemp,
            sku: record.id,
            price: record.price,
            quantity: 1,
            status: 'CHO_XAC_NHAN'
        }
        setNewBillDetails(newBillDetails => [
            ...newBillDetails,
            billTemp
        ])
        setLoad(!load);
        loadDisplay = !loadDisplay;
    }

    const handleChangeQuantity = (record) => {
        newBillDetails.map((item) => {
                if (item.sku === record.idSKU) {
                    newBillDetails[newBillDetails.indexOf(item)] = {
                        ...item,
                        quantity: Number(document.getElementById('quantitySKU').value)
                    };
                }
            }
        )
        setNewBillDetails(newBillDetails => [
            ...newBillDetails
        ]);
    }

    return (<>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
                    <Menu.Item key="0">
                        <img
                            src="/img/logo.jpg"
                            alt="Trang chủ Smartphone Store"
                            title="Trang chủ Smartphone Store"
                            style={{width: "150px"}}
                        />
                    </Menu.Item>
                    <Menu.Item key="0" icon={<FileDoneOutlined/>}>
                        <Link to="/sell">BÁN HÀNG TẠI QUẦY</Link>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<DashboardOutlined/>}>
                        <Link to="/dashboard">Thống kê</Link>
                    </Menu.Item>
                    <SubMenu key="2" title="Quản lý đơn hàng" icon={<ShopOutlined/>}>
                        <Menu.Item key="2" icon={<ShopOutlined/>}>
                            <Link to="/orders">Quản lý đơn hàng</Link>
                        </Menu.Item>
                        <Menu.Item key="11" icon={<ShopOutlined/>}>
                            <Link to="/orderBackProduct">Quản lý trả hàng</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3" icon={<UserOutlined/>}>
                        <Link to="/users">Quản lý người dùng</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<AppstoreAddOutlined/>}>
                        <Link to="/product">Quản lý sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<GiftOutlined/>}>
                        <Link to="/voucher">Quản lý Voucher</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<UnorderedListOutlined/>}>
                        <Link to="/categories">Thể loại</Link>
                    </Menu.Item>
                    <SubMenu
                        key="8"
                        title="Chi tiết sản phẩm"
                        icon={<AppstoreAddOutlined/>}
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
                        icon={<LogoutOutlined/>}
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
                <Header style={{padding: 0, background: "#F5F5F5"}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px", width: 64, height: 64,
                        }}
                    />
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <Button
                            type="text"
                            icon={<SettingOutlined/>}
                            style={{
                                fontSize: "16px", width: 64, height: 64,
                            }}
                        />
                    </Dropdown>
                    <Space
                        size="middle"
                        style={{float: "right", marginRight: "40px"}}
                    >
                        <Badge count={pendingBills} overflowCount={100}>
                            <Button
                                type="text"
                                icon={<BellOutlined/>}
                                style={{
                                    fontSize: "16px",
                                }}
                            />
                        </Badge>
                    </Space>
                    <HeaderDashBoard/>
                </Header>
                <br/> <br/> <br/>
                <Content
                    style={{
                        margin: "24px 16px", padding: 24, minHeight: 600, background: colorBgContainer,
                    }}
                >
                    <Text style={{fontSize: "24px", color: "blue"}} strong>
                        QUẢN LÝ ĐƠN HÀNG
                    </Text>
                    <div
                        class="d-grid gap-2 d-md-flex justify-content-md-end"
                        style={{marginTop: "10px"}}
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
                                                    prefix={<SearchOutlined/>}
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
                                                        return (<Option value={st.value}>{st.label}</Option>);
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
                                                    style={{width: "100%"}}
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
                                    scroll={{x: "max-content"}}
                                    pagination={{
                                        pageSize: 5,
                                        showSizeChanger: false,
                                        showTotal: (total) => `Tổng số ${total} mục`,
                                        showLessItems: true,
                                    }}
                                    expandable={{
                                        expandedRowRender: !breakpoint.xs ? expandedRowRender : undefined,
                                    }}
                                >
                                    <Table.Column
                                        key="edit"
                                        dataIndex="edit"
                                        render={(text, record) => (
                                            <span>
                                                {
                                                    record.statusBill === 'CHO_XAC_NHAN' ? (
                                                        <FormOutlined
                                                            style={{
                                                                color: "orange",
                                                            }}
                                                            onClick={() => {
                                                                searchBill(record.id)
                                                            }}
                                                        />
                                                    ) : ("")
                                                }
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
                                            <span>{statusBadgeMapping[record.statusBill]}</span>)}
                                    />
                                    <Table.Column
                                        key="total"
                                        dataIndex="total"
                                        title={t("Tổng tiền")}
                                        render={(text, record) => {
                                            return (<NumberField
                                                options={{
                                                    currency: "VND", style: "currency",
                                                }}
                                                value={record.totalMoney}
                                            />);
                                        }}
                                        sorter={(a, b) => a.totalMoney - b.totalMoney}
                                    />
                                    <Table.Column
                                        key="user"
                                        dataIndex="user"
                                        title={t("Tên khách hàng")}
                                        render={(text, record) => <span>{record?.userName}</span>}
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
                                        render={(text, record) => (<span>{record.personCreate}</span>)}
                                    />
                                    <Table.Column
                                        key="personUpdate"
                                        dataIndex="personUpdate"
                                        title={t("Người cập nhật HĐ")}
                                        render={(text, record) => (<span>{record.personUpdate}</span>)}
                                    />
                                    <Table.Column
                                        key="dateCreate"
                                        dataIndex="dateCreate"
                                        title={t("Ngày tạo")}
                                        render={(text, record) => (// <span>{record.dateCreate}</span>
                                            <DateField
                                                value={record.dateCreate}
                                                format="DD/MM/YYYY"
                                            />)}
                                        sorter={(a, b) => a.dateCreate > b.dateCreate}
                                    />
                                    <Table.Column
                                        key="dateUpdate"
                                        dataIndex="dateUpdate"
                                        title={t("Ngày cập nhật")}
                                        render={(text, record) => (// <span>{record.dateUpdate}</span>
                                            <DateField
                                                value={record.dateUpdate}
                                                format="DD/MM/YYYY"
                                            />)}
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
                                        render={(text, record) => (<span>{record.noteReturn}</span>)}
                                    />

                                    <Table.Column
                                        key="actions"
                                        dataIndex="actions"
                                        title={t("Sự kiện")}
                                        fixed="right"
                                        align="center"
                                        render={(text, record) => (<span>
                          {record.statusBill === "CHO_XAC_NHAN" ? (<Dropdown
                              overlay={<Menu mode="vertical">
                                  <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                          fontWeight: 500,
                                      }}
                                      icon={<FormOutlined
                                          style={{
                                              color: "green",
                                          }}
                                      />}
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
                                      icon={<CloseCircleOutlined
                                          style={{
                                              color: "red",
                                          }}
                                      />}
                                      onClick={() => handleCannelOrderClick(record)}
                                  >
                                      Hủy đơn
                                  </Menu.Item>
                              </Menu>}
                              trigger={["click"]}
                          >
                              <MoreOutlined
                                  style={{
                                      fontSize: 24,
                                  }}
                              />
                          </Dropdown>) : record.statusBill === "CHO_VAN_CHUYEN" ? (<Dropdown
                              overlay={<Menu mode="vertical">
                                  <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                          fontWeight: 500,
                                      }}
                                      icon={<CloseCircleOutlined
                                          style={{
                                              color: "green",
                                          }}
                                      />}
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
                                      icon={<FormOutlined
                                          style={{
                                              color: "orange",
                                          }}
                                      />}
                                      onClick={() => {
                                          returnStatusBillPrev(record.id);
                                      }}
                                  >
                                      Trở lại
                                  </Menu.Item>
                              </Menu>}
                              trigger={["click"]}
                          >
                              <MoreOutlined
                                  style={{
                                      fontSize: 24,
                                  }}
                              />
                          </Dropdown>) : record.statusBill === "VAN_CHUYEN" ? (<Dropdown
                              overlay={<Menu mode="vertical">
                                  <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                          fontWeight: 500,
                                      }}
                                      icon={<CloseCircleOutlined
                                          style={{
                                              color: "green",
                                          }}
                                      />}
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
                                      icon={<CloseCircleOutlined
                                          style={{
                                              color: "red",
                                          }}
                                      />}
                                      onClick={() => handleClickDeliveryFailed(record)}
                                  >
                                      Giao hàng thất bại
                                  </Menu.Item>
                                  <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                          fontWeight: 500,
                                      }}
                                      icon={<FormOutlined
                                          style={{
                                              color: "orange",
                                          }}
                                      />}
                                      onClick={() => {
                                          returnStatusBillPrev(record.id);
                                      }}
                                  >
                                      Trở lại
                                  </Menu.Item>
                              </Menu>}
                              trigger={["click"]}
                          >
                              <MoreOutlined
                                  style={{
                                      fontSize: 24,
                                  }}
                              />
                          </Dropdown>) : record.statusBill === "DA_THANH_TOAN" && Math.floor((new Date(new Date().getFullYear() + "-" + (new Date().getMonth() + 1)
                              .toString()
                              .padStart(2, "0") + "-" + new Date()
                              .getDate()
                              .toString()
                              .padStart(2, "0")) - new Date(new Date(record.completionDate[0], record.completionDate[1] - 1, record.completionDate[2]).getFullYear() + "-" + (new Date(record.completionDate[0], record.completionDate[1] - 1, record.completionDate[2]).getMonth() + 1)
                              .toString()
                              .padStart(2, "0") + "-" + new Date(record.completionDate[0], record.completionDate[1] - 1, record.completionDate[2])
                              .getDate()
                              .toString()
                              .padStart(2, "0"))) / (1000 * 60 * 60 * 24)) <= 3 ? (// <Dropdown
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
                              "") : record.statusBill === "YEU_CAU_TRA_HANG" ? (<Dropdown
                              overlay={<Menu mode="vertical">
                                  <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                          fontWeight: 500,
                                      }}
                                      icon={<CloseCircleOutlined
                                          style={{
                                              color: "green",
                                          }}
                                      />}
                                      onClick={() => handleClickReturnDetails(record)}
                                  >
                                      Xem chi tiết
                                  </Menu.Item>
                              </Menu>}
                              trigger={["click"]}
                          >
                              <MoreOutlined
                                  style={{
                                      fontSize: 24,
                                  }}
                              />
                          </Dropdown>) : record.statusBill === "TRA_HANG" ? (<Dropdown
                              overlay={<Menu mode="vertical">
                                  <Menu.Item
                                      key="1"
                                      disabled={record.stock <= 0}
                                      style={{
                                          fontWeight: 500,
                                      }}
                                      icon={<CloseCircleOutlined
                                          style={{
                                              color: "green",
                                          }}
                                      />}
                                      onClick={() => handleClickReturnedProducts(record)}
                                  >
                                      Xem chi tiết
                                  </Menu.Item>
                              </Menu>}
                              trigger={["click"]}
                          >
                              <MoreOutlined
                                  style={{
                                      fontSize: 24,
                                  }}
                              />
                          </Dropdown>) : ("")}
                        </span>)}
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
                        bodyStyle={{minHeight: "150px"}}
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
                        bodyStyle={{minHeight: "150px"}}
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
                        bodyStyle={{minHeight: "150px"}}
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
                        <Row style={{marginTop: "28px", marginBottom: "10px"}}>
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
                        <br/>
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
                                render={(text, record) => (<div style={{textAlign: "center"}}>
                                    <AvtProduct product={record.idProduct}/>
                                </div>)}
                                width={150}
                            />

                            {/* tên sp */}
                            <Table.Column
                                align="center"
                                key="isActive"
                                dataIndex="isActive"
                                title="Tên Sản Phẩm"
                                render={(text, record) => {
                                    return (<Form.Item name="title" style={{margin: 0}}>
                                        <p>{record.nameProduct}</p>
                                    </Form.Item>);
                                }}
                            />
                            {/* sumSKU */}
                            <Table.Column
                                align="center"
                                key="isActive"
                                dataIndex="isActive"
                                title="Phiên Bản"
                                render={(text, record) => {
                                    return (<Form.Item name="title" style={{margin: 0}}>
                                        <p>
                                            {record.skuColor} - {record.skuCapacity}
                                        </p>
                                    </Form.Item>);
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
                                    return record.price === null ? (<Form.Item name="title" style={{margin: 0}}>
                                        <WarningFilled
                                            value={false}
                                            style={{
                                                color: "#FFCC00",
                                            }}
                                        />
                                        {parseFloat(0).toLocaleString("vi-VN", {
                                            style: "currency", currency: "VND",
                                        })}
                                    </Form.Item>) : (<Form.Item name="title" style={{margin: 0}}>
                                        {parseFloat(record.price).toLocaleString("vi-VN", {
                                            style: "currency", currency: "VND",
                                        })}
                                    </Form.Item>);
                                }}
                            />

                            {/* sumImeiTrongKho */}
                            <Table.Column
                                align="center"
                                key="isActive"
                                dataIndex="isActive"
                                title="Mã Imei"
                                render={(text, record) => {
                                    return (<Form.Item name="title" style={{margin: 0}}>
                                        <p>{record.codeImei}</p>
                                    </Form.Item>);
                                }}
                            />
                        </Table>
                        <button
                            type="submit"
                            class="btn btn-success"
                            onClick={() => returnConfirmation()}
                        >
                            Xác nhận
                        </button>
                        {" "}
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
                        bodyStyle={{minHeight: "150px"}}
                    >
                        <label for="exampleFormControlTextarea2" class="form-label">
                            Sản phẩm đã trả:
                        </label>
                        <Row style={{marginTop: "28px", marginBottom: "10px"}}>
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
                                render={(text, record) => (<div style={{textAlign: "center"}}>
                                    <AvtProduct product={record.productId}/>
                                </div>)}
                                width={150}
                            />

                            {/* tên sp */}
                            <Table.Column
                                align="center"
                                key="isActive"
                                dataIndex="isActive"
                                title="Tên Sản Phẩm"
                                render={(text, record) => {
                                    return (<Form.Item name="title" style={{margin: 0}}>
                                        <p>{record.nameProduct}</p>
                                    </Form.Item>);
                                }}
                            />
                            {/* sumSKU */}
                            <Table.Column
                                align="center"
                                key="isActive"
                                dataIndex="isActive"
                                title="Phiên Bản"
                                render={(text, record) => {
                                    return (<Form.Item name="title" style={{margin: 0}}>
                                        <p>
                                            {record.capacity} - {record.color}
                                        </p>
                                    </Form.Item>);
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
                                    return record.price === null ? (<Form.Item name="title" style={{margin: 0}}>
                                        <WarningFilled
                                            value={false}
                                            style={{
                                                color: "#FFCC00",
                                            }}
                                        />
                                        {parseFloat(0).toLocaleString("vi-VN", {
                                            style: "currency", currency: "VND",
                                        })}
                                    </Form.Item>) : (<Form.Item name="title" style={{margin: 0}}>
                                        {parseFloat(record.price).toLocaleString("vi-VN", {
                                            style: "currency", currency: "VND",
                                        })}
                                    </Form.Item>);
                                }}
                            />

                            {/* sumImeiTrongKho */}
                            <Table.Column
                                align="center"
                                key="isActive"
                                dataIndex="isActive"
                                title="Mã Imei"
                                render={(text, record) => {
                                    return (<Form.Item name="title" style={{margin: 0}}>
                                        <p>{record.codeImei}</p>
                                    </Form.Item>);
                                }}
                            />
                        </Table>
                    </Modal>
                    <Modal
                        visible={isModalVisibleDeliveryFailed}
                        onCancel={handleCannelDeliveryFailed}
                        width={550}
                        footer={null}
                        bodyStyle={{minHeight: "150px"}}
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

                    /*
                    Modal hiển thị form edit
                    */
                    <Modal
                        visible={hideForm}
                        onCancel={handleCancelHideForm}
                        width={800}
                        footer={null}
                        bodyStyle={{minHeight: "150px"}}
                    >
                        <form onSubmit={handleSubmitDeliveryFailed}>
                            <div className="col-md-12">
                                <div className="col-md-8 order-md-1">
                                    <h4 className="mb-3">Thông tin khách hàng</h4>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tên"
                                                name="name"
                                                value={billUpdate.userName}
                                                onChange={hanldeName}
                                                required
                                            ></input>
                                            <br/>
                                        </div>
                                        <div className="col-md-5">
                                            <input
                                                id="phoneNumber"
                                                type="text"
                                                className="form-control"
                                                placeholder="Số điện thoại"
                                                name="phoneNumber"
                                                value={billUpdate.phoneNumber}
                                                onChange={hanldPhone}
                                                required
                                            ></input>
                                        </div>
                                        <div className="col-md-12">
                                            <b htmlFor="kh_ngaysinh">Hình thức nhận hàng</b>
                                            <div className="custom-control custom-radio">
                                                <input
                                                    id="htnn_5"
                                                    type="radio"
                                                    className="custom-control-input"
                                                    required=""
                                                    value="2"
                                                    // onClick={() => giaoTanNoi()}
                                                ></input>
                                                <label className="custom-control-label" htmlFor="htnn_5">
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
                                                    // onClick={() => diaChiMacDinh()}
                                                    hidden
                                                ></input>
                                                <label className="custom-control-label" htmlFor="htnn_6">
                                                    Địa chỉ mặc định
                                                </label>
                                            </div>
                                        </div>
                                        <div hidden className="row" id="notDcmd">
                                            <div className="col-md-4">
                                                <br/>
                                                <label htmlFor="kh_cmnd">Tỉnh, thành phố:</label>
                                                <select
                                                    className="form-select"
                                                    id="provinces"
                                                    aria-label="Floating label select example"
                                                    // onChange={handleProvince}
                                                >
                                                    <option selected id="-1"></option>
                                                    {/*{provinces.map((pr) => {*/}
                                                    {/*    return (*/}
                                                    {/*        <option*/}
                                                    {/*            id={pr.ProvinceID}*/}
                                                    {/*            key={pr.ProvinceID}*/}
                                                    {/*            value={pr.ProvinceID}*/}
                                                    {/*        >*/}
                                                    {/*            {pr.ProvinceName}*/}
                                                    {/*        </option>*/}
                                                    {/*    );*/}
                                                    {/*})}*/}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <br/>
                                                <label htmlFor="kh_cmnd">Quận, huyện:</label>
                                                <select
                                                    className="form-select"
                                                    id="districts"
                                                    aria-label="Floating label select example"
                                                    // onChange={handleDistrict}
                                                >
                                                    <option selected id="-2"></option>
                                                    {/*{districts.map((dt) => {*/}
                                                    {/*    return (*/}
                                                    {/*        <option*/}
                                                    {/*            id={dt.DistrictID}*/}
                                                    {/*            key={dt.DistrictID}*/}
                                                    {/*            value={dt.DistrictID}*/}
                                                    {/*        >*/}
                                                    {/*            {dt.DistrictName}*/}
                                                    {/*        </option>*/}
                                                    {/*    );*/}
                                                    {/*})}*/}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <br/>
                                                <label htmlFor="kh_cmnd">Phường, xã:</label>
                                                <select
                                                    className="form-select"
                                                    id="wards"
                                                    aria-label="Floating label select example"
                                                    // onChange={handleWard}
                                                >
                                                    <option selected id="-3"></option>
                                                    {/*{wards.map((w) => {*/}
                                                    {/*    return (*/}
                                                    {/*        <option*/}
                                                    {/*            id={w.WardCode}*/}
                                                    {/*            key={w.WardID}*/}
                                                    {/*            value={w.WardCode}*/}
                                                    {/*        >*/}
                                                    {/*            {w.WardName}*/}
                                                    {/*        </option>*/}
                                                    {/*    );*/}
                                                    {/*})}*/}
                                                </select>
                                            </div>
                                            <div className="col-md-12">
                                                <input
                                                    hidden
                                                    id="floatingSelect2"
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Địa chỉ cụ thể"
                                                    aria-label="default input example"
                                                    // onChange={handleAddress}
                                                />
                                            </div>
                                        </div>
                                        <div id="dcmd2" hidden>
                                            <br/>
                                            <label htmlFor="kh_cmnd">Mời bạn chọn địa chỉ mặc định:</label>
                                            <select
                                                className="form-select"
                                                id="floatingSelect"
                                                aria-label="Floating label select example"
                                                // onChange={handleDefaultAddress}
                                            >
                                                <option selected id="0" value={0}></option>
                                                {/*{defaultAddress.map((da) => {*/}
                                                {/*    return (*/}
                                                {/*        <option id={da.id} key={da.id} value={da.id}>*/}
                                                {/*            {da.address}, {da.xaPhuong}, {da.quanHuyen},{" "}*/}
                                                {/*            {da.tinhThanhPho}*/}
                                                {/*        </option>*/}
                                                {/*    );*/}
                                                {/*})}*/}
                                            </select>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row col-md-5">
                                        <button type="submit" className="btn btn-success">
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <br/>
                        <div className="row col-md-12">
                            <div className="row col-md-3">
                                <button type="button" onClick={handleCancelHideFormSearchSku}
                                        className="btn btn-warning">+
                                </button>
                            </div>
                            <br/>
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
                                    render={(text, record) => (<div style={{textAlign: "center"}}>
                                        <AvtProduct product={record.idProduct}/>
                                    </div>)}
                                    width={150}
                                />

                                {/* tên sp */}
                                <Table.Column
                                    align="center"
                                    key="isActive"
                                    dataIndex="isActive"
                                    title="Tên Sản Phẩm"
                                    render={(text, record) => {
                                        return (<Form.Item name="title" style={{margin: 0}}>
                                            <p>{record.nameProduct}</p>
                                        </Form.Item>);
                                    }}
                                />
                                {/* sumSKU */}
                                <Table.Column
                                    align="center"
                                    key="isActive"
                                    dataIndex="isActive"
                                    title="Phiên Bản"
                                    render={(text, record) => {
                                        return (<Form.Item name="title" style={{margin: 0}}>
                                            <p>
                                                {record.skuColor} - {record.skuCapacity}
                                            </p>
                                        </Form.Item>);
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
                                        return record.price === null ? (<Form.Item name="title" style={{margin: 0}}>
                                            <WarningFilled
                                                value={false}
                                                style={{
                                                    color: "#FFCC00",
                                                }}
                                            />
                                            {parseFloat(0).toLocaleString("vi-VN", {
                                                style: "currency", currency: "VND",
                                            })}
                                        </Form.Item>) : (<Form.Item name="title" style={{margin: 0}}>
                                            {parseFloat(record.price).toLocaleString("vi-VN", {
                                                style: "currency", currency: "VND",
                                            })}
                                        </Form.Item>);
                                    }}
                                />

                                <Table.Column
                                    align="center"
                                    key="isActive"
                                    dataIndex="isActive"
                                    title="Số lượng"
                                    render={(text, record) => {
                                        return (<input type="number"
                                                       defaultValue={record.quantity}
                                                       min="1"
                                                       id="quantitySKU"
                                                       className="form-control"
                                                       onChange={() => handleChangeQuantity(record)}
                                        />);
                                    }}
                                />

                                {/* sumImeiTrongKho */}
                                <Table.Column
                                    align="center"
                                    key="isActive"
                                    dataIndex="isActive"
                                    title="Xóa"
                                    render={(text, record) => {
                                        return (<button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={function () {
                                                console.log(newBillDetails)
                                            }}
                                        >
                                            Xóa
                                        </button>);
                                    }}
                                />
                            </Table>
                        </div>
                    </Modal>
                    <Modal
                        visible={hideFormSearchSku}
                        onCancel={handleCancelHideFormSearchSku}
                        width={800}
                        footer={null}
                        bodyStyle={{minHeight: "150px"}}
                    >
                        <div className="form-search">
                            <h3 className="align-content-center">TÌM KIẾM SẢN PHẨM</h3>
                            <Form.Item name="name" noStyle>
                                <Input
                                    style={{width: "300px"}}
                                    placeholder={"Product Search"}
                                    suffix={<SearchOutlined/>}
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
                                    render={(text, record) => (<div style={{textAlign: "center"}}>
                                        <AvtProduct product={record.productId}/>
                                    </div>)}
                                    width={150}
                                />

                                {/* tên sp */}
                                <Table.Column
                                    align="center"
                                    key="isActive"
                                    dataIndex="isActive"
                                    title="Tên Sản Phẩm"
                                    render={(text, record) => {
                                        return (<Form.Item name="title" style={{margin: 0}}>
                                            <p>{record.name}</p>
                                        </Form.Item>);
                                    }}
                                />
                                {/* sumSKU */}
                                <Table.Column
                                    align="center"
                                    key="isActive"
                                    dataIndex="isActive"
                                    title="Phiên Bản"
                                    render={(text, record) => {
                                        return (<Form.Item name="title" style={{margin: 0}}>
                                            <p>
                                                {record.color} - {record.capacity}
                                            </p>
                                        </Form.Item>);
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
                                        return record.price === null ? (<Form.Item name="title" style={{margin: 0}}>
                                            <WarningFilled
                                                value={false}
                                                style={{
                                                    color: "#FFCC00",
                                                }}
                                            />
                                            {parseFloat(0).toLocaleString("vi-VN", {
                                                style: "currency", currency: "VND",
                                            })}
                                        </Form.Item>) : (<Form.Item name="title" style={{margin: 0}}>
                                            {parseFloat(record.price).toLocaleString("vi-VN", {
                                                style: "currency", currency: "VND",
                                            })}
                                        </Form.Item>);
                                    }}
                                />

                                <Table.Column
                                    align="center"
                                    key="isActive"
                                    dataIndex="isActive"
                                    title="Số lượng"
                                    render={(text, record) => {
                                        return (<input type="number" value={record.quantity} readOnly
                                                       className="form-control"/>);
                                    }}
                                />

                                {/* sumImeiTrongKho */}
                                <Table.Column
                                    align="center"
                                    key="isActive"
                                    dataIndex="isActive"
                                    title="Thêm"
                                    render={(text, record) => {
                                        return (<button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => handleAddSkuToBill(record)}
                                        >
                                            Thêm
                                        </button>);
                                    }}
                                />
                            </Table>
                        </div>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    </>);
};
const UserAccountTable = ({record, onSomeAction}) => {
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

    const editRole = (role, idUser) => {
    };

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
            severity: "warn", summary: "THÔNG BÁO", detail: "Tiếp tục bán hàng.", life: 3000,
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
                message: "Xoá Thất Bại!", description: "Hãy Chọn Danh Sách Imei.",
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
                        message: "Xoá Thất Bại!", description: "Danh Sách Imei Rỗng.",
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
            severity: "warn", summary: "THÔNG BÁO", detail: "Tiếp tục bán hàng.", life: 3000,
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
        // const target = event.target;
        // const value = target.value;
        // const name = target.name;
        // console.log(target + " check imei");
        // console.log(value + " check imei - name");
        // // let item = { key: "" };
        // // item[name] = value;
        // // setDataImeiThatLac(item);
        // if (value !== undefined) {
        //   seachImeis(dataIdSKU, value)
        //     .then((response) => {
        //       setDataSeachImeis(response.data);
        //     })
        //     .catch((error) => {
        //       console.log(`${error}`);
        //     });
        // }
    }

    //add imei vào bảng imei dã bán - phongnh
    const handleImeiClick = (codeImei, idBillDetail) => {
        //comment vì chưa có dữ liệu
        // Tạo một đối tượng AddCart để gửi lên API
        const item = {
            codeImei: codeImei, idBillDetail: idBillDetail, codeAccount: idAccount,
        };
        addImeiDaBan(item)
            .then((response) => {
                if (response.data === "") {
                    notification.error({
                        message: "Thêm Imei Thất Bại!", description: "imei đã có trong giỏ hàng hoặc đã bán!",
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
            if (dataBillDetailOffline[index]?.quantity !== dataBillDetailOffline[index]?.soLuongImeiDaChon) {
                check = false;
                break;
            }
        }
        if (check) {
            toast.current.show({
                severity: "success", summary: "Thành công!", detail: "Xác nhận thành công", life: 3000,
            });
            setTempStatus(true);
        } else {
            toast.current.show({
                severity: "error", summary: "KIỂM TRA IMEI", detail: "Vui lòng kiểm tra lại imei", life: 3000,
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

    return (<>
        {" "}
        <Toast ref={toast}/>
        <ConfirmDialog/>
        <List title="Sản phẩm" createButtonProps={undefined}>
            <Col>
                <List>
                    <Table
                        rowKey="id"
                        dataSource={users}
                        scroll={{x: "max-content"}}
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
                            render={(text, record) => (<div style={{width: "150px"}}>
                                {<AvatarProduct product={record.idProduct}/>}
                            </div>)}
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
                            render={(text, record) => (<span>{record.skuColor + "-" + record.skuCapacity}</span>)}
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
                                return (<NumberField
                                    options={{
                                        currency: "VND", style: "currency",
                                    }}
                                    value={record.price}
                                />);
                            }}
                        />

                        <Table.Column
                            key="code"
                            dataIndex="code"
                            title={"Imei"}
                            render={(text, record) => (<Form.Item name="title" style={{margin: 0}}>
                                {record.statusBill === "CHO_XAC_NHAN" ? (<p>
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
                                </p>) : (<p>
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
                                </p>)}
                            </Form.Item>)}
                        />

                        <Table.Column
                            key="total"
                            dataIndex="total"
                            title={"Thành tiền"}
                            render={(text, record) => {
                                return (<NumberField
                                    options={{
                                        currency: "VND", style: "currency",
                                    }}
                                    value={record.totalManyOneBillDetail}
                                />);
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
                bodyStyle={{minHeight: "800px"}}
            >
                <div className="container py-5">
                    <div className="row d-flex justify-content-center">
                        {/* <div className="card"> */}
                        <div>
                            <h4
                                className="mb-0"
                                style={{textAlign: "center", margin: "auto"}}
                            >
                                DANH SÁCH IMEI
                            </h4>
                        </div>
                        <div
                            className="card-header d-flex justify-content-between align-items-center p-3"
                            style={{borderTop: "4px solid #ffa900"}}
                        ></div>
                        <p
                            style={{
                                marginTop: "10px", fontWeight: "bold", backgroundColor: "orange",
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
                        {dataImeiThatLac.length > 0 ? (<ul class="list-group mb-3">
                            <li
                                class="list-group-item d-flex justify-content-between"
                                style={{backgroundColor: "yellowgreen"}}
                            >
                                <span>STT</span>
                                <span style={{paddingLeft: "10px"}}>Mã Hoá Đơn</span>
                                <span style={{paddingLeft: "10px"}}>Tên Sản Phẩm</span>
                                <span style={{paddingLeft: "10px"}}>Dung Lượng</span>
                                <span style={{paddingLeft: "10px"}}>Màu Sắc</span>
                                <span style={{paddingLeft: "10px"}}>Giá</span>
                                <span style={{paddingLeft: "10px"}}>Trạng Thái HĐ</span>
                            </li>
                            {dataImeiThatLac.map((imei, index) => (<ul class="list-group mb-3">
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>{index + 1}:</span>
                                    <span>{imei.codeBill}</span>
                                    <span style={{paddingLeft: "10px"}}>{""}</span>
                                    <span style={{paddingLeft: "10px"}}>{""}</span>
                                    <span style={{paddingLeft: "10px"}}>{""}</span>
                                    <span style={{paddingLeft: "10px"}}>{""}</span>
                                    <span style={{paddingLeft: "10px"}}>{""}</span>
                                    <span style={{paddingLeft: "10px"}}>{""}</span>
                                    <span style={{paddingLeft: "10px"}}>{""}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                        <span style={{paddingLeft: "25px"}}>
                          {" - "} {imei.nameProduct}
                            {" - "}
                            {imei.capacitySKU}
                            {" - "} {imei.colorSKU}
                            {" - "} {imei.priceSKU}
                            {" - "}
                            {imei.statusBill}
                        </span>
                                </li>
                            </ul>))}
                        </ul>) : (<p style={{color: "red"}}>* Không có dữ liệu!</p>)}
                        <div
                            className="card-header d-flex justify-content-between align-items-center"
                            style={{borderTop: "4px solid #ffa900"}}
                        ></div>
                        <p
                            style={{
                                marginTop: "10px", fontWeight: "bold", backgroundColor: "orange",
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
                        <p style={{textAlign: "right"}}>
                            <Button
                                type="text"
                                style={{
                                    border: "2px solid black", backgroundColor: "#ff7700", color: "white",
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
                                    border: "2px solid black", backgroundColor: "red", color: "white",
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
                            style={{position: "relative", height: 250, overflowY: "auto"}}
                        >
                            {/* dataSeachImeiDaBan */}
                            {dataSeachImeiDaBan.length === 0 ? (<ul class="list-group mb-3">
                                {dataImeiSelected.map((imei, index) => (<ul class="list-group mb-3">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>{index + 1}</span>

                                        <input
                                            type="checkbox"
                                            value={imei.codeImeiDaBan}
                                            checked={selectedCheckboxes.includes(imei.codeImeiDaBan)}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span style={{paddingLeft: "10px"}}>
                            {imei.codeImeiDaBan}
                          </span>
                                        <strong>
                                            <Button
                                                type="text"
                                                danger
                                                onClick={() => handleClearImeiDaBan(imei.idImeiDaBan, imei.codeImeiDaBan)}
                                            >
                                                Hủy
                                            </Button>
                                        </strong>
                                    </li>
                                </ul>))}
                            </ul>) : (<ul class="list-group mb-3">
                                {dataSeachImeiDaBan.map((imei, index) => (<ul class="list-group mb-3">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>{index + 1}</span>
                                        <span style={{paddingLeft: "10px"}}>
                            {imei.codeImeiDaBan}
                          </span>
                                        <strong>
                                            <Button
                                                type="text"
                                                danger
                                                onClick={() => handleClearImeiDaBan(imei.idImeiDaBan, imei.codeImeiDaBan)}
                                            >
                                                Hủy
                                            </Button>
                                        </strong>
                                    </li>
                                </ul>))}
                            </ul>)}
                        </div>
                        <div
                            className="card-header d-flex justify-content-between align-items-center"
                            style={{borderTop: "4px solid #ffa900"}}
                        ></div>
                        <p
                            style={{
                                marginTop: "10px", fontWeight: "bold", backgroundColor: "orange",
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
                            style={{position: "relative", height: 330, overflowY: "auto"}}
                        >
                            {/* dataSeachImeis */}
                            {dataSeachImeis.length === 0 ? (<ul class="list-group mb-3">
                                {dataImeiClick.map((imei, index) => (<ul class="list-group mb-3">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>{index + 1}</span>
                                        <span style={{paddingLeft: "10px"}}>
                            {imei.codeImei}
                                            <br/>
                          </span>
                                        <strong>
                                            <Button
                                                type="text"
                                                danger
                                                onClick={() => handleImeiClick(imei.codeImei, dataIdBillDetail)}
                                            >
                                                Chọn
                                            </Button>
                                        </strong>
                                    </li>
                                </ul>))}
                            </ul>) : (<ul class="list-group mb-3">
                                {dataSeachImeis.map((imei, index) => (<ul class="list-group mb-3">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>{index + 1}</span>
                                        <span style={{paddingLeft: "10px"}}>
                            {imei.codeImei}
                                            <br/>
                          </span>
                                        <strong>
                                            <Button
                                                type="text"
                                                danger
                                                onClick={() => handleImeiClick(imei.codeImei, dataIdBillDetail)}
                                            >
                                                Chọn
                                            </Button>
                                        </strong>
                                    </li>
                                </ul>))}
                            </ul>)}
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
                bodyStyle={{minHeight: "800px"}}
            >
                <div className="container py-5">
                    <div className="row d-flex justify-content-center">
                        {/* <div className="card"> */}
                        <div>
                            <h4
                                className="mb-0"
                                style={{textAlign: "center", margin: "auto"}}
                            >
                                DANH SÁCH IMEI
                            </h4>
                        </div>
                        <div
                            className="card-header d-flex justify-content-between align-items-center p-3"
                            style={{borderTop: "4px solid #ffa900"}}
                        ></div>
                        <p
                            style={{
                                marginTop: "10px", fontWeight: "bold", backgroundColor: "orange",
                            }}
                        >
                            Danh Sách Imei Đã Chọn
                        </p>
                        <p></p>
                        <div
                            className="card-body"
                            data-mdb-perfect-scrollbar="true"
                            style={{position: "relative", height: 250, overflowY: "auto"}}
                        >
                            {/* dataSeachImeiDaBan */}
                            <ul class="list-group mb-3">
                                {dataImeiSelected.map((imei, index) => (<ul class="list-group mb-3">
                                    <li class="list-group-item d-flex justify-content-between">
                                        <span>{index + 1}</span>
                                        <span style={{paddingLeft: "10px"}}>
                          {imei.codeImei}
                        </span>
                                    </li>
                                </ul>))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>
        </List>
    </>);
};

export default OderDisplay;
