import { useMemo, useEffect, useState } from "react";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { ConfigProvider, theme, Typography } from "antd";
import { Column } from "@ant-design/charts";
import { ColumnConfig } from "@ant-design/plots/lib/components/column";
import { IncreaseIcon } from "../../icon/increase";
import { DecreaseIcon } from "../../icon/decrease";
import {
  countCustomersOrderToday,
  countCustomersCanceledToday,
  countCustomersPaidToday,
  countCustomersReturnedToday,
} from "../../../../service/dashboard/admin_bill.service";
import { NumberField } from "@refinedev/antd";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  numberOfCustomersLastMonth,
  numberOfCustomersThisMonth,
} from "../../../../service/Account/account.service";

import {
  Header,
  HeaderNumbers,
  NewCustomersWrapper,
  TitleArea,
  TitleAreNumber,
} from "./styled";

const NewCustomers = () => {
  const [data, setData] = useState([]);
  const [dataLastMonth, setDataLastMonth] = useState([]);
  const [dataThisMonth, setDataThisMonth] = useState([]);

  //count khách hàng đặt hàng hôm nay
  const [datacountCustomersOrderToday, setDataCountCustomersOrderToday] =
    useState();
  //    //số khác hàng đã huỷ đơn hôm nay
  const [dataCountCustomersCanceledToday, setDataCountCustomersCanceledToday] =
    useState();
  //    //số khách hàng đã thanh toán hôm nay
  const [dataCountCustomersPaidToday, setDataCountCustomersPaidToday] =
    useState();
  //    // số khách hàng trả đơn trong hôm nay
  const [dataCountCustomersReturnedToday, setDataCountCustomersReturnedToday] =
    useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastMonthRes = await numberOfCustomersLastMonth();
        const thisMonthRes = await numberOfCustomersThisMonth();
        const countUncomfim = await countCustomersOrderToday();
        const countCanceledOder = await countCustomersCanceledToday();
        const countPaid = await countCustomersPaidToday();
        const countReturn = await countCustomersReturnedToday();

        const dataFromBackend = [
          { name: "Last Month", customers: lastMonthRes.data },
          { name: "This Month", customers: thisMonthRes.data },
        ];

        setData(dataFromBackend);
        setDataLastMonth(lastMonthRes.data);
        setDataThisMonth(thisMonthRes.data);
        setDataCountCustomersOrderToday(countUncomfim.data);
        setDataCountCustomersCanceledToday(countCanceledOder.data);
        setDataCountCustomersPaidToday(countPaid.data);
        setDataCountCustomersReturnedToday(countReturn.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const { Text, Title } = Typography;

  function phanTram() {
    if (dataLastMonth == 0) {
      return ((dataThisMonth - dataLastMonth) / 1) * 100;
    } else {
      return ((dataThisMonth - dataLastMonth) / dataLastMonth) * 100;
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <NewCustomersWrapper>
        {/* <Header> */}
        {/* <TitleArea>
          <Title level={3}></Title>
          <TitleAreNumber>
            <Text strong>{dataThisMonth}</Text>
          </TitleAreNumber>
        </TitleArea>
        <div>
          <Text strong>{phanTram()}%</Text>
          <IncreaseIcon />
        </div> */}

        <TitleArea>
          <Title level={3}>New Customers</Title>
          <TitleAreNumber>
            <Text strong>{dataThisMonth}</Text>

            {/* {(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />} */}
            <IncreaseIcon />
            {/* <DecreaseIcon /> */}
          </TitleAreNumber>
        </TitleArea>
        <div>
          <Text>{phanTram()}%</Text>
          <IncreaseIcon />
        </div>

        {/* <HeaderNumbers>
            <Text strong>{dataThisMonth}</Text>
            <div>
              <Text strong>{phanTram()}%</Text>
              <IncreaseIcon />
            </div>
          </HeaderNumbers> */}
        {/* </Header> */}
        <LineChart width={270} height={150} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="customers"
            stroke="rgb(75, 192, 192)"
          />
        </LineChart>
        {/* 1 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            1 - Sum Bill Unconfimred
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {datacountCustomersOrderToday}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 2 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            2 - Sum Bill Already Paid
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataCountCustomersPaidToday}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 3 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            3 - Sum Bill Returns
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataCountCustomersReturnedToday}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 4 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            4 - Sum Bill Cancel Order
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataCountCustomersCanceledToday}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 5 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            -
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              -
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 6 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            -
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              -
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 7 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            -
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              -
            </Title>
          </TitleAreNumber>
        </TitleArea>
      </NewCustomersWrapper>
    </ConfigProvider>
  );
};

export default NewCustomers;
