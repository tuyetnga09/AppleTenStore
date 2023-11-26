import { useNavigation, useTranslate } from "@refinedev/core";
import { Typography, Table, Avatar, Space, Tag, Button, Form, Row } from "antd";
import {
  RecentOrdersColumn,
  Price,
  OrderId,
  Title,
  TitleWrapper,
} from "./styled";
import { List } from "@refinedev/antd";

import { readAll } from "../../../../service/product.service";
import {
  viewAllBillsForTheDayWhereStatusChoVanChuyen,
  getHoaDonsChoVanChuyenTrongNgay,
} from "../../../../service/dashboard/admin_bill.service";
import React, { useEffect, useState } from "react";
// import { Button } from "bootstrap";

const { Text, Paragraph } = Typography;

const RecentOrders = () => {
  const [display, setDisplay] = useState([]);

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

  const { show } = useNavigation();

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
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY5fHxmb29kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
                    onClick={() => {
                      show("orders", display.id);
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
    </>
  );
};

export default RecentOrders;
