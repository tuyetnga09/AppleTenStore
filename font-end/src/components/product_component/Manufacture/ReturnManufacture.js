import React, { useEffect, useState, useRef } from "react";
import {
  returnDeleteAll,
  returnManufacture,
} from "../../../service/manufacture.service";
import { Link } from "react-router-dom";
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FaSearch, FaPlus, FaFileExcel } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import queryString from "query-string";
import Pagination from "../Manufacture/PageNext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Layout, Menu, notification, theme } from "antd";
import { Toast } from "primereact/toast";
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  GiftOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import HeaderDashBoard from "../../Page_Comeponet/header/index.js";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const ReturnManufacture = () => {
  const [manufacture, setManufacture] = useState([]);

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 5,
    totalRows: 1,
  });

  const [filters, setFilters] = useState({
    page: 0,
    key: "",
  });
  const storedUser = JSON.parse(localStorage.getItem("account"));
  const history = useHistory();
  //hien thi danh sach
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

          setManufacture(response.data.content);
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
  //xoa
  async function handleDelete(id) {
    returnManufacture(id).then(() => {
      let newArr = [...manufacture].filter((s) => s.id !== id);
      setManufacture(newArr);
    });
  }
  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  const toast = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
              <Menu.Item key="sku">
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
              <Menu.Item key="8">
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
            <div className="bodyform">
              <section class="ftco-section">
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-md-3 text-center mb-3">
                      <h2 class="heading-section">Xuất Xứ Đã Xoá</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <form class="d-flex" role="search">
                        <Link to="/manufacture/display">
                          <button
                            class="btn btn-outline-success"
                            type="submit"
                            style={{ marginRight: "15px" }}
                          >
                            <FontAwesomeIcon icon={faBackward} />
                          </button>
                        </Link>

                        <input
                          class="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          name="key"
                          onChange={handleChange}
                        />
                        <button
                          class="btn btn-outline-success"
                          type="button"
                          style={{ marginLeft: "15px" }}
                        >
                          <FaSearch className="search-icon" />
                        </button>

                        <Link to="/manufacture/new">
                          <button
                            type="button"
                            class="btn btn-outline-success"
                            style={{ marginRight: "15px", marginLeft: "15px" }}
                          >
                            <FaPlus className="add-icon" />
                          </button>
                        </Link>
                        <button
                          type="button"
                          class="btn btn-outline-success"
                          style={{ marginRight: "15px" }}
                        >
                          <FaFileExcel className="excel-icon" />
                        </button>

                        <button type="button" class="btn btn-outline-success">
                          <IoMdDownload className="download-icon" />
                        </button>
                      </form>
                      <br />

                      <div class="table-wrap">
                        <table class="table">
                          <thead class="table-light">
                            <tr>
                              <th style={{ color: "black" }}>
                                <b>STT</b>
                              </th>
                              <th style={{ color: "black" }}>
                                <b>Mã</b>
                              </th>
                              <th style={{ color: "black" }}>
                                <b>Tên</b>
                              </th>
                              <th style={{ color: "black" }}>
                                <b>Ngày Tạo</b>
                              </th>
                              <th style={{ color: "black" }}>
                                <b>Ngày Cập Nhật</b>
                              </th>
                              {/* <th style={{ color: "black" }}>
                                <b>Người Tạo</b>
                              </th>
                              <th style={{ color: "black" }}>
                                <b>Người Cập Nhật</b>
                              </th> */}
                              <th style={{ color: "black" }}>
                                <b>Trạng Thái</b>
                              </th>
                              <th style={{ color: "black" }}>
                                <b>Actions</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {manufacture.map((manu, index) => {
                              const dateCreate = new Date(manu.dateCreate);
                              const dateUpdate = new Date(manu.dateUpdate);
                              const dateCreateText =
                                dateCreate.toLocaleDateString();
                              const dateUpdateText =
                                dateUpdate.toLocaleDateString();
                              return (
                                <tr
                                  className="alert"
                                  role="alert"
                                  key={manu.id}
                                >
                                  <td
                                    style={{
                                      textAlign: "center",
                                      margin: "auto",
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td>{manu.code}</td>
                                  <td>{manu.name}</td>
                                  <td>{dateCreateText}</td>
                                  <td>{dateUpdateText}</td>
                                  {/* <td>{manu.personCreate}</td>
                                  <td>{manu.personUpdate}</td> */}
                                  <td>
                                    {manu.status === 0
                                      ? "Hoạt động"
                                      : "Không hoạt động"}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      margin: "auto",
                                    }}
                                  >
                                    <button
                                      type="button"
                                      // class="close"
                                      data-dismiss="alert"
                                      aria-label="Close"
                                      style={{
                                        backgroundColor: "white",
                                      }}
                                      onClick={() => handleDelete(manu.id)}
                                    >
                                      <span aria-hidden="true">
                                        <FontAwesomeIcon
                                          icon={faUndo}
                                          style={{
                                            color: "green",
                                          }}
                                        />
                                      </span>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
              </section>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default ReturnManufacture;
