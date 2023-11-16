import {useEffect, useRef, useState} from "react";
import {useTranslate} from "@refinedev/core";
import {
    AppstoreAddOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DashboardOutlined,
    FormOutlined,
    GiftOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoreOutlined,
    SearchOutlined,
    ShopOutlined,
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
    Table,
    theme,
    Typography,
} from "antd";
import {DateField, List, NumberField} from "@refinedev/antd";
import {Link, useHistory} from "react-router-dom/cjs/react-router-dom.min";
import {
    deleteBillById,
    searchNoDate,
    searchWithDate,
    updateStatusBill,
    updateAllCVC,
    getAllBillCXN,
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
    getOneSkuSelected, listImeiDaBanByIdBillDetail,
    seachImeis,
    seachImeisDaBan,
} from "../../../service/SellOffLine/sell_off_line.service";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import AvatarProduct from "../../product_component/Product/AvatarProduct";
import {Toast} from "primereact/toast";
import {findBillDetails} from "../../../service/BillDetail/billDetail.service";

const {RangePicker} = DatePicker;
const {Text} = Typography;
const {Header, Sider, Content} = Layout;

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
    const breakpoint = Grid.useBreakpoint();
    const [load, setLoad] = useState(true);
    const [billCXN, setBillCXN] = useState([]);

    const orderSelectProps = {
        options: [
            {label: "Tạo hóa đơn", value: "TAO_HOA_DON"},
            {label: "Chờ xác nhận", value: "CHO_XAC_NHAN"},
            {label: "Chờ vận chuyển", value: "CHO_VAN_CHUYEN"},
            {label: "Vận chuyển", value: "VAN_CHUYEN"},
            {label: "Đã thanh toán", value: "DA_THANH_TOAN"},
            {label: "Không trả hàng", value: "KHONG_TRA_HANG"},
            {label: "Trả hàng", value: "TRA_HANG"},
            {label: "Đã hủy", value: "DA_HUY"},
            // Thêm các giá trị khác nếu cần
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

    const [filtersNoDate, setFiltersNoDate] = useState({
        key: "",
        status: "",
        // user: "",
    });

    const [filtersWithDate, setFiltersWithDate] = useState({
        key: "",
        status: "",
        // user: "",
        dateStart: "",
        dateEnd: "",
    });

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
        }
    }, [filtersNoDate, filtersWithDate, load]);

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
        TAO_HOA_DON: (
            <Badge
                className="site-badge-count-109"
                count={"Tạo hóa đơn"}
                style={{backgroundColor: "#52c41a"}}
            />
        ),
        CHO_XAC_NHAN: (
            <Badge
                className="site-badge-count-109"
                count={"Chờ xác nhận"}
                style={{backgroundColor: "orange"}}
            />
        ),
        CHO_VAN_CHUYEN: (
            <Badge
                className="site-badge-count-109"
                count={"Chờ vận chuyển"}
                style={{backgroundColor: "orangered"}}
            />
        ),
        VAN_CHUYEN: (
            <Badge
                className="site-badge-count-109"
                count={"Vận chuyển"}
                style={{backgroundColor: "aqua"}}
            />
        ),
        DA_THANH_TOAN: (
            <Badge
                className="site-badge-count-109"
                count={"Đã thanh toán"}
                style={{backgroundColor: "#52c41a"}}
            />
        ),
        KHONG_TRA_HANG: (
            <Badge
                className="site-badge-count-109"
                count={"Không trả hàng"}
                style={{backgroundColor: "grey"}}
            />
        ),
        TRA_HANG: (
            <Badge
                className="site-badge-count-109"
                count={"Trả hàng"}
                style={{backgroundColor: "khaki"}}
            />
        ),
        DA_HUY: (
            <Badge
                className="site-badge-count-109"
                count={"Đã hủy"}
                style={{backgroundColor: "red"}}
            />
        ),
    };

    function confirm2(id) {
        updateStatusBill(idAccount, id)
            .then((response) => {
                setLoad(!load);
            })
            .catch((error) => {
                console.error("Error updating status:", error);
            });
    }

    function delete2(id) {
        deleteBillById(id).then((response) => console.log(response.data));
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

    function handUpdateTrangThai() {
        if (checkSoluongImei() === true) {
            const personUpdate = storedUser.code + " - " + storedUser.user.fullName;
            updateAllCVC(personUpdate)
                .then((response) => {
                    setLoad(!load);
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
                description: "Vui lòng kiểm tra lại imei",
            });
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

    const expandedRowRender = (record) => {
        return (
            <UserAccountTable record={record} onSomeAction={receiveDataFromChild}/>
        );
    };

    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
                        <Menu.Item key="1" icon={<DashboardOutlined/>}>
                            <Link to="/dashboard">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<ShopOutlined/>}>
                            <Link to="/orders">Orders</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined/>}>
                            <Link to="/users">Users</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<AppstoreAddOutlined/>}>
                            <Link to="/product">Product</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<GiftOutlined/>}>
                            <Link to="/voucher">Voucher</Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<LogoutOutlined/>}>
                            <Link to="/logout">Logout</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{padding: 0, background: colorBgContainer}}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Text style={{fontSize: "24px", color: "blue"}} strong>
                            ODERS
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
                                ACCEPT ALL
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
                                <Card title={t("Filter")}>
                                    <Form>
                                        <Row gutter={[10, 0]} align="bottom">
                                            <Col xl={24} md={8} sm={12} xs={24}>
                                                <Form.Item label={t("Search")}>
                                                    <Input
                                                        name="key"
                                                        placeholder={t("Code, Person Create")}
                                                        prefix={<SearchOutlined/>}
                                                        onChange={handleChangeSearch}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xl={24} md={8} sm={12} xs={24}>
                                                <Form.Item label={t("Status")}>
                                                    <Select
                                                        name="status"
                                                        onChange={handleChangeStatus}
                                                        allowClear
                                                        placeholder={"Status"}
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
                                                <Form.Item label={t("Date")} name="createdAt">
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
                                                        {t("FILLTER")}
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
                                            expandedRowRender: !breakpoint.xs
                                                ? expandedRowRender
                                                : undefined,
                                        }}
                                    >
                                        <Table.Column
                                            key="code"
                                            dataIndex="code"
                                            title={t("Code")}
                                            render={(text, record) => <span>{record.code}</span>}
                                        />
                                        <Table.Column
                                            key="status"
                                            dataIndex="status"
                                            title={t("Status")}
                                            render={(text, record) => (
                                                <span>{statusBadgeMapping[record.statusBill]}</span>
                                            )}
                                        />
                                        <Table.Column
                                            key="total"
                                            dataIndex="total"
                                            title={t("Total")}
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
                                            key="user"
                                            dataIndex="user"
                                            title={t("User")}
                                            render={(text, record) => (
                                                <span>{record?.customer?.fullName}</span>
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
                                            title={t("Address")}
                                            render={(text, record) => <span>{record.address}</span>}
                                        />
                                        <Table.Column
                                            key="personCreate"
                                            dataIndex="personCreate"
                                            title={t("PersonCreate")}
                                            render={(text, record) => (
                                                <span>{record.personCreate}</span>
                                            )}
                                        />
                                        <Table.Column
                                            key="personUpdate"
                                            dataIndex="personUpdate"
                                            title={t("PersonUpdate")}
                                            render={(text, record) => (
                                                <span>{record.personUpdate}</span>
                                            )}
                                        />
                                        <Table.Column
                                            key="dateCreate"
                                            dataIndex="dateCreate"
                                            title={t("DateCreate")}
                                            render={(text, record) => (
                                                // <span>{record.dateCreate}</span>
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
                                            title={t("DateUpdate")}
                                            render={(text, record) => (
                                                // <span>{record.dateUpdate}</span>
                                                <DateField
                                                    value={record.dateUpdate}
                                                    format="DD/MM/YYYY"
                                                />
                                            )}
                                            sorter={(a, b) => a.dateUpdate > b.dateUpdate}
                                        />

                                        <Table.Column
                                            key="actions"
                                            dataIndex="actions"
                                            title={t("Action")}
                                            fixed="right"
                                            align="center"
                                            render={(text, record) => (
                                                <span>
                          {/* <Button type="danger" >
                                                                    <FontAwesomeIcon icon={faTimes} />
                                                                </Button>
                                                                <Button type="danger" >
                                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                                </Button> */}
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
                                                                            //   console.log(record);
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
                                                                        onClick={() => delete2(record.id)}
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
                                                    ) : record.statusBill === "VAN_CHUYEN" ? (
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
                    </Content>
                </Layout>
            </Layout>
        </>
    );
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
            setDataBillDetailOffline(response.data);
        });
        //   .then((res) => {
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
    }, [isModalVisible, isUpdate]);

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
                    handleClick();
                }
            })
            .catch((error) => {
                console.log(`Lỗi khi cập nhật số lượng: ${error}`);
            });
    };
    const moreMenu2 = (record1) => (
        <>
            {record1.statusSku === 0 && record1.statusProduct === 0 ? (
                <Menu
                    mode="vertical2"
                    onClick={({domEvent}) => domEvent.stopPropagation()}
                >
                    <Menu.Item
                        key="deleteSku"
                        style={{
                            fontSize: 15,
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 500,
                        }}
                        icon={
                            <CloseCircleOutlined
                                style={{
                                    color: "red",
                                }}
                            />
                        }
                        // onClick={() => confirmDeleteSku(sku)}
                    >
                        Delete
                    </Menu.Item>
                </Menu>
            ) : record1.statusSku === 1 && record1.statusProduct === 0 ? (
                <Menu
                    mode="vertical2"
                    onClick={({domEvent}) => domEvent.stopPropagation()}
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
                            <CheckCircleOutlined
                                style={{
                                    color: "#52c41a",
                                    fontSize: 17,
                                    fontWeight: 500,
                                }}
                            />
                        }
                        // onClick={() => confirmReturnSku(sku)}
                    >
                        Return
                    </Menu.Item>
                </Menu>
            ) : record1.statusProduct === 1 ? (
                <WarningFilled
                    style={{
                        color: "#FFCC00",
                    }}
                />
            ) : (
                "!"
            )}
        </>
    );

    //truyền thông tin ra bnagr bên ngoài
    const handleClick = () => {
        // Gọi hàm callback và truyền dữ liệu cần thiết lên
        onSomeAction(true);
    };

    const showImeiSold = (id) => {
        listImeiDaBanByIdBillDetail(id).then(response => {
            setDataImeiSelected(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
        setIsModelShowImei(true);
    }
    // Cancel show imei
    const hideModelShowImei = () => {
        setIsModelShowImei(false)
    }


    return (
        <>
            {" "}
            <Toast ref={toast}/>
            <ConfirmDialog/>
            <List title="Bill Detail" createButtonProps={undefined}>
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
                                title={"Image"}
                                render={(text, record) => (
                                    <span>{<AvatarProduct product={record.idProduct}/>}</span>
                                )}
                            />
                            <Table.Column
                                key="code"
                                dataIndex="code"
                                title={"Name"}
                                render={(text, record) => <span>{record.nameProduct}</span>}
                            />
                            <Table.Column
                                key="code"
                                dataIndex="code"
                                title={"Version"}
                                render={(text, record) => (
                                    <span>{record.skuColor + "-" + record.skuCapacity}</span>
                                )}
                            />
                            <Table.Column
                                key="code"
                                dataIndex="code"
                                title={"Quantity"}
                                render={(text, record) => <span>{record.quantity}</span>}
                            />
                            <Table.Column
                                key="code"
                                dataIndex="code"
                                title={"Price"}
                                render={(text, record) => <span>{record.price}</span>}
                            />

                            <Table.Column
                                key="code"
                                dataIndex="code"
                                title={"Imei"}
                                render={(text, record) => (<Form.Item name="title" style={{margin: 0}}>
                                    {record.statusBill === 'CHO_XAC_NHAN' ? (<p>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            className="btn btn-primary btn-sm trash"
                                            style={{
                                                backgroundColor: "green",
                                            }}
                                            onClick={() => {
                                                handleAddImei(record.idSKU, record.id);
                                                openModalAddImei(record.idSKU);
                                            }}
                                        >
                                            Add imei
                                        </button>
                                    </p>) : (<p>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            className="btn btn-primary btn-sm trash"
                                            style={{
                                                backgroundColor: "orange",
                                            }}
                                            onClick={() => {
                                                showImeiSold(record.id)
                                            }}
                                        >
                                            Xem imei
                                        </button>
                                    </p>)}
                                </Form.Item>)}
                            />

                            <Table.Column
                                key="total"
                                dataIndex="total"
                                title={"Total"}
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

                            <Table.Column
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
                                        <MoreOutlined
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                fontSize: 24,
                                            }}
                                        />
                                    </Dropdown>
                                )}
                            />
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
                                    {dataImeiThatLac.map((imei, index) => (
                                        <ul class="list-group mb-3">
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
                                        </ul>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{color: "red"}}>* Không có dữ liệu!</p>
                            )}
                            <div
                                className="card-header d-flex justify-content-between align-items-center"
                                style={{borderTop: "4px solid #ffa900"}}
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
                            <p style={{textAlign: "right"}}>
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
                                style={{position: "relative", height: 250, overflowY: "auto"}}
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
                                                    <span style={{paddingLeft: "10px"}}>
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
                                                    <span style={{paddingLeft: "10px"}}>
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
                                style={{borderTop: "4px solid #ffa900"}}
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
                                style={{position: "relative", height: 330, overflowY: "auto"}}
                            >
                                {/* dataSeachImeis */}
                                {dataSeachImeis.length === 0 ? (
                                    <ul class="list-group mb-3">
                                        {dataImeiClick.map((imei, index) => (
                                            <ul class="list-group mb-3">
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
                                                    <span style={{paddingLeft: "10px"}}>
                            {imei.codeImei}
                                                        <br/>
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
        </>
    );
};

export default OderDisplay;
