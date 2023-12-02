import React, { useEffect, useState, useRef } from "react";
import {
  returnDeleteAll,
  returnProduct,
} from "../../../service/product.service";
import Pagination from "./Paging";
import queryString from "query-string";

import {
  Typography,
  Row,
  Col,
  List as AntdList,
  Input,
  Form,
  Modal,
  ModalProps,
  Avatar,
  Card,
  Divider,
  InputNumber,
  Dropdown,
  Menu,
  Button,
  theme,
  Layout,
  notification,
} from "antd";
import {
  SearchOutlined,
  CloseCircleOutlined,
  FormOutlined,
  MoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,
  GiftOutlined,
  LogoutOutlined,
  ShopOutlined,
  FileDoneOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { StyledStoreProducts } from "./Interface/index";
import { NumberField } from "@refinedev/antd";
import CreateProduct from "./crud/create";
// import "../css/index.css";
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
import { Link, useHistory } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import { Toast } from "primereact/toast";
import { QueryClient, QueryClientProvider } from "react-query";
import AvatarProduct from "./AvatarProduct";
import PriceProduct from "../../Page_Comeponet/page/PriceProducts";
import SubMenu from "antd/es/menu/SubMenu";
const queryClient = new QueryClient();
const { Header, Sider, Content } = Layout;

const { Text, Paragraph } = Typography;
const StoreProducts = ({}) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const toast = useRef(null);

  const acceptReturn = (id) => {
    handleDelete(id);
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm2 = (id) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => acceptReturn(id),
      reject,
    });
  };
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal

  // Hàm để hiển thị Modal khi cần
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const [item, setItem] = useState({
  //   id: 1,
  //   name: "Iphone 11",
  //   description: "Zin đét",
  //   price: 99,
  //   stock: 1,
  // });

  function updateStock() {
    return 1;
  }

  const [display, setDisplay] = useState([]);

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    totalRows: 1,
  });

  const [filters, setFilters] = useState({
    page: 0,
    key: "",
  });

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const storedUser = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    if (storedUser?.roles === "CUSTOMER" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      const paramsString = queryString.stringify(filters);
      returnDeleteAll(paramsString)
        .then((response) => {
          console.log(response.data);
          setDisplay(response.data.content);
          setPagination(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }, [filters]);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { page: 0, key: "" };
    item[name] = value;
    setFilters(item);
  }

  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }

  async function handleDelete(id) {
    returnProduct(id).then(() => {
      let newArr = [...display].filter((s) => s.id !== id);
      setDisplay(newArr);
    });
    history.push("/product");
  }

  return (
    <>
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
            <Menu.Item key="1" icon={<FileDoneOutlined />}>
              <Link to="/sell">BÁN HÀNG TẠI QUẦY</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Thống kê</Link>
            </Menu.Item>
            <SubMenu key="2" title="Quản lý đơn hàng" icon={<ShopOutlined />}>
              <Menu.Item key="2" icon={<ShopOutlined />}>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
              <Menu.Item key="11" icon={<ShopOutlined />}>
                <Link to="/orderBackProduct">OrderBackProducts</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/users">Quản lý người dùng</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<AppstoreAddOutlined />}>
              <Link to="/product">Quản lý sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<GiftOutlined />}>
              <Link to="/voucher">Quản lý Voucher</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<UnorderedListOutlined />}>
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
            <Toast ref={toast} />
            <ConfirmDialog />
            <QueryClientProvider client={queryClient}>
              <main>
                {/* <aside>
              <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand href="#">Navbar</Navbar.Brand>
                </Container>
              </Navbar>
            </aside> */}
                <section>
                  <Form
                    style={{ marginTop: "24px", marginLeft: "30px" }}
                    // {...searchFormProps}
                    // form={searchForm}
                    // onValuesChange={() => onSearch()}
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={18}>
                        <StyledStoreProducts>
                          <Text style={{ fontSize: "24px" }} strong>
                            {/* {t("stores.storeProducts")} */}
                            Sản phẩm đã xóa
                          </Text>
                          <Form.Item name="name" noStyle>
                            <Input
                              style={{ width: "300px" }}
                              placeholder={"Product Search"}
                              suffix={<SearchOutlined />}
                              onChange={handleChange}
                              name="key"
                            />
                          </Form.Item>
                          <Link to="/product">
                            <Button>Trở lại</Button>
                          </Link>
                        </StyledStoreProducts>
                        {/* <AntdList
                      grid={{
                        gutter: 8,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                      }}
                      style={{
                        height: "100%",
                        maxHeight: "548px",
                        overflow: "auto",
                        paddingRight: "4px",
                      }}
                      {...listProps}
                      dataSource={mergedData as IProduct[]}
                      renderItem={(item) => (
                        <ProductItem
                          item={item}
                          // updateStock={updateStock}
                          // editShow={showEdit}
                        />
                      )} */}
                        {/* /> */}
                      </Col>
                    </Row>

                    <Row>
                      {display.map((item) => {
                        return (
                          <Col key={item.id}>
                            <Card
                              style={{
                                margin: "8px",
                                opacity: item.stock <= 0 ? 0.5 : 1,
                              }}
                              bodyStyle={{ height: "500px" }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  right: "5px",
                                }}
                              >
                                <Dropdown
                                  overlay={
                                    <Menu mode="vertical">
                                      <Menu.Item
                                        key="1"
                                        disabled={item.stock <= 0}
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
                                        onClick={() => confirm2(item.id)}
                                      >
                                        Return
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
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  height: "100%",
                                }}
                              >
                                <div style={{ textAlign: "center" }}>
                                  <AvatarProduct
                                    product={item.id}
                                  ></AvatarProduct>
                                </div>
                                <Divider />
                                <Paragraph
                                  ellipsis={{ rows: 2, tooltip: true }}
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: 800,
                                    marginBottom: "8px",
                                  }}
                                >
                                  {item.name}
                                </Paragraph>
                                <Paragraph
                                  ellipsis={{ rows: 3, tooltip: true }}
                                  style={{ marginBottom: "8px" }}
                                >
                                  {item.description}
                                </Paragraph>
                                <Text
                                  className="item-id"
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    color: "#999999",
                                  }}
                                >
                                  #{item.id}
                                </Text>
                                {/* <NumberField
                                  style={{
                                    fontSize: "24px",
                                    fontWeight: 500,
                                    marginBottom: "8px",
                                  }}
                                  options={{
                                    currency: "VND",
                                    style: "currency",
                                  }}
                                  value={item.price}
                                /> */}
                                <PriceProduct product={item.id}></PriceProduct>
                                {/* {updateStock && (
                            <div id="stock-number">
                              <InputNumber
                                size="large"
                                keyboard
                                min={0}
                                value={item.stock || 0}
                                // onChange={(value: number | null) => updateStock(value ?? 0, item)}
                                style={{ width: "100%" }}
                              />
                            </div>
                          )} */}
                              </div>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>

                    <Row>
                      <Col xs={0} sm={6}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "40px",
                            marginBottom: "16px",
                          }}
                        >
                          <Text style={{ fontWeight: 500 }}>
                            {/* {t("stores.tagFilterDescription")} */}
                          </Text>
                        </div>
                        <Form.Item name="categories">
                          {/* <ProductCategoryFilter /> */}
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </section>
              </main>
            </QueryClientProvider>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default StoreProducts;
