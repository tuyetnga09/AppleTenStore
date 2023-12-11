import React, { useEffect, useState, useRef } from "react";
import { importCategory } from "../../../service/category.service";
import "../../../css/form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Button, Layout, Menu, notification, theme } from "antd";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
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
const ImportCategory = () => {
  const [file, setFile] = useState(null);
  const toast = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const history = useHistory();

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    importCategory(formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    history.push("/category/display");
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
              <Menu.Item key="manufacture">
                <Link to="/manufacture/display">Manufacture</Link>
              </Menu.Item>
              <Menu.Item key="category">
                <Link to="/category/display">Category</Link>
              </Menu.Item>
              <Menu.Item key="8">
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
            <form onSubmit={handleUpload} enctype="multipart/form-data">
              <div className="form-row">
                <div className="input-data">
                  <input
                    type="file"
                    class="form-control"
                    name="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <br></br>
              <div className="form-row">
                <div className="input-data textarea">
                  <div className="form-row submit-btn">
                    <button type="submit" class="btn btn-outline-secondary">
                      Upload
                    </button>
                    <Link to="/category/display">
                      <button
                        class="btn btn-light"
                        style={{ marginLeft: "15px" }}
                      >
                        {/* <a href="/battery/display"> */}
                        {/* <FontAwesomeIcon icon={faTimesCircle} /> */}
                        Thoát
                        {/* </a> */}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default ImportCategory;
