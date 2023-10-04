// import { useMemo } from "react";
// import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
// import { Typography } from "antd";
// import { Column } from "@ant-design/charts";
// import { ColumnConfig } from "@ant-design/plots/lib/components/column";

// import { IncreaseIcon } from "../../icon/increase";
// import { DecreaseIcon } from "../../icon/decrease";

// // import { ISalesChart } from "../../../interfaces";
// import { DailyOrderWrapper, TitleAreNumber, TitleArea } from "./styled";

// const DailyOrders = () => {
//   const t = useTranslate();
//   const API_URL = useApiUrl();

//   const url = `${API_URL}/dailyOrders`;
//   const { data, isLoading } =
//     useCustom <
//     {
//       data: null,
//       total: 0,
//       trend: 0,
//     } >
//     { url, method: "get" };

//   const { Text, Title } = Typography;

//   const config = useMemo(() => {
//     const config = (ColumnConfig = {
//       data: data?.data.data || [],
//       loading: isLoading,
//       padding: 0,
//       xField: "date",
//       yField: "value",
//       maxColumnWidth: 16,
//       columnStyle: {
//         radius: [4, 4, 0, 0],
//       },
//       color: "rgba(255, 255, 255, 0.5)",
//       tooltip: {
//         customContent: (title, data) => {
//           return `<div style="padding: 8px 4px; font-size:16px; font-weight:600">${data[0]?.value}</div>`;
//         },
//       },

//       xAxis: {
//         label: null,
//         line: null,
//         tickLine: null,
//       },
//       yAxis: {
//         label: null,
//         grid: null,
//         tickLine: null,
//       },
//     });

//     return config;
//   }, [data]);

//   return (
//     <DailyOrderWrapper>
//       <TitleArea>
//         <Title level={3}>Daily Orders</Title>
//         <TitleAreNumber>
//           <Text strong>{data?.data.total ?? 0} </Text>

//           {/* {(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />} */}
//           <IncreaseIcon />
//           {/* <DecreaseIcon /> */}
//         </TitleAreNumber>
//       </TitleArea>
//       <Column
//         style={{ padding: 0, height: 135 }}
//         appendPadding={10}
//         {...config}
//       />
//     </DailyOrderWrapper>
//   );
// };

// export default DailyOrders;

import { useMemo, useState, useEffect } from "react";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { Typography } from "antd";
import { Column } from "@ant-design/charts";
import { ColumnConfig } from "@ant-design/plots/lib/components/column";

import { IncreaseIcon } from "../../icon/increase";
import { DecreaseIcon } from "../../icon/decrease";

// import { ISalesChart } from "../../../interfaces";
import { DailyOrderWrapper, TitleAreNumber, TitleArea } from "./styled";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const DailyOrders = () => {
  const [data, setData] = useState([]);

  // Simulate data from the backend
  const fetchDataFromBackend = () => {
    // Replace this with actual API call to your backend
    const dataFromBackend = [
      { name: "", orders: 10 },
      { name: "", orders: 25 },
      { name: "", orders: 12 },
      { name: "", orders: 32 },
      { name: "", orders: 18 },
      { name: "", orders: 10 },
      { name: "", orders: 25 },
    ];
    setData(dataFromBackend);
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const { Text, Title } = Typography;

  return (
    <DailyOrderWrapper>
      <TitleArea>
        <Title level={3}>Daily Orders</Title>
        <TitleAreNumber>
          <Text strong>50</Text>

          {/* {(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />} */}
          <IncreaseIcon />
          {/* <DecreaseIcon /> */}
        </TitleAreNumber>
      </TitleArea>
      <LineChart width={300} height={150} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" stroke="rgb(75, 192, 192)" />
      </LineChart>
    </DailyOrderWrapper>
  );
};

export default DailyOrders;
