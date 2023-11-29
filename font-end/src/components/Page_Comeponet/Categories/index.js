import { readAllDashboard } from "../../../service/category.service";
import { listProductByCategories } from "../../../service/product.service";
import React, { useEffect, useState } from "react";
import {
  List,
  useTable,
  BooleanField,
  useEditableTable,
  SaveButton,
  NumberField,
  DateField,
  useDrawerForm,
} from "@refinedev/antd";
import {
  FileDoneOutlined,
  FormOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Table,
  Space,
  Form,
  Button,
  Input,
  Checkbox,
  Dropdown,
  Menu,
  Avatar,
  Grid,
  Modal,
  notification,
} from "antd";
import AvtProduct from "../../custumer_componet/avtProduct";
import { Row, Col, Card, Typography, Layout, theme } from "antd";
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
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HeaderDashBoard from "../../Page_Comeponet/header/index";
import moment from "moment";
import EditProduct from "../../product_component/Product/crud/edit";
import SubMenu from "antd/es/menu/SubMenu";
const { Text } = Typography;
const { Header, Sider, Content } = Layout;

export const CategoryList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const storedUser = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    if (storedUser?.roles !== "ADMIN" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      readAllDashboard()
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["7"]}>
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
              minHeight: 600,
              background: colorBgContainer,
            }}
          >
            <List>
              <Form>
                <Table
                  dataSource={categories}
                  expandable={{
                    expandedRowRender: !breakpoint.xs
                      ? expandedRowRender
                      : undefined,
                  }}
                  pagination={{
                    pageSize: 5,
                    showSizeChanger: false,
                    showTotal: (total) => `Tổng số ${total} mục`,
                    showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                  }}
                  rowKey="id"
                >
                  <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record.name}
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title="Active"
                    render={(text, record) => {
                      return (
                        <Form.Item
                          name="isActive"
                          style={{ margin: 0 }}
                          valuePropName="checked"
                        >
                          {record.status === 0 ? (
                            <BooleanField value={true} />
                          ) : (
                            <BooleanField value={false} />
                          )}
                        </Form.Item>
                      );
                    }}
                  />
                  <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    align="center"
                    render={(_text, record) => {
                      return (
                        <Dropdown
                          overlay={moreMenu(record)}
                          trigger={["click"]}
                        >
                          <MoreOutlined
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              fontSize: 24,
                            }}
                          />
                        </Dropdown>
                      );
                    }}
                  />
                </Table>
              </Form>
            </List>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const CategoryProductsTable = ({ record }) => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal
  const [product, setProduct] = useState({});
  const editShow = (product) => {
    setProduct(product);
    setIsModalVisible(true);
    console.log(product);
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    listProductByCategories(`id=${record.id}`)
      .then((res) => {
        setProducts(res.data);
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
        onClick={() => editShow(record)}
      >
        Edit
      </Menu.Item>
    </Menu>
  );

  return (
    <List title="Products" createButtonProps={undefined}>
      <Table
        rowKey="id"
        dataSource={products}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total) => `Tổng số ${total} mục`,
          showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
        }}
      >
        <Table.Column
          dataIndex="images"
          render={(text, record) => (
            <AvtProduct size={74} product={record.id} />
          )}
          width={200}
        />
        <Table.Column key="name" dataIndex="name" title="Name" />
        <Table.Column
          align="right"
          key="price"
          dataIndex="price"
          title="Price"
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
          key="isActive"
          dataIndex="isActive"
          title="Active"
          render={(value, record) => {
            return record.status === 0 ? (
              <BooleanField value={true} />
            ) : (
              <BooleanField value={false} />
            );
          }}
        />
        <Table.Column
          key="createdAt"
          dataIndex="createdAt"
          title="CreatedAt"
          render={(value, record) => (
            <DateField value={record.dateCreate} format="DD/MM/YYYY" />
          )}
          sorter={(a, b) =>
            moment(a.dateCreate).unix() - moment(b.dateCreate).unix()
          }
        />
        <Table.Column
          dataIndex="products_actions"
          title="Actions"
          render={(_, record) => (
            <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
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
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={null}
        bodyStyle={{ minHeight: "350px" }}
      >
        <EditProduct
          // drawerProps={editDrawerProps}
          // formProps={editFormProps}
          // saveButtonProps={editSaveButtonProps}
          product={product}
        />
      </Modal>
    </List>
  );
};

const expandedRowRender = (record) => {
  return <CategoryProductsTable record={record} />;
};

export default CategoryList;
