import {
  readAllProduct,
  readAllSku,
  getAllImeisWhereIdSku,
  getAllImeiWhereIdSkuAndStatus,
  deleteProduct,
  returnProduct,
  deleteSku,
  returnSku,
  deleteImei,
  returnImei,
  addOneImei,
  checkGiaSku,
  getSkuIonAdmin,
  deleteImeiCheckbox,
  updateImeiCheckbox,
  deleteAllImei,
  returnAllImei,
  seachImeis,
  seachImeiThatLac,
  updateImei,
  detailImei,
} from "../../../../service/product_detail/sku/sku.service";
import {
  readImportImei,
  ImportImeiExcel,
} from "../../../../service/imei.service";
// import { readAllUserByRole } from "../../../service/User/user.service";
import React, { useEffect, useState, useRef } from "react";
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
  TeamOutlined,
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
  Warning,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HeaderDashBoard from "../../header/index";
import moment from "moment";
import "../css/index.css";
import AvtProduct from "../../../custumer_componet/avtProduct";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import * as XLSX from "xlsx";

// import EditAccount from "./edit";
const { Text } = Typography;
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export const AccountList = () => {
  // State để lưu trữ dữ liệu từ component con
  const [dataFromChild, setDataFromChild] = useState(null);

  // Hàm callback để nhận dữ liệu từ component con
  const receiveDataFromChild = (data) => {
    // Xử lý dữ liệu từ component con ở đây
    // Lưu trữ dữ liệu vào state
    setDataFromChild(data);
    if (data === true) {
      readAllProduct()
        .then((res) => {
          setDataProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [dataProducts, setDataProducts] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const history = useHistory();
  useEffect(() => {
    if (storedUser?.roles !== "ADMIN" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      readAllProduct()
        .then((res) => {
          setDataProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
  const expandedRowRender = (record) => {
    return (
      <UserAccountTable record={record} onSomeAction={receiveDataFromChild} />
    );
  };

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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["8"]}>
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
            <SubMenu key="2" title="Quản lý đơn hàng" icon={<ShopOutlined />}>
              <Menu.Item key="2" icon={<ShopOutlined />}>
                <Link to="/orders">Quản lý đơn hàng</Link>
              </Menu.Item>
              <Menu.Item key="11" icon={<ShopOutlined />}>
                <Link to="/orderBackProduct">Quản lý trả hàng</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/users">Quản lý người dùng</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
              <Link to="/product">Quản lý sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<GiftOutlined />}>
              <Link to="/voucher">Quản lý Voucher</Link>
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
              key="9"
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
                    showTotal: (total) => `Tổng số ${total} sản phẩm`,
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
const UserAccountTable = ({ record, onSomeAction }) => {
  //truyền thông tin ra bnagr bên ngoài
  const handleClick = () => {
    // Gọi hàm callback và truyền dữ liệu cần thiết lên
    onSomeAction(true);
  };
  const [dataSkus, setDataSkus] = useState([]);
  // const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [user, setUser] = useState({});

  const [isUpdate, setIsUpdate] = useState(false);
  const editShow = (user) => {
    // setDataSku(user);
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
      message: "Bạn chắc chắn khôi phục?",
      header: "Xác Nhận Khôi Phục Phiên Bản Sản Phẩm?",
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

  //  /* modal imei - phongnh */

  // taoj 1 modal khi xem imei
  const [isModalVisibleImei, setIsModalVisibleImei] = useState(false); // Trạng thái hiển thị Modal
  //hàm mở modal imei
  const handleImeiOpen = (idSku, idProduct) => {
    setDataIdSku(idSku);
    setDataIdProduct(idProduct);
    // alert(selectedOption);
    setIsModalVisibleImei(true);
  };
  // Hàm để ẩn Modal imei
  const handleCancelImei = () => {
    setDataIdSku([]);
    setDataIdProduct([]);
    setDataImeisLoc([]);
    setSelectedOption("");
    setSelectedCheckboxes([]);
    setSelectedCheckboxImeiReturn([]);
    setDataSku([]);
    setDataImeiThatLac([]);
    document.getElementById("id-imeithatlac").value = "";
    document.getElementById("id-imei-seach").value = "";
    handleClick();
    setIsModalVisibleImei(false);
  };

  //list data imeis theo idSku
  const [dataImeisWhereIdSku, setDataImeisWhereIdSku] = useState([]);
  // idSku
  const [dataIdSku, setDataIdSku] = useState(null);
  // idProduct
  const [dataIdProduct, setDataIdProduct] = useState(null);
  //đối tượng sku
  const [dataSku, setDataSku] = useState({});

  // lấy ra list imei theo idSku
  const handleGetAllImei = (idSku, idProduct) => {
    getSkuIonAdmin(idSku)
      .then((res) => {
        setDataSku(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllImeisWhereIdSku(idSku)
      .then((res) => {
        setDataImeisWhereIdSku(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    handleImeiOpen(idSku, idProduct);
  };

  const [selectedOption, setSelectedOption] = useState("");

  //chọn imei đê xoá - checkbox
  const [selectedCheckboxImeiXoas, setSelectedCheckboxes] = useState([]);
  //khai bbáo list imei lọc thoe idSku and status
  const [dataImeisLoc, setDataImeisLoc] = useState([]);

  // Xử lý sự kiện thay đổi lựa chọn lấy list imei lọc thoe idSku and status
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    // alert(event.target.value);

    if (event.target.value === "99") {
      setDataImeisLoc([]);
    } else {
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
    }
  };

  // xoá 1 imei
  const deleteOneImei = (id) => {
    deleteImei(id)
      .then((res) => {
        if (res.data === true) {
          if (dataImeisLoc.length > 0) {
            getAllImeiWhereIdSkuAndStatus(dataIdSku, selectedOption)
              .then((res) => {
                if (res.data.length === 0) {
                  setSelectedOption("99");
                  notification.warning({
                    message: "Không có dữ liệu!",
                  });
                }
                setDataImeisLoc(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          getAllImeisWhereIdSku(dataIdSku)
            .then((res) => {
              setDataImeisWhereIdSku(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          toast1.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Đã Xoá Imei.",
            life: 3000,
          });
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO XOÁ THẤT BẠI",
            detail: "Xoá Imei Thất Bại!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //config khi xoá 1 imei - phongnh
  const rejectDeleteImei = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục thao tác.",
      life: 3000,
    });
  };
  const confirmDeleteImei = (id) => {
    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "Xác Nhận Xoá Imei?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteOneImei(id),
      reject: () => rejectDeleteImei(),
    });
  };

  // return 1 imei
  const returnOneImei = (id) => {
    returnImei(id)
      .then((res) => {
        if (res.data === true) {
          if (dataImeisLoc.length > 0) {
            getAllImeiWhereIdSkuAndStatus(dataIdSku, selectedOption)
              .then((res) => {
                if (res.data.length === 0) {
                  setSelectedOption("99");
                  notification.warning({
                    message: "Không có dữ liệu!",
                  });
                }
                setDataImeisLoc(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          getAllImeisWhereIdSku(dataIdSku)
            .then((res) => {
              setDataImeisWhereIdSku(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          toast1.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Khôi Phục Imei Thành Công.",
            life: 3000,
          });
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO THẤT BẠI",
            detail: "Khôi Phục Imei Thất Bại!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //config khi xoá 1 imei - phongnh
  const rejectReturnOneImei = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp tục thao tác.",
      life: 3000,
    });
  };
  const confirmReturnOneImei = (id) => {
    confirmDialog({
      message: "Xác Nhận Khôi Phục?",
      header: "Xác Nhận Khôi Phục Imei?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => returnOneImei(id),
      reject: () => rejectReturnOneImei(),
    });
  };

  //thêm mới imei - phongnh
  //tạo đối tượng imei
  const [imeiItem, setImeiItem] = useState({});
  //tạo đối check giá sku
  const [dataCheckGiaSku, setDataCheckGiaSku] = useState(null);
  //tạo đối tượng imeirequest
  const [imeiItemRequest, setImeiItemRequest] = useState({});
  // taoj 1 modal khi add new imei
  const [isModalVisibleNewImei, setIsModalVisibleNewImei] = useState(false); // Trạng thái hiển thị Modal
  //hàm mở modal new imei
  const handleNewImeiOpen = (dataIdSku, dataIdProduct) => {
    setExcelData([]);
    setFile([]);
    setIsModalVisibleNewImei(true);
  };
  // Hàm để ẩn Modal new imei
  const handleCancelNewImei = () => {
    setCheckImei([]);
    setImeiItem([]);
    setFile([]);
    setExcelData([]);
    setIsModalVisibleNewImei(false);
  };
  //nút thêm mới imei (nút này mở modal để save imei)
  const addNewImei = (dataIdSku, dataIdProduct) => {
    getSkuIonAdmin(dataIdSku)
      .then((res) => {
        if (res.data.statusSku === 0 && res.data.statusProduct === 0) {
          checkGiaSku(dataIdSku)
            .then((res) => {
              if (res.data === false) {
                setDataCheckGiaSku(true);
              } else {
                setDataCheckGiaSku(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          handleNewImeiOpen(dataIdSku, dataIdProduct);
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO CẢNH BÁO",
            detail: "Không Thể Thao Tác Do Sản Phẩm Đã Xoá!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...imeiItem };
    item[name] = value;
    setImeiItem(item);
  }

  //nút save imei
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(dataCheckGiaSku + " dataCheckGiaSku");

    const items = { ...imeiItem }; //đối tượng imei
    const imeiRequest = {
      codeImei: items.codeImei,
      price: items.price,
      idSku: dataIdSku,
      idProduct: dataIdProduct,
    };

    await addOneImei(imeiRequest)
      .then((res) => {
        if (res.data === "") {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO THẤT BẠI",
            detail: "Mã Imei Đã Tồn Tại!",
            life: 3000,
          });
        } else {
          getAllImeisWhereIdSku(dataIdSku)
            .then((res) => {
              setDataImeisWhereIdSku(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          readAllSku(dataIdProduct)
            .then((res) => {
              // setDataImeisWhereIdSku(res.data);
              setDataSkus(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          setDataCheckGiaSku(false);
          if (dataImeisLoc.length > 0) {
            getAllImeiWhereIdSkuAndStatus(dataIdSku, 99)
              .then((res) => {
                if (res.data.length === 0) {
                  setSelectedOption("99");
                  notification.warning({
                    message: "Không có dữ liệu!",
                  });
                }
                setDataImeisLoc(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }

          document.getElementById("code-imei").value = "";

          toast1.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Thêm Imei Thành Công",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // //đọc file excel lên table (FE đọc luôn - Thue viện FE)
  //IPMORT IMEI
  const [displayfile, setFile] = useState(null);
  // Khởi tạo file excel imei
  const [excelData, setExcelData] = useState(null); // Khởi tạo là null

  // Khởi tạo check imei là null
  const [isCheckImei, setCheckImei] = useState([]);

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(event.target.files[0]);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData); // Cập nhật dữ liệu khi tệp đã được chọn
      };
      reader.readAsBinaryString(file);
    }
  };

  //import imei excel
  const handleImportImei = async (event) => {
    event.preventDefault();
    if (!displayfile || displayfile == null || displayfile.length == 0) {
      notification.error({
        message: "Vui lòng chọn một file trước khi import.",
      });
      return;
    } else {
      console.log(displayfile);
      console.log(dataIdSku);
      const formData = new FormData();
      formData.append("file", displayfile);

      try {
        const response = await ImportImeiExcel(formData, dataIdSku);
        await setCheckImei(response.data);
        if (response.data.length === 0) {
          const responseImei = await getAllImeisWhereIdSku(dataIdSku);
          // .then((res) => {})
          // .catch((err) => {
          //   console.log(err);
          // });
          await setDataImeisWhereIdSku(responseImei.data);
          const responseSku = await readAllSku(dataIdProduct);
          // .then((res) => {})
          // .catch((err) => {
          //   console.log(err);
          // });
          await setDataSkus(responseSku.data);
          await setDataCheckGiaSku(false);
          toast1.current.show({
            severity: "success",
            summary: "THÔNG BÁO THÀNH CÔNG",
            detail: "Import Imei Thành Công",
            life: 3000,
          });
          if (dataImeisLoc.length > 0) {
            getAllImeiWhereIdSkuAndStatus(dataIdSku, 99)
              .then((res) => {
                if (res.data.length === 0) {
                  setSelectedOption("99");
                  notification.warning({
                    message: "Không có dữ liệu!",
                  });
                }
                setDataImeisLoc(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          handleCancelNewImei();
        } else {
          toast1.current.show({
            severity: "error",
            summary: "THÔNG BÁO THẤT BẠI!",
            detail: "Import Imei Thất Bại",
            life: 3000,
          });
        }
      } catch (error) {
        toast1.current.show({
          severity: "warn",
          summary: "THÔNG BÁO LỖI!",
          detail: "Import Imei Lỗi!",
          life: 3000,
        });
      }
    }
  };

  //chọn imei đê xoá - checkbox
  // const [selectedCheckboxImeiXoas, setSelectedCheckboxes] = useState([]);
  function handleCheckboxChange(e) {
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
  //Sử dụng useEffect để theo dõi thay đổi của selectedCheckboxes và in giá trị mới
  useEffect(() => {
    console.log(selectedCheckboxImeiXoas + " :imei da  xoá++--");
  }, [selectedCheckboxImeiXoas]);
  // //xoá các imei đã được chọn - checkbox - phongnh
  const handleClearImeiSkuCheckBox = () => {
    getSkuIonAdmin(dataIdSku)
      .then((res) => {
        if (res.data.statusSku === 0 && res.data.statusProduct === 0) {
          if (selectedCheckboxImeiXoas.length > 0) {
            deleteImeiCheckbox(selectedCheckboxImeiXoas)
              .then((response) => {
                if (response.data === true) {
                  if (dataImeisLoc.length > 0) {
                    getAllImeiWhereIdSkuAndStatus(dataIdSku, selectedOption)
                      .then((res) => {
                        if (res.data.length === 0) {
                          setSelectedOption("99");
                          notification.warning({
                            message: "Không có dữ liệu!",
                          });
                        }
                        setDataImeisLoc(res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                  getAllImeisWhereIdSku(dataIdSku)
                    .then((res) => {
                      setDataImeisWhereIdSku(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  readAllSku(dataIdProduct)
                    .then((res) => {
                      setDataSkus(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  toast1.current.show({
                    severity: "success",
                    summary: "THÔNG BÁO THÀNH CÔNG",
                    detail: "Đã Xoá Danh Sách Imei.",
                    life: 3000,
                  });
                  setSelectedCheckboxes([]);
                } else {
                  toast1.current.show({
                    severity: "error",
                    summary: "THÔNG BÁO THẤT BẠI!",
                    detail: "Xoá Danh Sách Imei Thất Bại!",
                    life: 3000,
                  });
                }
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          } else {
            toast1.current.show({
              severity: "warn",
              summary: "THÔNG BÁO XOÁ THẤT BẠI!",
              detail: "Hãy Chọn Danh Sách Imei!",
              life: 3000,
            });
          }
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO CẢNH BÁO",
            detail: "Không Thể Thao Tác Do Sản Phẩm Đã Xoá!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //config khi xoá cehckbox imei  của sku - phongnh
  const rejectDeleteImeiCheckBoxSku = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp Tục Thao Tác.",
      life: 3000,
    });
  };
  const confirmDeleteImeiCheckBoxSku = (idBillDetail, codeBill) => {
    confirmDialog({
      message: "Bạn chắc chắn xoá?",
      header: "XOÁ TẤT CẢ IMEI ĐÃ CHỌN",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleClearImeiSkuCheckBox(),
      reject: () => rejectDeleteImeiCheckBoxSku(),
    });
  };

  //chọn imei đê khôi phục - checkbox
  const [selectedCheckboxImeiReturn, setSelectedCheckboxImeiReturn] = useState(
    []
  );
  // const [selectedCheckboxImeiXoas, setSelectedCheckboxes] = useState([]);
  function handleCheckboxChangeImeiReturn(e) {
    //handleCheckboxChange
    const checkboxValue = e.target.value;
    setSelectedCheckboxImeiReturn((prevSelectedCheckboxes) => {
      if (e.target.checked) {
        // Nếu được chọn, thêm giá trị vào danh sách
        return [...prevSelectedCheckboxes, checkboxValue];
      } else {
        // Nếu bỏ chọn, loại bỏ giá trị khỏi danh sách
        return prevSelectedCheckboxes.filter((item) => item !== checkboxValue);
      }
    });
  }
  //khôi phục các imei đã được chọn - checkbox - phongnh
  const handleReturnImeiSkuCheckBox = () => {
    getSkuIonAdmin(dataIdSku)
      .then((res) => {
        if (res.data.statusSku === 0 && res.data.statusProduct === 0) {
          if (selectedCheckboxImeiReturn.length > 0) {
            updateImeiCheckbox(selectedCheckboxImeiReturn)
              .then((response) => {
                if (response.data === true) {
                  if (dataImeisLoc.length > 0) {
                    getAllImeiWhereIdSkuAndStatus(dataIdSku, selectedOption)
                      .then((res) => {
                        if (res.data.length === 0) {
                          setSelectedOption("99");
                          notification.warning({
                            message: "Không có dữ liệu!",
                          });
                        }
                        setDataImeisLoc(res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                  getAllImeisWhereIdSku(dataIdSku)
                    .then((res) => {
                      setDataImeisWhereIdSku(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  readAllSku(dataIdProduct)
                    .then((res) => {
                      setDataSkus(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  toast1.current.show({
                    severity: "success",
                    summary: "THÔNG BÁO THÀNH CÔNG",
                    detail: "Đã Khôi Phục Danh Sách Imei.",
                    life: 3000,
                  });
                  setSelectedCheckboxImeiReturn([]);
                } else {
                  toast1.current.show({
                    severity: "error",
                    summary: "THÔNG BÁO THẤT BẠI!",
                    detail: "Khôi Phục Danh Sách Imei Thất Bại!",
                    life: 3000,
                  });
                }
              })
              .catch((error) => {
                console.log(`${error}`);
              });
          } else {
            toast1.current.show({
              severity: "warn",
              summary: "THÔNG BÁO KHÔI PHỤC THẤT BẠI!",
              detail: "Hãy Chọn Danh Sách Imei!",
              life: 3000,
            });
          }
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO CẢNH BÁO",
            detail: "Không Thể Thao Tác Do Sản Phẩm Đã Xoá!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Sử dụng useEffect để theo dõi thay đổi của selectedCheckboxImeiReturn và in giá trị mới
  // useEffect(() => {
  //   console.log(selectedCheckboxImeiReturn + " :imei khoi phuc++--");
  // }, [selectedCheckboxImeiReturn]);

  //config khi khôi phục cehckbox imei  của sku - phongnh
  const rejectDeleteImeiCheckBoxSkuReturn = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp Tục Thao Tác.",
      life: 3000,
    });
  };
  const confirmUpdateImeiCheckBoxSku = (idBillDetail, codeBill) => {
    confirmDialog({
      message: "Bạn chắc chắn khôi phục?",
      header: "KHÔI PHỤC TẤT CẢ IMEI ĐÃ CHỌN",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleReturnImeiSkuCheckBox(),
      reject: () => rejectDeleteImeiCheckBoxSkuReturn(),
    });
  };

  //xoá all imei
  const handleDeleteAllImeiSku = () => {
    getSkuIonAdmin(dataIdSku)
      .then((res) => {
        if (res.data.statusSku === 0 && res.data.statusProduct === 0) {
          deleteAllImei(dataIdSku)
            .then((response) => {
              if (response.data === true) {
                if (dataImeisLoc.length > 0) {
                  setSelectedOption("99");
                  getAllImeiWhereIdSkuAndStatus(dataIdSku, 99)
                    .then((res) => {
                      if (res.data.length === 0) {
                        notification.warning({
                          message: "Không có dữ liệu!",
                        });
                      }
                      setDataImeisLoc(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
                getAllImeisWhereIdSku(dataIdSku)
                  .then((res) => {
                    setDataImeisWhereIdSku(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                readAllSku(dataIdProduct)
                  .then((res) => {
                    setDataSkus(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                toast1.current.show({
                  severity: "success",
                  summary: "THÔNG BÁO THÀNH CÔNG",
                  detail: "Đã Xoá Tất Cả Imei.",
                  life: 3000,
                });
              } else {
                toast1.current.show({
                  severity: "error",
                  summary: "THÔNG BÁO THẤT BẠI!",
                  detail: "Xoá Tất Cả Imei Thất Bại!",
                  life: 3000,
                });
              }
            })
            .catch((error) => {
              console.log(`${error}`);
            });
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO CẢNH BÁO",
            detail: "Không Thể Thao Tác Do Sản Phẩm Đã Xoá!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectDeleteAllImeiSku = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp Tục Thao Tác.",
      life: 3000,
    });
  };
  const confirmDeleteAllImeiSku = () => {
    confirmDialog({
      message: "Bạn chắc chắn xoá tất cả?",
      header: "XOÁ TẤT CẢ IMEI",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleDeleteAllImeiSku(),
      reject: () => rejectDeleteAllImeiSku(),
    });
  };

  //khôi phục tất cả
  const handleReturnAllImeiSku = () => {
    getSkuIonAdmin(dataIdSku)
      .then((res) => {
        if (res.data.statusSku === 0 && res.data.statusProduct === 0) {
          returnAllImei(dataIdSku)
            .then((response) => {
              if (response.data === true) {
                if (dataImeisLoc.length > 0) {
                  setSelectedOption("99");
                  getAllImeiWhereIdSkuAndStatus(dataIdSku, 99)
                    .then((res) => {
                      if (res.data.length === 0) {
                        notification.warning({
                          message: "Không có dữ liệu!",
                        });
                      }
                      setDataImeisLoc(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
                getAllImeisWhereIdSku(dataIdSku)
                  .then((res) => {
                    setDataImeisWhereIdSku(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                readAllSku(dataIdProduct)
                  .then((res) => {
                    setDataSkus(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                toast1.current.show({
                  severity: "success",
                  summary: "THÔNG BÁO THÀNH CÔNG",
                  detail: "Khôi Phục Tất Cả Imei Thành Công.",
                  life: 3000,
                });
              } else {
                toast1.current.show({
                  severity: "error",
                  summary: "THÔNG BÁO THẤT BẠI!",
                  detail: "Khôi Phục Tất Cả Imei Thất Bại!",
                  life: 3000,
                });
              }
            })
            .catch((error) => {
              console.log(`${error}`);
            });
        } else {
          toast1.current.show({
            severity: "warn",
            summary: "THÔNG BÁO CẢNH BÁO",
            detail: "Không Thể Thao Tác Do Sản Phẩm Đã Xoá!",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectReturnAllImeiSku = () => {
    toast1.current.show({
      severity: "warn",
      summary: "THÔNG BÁO",
      detail: "Tiếp Tục Thao Tác.",
      life: 3000,
    });
  };
  const confirmReturnAllImeiSku = () => {
    confirmDialog({
      message: "Bạn chắc chắn Khôi Phục tất cả?",
      header: "KHÔI PHỤC TẤT CẢ IMEI",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => handleReturnAllImeiSku(),
      reject: () => rejectReturnAllImeiSku(),
    });
  };

  //tìm kiếm imei theo sku - phongnh
  function handleChangeImeisDaBan(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target + " check imei");
    console.log(value + " check imei - name");

    // let item = { key: "" };
    // item[name] = value;
    // setDataImeiThatLac(item);
    if (value !== undefined) {
      if (selectedOption === "99" || selectedOption === "") {
        seachImeis(value, 99, dataIdSku)
          .then((response) => {
            setDataImeisWhereIdSku(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      } else {
        seachImeis(value, selectedOption, dataIdSku)
          .then((response) => {
            if (response.data.length > 0) {
              setDataImeisLoc(response.data);
            } else {
              getAllImeiWhereIdSkuAndStatus(dataIdSku, selectedOption)
                .then((res) => {
                  console.log(selectedOption + " kk");
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
            }
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }

      // seachImeisDaBan(dataIdBillDetail, dataIdSKU, value)
      //   .then((response) => {
      //     setDataSeachImeiDaBan(response.data);
      //   })
      //   .catch((error) => {
      //     console.log(`${error}`);
      //   });
    }
  }

  //tạo danh sach imei thất lạc
  const [dataImeiThatLac, setDataImeiThatLac] = useState([]);
  //tìm kiếm imei thất lạc - phongnh
  function handleChangeImeiThatLac(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target + " check imei");
    console.log(value + " check imei - name");

    // let item = { key: "" };
    // item[name] = value;
    // setDataImeiThatLac(item);
    if (value !== undefined) {
      seachImeiThatLac(value)
        .then((response) => {
          setDataImeiThatLac(response.data);
          console.log(response.data + " check imei - response.data");
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
  }

  //edit imei
  //tạo đối tượng imei
  const [imeiItemEdit, setImeiItemEdit] = useState({});
  // taoj 1 modal khi xem imei
  const [openlModalEditImei, setOpenlModalEditImei] = useState(false); // Trạng thái hiển thị Modal
  //hàm mở modal new imei
  const handleOpenlEditImei = () => {
    // updateImei,

    setOpenlModalEditImei(true);
  };

  // Hàm để ẩn Modal new imei
  const handleCancelEditImei = () => {
    setImeiItemEdit();
    setOpenlModalEditImei(false);
  };

  const handlEditImei = (idImei) => {
    detailImei(idImei)
      .then((response) => {
        setImeiItemEdit(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    handleOpenlEditImei();
  };
  function handleChangeEditImei(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...imeiItemEdit };
    item[name] = value;
    setImeiItemEdit(item);
  }

  const handleSubmitEditImei = () => {
    const items = { ...imeiItemEdit };
    updateImei(imeiItemEdit.id, items)
      .then((response) => {
        if (response.data === true) {
          if (dataImeisLoc.length > 0) {
            getAllImeiWhereIdSkuAndStatus(dataIdSku, selectedOption)
              .then((res) => {
                if (res.data.length === 0) {
                  setSelectedOption("99");
                  notification.warning({
                    message: "Không có dữ liệu!",
                  });
                }
                setDataImeisLoc(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          getAllImeisWhereIdSku(dataIdSku)
            .then((res) => {
              setDataImeisWhereIdSku(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          readAllSku(dataIdProduct)
            .then((res) => {
              setDataSkus(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          toast1.current.show({
            severity: "success",
            summary: "CẬP NHẬT THÀNH CÔNG",
            detail: "Cập nhật mã imei thành công.",
            life: 3000,
          });
          handleCancelEditImei();
        } else {
          toast1.current.show({
            severity: "error",
            summary: "CẬP NHẬT THẤT BẠI",
            detail: "Cập nhật mã imei thất bại!.",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(`${error}`);
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
            showTotal: (total) => `Tổng số ${total} phiên bản`,
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
              return record.statusSku === 0 && record.sumImeiTrongKho > 0 ? (
                <CheckCircleOutlined
                  value={true}
                  style={{
                    color: "#52c41a",
                  }}
                />
              ) : record.statusSku === 0 && record.sumImeiTrongKho === 0 ? (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>
                    <WarningFilled
                      value={false}
                      style={{
                        color: "#FFCC00",
                      }}
                    />
                  </p>
                  Hết hàng
                </Form.Item>
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
                    <button
                      type="button"
                      class="btn btn-secondary"
                      className="btn btn-primary btn-sm trash"
                      style={{
                        backgroundColor: "green",
                      }}
                      onClick={() => {
                        handleGetAllImei(record.idSku, record.idProduct);
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
                    class="list-group-item  justify-content-between"
                    style={{ backgroundColor: "yellowgreen" }}
                  >
                    <Row>
                      <div className="col-2" style={{ textAlign: "left" }}>
                        <span>STT</span>
                      </div>
                      <div className="col-4" style={{ textAlign: "center" }}>
                        <span>Hoá Đơn</span>
                      </div>
                      <div className="col-3" style={{ textAlign: "center" }}>
                        <span>Sản Phẩm</span>
                      </div>
                      <div className="col-3" style={{ textAlign: "center" }}>
                        <span>Giá</span>
                      </div>
                    </Row>
                  </li>
                  {dataImeiThatLac.map((imei, index) => (
                    <ul class="list-group mb-3">
                      <li class="list-group-item  justify-content-between">
                        <Row>
                          <div className="col-1">
                            <span>{index + 1}:</span>
                          </div>
                          <div
                            className="col-5"
                            style={{ textAlign: "center" }}
                          >
                            <span>{imei.codeBill}</span>
                            <p></p>
                            <span>{imei.typeBill}</span>
                          </div>
                          <div
                            className="col-3"
                            style={{ textAlign: "center" }}
                          >
                            <span>{imei.nameProduct}</span>
                            <p>
                              {imei.capacity}
                              {" - "} {imei.color}
                            </p>
                          </div>
                          <div
                            className="col-3"
                            style={{ textAlign: "center" }}
                          >
                            <span>
                              {parseFloat(imei.gia).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                            <p></p>
                            <span>
                              {imei.statusImei === 0 ? (
                                <span
                                  style={{
                                    // paddingLeft: "5px",
                                    // paddingRight: "5px",
                                    backgroundColor: "#FF99FF",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Trong Kho
                                </span>
                              ) : imei.statusImei === 1 ? (
                                <span
                                  style={{
                                    // paddingLeft: "5px",
                                    // paddingRight: "5px",
                                    backgroundColor: "red",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Đã Xoá
                                </span>
                              ) : imei.statusImei === 2 ? (
                                <span
                                  style={{
                                    // paddingLeft: "5px",
                                    // paddingRight: "5px",
                                    backgroundColor: "#FF6600",
                                    margin: "outo",
                                    textAlign: "center",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Giỏ Hàng
                                </span>
                              ) : imei.statusImei === 3 ? (
                                <span
                                  style={{
                                    // paddingLeft: "5px",
                                    // paddingRight: "5px",
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
                                    // paddingLeft: "5px",
                                    // paddingRight: "5px",
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
                        </Row>
                      </li>
                    </ul>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "red" }}>* Không có dữ liệu!</p>
              )}

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
                Danh Sách Imei Của {dataSku.nameProduct} - {dataSku.skuCapacity}{" "}
                - {dataSku.skuColor}
              </p>

              <p></p>

              {/* <p style={{ textAlign: "center" }}> */}
              <Row>
                <select
                  id="selectOption"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="col-3 btn-loc "
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#009999",
                    color: "white",
                    width: "130px",
                    height: "36px",
                    marginLeft: "5px",
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
                <span className="col-1"></span>

                <input
                  id="id-imei-seach"
                  className="form-control me-2 col-8"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="key"
                  style={{
                    marginLeft: "12px",
                  }}
                  onChange={handleChangeImeisDaBan}
                />
              </Row>
              {/* </p> */}
              <p></p>
              <Row>
                <Button
                  type="text"
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#006699",
                    color: "white",
                    width: "150px",
                    height: "39px",
                    // marginLeft: "18px",
                  }}
                  className="col-2 btn-xoa"
                  danger
                  onClick={() => addNewImei(dataIdSku, dataIdProduct)}
                >
                  Thêm Imei
                </Button>
                <Button
                  type="text"
                  style={{
                    border: "2px solid black",
                    backgroundColor: "#ff7700",
                    color: "white",
                    width: "150px",
                    marginLeft: "2px",
                    height: "39px",
                  }}
                  className="col-2 btn-xoa"
                  danger
                  onClick={() =>
                    confirmDeleteImeiCheckBoxSku(dataIdSku, dataIdProduct)
                  }
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
                    marginLeft: "2px",
                    height: "39px",
                  }}
                  className="col-2 btn-xoa"
                  danger
                  onClick={() =>
                    confirmUpdateImeiCheckBoxSku(dataIdSku, dataIdProduct)
                  }
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
                    marginLeft: "2px",
                    height: "39px",
                  }}
                  className="col-3 btn-xoa"
                  onClick={() => confirmDeleteAllImeiSku()}
                >
                  Xoá Tất Cả Imei
                </Button>

                <Button
                  type="text"
                  danger
                  style={{
                    border: "2px solid black",
                    backgroundColor: "red",
                    color: "white",
                    width: "150px",
                    marginLeft: "2px",
                    height: "39px",
                  }}
                  className="col-3 btn-xoa"
                  onClick={() => confirmReturnAllImeiSku()}
                >
                  Khôi Phục Tất Imei
                </Button>
              </Row>
              <p></p>
              <div style={{ backgroundColor: "#66FFFF" }}>
                <Row>
                  <div style={{ paddingLeft: "10px" }}>
                    <span>STT</span>
                  </div>
                  <div style={{ paddingLeft: "16px" }}>
                    <span>Xoá Imei</span>
                  </div>
                  <div style={{ paddingLeft: "128px" }}>
                    <span>Mã Imei</span>
                  </div>
                  <div style={{ paddingLeft: "140px" }}>
                    <span>Trạng Thái</span>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <span>Khôi Phục</span>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
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
                        <li class="list-group-item  justify-content-between">
                          <Row>
                            <div className="col-1">
                              <span>{index + 1}</span>
                            </div>
                            <div
                              className="col-1"
                              // style={{
                              //   // margin: "outo",
                              //   // textAlign: "center",
                              //   width: "20px",
                              //   paddingLeft: "10px",
                              // }}
                            >
                              {imei.status === 0 ? (
                                <input
                                  type="checkbox"
                                  value={imei.codeImei}
                                  checked={selectedCheckboxImeiXoas.includes(
                                    imei.codeImei
                                  )}
                                  onChange={handleCheckboxChange}
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

                            <div className="col-6">
                              <span
                              // style={{ paddingLeft: "10px" }}
                              >
                                {imei.codeImei}
                              </span>
                            </div>

                            <div
                              className="col-2"
                              style={{
                                margin: "outo",
                                textAlign: "center",
                                // width: "80px",
                              }}
                            >
                              <span>
                                {imei.status === 0 ? (
                                  <span
                                    style={{
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
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
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
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
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
                                      backgroundColor: "#FF6600",
                                      margin: "outo",
                                      textAlign: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Giỏ Hàng
                                  </span>
                                ) : imei.status === 3 ||
                                  imei.status === 4 ||
                                  imei.status === 5 ||
                                  imei.status === 7 ? (
                                  <span
                                    style={{
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
                                      backgroundColor: "#00FF66",
                                      margin: "outo",
                                      textAlign: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Đã Bán
                                  </span>
                                ) : imei.status === 6 ? (
                                  <span
                                    style={{
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
                                      backgroundColor: "yellow",
                                      margin: "outo",
                                      textAlign: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Máy Lỗi
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
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
                              className="col-1"
                              style={{
                                margin: "outo",
                                textAlign: "center",
                                // width: "20px",
                              }}
                            >
                              {imei.status === 0 ? (
                                <span>-</span>
                              ) : imei.status === 1 ? (
                                <input
                                  type="checkbox"
                                  value={imei.codeImei}
                                  checked={selectedCheckboxImeiReturn.includes(
                                    imei.codeImei
                                  )}
                                  onChange={handleCheckboxChangeImeiReturn}
                                />
                              ) : imei.status === 2 ? (
                                <span>-</span>
                              ) : imei.status === 3 ? (
                                <span>-</span>
                              ) : (
                                "!"
                              )}
                            </div>
                            {/* phongnh 1 */}
                            <div
                              className="col-1"
                              style={{
                                // position: "absolute",
                                // top: "10px",
                                // right: "5px",
                                // paddingLeft: "12px",
                                textAlign: "center",
                                margin: "auto",
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
                                        icon={
                                          <CloseCircleOutlined
                                            style={{
                                              color: "red",
                                            }}
                                          />
                                        }
                                        onClick={() =>
                                          confirmDeleteImei(imei.id)
                                        } // all imei phongnh
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
                                        onClick={() => handlEditImei(imei.id)}
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
                                        onClick={() =>
                                          confirmReturnOneImei(imei.id)
                                        }
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
                                  style={
                                    {
                                      // position: "absolute",
                                      // top: "10px",
                                      // right: "5px",
                                      // width: "35px",
                                      // paddingLeft: "10px",
                                      // paddingRight: "10px",
                                      // textAlign: "center",
                                    }
                                  }
                                >
                                  <span>-</span>
                                </di>
                              ) : imei.status === 3 ? (
                                <di
                                  style={
                                    {
                                      // position: "absolute",
                                      // top: "10px",
                                      // right: "5px",
                                      // width: "35px",
                                      // paddingLeft: "10px",
                                      // paddingRight: "10px",
                                      // textAlign: "center",
                                    }
                                  }
                                >
                                  <span>-</span>
                                </di>
                              ) : (
                                "!"
                              )}
                            </div>
                          </Row>
                        </li>
                      </ul>
                    ))}
                  </ul>
                ) : (
                  <ul class="list-group mb-3">
                    {dataImeisLoc.map((imei, index) => (
                      <ul class="list-group mb-3">
                        <li class="list-group-item  justify-content-between">
                          <Row>
                            <div className="col-1">
                              <span>{index + 1}</span>
                            </div>
                            <div
                              className="col-1"
                              // style={{
                              //   // margin: "outo",
                              //   // textAlign: "center",
                              //   width: "20px",
                              //   paddingLeft: "10px",
                              // }}
                            >
                              {imei.status === 0 ? (
                                <input
                                  type="checkbox"
                                  value={imei.codeImei}
                                  checked={selectedCheckboxImeiXoas.includes(
                                    imei.codeImei
                                  )}
                                  onChange={handleCheckboxChange}
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

                            <div className="col-6">
                              <span
                              // style={{ paddingLeft: "10px" }}
                              >
                                {imei.codeImei}
                              </span>
                            </div>

                            <div
                              className="col-2"
                              style={{
                                margin: "outo",
                                textAlign: "center",
                                // width: "80px",
                              }}
                            >
                              <span>
                                {imei.status === 0 ? (
                                  <span
                                    style={{
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
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
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
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
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
                                      backgroundColor: "#FF6600",
                                      margin: "outo",
                                      textAlign: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Giỏ Hàng
                                  </span>
                                ) : imei.status === 3 ||
                                  imei.status === 4 ||
                                  imei.status === 5 ||
                                  imei.status === 7 ? (
                                  <span
                                    style={{
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
                                      backgroundColor: "#00FF66",
                                      margin: "outo",
                                      textAlign: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Đã Bán
                                  </span>
                                ) : imei.status === 6 ? (
                                  <span
                                    style={{
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
                                      backgroundColor: "Blue",
                                      margin: "outo",
                                      textAlign: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Máy Lỗi
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      // paddingLeft: "5px",
                                      // paddingRight: "5px",
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
                              className="col-1"
                              style={{
                                margin: "outo",
                                textAlign: "center",
                                // width: "20px",
                              }}
                            >
                              {imei.status === 0 ? (
                                <span>-</span>
                              ) : imei.status === 1 ? (
                                <input
                                  type="checkbox"
                                  value={imei.codeImei}
                                  checked={selectedCheckboxImeiReturn.includes(
                                    imei.codeImei
                                  )}
                                  onChange={handleCheckboxChangeImeiReturn}
                                />
                              ) : imei.status === 2 ? (
                                <span>-</span>
                              ) : imei.status === 3 ? (
                                <span>-</span>
                              ) : (
                                "!"
                              )}
                            </div>
                            {/* phongnh 1 */}
                            <div
                              className="col-1"
                              style={{
                                // position: "absolute",
                                // top: "10px",
                                // right: "5px",
                                // paddingLeft: "12px",
                                textAlign: "center",
                                margin: "auto",
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
                                        icon={
                                          <CloseCircleOutlined
                                            style={{
                                              color: "red",
                                            }}
                                          />
                                        }
                                        onClick={() =>
                                          confirmDeleteImei(imei.id)
                                        } // all imei phongnh
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
                                        onClick={() => handlEditImei(imei.id)}
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
                                        onClick={() =>
                                          confirmReturnOneImei(imei.id)
                                        }
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
                                  style={
                                    {
                                      // position: "absolute",
                                      // top: "10px",
                                      // right: "5px",
                                      // width: "35px",
                                      // paddingLeft: "10px",
                                      // paddingRight: "10px",
                                      // textAlign: "center",
                                    }
                                  }
                                >
                                  <span>-</span>
                                </di>
                              ) : imei.status === 3 ? (
                                <di>
                                  <span>-</span>
                                </di>
                              ) : (
                                "!"
                              )}
                            </div>
                          </Row>
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

        {/* modal add new imei - phongnh*/}
        <Modal
          visible={isModalVisibleNewImei}
          onCancel={handleCancelNewImei}
          width={500}
          footer={null}
          bodyStyle={{ minHeight: "600px" }}
        >
          <div className="container py-15">
            <div className="row d-flex justify-content-center">
              {/* <div className="card"> */}
              <div>
                <h4
                  className="mb-0"
                  style={{ textAlign: "center", margin: "auto" }}
                >
                  THÊM MỚI IMEI
                </h4>
              </div>
              <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid green" }}
              ></div>
              <div style={{ marginBottom: "10px" }}>
                <h6
                  className="mb-0"
                  style={{ textAlign: "left", margin: "auto", color: "green" }}
                >
                  Sản Phẩm: {dataSku.nameProduct} - {dataSku.skuCapacity} -{" "}
                  {dataSku.skuColor}
                </h6>
              </div>
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="col-8" style={{ marginLeft: "0px" }}>
                      <div className="input-data">
                        <Input
                          type="text"
                          required
                          value={imeiItem.codeImei || ""}
                          onChange={handleChange}
                          id="code-imei"
                          name="codeImei"
                        ></Input>
                        <div className="underline"></div>
                        <label htmlFor="">Mã Imei</label>
                      </div>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-2" style={{ marginLeft: "0px" }}>
                      <div
                        style={{
                          borderRadius: "10px",
                          marginLeft: "0px",
                        }}
                      >
                        {/* <div className="inner"></div> */}
                        {/* <Input type="submit" value={"Submit"}></Input> */}
                        <button
                          type="submit"
                          class="btn btn-outline-success"
                          style={{
                            marginLeft: "0px",
                          }}
                        >
                          Save
                        </button>
                      </div>
                      {/* <button class="btn btn-light" type="button">
                          <Link to="">
                            <FontAwesomeIcon icon={faTimesCircle} />X
                          </Link>
                        </button> */}
                    </div>
                    <br />
                  </div>
                  {dataCheckGiaSku === true ? (
                    <div className="form-row" style={{ marginTop: "20px" }}>
                      <div className="col-8" style={{ marginLeft: "0px" }}>
                        <div className="input-data">
                          <Input
                            type="number"
                            required
                            value={imeiItem.price || ""}
                            onChange={handleChange}
                            id="price"
                            name="price"
                          ></Input>
                          <div className="underline"></div>
                          <label htmlFor="">Giá</label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </div>
              <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid green" }}
              ></div>
              <div style={{ marginTop: "10px" }}>
                <form onSubmit={handleImportImei} enctype="multipart/form-data">
                  <div className="form-row">
                    <div className="col-8" style={{ marginLeft: "0px" }}>
                      <div className="input-data">
                        <Input
                          type="file"
                          accept=".xls,.xlsx"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-2" style={{ marginRight: "0px" }}>
                      <button type="submit" class="btn btn-outline-success">
                        Import
                      </button>
                    </div>
                  </div>
                  {/* <br></br> */}

                  {/* <div className="form-row">
                    <div className="input-data textarea">
                      <div className="form-row submit-btn">
                        <button type="submit" class="btn btn-outline-secondary">
                          Save Import Imei
                        </button>
                      </div>
                    </div>
                  </div> */}
                </form>
                <div
                  className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{
                    position: "relative",
                    height: 500, // điều chỉnh table dài ra
                    overflowY: "auto",
                  }}
                >
                  {isCheckImei != null && isCheckImei.length > 0 ? (
                    <div>
                      <p style={{ color: "red" }}>* Imei Trung Lap</p>
                      <div style={{ backgroundColor: "#FF0000" }}>
                        <Row>
                          <div>
                            <span>STT</span>
                          </div>
                          <div className="col-3">
                            <span style={{ marginLeft: "0px" }}>Sản Phẩm</span>
                          </div>
                          <div
                            className="col-6"
                            style={{ textAlign: "center" }}
                          >
                            <span>Mã Imei</span>
                          </div>
                          <div className="col-2">
                            <span style={{ marginRight: "0px" }}>price</span>
                          </div>
                        </Row>
                      </div>
                      <ul class="list-group mb-3">
                        {isCheckImei.map((imei, index) => (
                          <ul class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between">
                              <span>{index + 1}</span>

                              <span style={{ paddingLeft: "10px" }}>
                                <span>{imei.nameProduct}</span>
                                <br />
                                <span>
                                  {imei.capacity}
                                  {" - "}
                                  {imei.color}
                                </span>
                              </span>
                              <span>{imei.codeImei}</span>
                              <span>{imei.price}</span>
                            </li>
                          </ul>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p></p>
                  )}
                  {excelData !== null && excelData.length > 0 ? (
                    <div>
                      <p style={{ width: "400px", color: "red" }}>
                        Imei Doc Tu File Excel Vui Long Check Lai Truoc Khi Luu
                      </p>
                      <ul class="list-group mb-3">
                        {excelData.map((row, rowIndex) => (
                          <ul key={rowIndex} class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between">
                              {row.map((cell, cellIndex) => (
                                <span key={cellIndex}>{cell}</span>
                              ))}
                            </li>
                          </ul>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>Chọn tệp Excel để hiển thị dữ liệu.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* modal edit imei */}
        <Modal
          visible={openlModalEditImei}
          onCancel={handleCancelEditImei}
          width={500}
          footer={null}
          bodyStyle={{ minHeight: "80px" }}
        >
          <div className="container py-15">
            <div className="row d-flex justify-content-center">
              {/* <div className="card"> */}
              <div>
                <h4
                  className="mb-0"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    marginTop: "30px",
                  }}
                >
                  CHỈNH SỬA IMEI
                </h4>
              </div>
              <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid green", marginTop: "10px" }}
              ></div>
              <div style={{ marginBottom: "10px" }}>
                <h6
                  className="mb-0"
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    color: "green",
                  }}
                >
                  Sản Phẩm: {dataSku.nameProduct} - {dataSku.skuCapacity} -{" "}
                  {dataSku.skuColor}
                </h6>
              </div>
              <div style={{ marginTop: "30px" }}>
                <form onSubmit={handleSubmitEditImei}>
                  <div className="form-row" style={{ marginBottom: "60px" }}>
                    <div className="col-11" style={{ marginLeft: "0px" }}>
                      <div className="input-data">
                        <Input
                          type="text"
                          required
                          value={imeiItemEdit?.codeImei || ""}
                          onChange={handleChangeEditImei}
                          id="codeImei"
                          name="codeImei"
                        ></Input>
                        <div className="underline"></div>
                        <label htmlFor="">Mã Imei</label>
                      </div>
                    </div>
                    {/* <div className="col-2"></div> */}
                  </div>
                  <div
                    className="form-row"
                    style={{
                      marginTop: "40px",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  >
                    <button
                      type="submit"
                      class="btn btn-outline-success"
                      style={{
                        // marginTop: "40px",
                        margin: "auto",
                        textAlign: "center",
                      }}
                    >
                      Cập nhật
                    </button>
                  </div>
                </form>
                <div>
                  <button
                    class="btn btn-outline-danger"
                    style={{
                      marginTop: "40px",
                      float: "right",
                      paddingBottom: "-20px",
                    }}
                    onClick={() => handleCancelEditImei()}
                  >
                    Thoát
                  </button>
                </div>
              </div>
              {/* <div
                className="card-header d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid green" }}
              ></div> */}
              <div style={{ marginTop: "10px" }}>
                <div
                  // className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{
                    position: "relative",
                    height: 0, // điều chỉnh table dài ra
                    overflowY: "auto",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Modal>
      </List>
    </>
  );
};

// const expandedRowRender = (record) => {
//   return (
//     <UserAccountTable record={record} onSomeAction={receiveDataFromChild} />
//   );
// };

export default AccountList;
