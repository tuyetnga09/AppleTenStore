import { useEffect, useState } from "react";
import { readAll,deleteVoucher,add, detail, update } from "../../../service/Voucher/voucher.service";
import { useTranslate } from "@refinedev/core";
import { SearchOutlined , MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,} from "@ant-design/icons";
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
    Col,Layout, Menu, theme,  Badge, notification , Modal,
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

const VoucherDisplay = ({}) => {
    const t = useTranslate();
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [voucher, setVoucher] = useState([]);
    const [editedVoucher, setEditedVoucher] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị Modal

    // Hàm để hiển thị Modal khi cần
    const handleEditClick = (record) => {
        setEditedVoucher(record);
        setIsModalVisible(true);
        console.log(editedVoucher);
      };

    // Hàm để ẩn Modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        readAll()
          .then((response) => {
            console.log(response.data);
            setVoucher(response.data.content);
            // setEditedVoucher(response.data);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }, []);
    
    async function remove(id) {
        deleteVoucher(id).then(() => {
          let newArr = [...voucher].filter((s) => s.id !== id);
          setVoucher(newArr);
          notification.success({
            message: "DELETE VOUCHER",
            description: "Delete Voucher successfully",
          });
          history.push("/voucher");
          return {
            success: true,
          };
        });
    }

   
    // const dateStart = voucher.dateStart;
    // const dateStartText = dateStart.toLocaleDateString();

    // const dateEnd = voucher.dateEnd;
    // const dateEndText = dateEnd.toLocaleDateString();
    
    return(
        <>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['2']}
                items={[
                    {
                    key: '1',
                    icon: <UserOutlined />,
                    label: 'Home',
                    },
                    {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: 'Voucher',
                    },
                    {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: 'Product',
                    },
                ]}
                />
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
                  VOUCHER
        </Text>
        {/* <Row gutter={[16, 16]}>
        <Col
                xl={6}
                lg={24}
                xs={24}
                style={{
                    marginTop: "52px",
                }}
            >

        </Col>
        <Col xl={18} xs={24}>

        </Col>
        </Row> */}
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
                                        // {...orderSelectProps}
                                        allowClear
                                        mode="multiple"
                                        // placeholder={t("Status")}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={24} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label={t("Store")}
                                    name="store"
                                >
                                    <Select
                                        // {...storeSelectProps}
                                        allowClear
                                        // placeholder={t("orders.filter.store.placeholder")}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xl={24} md={8} sm={12} xs={24}>
                                <Form.Item
                                    label={t("Filter")}
                                    name="user"
                                >
                                    <Select
                                        // {...userSelectProps}
                                        allowClear
                                        // placeholder={t("orders.filter.user.placeholder")}
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
                
                {/* <Link to="/voucher/new">
                    <Button style={{ marginLeft: "1000px" }}> 
                        <FaPlus className="add-icon" />
                    </Button>
                </Link> */}
    
                <CreateVoucher/>
                
                <List>
                    <Table
                        rowKey="id"
                        dataSource={voucher}
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
                                    key="code"
                                    dataIndex="code"
                                    title={t("Code")}
                                    render={(text, record) => (
                                        <span>{record.code}</span>
                                    )}
                                />
                                <Table.Column
                                    key="name"
                                    dataIndex="name"
                                    title={t("Name")}
                                    render={(text, record) => (
                                        <span>{record.name}</span>
                                    )}
                                />
                                <Table.Column
                                    key="dateStart"
                                    dataIndex="dateStart"
                                    title={t("DateStart")}
                                    render={(text, record) => (
                                        <span>{record.dateStart}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="dateEnd"
                                    dataIndex="dateEnd"
                                    title={t("DateEnd")}
                                    render={(text, record) => (
                                        <span>{record.dateEnd}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="conditionsApply"
                                    dataIndex="conditionsApply"
                                    title={t("ConditionsApply")}
                                    render={(text, record) => (
                                        <span>{record.conditionsApply}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="valueVoucher"
                                    dataIndex="valueVoucher"
                                    title={t("ValueVoucher")}
                                    render={(text, record) => (
                                        <span>{record.valueVoucher}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="valueMinimum"
                                    dataIndex="valueMinimum"
                                    title={t("ValueMinimum")}
                                    render={(text, record) => (
                                        <span>{record.valueMinimum}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="valueMaximum"
                                    dataIndex="valueMaximum"
                                    title={t("ValueMaximum")}
                                    render={(text, record) => (
                                        <span>{record.valueMaximum}</span>
                                    )}
                                />
                                 <Table.Column
                                    key="typeVoucher"
                                    dataIndex="typeVoucher"
                                    title={t("TypeVoucher")}
                                    render={(text, record) => (
                                        <span>{record.typeVoucher}</span>
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
                                    key="actions"
                                    dataIndex="actions"
                                    title={t("Action")}
                                    fixed="right"
                                    align= "center"
                                    render={(text, record) => (
                                      <span>
                                        <Button type="danger" onClick={() => remove(record.id)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                        {/* <Link to={"/voucher/" + record.id}> */}
                                        <Button type="danger" onClick={() => handleEditClick(record)}>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Button>
                                        {/* </Link> */}
                                        {/* <Link to={"/voucher/update/" + record.id}>
                                            <Button type="danger">
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </Button>
                                        </Link> */}
                                      </span>
                                    )}
                                />
                    </Table>
                </List>
            </Col>
        </Row>
        <section>
            <Modal
              visible={isModalVisible}
              onCancel={handleCancel}
              width={1000}
              footer={null}
              bodyStyle={{ minHeight: "450px" }}
            >
                <UpdateVoucher editedVoucher={editedVoucher}/>
            </Modal>
          </section>
        </Content>
      </Layout>
    </Layout>
        </>
    );
};
export default VoucherDisplay;