import { useEffect, useState } from "react";
import {
  readAll,
  deleteVoucher,
  add,
  detail,
  update,
  searchNoDate,
  searchWithDate,
} from "../../../service/Voucher/voucher.service";
import { useTranslate } from "@refinedev/core";
import {
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,
  GiftOutlined,
  LogoutOutlined,
  ShopOutlined,
  CloseCircleOutlined,
  FormOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Table,
  Image,
  Card,
  Input,
  Form,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  Layout,
  Menu,
  theme,
  Badge,
  notification,
  Modal,
  Dropdown,
} from "antd";
import { List, Array } from "@refinedev/antd";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateVoucher from "../Voucher/CreateVoucher";
import UpdateVoucher from "../Voucher/UpdateVoucher";
import queryString from "query-string";
import { Option } from "antd/es/mentions";
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Header, Sider, Content } = Layout;

const VoucherDisplay = ({}) => {
  const t = useTranslate();
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [voucher, setVoucher] = useState([]);
  const [editedVoucher, setEditedVoucher] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal

  // Hàm để hiển thị Modal khi cần
  const handleEditClick = (record) => {
    setEditedVoucher(record);
    setIsModalVisible(true);
    console.log(editedVoucher);
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [filtersNoDate, setFiltersNoDate] = useState({
    key: "",
    status: "",
  });

  const [filtersWithDate, setFiltersWithDate] = useState({
    key: "",
    status: "",
    dateStart: "",
    dateEnd: "",
  });

  const orderSelectProps = {
    options: [
      { label: "Hoạt động", value: 0 },
      { label: "Không hoạt động", value: 1 },
      // Thêm các giá trị khác nếu cần
    ],
  };

  useEffect(() => {
    // readAll()
    //   .then((response) => {
    //     console.log(response.data);
    //     setVoucher(response.data.content);
    //     // setEditedVoucher(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(`${error}`);
    //   });
    const paramsString = queryString.stringify(filtersNoDate);
    const paramsString2 = queryString.stringify(filtersWithDate);
    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter.value == "") {
      searchNoDate(paramsString)
        .then((response) => {
          // console.log(response.data);
          setVoucher(response.data);
          // setEditedVoucher(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    } else {
      searchWithDate(paramsString2)
        .then((response) => {
          // console.log(response.data);
          setVoucher(response.data);
          // setEditedVoucher(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }, [filtersNoDate, filtersWithDate]);

  async function remove(id) {
    deleteVoucher(id).then(() => {
      let newArr = [...voucher].filter((s) => s.id !== id);
      setVoucher(newArr);
      notification.success({
        message: "DELETE VOUCHER",
        description: "Delete Voucher successfully",
      });
      history.push("/voucher");
      return {
        success: true,
      };
    });
  }

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
      console.log(filtersNoDate);
    } else {
      item = { ...filtersWithDate };
      item[name] = value;
      setFiltersWithDate(item);
      console.log(filtersWithDate);
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
      console.log(filtersWithDate);
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
      item = { ...filtersWithDate };
      item["dateStart"] = formattedDateStart;
      item["dateEnd"] = formattedDateEnd;
      setFiltersWithDate(item);
    } else {
      item = { ...filtersNoDate };
      setFiltersNoDate(item);
      console.log(filtersNoDate);
    }
  }

  function search1() {
    const paramsString = queryString.stringify(filtersNoDate);
    searchNoDate(paramsString)
      .then((response) => {
        // console.log(response.data);
        setVoucher(response.data);
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
        setVoucher(response.data);
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

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["5"]}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShopOutlined />}>
              <Link to="/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
              <Link to="/product">Product</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<GiftOutlined />}>
              <Link to="/voucher">Voucher</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<LogoutOutlined />}>
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
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
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Text style={{ fontSize: "24px", color: "blue" }} strong>
              VOUCHER
            </Text>
            {/* <Row gutter={[16, 16]}>
        <Col
                xl={6}
                lg={24}
                xs={24}
                style={{
                    marginTop: "52px",
                }}
            >

        </Col>
        <Col xl={18} xs={24}>

        </Col>
        </Row> */}
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
                        <Form.Item label={t("Search")} name="q">
                          <Input
                            name="key"
                            placeholder={t("Code, Name")}
                            prefix={<SearchOutlined />}
                            onChange={handleChangeSearch}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Status")} name="status">
                          <Select
                            name="status"
                            allowClear
                            onChange={handleChangeStatus}
                            placeholder={t("Status")}
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
                          <Select
                            // {...storeSelectProps}
                            allowClear
                            // placeholder={t("orders.filter.store.placeholder")}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Filter")} name="user">
                          <Select
                            // {...userSelectProps}
                            allowClear
                            // placeholder={t("orders.filter.user.placeholder")}
                          />
                        </Form.Item>
                      </Col> */}
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
                {/* <Link to="/voucher/new">
                    <Button style={{ marginLeft: "1000px" }}> 
                        <FaPlus className="add-icon" />
                    </Button>
                </Link> */}

                <CreateVoucher />

                <List>
                  <Table
                    rowKey="id"
                    dataSource={voucher}
                    scroll={{ x: "max-content" }}
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: false,
                      showTotal: (total) => `Tổng số ${total} mục`,
                      showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                    }}
                  >
                    <Table.Column
                      key="id"
                      dataIndex="id"
                      title={t("ID")}
                      render={(text, record) => <span>{record.id}</span>}
                    />
                    <Table.Column
                      key="status"
                      dataIndex="status"
                      title={t("Status")}
                      render={(text, record) => (
                        <span>
                          {record.status === 0 ? (
                            <Badge
                              className="site-badge-count-109"
                              count={"Hoạt động"}
                              style={{ backgroundColor: "#52c41a" }}
                            />
                          ) : (
                            <Badge count={"Không hoạt động"} />
                          )}
                        </span>
                      )}
                    />
                    <Table.Column
                      key="code"
                      dataIndex="code"
                      title={t("Code")}
                      render={(text, record) => <span>{record.code}</span>}
                    />
                    <Table.Column
                      key="name"
                      dataIndex="name"
                      title={t("Name")}
                      render={(text, record) => <span>{record.name}</span>}
                    />
                    <Table.Column
                      key="dateStart"
                      dataIndex="dateStart"
                      title={t("DateStart")}
                      render={(text, record) => <span>{record.dateStart}</span>}
                    />
                    <Table.Column
                      key="dateEnd"
                      dataIndex="dateEnd"
                      title={t("DateEnd")}
                      render={(text, record) => <span>{record.dateEnd}</span>}
                    />
                    <Table.Column
                      key="conditionsApply"
                      dataIndex="conditionsApply"
                      title={t("ConditionsApply")}
                      render={(text, record) => (
                        <span>{record.conditionsApply}</span>
                      )}
                    />
                    <Table.Column
                      key="valueVoucher"
                      dataIndex="valueVoucher"
                      title={t("ValueVoucher")}
                      render={(text, record) => (
                        <span>{record.valueVoucher}</span>
                      )}
                    />
                    <Table.Column
                      key="valueMinimum"
                      dataIndex="valueMinimum"
                      title={t("ValueMinimum")}
                      render={(text, record) => (
                        <span>{record.valueMinimum}</span>
                      )}
                    />
                    <Table.Column
                      key="valueMaximum"
                      dataIndex="valueMaximum"
                      title={t("ValueMaximum")}
                      render={(text, record) => (
                        <span>{record.valueMaximum}</span>
                      )}
                    />
                    <Table.Column
                      key="typeVoucher"
                      dataIndex="typeVoucher"
                      title={t("TypeVoucher")}
                      render={(text, record) => (
                        <span>{record.typeVoucher}</span>
                      )}
                    />
                    <Table.Column
                      key="quantity"
                      dataIndex="quantity"
                      title={t("Quantity")}
                      render={(text, record) => <span>{record.quantity}</span>}
                    />
                    <Table.Column
                      key="actions"
                      dataIndex="actions"
                      title={t("Action")}
                      fixed="right"
                      align="center"
                      render={(text, record) => (
                        <span>
                          {/* <Button type="danger" onClick={() => remove(record.id)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                        {/* <Link to={"/voucher/" + record.id}> */}
                          {/* <Button type="danger" onClick={() => handleEditClick(record)}>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Button> */}
                          {/* </Link> */}
                          {/* <Link to={"/voucher/update/" + record.id}>
                                            <Button type="danger">
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </Button>
                                        </Link> */}
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
                                  onClick={() => remove(record.id)}
                                >
                                  Delete
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
                                  onClick={() => handleEditClick(record)}
                                >
                                  Edit
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
            <section>
              <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                width={1000}
                footer={null}
                bodyStyle={{ minHeight: "450px" }}
              >
                <UpdateVoucher editedVoucher={editedVoucher} />
              </Modal>
            </section>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default VoucherDisplay;
