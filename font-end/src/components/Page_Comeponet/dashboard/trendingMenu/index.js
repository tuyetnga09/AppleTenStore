import { NumberField } from "@refinedev/antd";
import { Typography, Avatar, Space, List as AntdList, Tag } from "antd";
import { Container, AvatarWrapper, AvatarCircle, TextWrapper } from "./styled";
import React, { useEffect, useState } from "react";
import { readAll } from "../../../../service/product.service";
import { monthlyTrendingMenus } from "../../../../service/dashboard/admin_bill.service";
const { Text } = Typography;

const TrendingMenu = () => {
  const [display, setDisplay] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);

  useEffect(() => {
    readAll("key=&page=0")
      .then((response) => {
        setDisplay(response.data.content);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    monthlyTrendingMenus()
      .then((response) => {
        setDisplayProduct(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);

  return (
    <>
      {displayProduct.map((entry, index) => {
        return (
          <Container key={entry.id}>
            {/* <Text>{entry.keys.SKU.color} ooooop</Text> */}
            <Space size="large">
              <AvatarWrapper className="menu-item__avatar">
                <Avatar
                  size={{
                    xs: 30,
                    sm: 30,
                    md: 30,
                    lg: 70,
                    xl: 100,
                    xxl: 70,
                    // xs: 64,
                    // sm: 64,
                    // md: 64,
                    // lg: 108,
                    // xl: 132,
                    // xxl: 108,
                  }}
                  // src={dl.name}
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY5fHxmb29kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                />
                {/* <AvatarCircle>
                  <span>#{index + 1}</span>
                </AvatarCircle> */}
              </AvatarWrapper>
              <TextWrapper>
                <Text strong>{entry.product.name}</Text>
                <NumberField
                  strong
                  options={{
                    currency: "VND",
                    style: "currency",
                    notation: "standard",
                  }}
                  value={entry.price}
                />
              </TextWrapper>
              <TextWrapper>
                <Text strong>
                  {entry.color} - {entry.capacity}
                </Text>
                <Text strong>Đã bán: {entry.sumSku}</Text>
                {/* <Text strong>Đã bán: {entry.sumSku}</Text> */}
              </TextWrapper>
            </Space>
          </Container>
        );
      })}
    </>
  );
};

export default TrendingMenu;
