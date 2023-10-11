import { useMemo, useEffect, useState } from "react";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { ConfigProvider, theme, Typography } from "antd";
import { Column } from "@ant-design/charts";
import { ColumnConfig } from "@ant-design/plots/lib/components/column";
import { IncreaseIcon } from "../../icon/increase";
import { DecreaseIcon } from "../../icon/decrease";
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

import { Header, HeaderNumbers, NewCustomersWrapper } from "./styled";

const NewCustomers = () => {
  const [data, setData] = useState([]);
  const [dataLastMonth, setDataLastMonth] = useState([]);
  const [dataThisMonth, setDataThisMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lastMonthRes = await numberOfCustomersLastMonth();
        const thisMonthRes = await numberOfCustomersThisMonth();

        const dataFromBackend = [
          { name: "Last Month", customers: lastMonthRes.data },
          { name: "This Month", customers: thisMonthRes.data },
        ];

        setData(dataFromBackend);
        setDataLastMonth(lastMonthRes.data);
        setDataThisMonth(thisMonthRes.data);
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
        <Header>
          <Title level={3}>New Customers</Title>
          <HeaderNumbers>
            <Text strong>{dataThisMonth - dataLastMonth}</Text>
            <div>
              <Text strong>{phanTram()}%</Text>
              <IncreaseIcon />
            </div>
          </HeaderNumbers>
        </Header>
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
      </NewCustomersWrapper>
    </ConfigProvider>
  );
};

export default NewCustomers;
