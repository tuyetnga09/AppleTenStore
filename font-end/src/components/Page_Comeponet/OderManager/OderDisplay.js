import { useEffect, useState } from "react";
import { useTranslate } from "@refinedev/core";
import { SearchOutlined , MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,DashboardOutlined,AppstoreAddOutlined,GiftOutlined,LogoutOutlined,ShopOutlined,  CloseCircleOutlined,  FormOutlined,
    MoreOutlined,} from "@ant-design/icons";
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
    Col,Layout, Menu, theme,  Badge, notification , Modal,  Dropdown,
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
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Header, Sider, Content } = Layout;


const OderDisplay = ({}) => {
    const t = useTranslate();
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [oder, setOder] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal

    // Hàm để hiển thị Modal khi cần
    const handleEditClick = (record) => {
        setIsModalVisible(true);
      };

    // Hàm để ẩn Modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };
   
    return(
        <>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['2']}
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
        <Text style={{ fontSize: "24px" , color: "blue"}} strong>
                  ODERS
        </Text>
        <Row gutter={[16, 16]}>
            <Col
                xl={6}
                lg={24}
                xs={24}
                style={{
                    marginTop: "52px",
                }}
            >
                <Card title={t("Filter")}>
                    <Form>
                        <Row gutter={[10, 0]} align="bottom">
                            <Col xl={24} md={8} sm={12} xs={24}>
                                <Form.Item label={t("Search")} name="q">
                                    <Input
                                        placeholder={t("Search")}
                                        prefix={<SearchOutlined />}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={24} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label={t("Status")}
                                    name="status"
                                >
                                    <Select
                                        allowClear
                                        mode="multiple"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={24} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label={t("Store")}
                                    name="store"
                                >
                                    <Select
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={24} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label={t("Filter")}
                                    name="user"
                                >
                                    <Select
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={24} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label={t("Date")}
                                    name="createdAt"
                                >
                                    <RangePicker style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col xl={24} md={8} sm={12} xs={24}>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        size="large"
                                        block
                                    >
                                        {t("FILLTER")}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
            <Col xl={18} xs={24}>
                <List>
                    <Table
                        rowKey="id"
                        dataSource={oder}
                        scroll={{ x: 'max-content' }}
                    >
                                <Table.Column
                                    key="id"
                                    dataIndex="id"
                                    title={t("ID")}
                                    render={(text, record) => (
                                        <span>{record.id}</span>
                                    )}
                                />
                                <Table.Column
                                    key="status"
                                    dataIndex="status"
                                    title={t("Status")}
                                    render={(text, record) => (
                                        <span>
                                            {record.status === 0 ? <Badge
                                                                    className="site-badge-count-109"
                                                                    count={"Hoạt động"}
                                                                    style={{ backgroundColor: '#52c41a' }}
                                                                /> : <Badge count={"Không hoạt động"} />}
                                        </span>
                                    )}
                                />
                                <Table.Column
                                    key="product"
                                    dataIndex="product"
                                    title={t("Product")}
                                    render={(text, record) => (
                                        <span>{record.product.name}</span>
                                    )}
                                />
                                <Table.Column
                                    key="quantity"
                                    dataIndex="quantity"
                                    title={t("Quantity")}
                                    render={(text, record) => (
                                        <span>{record.quantity}</span>
                                    )}
                                />
                                
                                <Table.Column
                                    key="price"
                                    dataIndex="price"
                                    title={t("Price")}
                                    render={(text, record) => (
                                        <span>{record.price}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="bill"
                                    dataIndex="bill"
                                    title={t("Address")}
                                    render={(text, record) => (
                                        <span>{record.bill.address}</span>
                                    )}
                                />
                                <Table.Column
                                    key="bill"
                                    dataIndex="bill"
                                    title={t("Total")}
                                    render={(text, record) => (
                                        <span>{record.bill.totalMoney}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="personCreate"
                                    dataIndex="personCreate"
                                    title={t("PersonCreate")}
                                    render={(text, record) => (
                                        <span>{record.personCreate}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="personUpdate"
                                    dataIndex="personUpdate"
                                    title={t("PersonUpdate")}
                                    render={(text, record) => (
                                        <span>{record.personUpdate}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="dateCreate"
                                    dataIndex="dateCreate"
                                    title={t("DateCreate")}
                                    render={(text, record) => (
                                        <span>{record.dateCreate}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="dateUpdate"
                                    dataIndex="dateUpdate"
                                    title={t("DateUpdate")}
                                    render={(text, record) => (
                                        <span>{record.dateUpdate}</span>
                                    )}
                                />
                                 
                                
                                <Table.Column
                                    key="actions"
                                    dataIndex="actions"
                                    title={t("Action")}
                                    fixed="right"
                                    align= "center"
                                    render={(text, record) => (
                                      <span>
                                        {/* <Button type="danger" >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                        <Button type="danger" >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Button> */}
                                         <Dropdown
                                            overlay={
                                            <Menu mode="vertical">
                                                <Menu.Item
                                                key="1"
                                                disabled={record.stock <= 0}
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
                                                // onClick={() => confirm2(record.id)}
                                                >
                                                Accept
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
                                                // onClick={() => editShow(item.id)}
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
                                      </span>
                                    )}
                                />
                    </Table>
                </List>
            </Col>
        </Row>
        </Content>
      </Layout>
    </Layout>
        </>
    );
};
export default OderDisplay;