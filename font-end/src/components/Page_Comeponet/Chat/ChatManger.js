import { useEffect, useState } from "react";
import { readAll,deleteVoucher,add, detail, update } from "../../../service/Voucher/voucher.service";
import { useTranslate } from "@refinedev/core";
import { SearchOutlined , MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,DashboardOutlined,AppstoreAddOutlined,GiftOutlined,LogoutOutlined,ShopOutlined,CloseCircleOutlined,  FormOutlined,MoreOutlined,} from "@ant-design/icons";
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
    Col,Layout, Menu, theme,  Badge, notification , Modal,Dropdown,
} from "antd";
import {
    List,
    Array
} from "@refinedev/antd";
import {
    Link,
    useHistory,
    useParams,
  } from "react-router-dom/cjs/react-router-dom.min";
import { faTimes, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateVoucher from "../Voucher/CreateVoucher";
import UpdateVoucher from "../Voucher/UpdateVoucher";
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Header, Sider, Content } = Layout;

const ChatManager = ({}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return(
        <>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['5']}
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
                <Menu.Item key="6" icon={<LogoutOutlined />}>
                    <Link to="/logout">Logout</Link>
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
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
        <section className="gradient-custom">
        <div className="container py-5">
            <div className="row">
            <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
                <h5 className="font-weight-bold mb-3 text-center text-white">Member</h5>
                <div className="card mask-custom">
                <div className="card-body">
                    <ul className="list-unstyled mb-0">
                    <li
                        className="p-2 border-bottom"
                        style={{
                        borderBottom: "1px solid rgba(255,255,255,.3) !important"
                        }}
                    >
                        <a
                        href="#!"
                        className="d-flex justify-content-between link-light"
                        >
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">John Doe</p>
                            <p className="small text-white">Hello, Are you there?</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-white mb-1">Just now</p>
                            <span className="badge bg-danger float-end">1</span>
                        </div>
                        </a>
                    </li>
                    <li
                        className="p-2 border-bottom"
                        style={{
                        borderBottom: "1px solid rgba(255,255,255,.3) !important"
                        }}
                    >
                        <a
                        href="#!"
                        className="d-flex justify-content-between link-light"
                        >
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Danny Smith</p>
                            <p className="small text-white">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-white mb-1">5 mins ago</p>
                        </div>
                        </a>
                    </li>
                    <li
                        className="p-2 border-bottom"
                        style={{
                        borderBottom: "1px solid rgba(255,255,255,.3) !important"
                        }}
                    >
                        <a
                        href="#!"
                        className="d-flex justify-content-between link-light"
                        >
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Alex Steward</p>
                            <p className="small text-white">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-white mb-1">Yesterday</p>
                        </div>
                        </a>
                    </li>
                    <li
                        className="p-2 border-bottom"
                        style={{
                        borderBottom: "1px solid rgba(255,255,255,.3) !important"
                        }}
                    >
                        <a
                        href="#!"
                        className="d-flex justify-content-between link-light"
                        >
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Ashley Olsen</p>
                            <p className="small text-white">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-white mb-1">Yesterday</p>
                        </div>
                        </a>
                    </li>
                    <li
                        className="p-2 border-bottom"
                        style={{
                        borderBottom: "1px solid rgba(255,255,255,.3) !important"
                        }}
                    >
                        <a
                        href="#!"
                        className="d-flex justify-content-between link-light"
                        >
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Kate Moss</p>
                            <p className="small text-white">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-white mb-1">Yesterday</p>
                        </div>
                        </a>
                    </li>
                    <li
                        className="p-2 border-bottom"
                        style={{
                        borderBottom: "1px solid rgba(255,255,255,.3) !important"
                        }}
                    >
                        <a
                        href="#!"
                        className="d-flex justify-content-between link-light"
                        >
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Lara Croft</p>
                            <p className="small text-white">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-white mb-1">Yesterday</p>
                        </div>
                        </a>
                    </li>
                    <li className="p-2">
                        <a
                        href="#!"
                        className="d-flex justify-content-between link-light"
                        >
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Brad Pitt</p>
                            <p className="small text-white">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-white mb-1">5 mins ago</p>
                            <span className="text-white float-end">
                            <i className="fas fa-check" aria-hidden="true" />
                            </span>
                        </div>
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-7 col-xl-7">
                <ul className="list-unstyled text-white">
                <li className="d-flex justify-content-between mb-4">
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width={60}
                    />
                    <div className="card mask-custom">
                    <div
                        className="card-header d-flex justify-content-between p-3"
                        style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                    >
                        <p className="fw-bold mb-0">Brad Pitt</p>
                        <p className="text-light small mb-0">
                        <i className="far fa-clock" /> 12 mins ago
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    </div>
                </li>
                <li className="d-flex justify-content-between mb-4">
                    <div className="card mask-custom w-100">
                    <div
                        className="card-header d-flex justify-content-between p-3"
                        style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                    >
                        <p className="fw-bold mb-0">Lara Croft</p>
                        <p className="text-light small mb-0">
                        <i className="far fa-clock" /> 13 mins ago
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium.
                        </p>
                    </div>
                    </div>
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width={60}
                    />
                </li>
                <li className="d-flex justify-content-between mb-4">
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width={60}
                    />
                    <div className="card mask-custom">
                    <div
                        className="card-header d-flex justify-content-between p-3"
                        style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                    >
                        <p className="fw-bold mb-0">Brad Pitt</p>
                        <p className="text-light small mb-0">
                        <i className="far fa-clock" /> 10 mins ago
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    </div>
                </li>
                <li className="mb-3">
                    <div className="form-outline form-white">
                    <textarea
                        className="form-control"
                        id="textAreaExample3"
                        rows={4}
                        defaultValue={""}
                    />
                    <label className="form-label" htmlFor="textAreaExample3">
                        Message
                    </label>
                    </div>
                </li>
                <button
                    type="button"
                    className="btn btn-light btn-lg btn-rounded float-end"
                >
                    Send
                </button>
                </ul>
            </div>
            </div>
        </div>
        </section>

        </Content>
      </Layout>
    </Layout>
        </>
    );
};
export default ChatManager;