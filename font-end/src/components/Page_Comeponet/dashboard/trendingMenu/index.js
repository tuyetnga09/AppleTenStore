import { NumberField } from "@refinedev/antd";
import {
  Typography,
  Avatar,
  Space,
  List as AntdList,
  Tag,
  Row,
  Col,
} from "antd";
import { Container, AvatarWrapper, AvatarCircle, TextWrapper } from "./styled";
import React, { useEffect, useState } from "react";
import { readAll } from "../../../../service/product.service";
import { monthlyTrendingMenus } from "../../../../service/dashboard/admin_bill.service";
// import AvtProduct from "../../../custumer_componet/avtProduct";
import AvtProduct from "./AvtProduct";

import { Column } from "@antv/g2plot";
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
              {/* <AvatarWrapper className="menu-item__avatar"> */}
              {<AvtProduct product={entry.product.id}></AvtProduct>}

              {/* <AvtProduct
                    product={entry.product.id}
                  ></AvtProduct> */}
              {/* <AvatarProduct product={entry.product.id}></AvatarProduct> */}
              {/* <AvatarCircle>
                  <span>#{index + 1}</span>
                </AvatarCircle> */}
              {/* </AvatarWrapper> */}
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
