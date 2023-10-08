// import { useMemo, useState } from "react";
// import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
// import { NumberField } from "@refinedev/antd";
// import { Typography } from "antd";
// import { Line } from "@ant-design/charts";
// import { LineConfig } from "@ant-design/plots/lib/components/line";
// import dayjs, { Dayjs } from "dayjs";
// import { IncreaseIcon } from "../../icon/increase";
// import { DecreaseIcon } from "../../icon/decrease";

// // import { ISalesChart } from "../../../interfaces";
// import {
//   DailyRevenueWrapper,
//   TitleAreNumber,
//   TitleArea,
//   TitleAreaAmount,
//   RangePicker,
// } from "./styled";

// const DailyRevenue = () => {
//   const t = useTranslate();
//   const API_URL = useApiUrl();

//   // const [dateRange, setDateRange] =
//   //   useState <
//   //   [Dayjs, Dayjs] >
//   //   [dayjs().subtract(7, "days").startOf("day"), dayjs().startOf("day")];
//   // const [start, end] = dateRange;

//   //   const query = {
//   //     start,
//   //     end,
//   //   };

//   const url = `${API_URL}/dailyRevenue`;
//   const { data, isLoading } =
//     useCustom <
//     {
//       // data: ISalesChart[];
//       data: null,
//       total: 0,
//       trend: 0,
//     } >
//     {
//       url,
//       method: "get",
//       config: {
//         // query,
//       },
//     };

//   const config = useMemo(() => {
//     const config = (LineConfig = {
//       data: data?.data.data || [],
//       loading: isLoading,
//       padding: "auto",
//       xField: "date",
//       yField: "value",
//       color: "rgba(255, 255, 255, 0.5)",
//       tooltip: {
//         customContent: (title, data) => {
//           return `<div style="padding: 8px 4px; font-size:16px; font-weight:600">${data[0]?.value} $</div>`;
//         },
//       },

//       xAxis: {
//         label: null,
//         line: null,
//       },
//       yAxis: {
//         label: null,
//         grid: null,
//       },
//       smooth: true,
//       lineStyle: {
//         lineWidth: 4,
//       },
//     });

//     return config;
//   }, [data]);

//   const disabledDate = (date = Dayjs) => date > dayjs();

//   return (
//     <DailyRevenueWrapper>
//       <TitleArea>
//         <TitleAreaAmount>
//           <Typography.Title level={3}>Daily Revenue</Typography.Title>
//           <TitleAreNumber>
//             <NumberField
//               style={{ fontSize: 36 }}
//               strong
//               options={{
//                 currency: "VND",
//                 style: "currency",
//                 notation: "compact",
//               }}
//               value={data?.data.total ?? 0}
//             />
//             {/* {(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />} */}
//             <IncreaseIcon />
//           </TitleAreNumber>
//         </TitleAreaAmount>

//         <RangePicker
//           size="small"
//           //   value={dateRange}
//           //   onChange={(values) => {
//           //     if (values && values[0] && values[1]) {
//           //       setDateRange([values[0], values[1]]);
//           //     }
//           //   }}
//           disabledDate={disabledDate}
//           style={{
//             float: "right",
//             color: "#fffff !important",
//             background: "rgba(255, 255, 255, 0.3)",
//           }}
//           ranges={{
//             "This Week": [dayjs().startOf("week"), dayjs().endOf("week")],
//             "Last Month": [
//               dayjs().startOf("month").subtract(1, "month"),
//               dayjs().endOf("month").subtract(1, "month"),
//             ],
//             "This Month": [dayjs().startOf("month"), dayjs().endOf("month")],
//             "This Year": [dayjs().startOf("year"), dayjs().endOf("year")],
//           }}
//           // format="YYYY/MM/DD"
//           format="DD/MM/YYYY"
//         />
//       </TitleArea>
//       <Line
//         padding={0}
//         appendPadding={10}
//         height={135}
//         style={{ maxHeight: "135px" }}
//         {...config}
//       />
//     </DailyRevenueWrapper>
//   );
// };
// export default DailyRevenue;
import { useMemo, useState, useEffect } from "react";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { NumberField } from "@refinedev/antd";
import { Typography } from "antd";
import { LineConfig } from "@ant-design/plots/lib/components/line";
import dayjs, { Dayjs } from "dayjs";
import { IncreaseIcon } from "../../icon/increase";
import { DecreaseIcon } from "../../icon/decrease";

// import { ISalesChart } from "../../../interfaces";
import {
  DailyRevenueWrapper,
  TitleAreNumber,
  TitleArea,
  TitleAreaAmount,
  RangePicker,
} from "./styled";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const DailyRevenue = () => {
  const [data, setData] = useState([]);

  // Simulate data from the backend
  const fetchDataFromBackend = () => {
    // Replace this with actual API call to your backend
    const dataFromBackend = [
      { name: "", revenue: 10 },
      { name: "", revenue: 25 },
      { name: "", revenue: 12 },
      { name: "", revenue: 32 },
      { name: "", revenue: 18 },
      { name: "", revenue: 10 },
      { name: "", revenue: 25 },
    ];
    setData(dataFromBackend);
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  return (
    <DailyRevenueWrapper>
      <TitleArea>
        <TitleAreaAmount>
          <Typography.Title level={3}>Daily Revenue</Typography.Title>
        </TitleAreaAmount>
        <TitleAreNumber>
          <NumberField
            style={{ fontSize: 36, color: "white" }}
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "compact",
            }}
            value={50000000}
          />
          {/* {(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />} */}
          <IncreaseIcon />
        </TitleAreNumber>
      </TitleArea>
      <LineChart width={450} height={150} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="rgb(75, 192, 192)" />
      </LineChart>
    </DailyRevenueWrapper>
  );
};
export default DailyRevenue;
