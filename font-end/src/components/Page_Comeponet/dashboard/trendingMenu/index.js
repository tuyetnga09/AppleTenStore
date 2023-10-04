import { NumberField } from "@refinedev/antd";
import { Typography, Avatar, Space, List as AntdList } from "antd";
import { Container, AvatarWrapper, AvatarCircle, TextWrapper } from "./styled";
import React, { useEffect, useState } from "react";
import { readAll } from "../../../../service/product.service";

const { Text } = Typography;

const TrendingMenu = () => {
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    readAll("key=&page=0")
      .then((response) => {
        console.log(response.data);
        setDisplay(response.data.content);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);

  return (
    <>
      {display.map((dl, index) => {
        return (
          <Container key={dl.id}>
            <Space size="large">
              <AvatarWrapper className="menu-item__avatar">
                <Avatar
                  size={{
                    xs: 64,
                    sm: 64,
                    md: 64,
                    lg: 108,
                    xl: 132,
                    xxl: 108,
                  }}
                  // src={dl.name}
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY5fHxmb29kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                />
                <AvatarCircle>
                  <span>#{index + 1}</span>
                </AvatarCircle>
              </AvatarWrapper>
              <TextWrapper>
                <Text strong>{dl.name}</Text>
                <NumberField
                  strong
                  options={{
                    currency: "VND",
                    style: "currency",
                    notation: "standard",
                  }}
                  value={dl.price}
                />
              </TextWrapper>
            </Space>
          </Container>
        );
      })}
    </>
  );
};

export default TrendingMenu;
