import {
  readAllProduct,
  readAllSku,
  getAllImeisWhereIdSku,
  getAllImeiWhereIdSkuAndStatus,
  deleteProduct,
  returnProduct,
  deleteSku,
  returnSku,
} from "../../../../service/product_detail/sku/sku.service";
// import { readAllUserByRole } from "../../../service/User/user.service";
import { useEffect, useState, useRef } from "react";
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
// import AvtProduct from "../../custumer_componet/avtProduct";
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
  CloseCircleOutlined,
  CheckCircleOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import HeaderDashBoard from "../../header/index";
import moment from "moment";
import "../css/index.css";
import AvtProduct from "../../../custumer_componet/avtProduct";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

// import EditAccount from "./edit";
const { Text } = Typography;
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export const AccountList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [dataProducts, setDataProducts] = useState([]);
  useEffect(() => {
    readAllProduct()
      .then((res) => {
        setDataProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //delete product
  const handleDeleteProduct = (idProduct) => {
    deleteProduct(idProduct)
      .then((res) => {
        readAllProduct()
          .then((res) => {
            setDataProducts(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        if (res.data === true) {
          toast.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Đã Xoá Sản Phẩm.",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "warn",
            summary: "THÔNG BÁO THẤT BẠI!",
            detail: "Xoá Sản Phẩm Thất Bại!.",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //config khi xoá product - phongnh
  const toast = useRef(null);
  const rejectDeleteProduct = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục thao tác.",
      life: 3000,
    });
  };
  const confirmDeleteProduct = (idProduct) => {
    console.log(idProduct + " idProduc1t");

    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "Xác Nhận Xoá Sản Phẩm?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleDeleteProduct(idProduct),
      reject: () => rejectDeleteProduct(),
    });
  };

  //return product
  const handleReturnProduct = (idProduct) => {
    returnProduct(idProduct)
      .then((res) => {
        readAllProduct()
          .then((res) => {
            setDataProducts(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        if (res.data === true) {
          toast.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Đã Khôi Phục sản phẩm.",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //config khi return product - phongnh
  const rejectTurnProduct = () => {
    toast.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục thao tác.",
      life: 3000,
    });
  };
  const confirmReturnProduct = (idProduct) => {
    console.log(idProduct + " idProduc1t");

    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "Xác Nhận Khôi Phục Sản Phẩm?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleReturnProduct(idProduct),
      reject: () => rejectTurnProduct(),
    });
  };

  const moreMenu = (product) => (
    <>
      {product.statusProduct === 0 ? (
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
              <CloseCircleOutlined
                style={{
                  color: "red",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              />
            }
            onClick={() => {
              confirmDeleteProduct(product.idProduct);
            }}
          >
            Delete
          </Menu.Item>
          <Menu.Item
            key="accept1"
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
              // setEditId(record.id);
            }}
          >
            Edit
          </Menu.Item>
        </Menu>
      ) : product.statusProduct === 1 ? (
        <Menu
          mode="vertical"
          onClick={({ domEvent }) => domEvent.stopPropagation()}
        >
          <Menu.Item
            key="accept2"
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
            onClick={() => {
              confirmReturnProduct(product.idProduct);
            }}
          >
            Return
          </Menu.Item>
        </Menu>
      ) : (
        <WarningFilled
          value={false}
          style={{
            color: "#FFCC00",
          }}
        />
      )}
    </>
  );

  const breakpoint = Grid.useBreakpoint();

  const [openKeys, setOpenKeys] = useState([]);
  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };
  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["sku"]}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
          >
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
            <SubMenu
              // key="8"
              title="Product-Detail"
              icon={<AppstoreAddOutlined />}
            >
              <Menu.Item key="sku">
                <Link to="/product-detail/sku">SKU</Link>
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
                  dataSource={dataProducts}
                  expandable={{
                    expandedRowRender: !breakpoint.xs
                      ? expandedRowRender
                      : undefined,
                  }}
                  rowKey="idProduct"
                  pagination={{
                    pageSize: 5,
                    showSizeChanger: false,
                    showTotal: (total) => `Tổng số ${total} phiên bản`,
                    showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
                  }}
                >
                  {/* mục này là ảnh */}
                  <Table.Column
                    dataIndex="images"
                    title="Ảnh"
                    render={(text, record) => (
                      <div
                        style={{
                          width: "150px",
                          align: "center",
                          margin: "outo",
                        }}
                      >
                        <AvtProduct size={74} product={record.idProduct} />
                      </div>
                    )}
                    width={105}
                  />
                  {/* tên sp */}
                  <Table.Column
                    key="title"
                    dataIndex="title"
                    title="Tên Sản Phẩm"
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record.nameProduct}
                        </Form.Item>
                      );
                    }}
                  />

                  {/* phiên bản */}
                  <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title="Phiên Bản"
                    sorter={(a, b) => a.sumSKU - b.sumSKU}
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record.sumSKU} - Phiên Bản
                        </Form.Item>
                      );
                    }}
                  />
                  {/* tổng máy đã bán sumImeiDaBan */}
                  <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title="Đã Bán"
                    sorter={(a, b) => a.sumImeiDaBan - b.sumImeiDaBan}
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record.sumImeiDaBan} - Máy
                        </Form.Item>
                      );
                    }}
                  />

                  {/* tổng máy trong giỏ hàng sumImeiTrongGioHang */}
                  <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title="Giỏ Hàng"
                    sorter={(a, b) =>
                      a.sumImeiTrongGioHang - b.sumImeiTrongGioHang
                    }
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record.sumImeiTrongGioHang} - Máy
                        </Form.Item>
                      );
                    }}
                  />
                  {/* tổng máy còn lại trong kho - sumImeiTrongKho */}
                  <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title="Trong Kho"
                    sorter={(a, b) => a.sumImeiTrongKho - b.sumImeiTrongKho}
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record.sumImeiTrongKho} - Máy
                        </Form.Item>
                      );
                    }}
                  />
                  {/* tổng máy không hoạt động - sumImeiNgungHoatDong */}
                  <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title="Ngưng Bán"
                    sorter={(a, b) =>
                      a.sumImeiNgungHoatDong - b.sumImeiNgungHoatDong
                    }
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record.sumImeiNgungHoatDong} - Máy
                        </Form.Item>
                      );
                    }}
                  />
                  {/* tổng máy - sumImei */}
                  <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title="Tổng Sản Phẩm"
                    sorter={(a, b) => a.sumImei - b.sumImei}
                    render={(text, record) => {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          {record.sumImei} - Máy
                        </Form.Item>
                      );
                    }}
                  />
                  {/* Trạng thái product - statusProduct */}
                  <Table.Column
                    key="isActive"
                    dataIndex="isActive"
                    title="Trạng Thái"
                    render={(text, record) => {
                      return record.statusProduct === 0 ? (
                        <CheckCircleOutlined
                          value={true}
                          style={{
                            color: "#52c41a",
                          }}
                        />
                      ) : record.statusProduct === 1 ? (
                        <CloseCircleOutlined
                          value={false}
                          style={{
                            color: "red",
                          }}
                        />
                      ) : (
                        <WarningFilled
                          value={false}
                          style={{
                            color: "#FFCC00",
                          }}
                        />
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
  const [dataSkus, setDataSkus] = useState([]);
  // const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [user, setUser] = useState({});
  const [dataSku, setDataSku] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const editShow = (user) => {
    setDataSku(user);
    setIsModalVisible(true);
    console.log(user);
  };
  // Hàm để ẩn Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteSkuWhereIdSku = (sku) => {
    deleteSku(sku.idSku, sku.idProduct)
      .then((res) => {
        console.log(res.data + " deleted118");
        if (res.data === true) {
          toast1.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Đã Xoá Phiên Bản Sản Phẩm.",
            life: 3000,
          });
          readAllSku(sku.idProduct)
            .then((res) => {
              setDataSkus(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO THẤT BẠI",
            detail: "Xoá Phiên Bản Sản Phẩm Thất Bại!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //config khi xoá sku - phongnh
  const toast1 = useRef(null);
  const rejectDeleteSku = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục thao tác.",
      life: 3000,
    });
  };
  const confirmDeleteSku = (sku) => {
    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "Xác Nhận Xoá Phiên Bản Sản Phẩm?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteSkuWhereIdSku(sku),
      reject: () => rejectDeleteSku(),
    });
  };

  //return sku
  const returnSkuWhereIdSku = (sku) => {
    returnSku(sku.idSku, sku.idProduct)
      .then((res) => {
        if (res.data === true) {
          toast1.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Đã Khôi Phục Phiên Bản Sản Phẩm.",
            life: 3000,
          });
          readAllSku(sku.idProduct)
            .then((res) => {
              setDataSkus(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO THẤT BẠI",
            detail: "Khôi Phục Phiên Bản Sản Phẩm Thất Bại!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //config khi xoá sku - phongnh
  const rejectReturnSku = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục thao tác.",
      life: 3000,
    });
  };
  const confirmReturnSku = (sku) => {
    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "Xác Nhận Xoá Phiên Bản Sản Phẩm?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => returnSkuWhereIdSku(sku),
      reject: () => rejectReturnSku(),
    });
  };

  useEffect(() => {
    readAllSku(record.idProduct)
      .then((res) => {
        setDataSkus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalVisible, record.idProduct]);

  // taoj 1 modal khi xem imei
  const [isModalVisibleImei, setIsModalVisibleImei] = useState(false); // Trạng thái hiển thị Modal
  //hàm mở modal imei
  const handleImeiOpen = (idSku) => {
    setDataIdSku(idSku);
    setIsModalVisibleImei(true);
  };
  // Hàm để ẩn Modal imei
  const handleCancelImei = () => {
    setDataIdSku([]);
    setDataImeisLoc([]);
    setSelectedOption("");
    setIsModalVisibleImei(false);
  };

  //list data imeis theo idSku
  const [dataImeisWhereIdSku, setDataImeisWhereIdSku] = useState([]);
  // idSku
  const [dataIdSku, setDataIdSku] = useState(null);

  // lấy ra list imei theo idSku
  const handleGetAllImei = (idSku) => {
    getAllImeisWhereIdSku(idSku)
      .then((res) => {
        setDataImeisWhereIdSku(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    handleImeiOpen(idSku);
  };

  const [selectedOption, setSelectedOption] = useState("");

  //khai bbáo list imei lọc thoe idSku and status
  const [dataImeisLoc, setDataImeisLoc] = useState([]);

  // Xử lý sự kiện thay đổi lựa chọn lấy list imei lọc thoe idSku and status
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    getAllImeiWhereIdSkuAndStatus(dataIdSku, event.target.value)
      .then((res) => {
        console.log(event.target.value);
        if (res.data.length === 0) {
          if (res.data.length === 0) {
            notification.warning({
              message: "Không có dữ liệu!",
            });
          }
        }
        setDataImeisLoc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const moreMenu2 = (sku) => (
    <>
      {sku.statusSku === 0 && sku.statusProduct === 0 ? (
        <Menu
          mode="vertical2"
          onClick={({ domEvent }) => domEvent.stopPropagation()}
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
            onClick={() => confirmDeleteSku(sku)}
          >
            Delete
          </Menu.Item>
        </Menu>
      ) : sku.statusSku === 1 && sku.statusProduct === 0 ? (
        <Menu
          mode="vertical2"
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
              <CheckCircleOutlined
                style={{
                  color: "#52c41a",
                  fontSize: 17,
                  fontWeight: 500,
                }}
              />
            }
            onClick={() => confirmReturnSku(sku)}
          >
            Return
          </Menu.Item>
        </Menu>
      ) : sku.statusProduct === 1 ? (
        <WarningFilled
          style={{
            color: "#FFCC00",
          }}
        />
      ) : (
        "!"
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
    <>
      <List title="Chi tiết sản phẩm" createButtonProps={undefined}>
        <Toast ref={toast1} />
        {/* <ConfirmDialog /> */}
        <Table
          rowKey="idSku"
          dataSource={dataSkus}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `Tổng số ${total} mục`,
            showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
          }}
        >
          <Table.Column
            dataIndex="images"
            title="Ảnh"
            render={(text, record) => (
              // <div style={{ width: "100px" }}>
              <AvtProduct product={record.idProduct} />
              // </div>
            )}
            width={150}
          />

          {/* tên sp */}
          <Table.Column
            key="nameProduct"
            dataIndex="nameProduct"
            title="Tên Sản Phẩm"
          />
          {/* sumSKU */}
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Phiên Bản"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>
                    {record.skuCapacity} - {record.skuColor}
                  </p>
                </Form.Item>
              );
            }}
          />
          {/* priceSKU  */}
          <Table.Column
            align="right"
            key="priceSKU"
            dataIndex="priceSKU"
            title="Giá Bán"
            sorter={(a, b) => a.priceSKU - b.priceSKU}
            render={(text, record) => {
              return record.priceSKU === null ? (
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
                  {parseFloat(record.priceSKU).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Form.Item>
              );
              // return (
              //   <Form.Item name="title" style={{ margin: 0 }}>
              //     {parseFloat(record.priceSKU).toLocaleString("vi-VN", {
              //       style: "currency",
              //       currency: "VND",
              //     })}
              //   </Form.Item>
              // );
            }}
          />
          {/* sumImeiDaBan */}
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Đã Bán"
            sorter={(a, b) => a.sumImeiDaBan - b.sumImeiDaBan}
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.sumImeiDaBan} - Máy</p>
                </Form.Item>
              );
            }}
          />

          {/* sumImeiTrongGioHang */}
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Giỏ Hàng"
            sorter={(a, b) => a.sumImeiTrongGioHang - b.sumImeiTrongGioHang}
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.sumImeiTrongGioHang} - Máy</p>
                </Form.Item>
              );
            }}
          />
          {/* sumImeiTrongKho */}
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Trong Kho"
            sorter={(a, b) => a.sumImeiTrongKho - b.sumImeiTrongKho}
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.sumImeiTrongKho} - Máy</p>
                </Form.Item>
              );
            }}
          />
          {/* sumImeiTrongKho */}
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Ngưng Bán"
            sorter={(a, b) => a.sumImeiNgungHoatDong - b.sumImeiNgungHoatDong}
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.sumImeiNgungHoatDong} - Máy</p>
                </Form.Item>
              );
            }}
          />
          {/*  sumImei */}
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Tổng Sản Phẩm"
            sorter={(a, b) => a.sumImei - b.sumImei}
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.sumImei} - Máy</p>
                </Form.Item>
              );
            }}
          />
          {/* <Table.Column
          key="sumImeiTrongKho"
          dataIndex="sumImeiTrongKho"
          title="Trong Kho"
        /> */}
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Trạng Thái"
            render={(value, record) => {
              return record.statusSku === 0 ? (
                <CheckCircleOutlined
                  value={true}
                  style={{
                    color: "#52c41a",
                  }}
                />
              ) : record.statusSku === 1 ? (
                <CloseCircleOutlined
                  value={false}
                  style={{
                    color: "red",
                  }}
                />
              ) : (
                // WarningFilled
                <WarningFilled
                  value={false}
                  style={{
                    color: "#FFCC00",
                  }}
                />
              );
            }}
          />
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Chi Tiết Imei"
            sorter={(a, b) => a.sumImei - b.sumImei}
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>
                    {record.idSku}

                    <button
                      type="button"
                      class="btn btn-secondary"
                      className="btn btn-primary btn-sm trash"
                      style={{
                        backgroundColor: "green",
                      }}
                      onClick={() => {
                        handleGetAllImei(record.idSku);
                        // handleAddImei(billDetail.idSKU, billDetail.id);
                        // setIndexTest(index);
                      }}
                    >
                      xem imei
                    </button>
                  </p>
                </Form.Item>
              );
            }}
          />
          <Table.Column
            dataIndex="products_actions"
            title="Actions"
            render={(_, record) => (
              <Dropdown overlay={moreMenu2(record)} trigger={["click"]}>
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
          {/* <EditAccount data={user} /> */}
        </Modal>
        {/* modal imei */}
        <Modal
          visible={isModalVisibleImei}
          onCancel={handleCancelImei}
          width={700}
          footer={null}
          bodyStyle={{ minHeight: "800px" }}
        >
          <div className="container py-15">
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
              {/* <p
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
            /> */}
              <p></p>
              {/* {dataImeiThatLac.length > 0 ? (
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
            )} */}

              {/* <Row> */}
              {/* <div className="col-3"> */}
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
                Danh Sách Imei Đã Chọn Của
              </p>

              <input
                id="id-imei-da-ban"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="key"
                // onChange={handleChangeImeisDaBan}
              />

              <p></p>
              <p style={{ textAlign: "center" }}>
                <select
                  id="selectOption"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="col-3 btn-loc"
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#009999",
                    color: "white",
                    width: "130px",
                  }}
                >
                  <option selected value="99">
                    Tất Cả
                  </option>
                  <option value="0">Trong Kho</option>
                  <option value="1">Đã Xoá</option>
                  <option value="2">Giỏ Hàng</option>
                  <option value="3">Đã Bán</option>
                </select>
                <Button
                  type="text"
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#006699",
                    color: "white",
                    width: "150px",
                    marginLeft: "18px",
                  }}
                  className="col-2 btn-xoa"
                  danger
                  // onClick={() => confirmDeleteImeiCheckBoxBillDetail()}
                >
                  Add Imei
                </Button>

                <Button
                  type="text"
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#ff7700",
                    color: "white",
                    width: "150px",
                    marginLeft: "9px",
                  }}
                  className="col-2 btn-xoa"
                  danger
                  // onClick={() => confirmDeleteImeiCheckBoxBillDetail()}
                >
                  Xoá Imeis
                </Button>

                <Button
                  type="text"
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#00CC33",
                    color: "white",
                    width: "150px",
                    marginLeft: "9px",
                  }}
                  className="col-2 btn-xoa"
                  danger
                  // onClick={() => confirmDeleteImeiCheckBoxBillDetail()}
                >
                  Khôi Phục
                </Button>

                <Button
                  type="text"
                  danger
                  style={{
                    border: "2px solid black",
                    backgroundColor: "red",
                    color: "white",
                    width: "150px",
                    marginLeft: "9px",
                  }}
                  className="col-2 btn-xoa"
                  // onClick={() => confirmDeleteAllImeiBillDetail()}
                >
                  Xoá All Imei
                </Button>
              </p>
              <div style={{ backgroundColor: "#66FFFF" }}>
                <Row>
                  <div>
                    <span>STT</span>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <span>Chọn Imei</span>
                  </div>
                  <div style={{ paddingLeft: "118px" }}>
                    <span>Mã Imei</span>
                  </div>
                  <div style={{ paddingLeft: "120px" }}>
                    <span>Trạng Thái</span>
                  </div>
                  <div style={{ paddingLeft: "33px" }}>
                    <span>Khôi Phục</span>
                  </div>
                  <div style={{ paddingLeft: "28px" }}>
                    <span>Acition</span>
                  </div>
                </Row>
              </div>
              <p></p>
              <div
                className="card-body"
                data-mdb-perfect-scrollbar="true"
                style={{
                  position: "relative",
                  height: 500, // điều chỉnh table dài ra
                  overflowY: "auto",
                }}
              >
                {dataImeisLoc.length === 0 ? (
                  <ul class="list-group mb-3">
                    {dataImeisWhereIdSku.map((imei, index) => (
                      <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between">
                          <span>{index + 1}</span>

                          <div
                            style={{
                              margin: "outo",
                              textAlign: "center",
                              width: "20px",
                            }}
                          >
                            {imei.status === 0 ? (
                              <input
                                type="checkbox"
                                value={imei.codeImeiDaBan}
                                // checked={selectedCheckboxes.includes(
                                //   imei.codeImeiDaBan
                                // )}
                                // onChange={handleCheckboxChange}
                              />
                            ) : imei.status === 1 ? (
                              <span>-</span>
                            ) : imei.status === 2 ? (
                              <span>-</span>
                            ) : imei.status === 3 ? (
                              <span>-</span>
                            ) : (
                              "!"
                            )}
                          </div>
                          {/* <input
                        type="checkbox"
                        value={imei.codeImeiDaBan}
                        // checked={selectedCheckboxes.includes(
                        //   imei.codeImeiDaBan
                        // )}
                        // onChange={handleCheckboxChange}
                      /> */}

                          <span style={{ paddingLeft: "10px" }}>
                            {imei.codeImei}
                          </span>
                          <div
                            style={{
                              margin: "outo",
                              textAlign: "center",
                              width: "80px",
                            }}
                          >
                            <span>
                              {imei.status === 0 ? (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "#FF99FF",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Trong Kho
                                </span>
                              ) : imei.status === 1 ? (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "red",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Đã Xoá
                                </span>
                              ) : imei.status === 2 ? (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "#99FF99",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Giỏ Hàng
                                </span>
                              ) : imei.status === 3 ? (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "#00FF66",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Đã Bán
                                </span>
                              ) : (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "#FFFF33",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  !
                                </span>
                              )}
                            </span>
                          </div>
                          <div
                            style={{
                              margin: "outo",
                              textAlign: "center",
                              width: "20px",
                            }}
                          >
                            {imei.status === 0 ? (
                              <span>-</span>
                            ) : imei.status === 1 ? (
                              <input
                                type="checkbox"
                                value={imei.codeImeiDaBan}
                                // checked={selectedCheckboxes.includes(
                                //   imei.codeImeiDaBan
                                // )}
                                // onChange={handleCheckboxChange}
                              />
                            ) : imei.status === 2 ? (
                              <span>-</span>
                            ) : imei.status === 3 ? (
                              <span>-</span>
                            ) : (
                              "!"
                            )}
                          </div>
                          {/* <strong>
                          <Button
                            type="text"
                            danger
                            // onClick={() =>
                            //   handleClearImeiDaBan(
                            //     imei.idImeiDaBan,
                            //     imei.codeImeiDaBan
                            //   )
                            // }
                          >
                            Hủy
                          </Button>
                        </strong> */}
                          {/* phongnh 1 */}
                          <div
                            style={{
                              // position: "absolute",
                              // top: "10px",
                              right: "5px",
                              paddingLeft: "12px",
                            }}
                          >
                            {imei.status === 0 ? (
                              <Dropdown
                                overlay={
                                  <Menu mode="vertical3">
                                    <Menu.Item
                                      key="1"
                                      // disabled={item.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      // icon={
                                      //   <CloseCircleOutlined
                                      //     style={{
                                      //       color: "red",
                                      //     }}
                                      //   />
                                      // }
                                      // onClick={() => confirm2(item.id)}
                                      // onClick={() => remove(item.id)}
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
                                      // onClick={() => openDetailModal(item)}
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
                            ) : imei.status === 1 ? (
                              <Dropdown
                                overlay={
                                  <Menu mode="vertical3">
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
                                      // onClick={() => openDetailModal(item)}
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
                            ) : imei.status === 2 ? (
                              <di
                                style={{
                                  // position: "absolute",
                                  // top: "10px",
                                  right: "5px",
                                  width: "35px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  textAlign: "center",
                                }}
                              >
                                <span>-</span>
                              </di>
                            ) : imei.status === 3 ? (
                              <di
                                style={{
                                  // position: "absolute",
                                  // top: "10px",
                                  right: "5px",
                                  width: "35px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  textAlign: "center",
                                }}
                              >
                                <span>-</span>
                              </di>
                            ) : (
                              "!"
                            )}
                          </div>
                        </li>
                      </ul>
                    ))}
                  </ul>
                ) : (
                  <ul class="list-group mb-3">
                    {dataImeisLoc.map((imei, index) => (
                      <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between">
                          <span>{index + 1}</span>

                          <div
                            style={{
                              margin: "outo",
                              textAlign: "center",
                              width: "20px",
                            }}
                          >
                            {imei.status === 0 ? (
                              <input
                                type="checkbox"
                                value={imei.codeImeiDaBan}
                                // checked={selectedCheckboxes.includes(
                                //   imei.codeImeiDaBan
                                // )}
                                // onChange={handleCheckboxChange}
                              />
                            ) : imei.status === 1 ? (
                              <span>-</span>
                            ) : imei.status === 2 ? (
                              <span>-</span>
                            ) : imei.status === 3 ? (
                              <span>-</span>
                            ) : (
                              "!"
                            )}
                          </div>
                          {/* <input
                      type="checkbox"
                      value={imei.codeImeiDaBan}
                      // checked={selectedCheckboxes.includes(
                      //   imei.codeImeiDaBan
                      // )}
                      // onChange={handleCheckboxChange}
                    /> */}

                          <span style={{ paddingLeft: "10px" }}>
                            {imei.codeImei}
                          </span>
                          <div
                            style={{
                              margin: "outo",
                              textAlign: "center",
                              width: "80px",
                            }}
                          >
                            <span>
                              {imei.status === 0 ? (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "#FF99FF",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Trong Kho
                                </span>
                              ) : imei.status === 1 ? (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "red",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Đã Xoá
                                </span>
                              ) : imei.status === 2 ? (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "#99FF99",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Giỏ Hàng
                                </span>
                              ) : imei.status === 3 ? (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "#00FF66",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Đã Bán
                                </span>
                              ) : (
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    paddingRight: "5px",
                                    backgroundColor: "#FFFF33",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  !
                                </span>
                              )}
                            </span>
                          </div>
                          <div
                            style={{
                              margin: "outo",
                              textAlign: "center",
                              width: "20px",
                            }}
                          >
                            {imei.status === 0 ? (
                              <span>-</span>
                            ) : imei.status === 1 ? (
                              <input
                                type="checkbox"
                                value={imei.codeImeiDaBan}
                                // checked={selectedCheckboxes.includes(
                                //   imei.codeImeiDaBan
                                // )}
                                // onChange={handleCheckboxChange}
                              />
                            ) : imei.status === 2 ? (
                              <span>-</span>
                            ) : imei.status === 3 ? (
                              <span>-</span>
                            ) : (
                              "!"
                            )}
                          </div>
                          {/* <strong>
                          <Button
                            type="text"
                            danger
                            // onClick={() =>
                            //   handleClearImeiDaBan(
                            //     imei.idImeiDaBan,
                            //     imei.codeImeiDaBan
                            //   )
                            // }
                          >
                            Huỷ
                          </Button>
                        </strong> */}
                          {/* phongnh 2 */}
                          <div
                            style={{
                              // position: "absolute",
                              // top: "10px",
                              right: "5px",
                              paddingLeft: "12px",
                            }}
                          >
                            {imei.status === 0 ? (
                              <Dropdown
                                overlay={
                                  <Menu mode="vertical4">
                                    <Menu.Item
                                      key="1"
                                      // disabled={item.stock <= 0}
                                      style={{
                                        fontWeight: 500,
                                      }}
                                      // icon={
                                      //   <CloseCircleOutlined
                                      //     style={{
                                      //       color: "red",
                                      //     }}
                                      //   />
                                      // }
                                      // onClick={() => confirm2(item.id)}
                                      // onClick={() => remove(item.id)}
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
                                      // onClick={() => openDetailModal(item)}
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
                            ) : imei.status === 1 ? (
                              <Dropdown
                                overlay={
                                  <Menu mode="vertical4">
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
                                      // onClick={() => openDetailModal(item)}
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
                            ) : imei.status === 2 ? (
                              <di
                                style={{
                                  // position: "absolute",
                                  // top: "10px",
                                  right: "5px",
                                  width: "35px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  textAlign: "center",
                                }}
                              >
                                <span>-</span>
                              </di>
                            ) : imei.status === 3 ? (
                              <di
                                style={{
                                  // position: "absolute",
                                  // top: "10px",
                                  right: "5px",
                                  width: "35px",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  textAlign: "center",
                                }}
                              >
                                <span>-</span>
                              </di>
                            ) : (
                              "!"
                            )}
                          </div>
                          {/* );
                          }}
                        /> */}
                        </li>
                      </ul>
                    ))}
                  </ul>
                )}
              </div>
              {/* </div> */}

              {/* <div className="col-3">
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
                  Danh Sách Imei Của
                </p> */}
              {/* <input
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
                  style={{
                    position: "relative",
                    height: 330,
                    overflowY: "auto",
                  }}
                >
                  {dataSeachImeis.length === 0 ? (
                    <ul class="list-group mb-3">
                      {dataImeiClick.map((imei, index) => (
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
                                  handleImeiClick(
                                    imei.codeImei,
                                    dataIdBillDetail
                                  )
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
                            <span style={{ paddingLeft: "10px" }}>
                              {imei.codeImei}
                              <br />
                            </span>
                            <strong>
                              <Button
                                type="text"
                                danger
                                onClick={() =>
                                  handleImeiClick(
                                    imei.codeImei,
                                    dataIdBillDetail
                                  )
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
                </div> */}
              {/* </div> */}
              {/* <div className="col-3">
                <p
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                    backgroundColor: "orange",
                  }}
                >
                  Danh Sách Imei Trong Giỏ Hàng
                </p>
              </div>
              <div className="col-3">
                <p
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                    backgroundColor: "orange",
                  }}
                >
                  Danh Sách Imei Không Hoạt Động
                </p>
              </div> */}
              {/* </Row> */}
            </div>
          </div>
        </Modal>
      </List>
    </>
  );
};

const expandedRowRender = (record) => {
  return <UserAccountTable record={record} />;
};

export default AccountList;
