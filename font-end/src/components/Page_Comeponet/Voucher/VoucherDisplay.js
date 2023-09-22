import React, { useEffect, useState } from "react";
import { readAll } from "../../../service/Voucher/voucher.service";
import {
    useTranslate,
    // IResourceComponentsProps,
    // useNavigation,
    // useShow,
} from "@refinedev/core";
import {
  SearchOutlined,
  CloseCircleOutlined,
  FormOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
    Typography,
    Table,
    Popover,
    Card,
    Input,
    Form,
    DatePicker,
    Select,
    Button,
    FormProps,
    Row,
    Col,
} from "antd";
import {
    List,
    TextField,
    useTable,
    getDefaultSortOrder,
    DateField,
    NumberField,
    useSelect,
    ExportButton,
} from "@refinedev/antd";
const { RangePicker } = DatePicker;
const { Text } = Typography;

const VoucherDisplay = ({}) => {
    const t = useTranslate();

    const [voucher, setVoucher] = useState([]);


    useEffect(() => {
        readAll()
          .then((response) => {
            console.log(response.data);
            setVoucher(response.data.content);
          })
          .catch((error) => {
            console.log(`${error}`);
          });
      }, []);
    
        
    return(
        <>
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
                <Text style={{ fontSize: "24px" }} strong>
                  VOUCHER
                </Text>
                <Button > 
                  {/* {t("stores.buttons.addProduct")} */}
                  ADD PRODUCT
                </Button>
                <List>
                    <Table
                        rowKey="id"
                        dataSource={voucher}
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
                                    fixed="right"
                                    title={t("ACTION")}
                                    dataIndex="actions"
                                    key="actions"
                                    align="center"
                                    
                                />
                    </Table>
                </List>
            </Col>
        </Row>
        </>
    );
};
export default VoucherDisplay;