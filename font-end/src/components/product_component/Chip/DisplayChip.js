import React, { useEffect, useState, useRef } from "react";
import { readAll, deleteChip } from "../../../service/chip.service";
import { Link } from "react-router-dom";
import "../../../css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faDownload,
  faEdit,
  faFileExcel,
  faPlus,
  faQrcode,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import Pagination from "../Chip/PageNext";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
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

const Display = () => {
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
  const history = useHistory();
  useEffect(() => {
    if (storedUser?.roles === "CUSTOMER" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });
      history.replace("/");
    } else {
      const paramsString = queryString.stringify(filters);
      readAll(paramsString)
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

  function handlePageChange(newPage) {
    console.log("New Page: " + newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }

  async function remove(id) {
    deleteChip(id).then(() => {
      let newArr = [...display].filter((s) => s.id !== id);
      setDisplay(newArr);
    });
  }

  function handleDownload(csvData, fileName) {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { page: 0, key: "" };
    item[name] = value;
    setFilters(item);
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
              <Menu.Item key="8">
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
            <div className="bodyform">
              <section class="ftco-section">
                <div class="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-4">
                      <h2 className="heading-section">Chip</h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <form className="d-flex" role="search">
                        <Link to="/chip/displayDelete">
                          <button
                            class="btn btn-outline-success"
                            type="submit"
                            style={{ marginRight: "15px" }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ width: "20px", height: "20px" }}
                            />
                          </button>
                        </Link>

                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          name="key"
                          onChange={handleChange}
                        />
                        {/* <Link to="/chip/scan"> */}
                        <button
                          className="btn btn-outline-success"
                          style={{ marginLeft: "15px" }}
                          type="button"
                        >
                          <FontAwesomeIcon
                            icon={faQrcode}
                            className="search-icon"
                          />
                        </button>
                        {/* </Link> */}
                        <Link to="/chip/new">
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            style={{ marginRight: "15px", marginLeft: "15px" }}
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="add-icon"
                            />
                          </button>
                        </Link>
                        <Link to="/chip/im">
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            style={{ marginRight: "15px" }}
                          >
                            <FontAwesomeIcon
                              icon={faFileExcel}
                              className="excel-icon"
                            />
                          </button>
                        </Link>

                        <button
                          type="button"
                          className="btn btn-outline-success"
                          style={{ marginRight: "15px" }}
                          onClick={() => handleDownload(display, "chip")}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            className="download-icon"
                          />
                        </button>
                      </form>
                      <br />
                      <div className="table-wrap">
                        <table className="table">
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
                            {display.map((s, index) => {
                              const dateCreate = new Date(s.dateCreate);
                              const dateUpdate = new Date(s.dateUpdate);
                              const dateCreateText =
                                dateCreate.toLocaleDateString();
                              const dateUpdateText =
                                dateUpdate.toLocaleDateString();
                              return (
                                <tr className="alert" role="alert" key={s.id}>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      margin: "auto",
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td>{s.code}</td>
                                  <td>{s.name}</td>
                                  <td>{dateCreateText}</td>
                                  <td>{dateUpdateText}</td>
                                  {/* <td>{s.personCreate}</td>
                                  <td>{s.personUpdate}</td> */}
                                  <td>
                                    {s.status === 0
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
                                      // className="close"
                                      data-dismiss="alert"
                                      aria-label="Edit"
                                      style={{
                                        backgroundColor: "white",
                                        marginRight: "3px",
                                      }}
                                    >
                                      <Link to={"/chip/" + s.id}>
                                        <span aria-hidden="true">
                                          <FontAwesomeIcon
                                            icon={faEdit}
                                            style={{
                                              color: "green",
                                            }}
                                          />
                                        </span>
                                      </Link>
                                    </button>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="alert"
                                      aria-label="Close"
                                      style={{
                                        backgroundColor: "white",
                                        marginLeft: "3px",
                                      }}
                                      onClick={() => remove(s.id)}
                                    >
                                      <span aria-hidden="true">
                                        <FontAwesomeIcon
                                          icon={faClose}
                                          style={{
                                            color: "red",
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
export default Display;
