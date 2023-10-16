import { useNavigation, useTranslate } from "@refinedev/core";
import { Typography, Table, Avatar, Space, Tag, Button } from "antd";
import {
  RecentOrdersColumn,
  Price,
  OrderId,
  Title,
  TitleWrapper,
} from "./styled";

import { readAll } from "../../../../service/product.service";
import { viewAllBillsForTheDayWhereStatusChoVanChuyen } from "../../../../service/dashboard/admin_bill.service";
import React, { useEffect, useState } from "react";
// import { Button } from "bootstrap";

const { Text, Paragraph } = Typography;

const RecentOrders = () => {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    viewAllBillsForTheDayWhereStatusChoVanChuyen("key=&page=0")
      .then((response) => {
        console.log(response.data);
        setDisplay(response.data.content);
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
    <Table showHeader={false} rowKey="id" dataSource={display}>
      <Table.Column
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
        key="summary"
        render={(_, display) => (
          <TitleWrapper>
            <Title strong>{display.code}</Title>
            {/* <Paragraph
              ellipsis={{
                rows: 2,
                tooltip: display.description,
                symbol: <span>...</span>,
              }}
            >
              {display.description}
            </Paragraph> */}
          </TitleWrapper>
        )}
      />
      <RecentOrdersColumn
        key="summary"
        render={(_, display) => (
          <Space direction="vertical">
            <Title strong>{`${display.userName}`}</Title>
            <Text>{display.phoneNumber}</Text>
          </Space>
        )}
      />
      <Table.Column
        dataIndex="amount"
        render={(_, display) => (
          <Space
            size="large"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Price
              strong
              options={{
                currency: "VND",
                style: "currency",
                notation: "standard",
              }}
              value={display.totalMoney}
            />
            <OrderId
              strong
              onClick={() => {
                show("orders", display.id);
              }}
            >
              {/* <Button>Xem Chi Tiết</Button> */}
              <Tag color="orange">Xem Chi Tiết</Tag>
            </OrderId>
          </Space>
        )}
      />
      <Table.Column
        fixed="right"
        key="actions"
        align="center"
        // render={(_, record) => <OrderActions record={record} />}
      />
    </Table>
  );
};

export default RecentOrders;
