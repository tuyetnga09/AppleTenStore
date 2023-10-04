// import { useMemo } from "react";
// import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
// import { ConfigProvider, theme, Typography } from "antd";
// import { Column } from "@ant-design/charts";
// import { ColumnConfig } from "@ant-design/plots/lib/components/column";
// import { IncreaseIcon } from "../../icon/increase";
// import { DecreaseIcon } from "../../icon/decrease";

// import { Header, HeaderNumbers, NewCustomersWrapper } from "./styled";

// const NewCustomers = () => {
//   const t = useTranslate();
//   const API_URL = useApiUrl();

//   const url = `${API_URL}/newCustomers`;
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
//     <ConfigProvider
//       theme={{
//         algorithm: theme.darkAlgorithm,
//       }}
//     >
//       <NewCustomersWrapper>
//         <Header>
//           <Title level={3}>New Customers</Title>
//           <HeaderNumbers>
//             <Text strong>{data?.data.total ?? 0}</Text>
//             <div>
//               <Text strong>{data?.data.trend ?? 0}%</Text>
//               {/* {(data?.data?.trend ?? 0) > 0 ? (
//                 <IncreaseIcon />
//               ) : (
//                 <DecreaseIcon />
//               )} */}
//               <IncreaseIcon />
//             </div>
//           </HeaderNumbers>
//         </Header>
//         <Column
//           style={{ padding: 0, height: 162 }}
//           appendPadding={10}
//           {...config}
//         />
//       </NewCustomersWrapper>
//     </ConfigProvider>
//   );
// };

// export default NewCustomers;
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

import { Header, HeaderNumbers, NewCustomersWrapper } from "./styled";

const NewCustomers = () => {
  const [data, setData] = useState([]);

  // Simulate data from the backend
  const fetchDataFromBackend = () => {
    // Replace this with actual API call to your backend
    const dataFromBackend = [
      { name: "Yesterday", customers: 1000 },
      { name: "Today", customers: 1100 },
    ];
    setData(dataFromBackend);
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const { Text, Title } = Typography;

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
            <Text strong>100</Text>
            <div>
              <Text strong>10%</Text>
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
