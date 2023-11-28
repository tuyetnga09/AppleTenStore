import { useNavigation, useTranslate } from "@refinedev/core";
import {
  Typography,
  Table,
  Avatar,
  Space,
  Tag,
  Button,
  Form,
  Row,
  Modal,
  Dropdown,
} from "antd";
import {
  RecentOrdersColumn,
  Price,
  OrderId,
  Title,
  TitleWrapper,
} from "./styled";
import { List } from "@refinedev/antd";
import AvtProduct from "../../../custumer_componet/avtProduct";

import { readAll } from "../../../../service/product.service";
import {
  viewAllBillsForTheDayWhereStatusChoVanChuyen,
  getHoaDonsChoVanChuyenTrongNgay,
  getListBillDetailDashboard,
} from "../../../../service/dashboard/admin_bill.service";
import React, { useEffect, useState } from "react";
import { WarningFilled, MoreOutlined } from "@ant-design/icons";
// import { Button } from "bootstrap";

const { Text, Paragraph } = Typography;

const RecentOrders = () => {
  const [display, setDisplay] = useState([]);
  const [dataAccount, setDataAccount] = useState({});

  useEffect(() => {
    getHoaDonsChoVanChuyenTrongNgay()
      .then((response) => {
        console.log(response.data);
        setDisplay(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);

  const t = useTranslate();
  // const { tableProps } = useTable({
  //   resource: "orders",
  //   initialSorter: [
  //     {
  //       field: "createdAt",
  //       order: "desc",
  //     },
  //   ],
  //   initialPageSize: 4,
  //   permanentFilter: [
  //     {
  //       field: "status.text",
  //       operator: "eq",
  //       value: "Pending",
  //     },
  //   ],
  //   syncWithLocation: false,
  // });

  // const { show } = useNavigation();
  //phongnh -
  // mở modal
  const [isModalVisibleImei, setIsModalVisibleImei] = useState(false); // Trạng thái hiển thị Modal
  const [dataBillDetail, setDataBillDetail] = useState([]);

  const handleImeiOpen = () => {
    // load ra tất cả imei đã đucowj thêm vào bảng imei đã bán --->

    setIsModalVisibleImei(true);
  };
  // Hàm để ẩn Modal imei
  const handleCancelImei = () => {
    setDataBillDetail([]);
    setIsModalVisibleImei(false);
  };

  const handleBillDetail = (idBill) => {
    getListBillDetailDashboard(idBill)
      .then((response) => {
        setDataBillDetail(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    handleImeiOpen();
  };

  return (
    <>
      <List>
        <Form>
          <Table
            showHeader={false}
            rowKey="id"
            dataSource={display}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
              showTotal: (total) => `Tổng số ${total} đơn hàng`,
              showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
            }}
          >
            <Table.Column
              className="col-2"
              key="avatar"
              render={(_, display) => (
                <Avatar
                  size={{
                    xs: 60,
                    lg: 108,
                    xl: 132,
                    xxl: 144,
                  }}
                  src={`/imageUpload/` + display?.account?.user?.avatar}
                />
              )}
            />
            <RecentOrdersColumn
              className="col-4"
              key="summary"
              render={(_, display) => (
                <TitleWrapper>
                  <Title strong style={{ "text-align": "center" }}>
                    {display.code}
                  </Title>
                </TitleWrapper>
              )}
            />
            <RecentOrdersColumn
              className="col-3"
              // key="summary"
              style={{ textAlign: "center", margin: "outo" }}
              render={(_, display) => (
                <Space
                  direction="vertical"
                  style={{ textAlign: "center", margin: "outo" }}
                >
                  <Title
                    strong
                    style={{ textAlign: "center", margin: "outo" }}
                  >{`${display.userName}`}</Title>
                  <Text>{display.phoneNumber}</Text>
                </Space>
              )}
            />
            <Table.Column
              className="col-3"
              dataIndex="amount"
              render={(_, display) => (
                // <Space
                //   size="large"
                //   style={{
                //     display: "flex",
                //     // justifyContent: "space-between",
                //   }}
                // >
                <Space direction="vertical">
                  <Price
                    style={{ "text-align": "center" }}
                    strong
                    options={{
                      currency: "VND",
                      style: "currency",
                      notation: "standard",
                    }}
                    value={display.totalMoney}
                  />
                  <OrderId
                    // strong
                    style={{ "text-align": "center" }}
                    // onClick={() => {
                    //   show(display.id);
                    // }}
                    onClick={() => {
                      handleBillDetail(display.id);
                    }}
                  >
                    <Tag color="orange">Chi Tiết</Tag>
                  </OrderId>
                </Space>
                // </Space>
              )}
            />
            {/* <Table.Column
              fixed="right"
              key="actions"
              align="center"
              // render={(_, record) => <OrderActions record={record} />}
            /> */}
          </Table>
        </Form>
      </List>
      <Modal
        visible={isModalVisibleImei}
        onCancel={handleCancelImei}
        width={900}
        footer={null}
        bodyStyle={{ minHeight: "500px" }}
      >
        <Table
          rowKey="idSku"
          dataSource={dataBillDetail}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `Tổng số ${total} sản phẩm`,
            showLessItems: true, // Hiển thị "..." thay vì tất cả các trang
          }}
        >
          <Table.Column
            align="center"
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
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Tên Sản Phẩm"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.nameProduct}</p>
                </Form.Item>
              );
            }}
          />
          {/* sumSKU */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Phiên Bản"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>
                    {record.capacity} - {record.color}
                  </p>
                </Form.Item>
              );
            }}
          />
          {/* priceSKU  */}
          <Table.Column
            align="center"
            key="priceSKU"
            dataIndex="priceSKU"
            title="Giá Bán"
            sorter={(a, b) => a.price - b.price}
            render={(text, record) => {
              return record.price === null ? (
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
                  {parseFloat(record.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Form.Item>
              );
            }}
          />

          {/* sumImeiTrongKho */}
          <Table.Column
            align="center"
            key="isActive"
            dataIndex="isActive"
            title="Mã Imei"
            render={(text, record) => {
              return (
                <Form.Item name="title" style={{ margin: 0 }}>
                  <p>{record.imei}</p>
                </Form.Item>
              );
            }}
          />

          {/* <Table.Column
            dataIndex="products_actions"
            title="Actions"
            render={(_, record) => (
              <Dropdown
              // overlay={moreMenu2(record)} trigger={["click"]}
              >
                <MoreOutlined
                // onClick={(e) => e.stopPropagation()}
                // style={{
                //   fontSize: 24,
                // }}
                />
              </Dropdown>
            )}
          /> */}
        </Table>
      </Modal>
    </>
  );
};

export default RecentOrders;
