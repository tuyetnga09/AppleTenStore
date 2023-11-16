import {
  Row,
  Col,
  Card,
  Typography,
  Layout,
  Menu,
  Button,
  theme,
  notification,
} from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import DailyRevenue from "../dashboard/dailyRevenue/index";
import DailyOrders from "../dashboard/dailyOrders/index";
import NewCustomers from "../dashboard/newCustomers/index";
import DeliveryMap from "../dashboard/deliveryMap/index";
import OrderTimeline from "../dashboard/orderTimeline/index";
import RecentOrders from "../dashboard/recentOrders/index";
import TrendingMenu from "../dashboard/trendingMenu/index";
import OffLayoutArea from "../offLayoutArea/index";
import HeaderDashBoard from "../header/index";
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
  UnorderedListOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
const { SubMenu } = Menu;
const { Text } = Typography;
const { Header, Sider, Content } = Layout;

const DashboardPage = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const history = useHistory();
  useEffect(() => {
    if (storedUser?.roles !== "ADMIN" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    }
  });

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="0">
              <img
                src="/img/logo.jpg"
                alt="Trang chủ Smartphone Store"
                title="Trang chủ Smartphone Store"
                style={{ width: "150px" }}
              />
            </Menu.Item>
            <Menu.Item key="0" icon={<FileDoneOutlined />}>
              <Link to="/sell">SELL OFFLINE</Link>
            </Menu.Item>
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
            <Menu.Item key="6" icon={<UnorderedListOutlined />}>
              <Link to="/categories">Categories</Link>
            </Menu.Item>
            <SubMenu
              key="8"
              title="Product-Detail"
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
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
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
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <HeaderDashBoard />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <OffLayoutArea />
            <Row gutter={[16, 16]}>
              <Col md={24}>
                <Row gutter={[16, 16]}>
                  <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                    <Card
                      bodyStyle={{
                        padding: 10,
                        paddingBottom: 0,
                      }}
                      style={{
                        background:
                          "url(https://example.admin.refine.dev/images/daily-revenue.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundSize: "cover",
                      }}
                    >
                      <DailyRevenue />
                    </Card>
                  </Col>
                  <Col xl={7} lg={12} md={24} sm={24} xs={24}>
                    <Card
                      bodyStyle={{
                        padding: 10,
                        paddingBottom: 0,
                      }}
                      style={{
                        background:
                          "url(https://example.admin.refine.dev/images/daily-order.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundSize: "cover",
                      }}
                    >
                      <DailyOrders />
                    </Card>
                  </Col>
                  <Col xl={7} lg={12} md={24} sm={24} xs={24}>
                    <Card
                      bodyStyle={{
                        padding: 10,
                        paddingBottom: 0,
                      }}
                      style={{
                        background:
                          "url(https://example.admin.refine.dev/images/new-orders.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundSize: "cover",
                      }}
                    >
                      <NewCustomers />
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col xl={17} lg={16} md={24} sm={24} xs={24}>
                <Card
                  bodyStyle={{
                    height: 550,
                    padding: 0,
                  }}
                  title={
                    <Text
                      strong /* style={{ fontSize: 24, fontWeight: 800 }} */
                    >
                      Doanh Thu Của Năm
                    </Text>
                  }
                >
                  <DeliveryMap />
                </Card>
              </Col>
              <Col xl={7} lg={8} md={24} sm={24} xs={24}>
                <Card
                  bodyStyle={{
                    height: 550,
                    overflowY: "scroll",
                  }}
                  title={
                    <Text strong style={{ textTransform: "capitalize" }}>
                      Timeline
                    </Text>
                  }
                >
                  <OrderTimeline />
                </Card>
              </Col>
              <Col xl={17} lg={16} md={24} sm={24} xs={24}>
                <Card
                  title={
                    <Text strong>Đơn hàng đã được đặt thành công hôm nay</Text>
                  }
                >
                  <RecentOrders />
                </Card>
              </Col>
              <Col xl={7} lg={8} md={24} sm={24} xs={24}>
                <Card
                  title={
                    <Text strong>Sản phẩm bán nhiều nhất 30 ngày gần đây</Text>
                  }
                >
                  <TrendingMenu />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardPage;
