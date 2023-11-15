import {
  listRoles,
  updateRole,
} from "../../../service/Account/account.service";
import { readAllUserByRole } from "../../../service/User/user.service";
// import { listProductByCategories } from "../../../service/product.service";
import { useEffect, useState } from "react";
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
import { FormOutlined, MoreOutlined, TeamOutlined } from "@ant-design/icons";
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
import EditAccount from "./edit";
const { Text } = Typography;
const { Header, Sider, Content } = Layout;

export const AccountList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [roles, setRoles] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const history = useHistory();
  useEffect(() => {
    if (storedUser?.roles !== "ADMIN" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      listRoles()
        .then((res) => {
          setRoles(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const moreMenu = (accounts) => (
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
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
            <Menu.Item key="7" icon={<LogoutOutlined />}>
              <Link to="/login">Logout</Link>
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
            <List>
              <Form>
                <Table
                  dataSource={roles}
                  expandable={{
                    expandedRowRender: !breakpoint.xs
                      ? expandedRowRender
                      : undefined,
                  }}
                  rowKey={(record, index) => index}
                  pagination={{
                    pageSize: 5,
                    showSizeChanger: false,
                    showTotal: (total) => `Tổng số ${total} mục`,
                    showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                  }}
                >
                  <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Title"
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record === "ADMIN"
                            ? "Admin"
                            : record === "CUSTOMER"
                            ? "Khách hàng"
                            : record === "NHAN_VIEN_BAN_HANG"
                            ? "Nhân viên bán hàng"
                            : record === "NHAN_VIEN_QUAN_LY"
                            ? "Nhân viên quản lý"
                            : ""}
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
                          <BooleanField value={true} />
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

const UserAccountTable = ({ record }) => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const editShow = (user) => {
    setUser(user);
    setIsModalVisible(true);
    console.log(user);
  };

  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editRole = (role, idUser) => {
    updateRole(role, idUser)
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "CẬP NHẬT",
            description: "Cập nhật thông tin thành công",
          });
          setIsUpdate(!isUpdate);
        } else {
          notification.error({
            message: "CẬP NHẬT",
            description: "Cập nhật thông tin thất bại",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    readAllUserByRole(record)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalVisible, isUpdate]);

  const moreMenu = (record1) => (
    <>
      {record === "ADMIN" ? (
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
              <TeamOutlined
                style={{
                  color: "yellow",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              />
            }
            onClick={() => editRole("NHAN_VIEN_BAN_HANG", record1.id)}
          >
            Nhân viên bán hàng
          </Menu.Item>
          <Menu.Item
            key="edit"
            style={{
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
            }}
            icon={
              <TeamOutlined
                style={{
                  color: "red",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              />
            }
            onClick={() => editRole("NHAN_VIEN_QUAN_LY", record1.id)}
          >
            Nhân viên quản lý
          </Menu.Item>
        </Menu>
      ) : record === "NHAN_VIEN_BAN_HANG" ? (
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
              <TeamOutlined
                style={{
                  color: "#52c41a",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              />
            }
            onClick={() => editRole("ADMIN", record1.id)}
          >
            Admin
          </Menu.Item>
          <Menu.Item
            key="edit"
            style={{
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
            }}
            icon={
              <TeamOutlined
                style={{
                  color: "red",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              />
            }
            onClick={() => editRole("NHAN_VIEN_QUAN_LY", record1.id)}
          >
            Nhân viên quản lý
          </Menu.Item>
        </Menu>
      ) : record === "NHAN_VIEN_QUAN_LY" ? (
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
              <TeamOutlined
                style={{
                  color: "#52c41a",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              />
            }
            onClick={() => editRole("ADMIN", record1.id)}
          >
            Admin
          </Menu.Item>
          <Menu.Item
            key="edit"
            style={{
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
            }}
            icon={
              <TeamOutlined
                style={{
                  color: "yellow",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              />
            }
            onClick={() => editRole("NHAN_VIEN_BAN_HANG", record1.id)}
          >
            Nhân viên bán hàng
          </Menu.Item>
        </Menu>
      ) : (
        ""
      )}
    </>
    // <Menu
    //   mode="vertical"
    //   onClick={({ domEvent }) => domEvent.stopPropagation()}
    // >
    //   <Menu.Item
    //     key="edit"
    //     style={{
    //       fontSize: 15,
    //       display: "flex",
    //       alignItems: "center",
    //       fontWeight: 500,
    //     }}
    //     icon={
    //       <FormOutlined
    //         style={{
    //           color: "#52c41a",
    //           fontSize: 17,
    //           fontWeight: 500,
    //         }}
    //       />
    //     }
    //     onClick={() => editShow(record)}
    //   >
    //     Edit
    //   </Menu.Item>
    // </Menu>
  );

  return (
    <List title="Users" createButtonProps={undefined}>
      <Table
        rowKey="id"
        dataSource={users}
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
          width={105}
        />
        <Table.Column key="fullName" dataIndex="fullName" title="Họ và tên" />
        <Table.Column key="email" dataIndex="email" title="Email" />
        <Table.Column
          align="right"
          key="phoneNumber"
          dataIndex="phoneNumber"
          title="Số điện thoại"
        />
        <Table.Column
          key="isActive"
          dataIndex="isActive"
          title="Active"
          render={(value, record) => {
            return record.status === "DANG_SU_DUNG" ? (
              <BooleanField value={true} />
            ) : (
              <BooleanField value={false} />
            );
          }}
        />
        <Table.Column
          key="dateOfBirth"
          dataIndex="dateOfBirth"
          title="Ngày sinh"
          render={(value, record) => (
            <DateField value={record.dateOfBirth} format="DD/MM/YYYY" />
          )}
          sorter={(a, b) =>
            moment(a.dateOfBirth).unix() - moment(b.dateOfBirth).unix()
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
        width={1500}
        footer={null}
        bodyStyle={{ minHeight: "350px" }}
      >
        <EditAccount data={user} />
      </Modal>
    </List>
  );
};

const expandedRowRender = (record) => {
  return <UserAccountTable record={record} />;
};

export default AccountList;
