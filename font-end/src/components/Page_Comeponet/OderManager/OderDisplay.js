import {useEffect, useState} from "react";
import {useTranslate} from "@refinedev/core";
import {
    AppstoreAddOutlined,
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
} from "@ant-design/icons";
import {
    Badge,
    Button,
    Card,
    Col,
    DatePicker,
    Dropdown,
    Form,
    Input,
    Layout,
    Menu,
    Row,
    Select,
    Table,
    theme,
    Typography,
} from "antd";
<<<<<<< HEAD
import {DateField, List} from "@refinedev/antd";
import {Link, useHistory} from "react-router-dom/cjs/react-router-dom.min";
=======
import { DateField, List, NumberField } from "@refinedev/antd";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
>>>>>>> main
import {
    deleteBillById,
    searchNoDate,
    searchWithDate,
    updateStatusBill,
} from "../../../service/Bill/bill.service";
import {readAllUser} from "../../../service/User/user.service";
import queryString from "query-string";
import {Option} from "antd/es/mentions";

const {RangePicker} = DatePicker;
const {Text} = Typography;
const {Header, Sider, Content} = Layout;

const OderDisplay = ({}) => {
    const t = useTranslate();
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [oder, setOder] = useState([]);
    const [user, setUser] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal

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
        user: "",
    });

    const [filtersWithDate, setFiltersWithDate] = useState({
        key: "",
        status: "",
        user: "",
        dateStart: "",
        dateEnd: "",
    });

    useEffect(() => {
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
    }, [filtersNoDate, filtersWithDate]);

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

    function handleChangeUser(value) {
        let item = {};
        const dateFilter = document.getElementById("dateFilter");
        if (dateFilter.value == "") {
            item = {...filtersNoDate};
            item["user"] = value;
            setFiltersNoDate(item);
            if (value == null) {
                item = {...filtersNoDate};
                item["user"] = "";
                setFiltersNoDate(item);
            }
        } else {
            item = {...filtersWithDate};
            item["user"] = value;
            setFiltersWithDate(item);
            if (value == null) {
                item = {...filtersWithDate};
                item["user"] = "";
                setFiltersWithDate(item);
            }
        }
    }

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
        updateStatusBill(id).then(response =>
            console.log(response.data)
        );
    }


    function delete2(id) {
        deleteBillById(id).then(response =>
            console.log(response.data)
        );
    }

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
<<<<<<< HEAD
                                            <Col xl={24} md={8} sm={12} xs={24}>
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
                                            </Col>
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
                                            showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
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
                                            render={(text, record) => (
                                                <span>{record.totalMoney}</span>
                                            )}
                                        />
                                        <Table.Column
                                            key="user"
                                            dataIndex="user"
                                            title={t("User")}
                                            render={(text, record) => (
                                                <span>{record.account.user.fullName}</span>
                                            )}
                                        />
=======
                      <Col xl={24} md={8} sm={12} xs={24}>
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
                      </Col>
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Date")} name="createdAt">
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
                        // <span>{record.account.user.fullName}</span>
                        <span>{record?.customer?.fullName}</span>
                      )}
                    />
>>>>>>> main

                                        {/* <Table.Column
                      key="product"
                      dataIndex="product"
                      title={t("Products")}
                      render={(text, record) => <span>{record.price}</span>}
                    /> */}
<<<<<<< HEAD
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
                                        />
=======
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
>>>>>>> main

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
                                                                                color: "red",
                                                                            }}
                                                                        />
                                                                    }
                                                                    onClick={() => confirm2(record.id)}
                                                                >
                                                                    Accept
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    key="2"
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
                                                                    onClick={() => delete2(record.id)}
                                                                >
                                                                    Delete
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
export default OderDisplay;
