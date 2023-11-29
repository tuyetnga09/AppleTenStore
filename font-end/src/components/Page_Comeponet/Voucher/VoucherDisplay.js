import { useEffect, useState, useRef} from "react";
import {
  readAll,
  deleteVoucher,
  add,
  detail,
  update,
  searchNoDate,
  searchWithDate,
  updateStatusVoucher,
  returnStatusVoucher
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
  UnorderedListOutlined,
  FileDoneOutlined,
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
  InputNumber,
  Space,
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
import { DateField } from "@refinedev/antd";
import { getOne, updateMoney } from "../../../service/Point/point.service";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const { RangePicker } = DatePicker;
const { SubMenu } = Menu;
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblePoint, setIsModalVisiblePoint] = useState(false); // Trạng thái hiển thị Modal
  const [load, setLoad] = useState(true);
  const toast = useRef(null);

  // Hàm để hiển thị Modal khi cần
  const handleEditClick = (record) => {
    setEditedVoucher(record);
    setIsModalVisible(true);
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setEditedVoucher([]);
    setIsModalVisible(false);
  };

  const handlePointClick = (record) => {
    // setEditedVoucher(record);
    setIsModalVisiblePoint(true);
  };

  // Hàm để ẩn Modal
  const handleCancelPoint = () => {
    // setEditedVoucher([]);
    setIsModalVisiblePoint(false);
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
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const [pointMoney, setPointMoney] = useState(0);
  const [money, setMoney] = useState(0);
  function handleChangeMoneyPoint(value) {
    setMoney(parseInt(value));
  }
  const updateMoneyPoint = () => {
    updateMoney(money)
      .then((res) => {
        notification.success({
          message: "Cập nhật thành công!",
        });
        setIsModalVisiblePoint(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
    if (storedUser?.roles !== "ADMIN" || storedUser === null) {
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
    }
  }, [filtersNoDate, filtersWithDate, load]);

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

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Xin mời tiếp tục.",
      life: 3000,
    });
  };

  const callUpdateStatusVoucher = (id) => {
    updateStatusVoucher(id)
      .then((response) => {
        notification.success({
          message: "Voucher đã ngừng hoạt động!",
        });
        // setVoucher(response.data);
        setLoad(!load);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmCallUpdateStatusVoucher = (id) => {
    confirmDialog({
      message: "Bạn chắc chắn muốn ngừng voucher?",
      header: "VOUCHER",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => callUpdateStatusVoucher(id),
      reject,
    });
  };

  const callReturnStatusVoucher = (id) => {
    returnStatusVoucher(id)
      .then((response) => {
        notification.success({
          message: "Voucher đã hoạt động trở lại!",
        });
        // setVoucher(response.data);
        setLoad(!load);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["5"]}>
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
            <Menu.Item key="2" icon={<ShopOutlined />}>
              <Link to="/orders">Quản lý đơn hàng</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/users">Quản lý người dùng</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
              <Link to="/product">Quản lý sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<GiftOutlined />}>
              <Link to="/voucher">Quảng lý Voucher</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UnorderedListOutlined />}>
              <Link to="/categories">Thể loại</Link>
            </Menu.Item>
            <SubMenu
              key="8"
              title="Chi tiết sản phẩm"
              icon={<AppstoreAddOutlined />}
            >
              <Menu.Item key="8">
                <Link to="/admin/product-detail">SKU</Link>
              </Menu.Item>
              <Menu.Item key="color">
                <Link to="/product-detail/color">Color</Link>
              </Menu.Item>
              <Menu.Item key="capacity">
                <Link to="/product-detail/capacity">Capacity</Link>
              </Menu.Item>
              <Menu.Item key="ram">
                <Link to="/product-detail/ram">RAM</Link>
              </Menu.Item>
              <Menu.Item key="chip">
                <Link to="/product-detail/chip">Chip</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="7" icon={<LogoutOutlined />}>
              <Link to="/logout">Đăng xuất</Link>
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
                <Card title={t("Tìm kiếm")}>
                  <Form>
                    <Row gutter={[10, 0]} align="bottom">
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Tìm kiếm")} name="q">
                          <Input
                            name="key"
                            placeholder={t("Mã voucher, Tên")}
                            prefix={<SearchOutlined />}
                            onChange={handleChangeSearch}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Trạng thái")} name="status">
                          <Select
                            name="status"
                            allowClear
                            onChange={handleChangeStatus}
                            placeholder={t("Trạng thái")}
                          >
                            {orderSelectProps.options.map((st) => {
                              return (
                                <Option value={st.value}>{st.label}</Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xl={24} md={8} sm={12} xs={24}>
                        <Form.Item label={t("Ngày")} name="createdAt">
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
                            {t("Tìm kiếm")}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
                {/* <Button onClick={handlePointClick}>Point</Button> */}
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
                      title={t("Trạng thái")}
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
                      title={t("Mã Voucher")}
                      render={(text, record) => <span>{record.code}</span>}
                    />
                    <Table.Column
                      key="name"
                      dataIndex="name"
                      title={t("Tên")}
                      render={(text, record) => <span>{record.name}</span>}
                    />
                    <Table.Column
                      key="dateStart"
                      dataIndex="dateStart"
                      title={t("Ngày bắt đầu")}
                      render={(text, record) => (
                        <span>
                          <DateField
                            value={record.dateStart}
                            format="DD/MM/YYYY"
                          />
                        </span>
                      )}
                    />
                    <Table.Column
                      key="dateEnd"
                      dataIndex="dateEnd"
                      title={t("Ngày kết thúc")}
                      render={(text, record) => (
                        <span>
                          <DateField
                            value={record.dateEnd}
                            format="DD/MM/YYYY"
                          />
                        </span>
                      )}
                    />
                    {/* <Table.Column
                      key="conditionsApply"
                      dataIndex="conditionsApply"
                      title={t("ConditionsApply")}
                      render={(text, record) => (
                        <span>
                          {parseFloat(record.conditionsApply).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </span>
                      )}
                    /> */}
                    <Table.Column
                      key="valueVoucher"
                      dataIndex="valueVoucher"
                      title={t("Giá trị Voucher")}
                      render={(text, record) => (
                        <span>
                          {parseFloat(record.valueVoucher).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </span>
                      )}
                    />
                    <Table.Column
                      key="valueMinimum"
                      dataIndex="valueMinimum"
                      title={t("Giá trị ĐH tối hiểu")}
                      render={(text, record) => (
                        <span>
                          {parseFloat(record.valueMinimum).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </span>
                      )}
                    />
                    <Table.Column
                      key="valueMaximum"
                      dataIndex="valueMaximum"
                      title={t("Giá trị ĐH tối đa")}
                      render={(text, record) => (
                        <span>
                          {parseFloat(record.valueMaximum).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </span>
                      )}
                    />
                    {/* <Table.Column
                      key="typeVoucher"
                      dataIndex="typeVoucher"
                      title={t("TypeVoucher")}
                      render={(text, record) => (
                        <span>
                          {parseFloat(record.typeVoucher).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </span>
                      )}
                    /> */}
                    <Table.Column
                      key="quantity"
                      dataIndex="quantity"
                      title={t("Số lượng")}
                      render={(text, record) => <span>{record.quantity}</span>}
                    />
                    <Table.Column
                      key="actions"
                      dataIndex="actions"
                      title={t("Sự kiện")}
                      fixed="right"
                      align="center"
                      render={(text, record) => (
                        <span>
                        {record.status === 0 ? (
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
                                  onClick={() => confirmCallUpdateStatusVoucher(record.id)}
                                >
                                  Dừng hoạt động
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
                                  Sửa Voucher
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
                          ) : record.status === 1 ? (
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
                                    onClick={() =>
                                      callReturnStatusVoucher(record.id)
                                    }
                                  >
                                    Kích hoạt
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
            <section>
              <Modal
                visible={isModalVisiblePoint}
                onCancel={handleCancelPoint}
                width={550}
                footer={null}
                bodyStyle={{ minHeight: "100px" }}
              >
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={() => updateMoneyPoint()}
                  // onFinishFailed={() => console.log("not ok")}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Số tiền quy đổi"
                    name="pointsConsumptionMoney"
                    rules={[
                      {
                        required: true,
                        message: "Please input your money!",
                      },
                    ]}
                  >
                    <Space direction="vertical">
                      <InputNumber
                        addonBefore="1 điểm ="
                        addonAfter="₫"
                        defaultValue={pointMoney}
                        min={0}
                        required
                        onChange={handleChangeMoneyPoint}
                      />
                    </Space>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </section>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default VoucherDisplay;
