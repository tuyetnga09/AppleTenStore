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
import { Row, Typography } from "antd";
import { LineConfig } from "@ant-design/plots/lib/components/line";
import dayjs, { Dayjs } from "dayjs";
import { IncreaseIcon } from "../../icon/increase";
import { DecreaseIcon } from "../../icon/decrease";
import {
  sumMoneyBill,
  sumMoneyBillNotStatusDaHuy,
  sumToTalMoneyBillUnconfimred,
  sumToTalMoneyBillConfirmed,
  sumToTalMoneyBillAreDelivering,
  sumToTalMoneyBillAlreadyPaid,
  sumToTalMoneyBillNoReturn,
  sumToTalMoneyBillReturns,
  sumToTalMoneyBillCancelOrder,
} from "../../../../service/dashboard/admin_bill.service";

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
import numeral from "numeral";

const DailyRevenue = () => {
  const [data, setData] = useState([]);
  const [dataSumMoneyBill, setDataSumMoneyBill] = useState();
  const [dataSumMoneyBillNotStatusDaHuy, setDataSumMoneyBillNotStatusDaHuy] =
    useState();
  const [
    dataSumToTalMoneyBillUnconfimred,
    setDataSumToTalMoneyBillUnconfimred,
  ] = useState();
  const [dataSumMoneyBillConfirmed, setDataSumMoneyBillConfirmed] = useState();
  const [dataSumMoneyBillAreDelivering, setDataSumMoneyBillAreDelivering] =
    useState();

  const [dataSumMoneyBillAlreadyPaid, setDataSumMoneyBillAlreadyPaid] =
    useState();
  const [dataSumMoneyBillNoReturn, setDataSumMoneyBillNoReturn] = useState();
  const [dataSumMoneyBillReturns, setDataSumMoneyBillReturns] = useState();
  const [dataSumMoneyBillCancelOrder, setDataSumMoneyBillCancelOrder] =
    useState();

  // Simulate data from the backend
  const fetchDataFromBackend = (a, b, c, d, e, f, g) => {
    // Replace this with actual API call to your backend
    // const number = a;
    // const formattedNumber = numeral(number).format("0,0");

    const dataFromBackend = [
      { name: "1MU", revenue: a },
      { name: "2MC", revenue: b },
      { name: "3MAD", revenue: c },
      { name: "4MAP", revenue: d },
      { name: "5MNR", revenue: e },
      { name: "6MR", revenue: f },
      { name: "7MCO", revenue: g },
    ];
    setData(dataFromBackend);
  };

  useEffect(() => {
    let unconfirmedData = null;
    let confirmedData = null;
    let alreadyPaidData = null;
    let areDeliveringData = null;
    let noReturnData = null;
    let returnsData = null;
    let cancelOrderData = null;
    //1
    sumMoneyBill()
      .then((response) => {
        console.log(response.data);
        setDataSumMoneyBill(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    //2
    sumMoneyBillNotStatusDaHuy()
      .then((response) => {
        console.log(response.data);
        setDataSumMoneyBillNotStatusDaHuy(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    //3----
    sumToTalMoneyBillUnconfimred()
      .then((response) => {
        console.log(response.data);
        setDataSumToTalMoneyBillUnconfimred(response.data);
        unconfirmedData = response.data;
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //4
    sumToTalMoneyBillConfirmed()
      .then((response) => {
        console.log(response.data);
        setDataSumMoneyBillConfirmed(response.data);
        confirmedData = response.data;
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //5
    sumToTalMoneyBillAreDelivering()
      .then((response) => {
        console.log(response.data);
        setDataSumMoneyBillAreDelivering(response.data);
        areDeliveringData = response.data;
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //6
    sumToTalMoneyBillAlreadyPaid()
      .then((response) => {
        console.log(response.data);
        setDataSumMoneyBillAlreadyPaid(response.data);
        alreadyPaidData = response.data;
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //7
    sumToTalMoneyBillNoReturn()
      .then((response) => {
        console.log(response.data);
        setDataSumMoneyBillNoReturn(response.data);
        noReturnData = response.data;
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    //8
    sumToTalMoneyBillReturns()
      .then((response) => {
        console.log(response.data);
        setDataSumMoneyBillReturns(response.data);
        returnsData = response.data;
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //9
    sumToTalMoneyBillCancelOrder()
      .then((response) => {
        console.log(response.data);
        setDataSumMoneyBillCancelOrder(response.data);

        cancelOrderData = response.data;

        fetchDataFromBackend(
          unconfirmedData,
          confirmedData,
          areDeliveringData,
          alreadyPaidData,
          noReturnData,
          returnsData,
          cancelOrderData
        );
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);
  const { Text, Title } = Typography;
  return (
    <DailyRevenueWrapper>
      {/* <TitleArea> */}
      <Row>
        <TitleAreaAmount>
          <Typography.Title level={3}>Thực Thu Hôm Nay</Typography.Title>
        </TitleAreaAmount>
      </Row>
      <Row>
        <TitleAreNumber>
          <NumberField
            style={{ fontSize: 26, color: "white" }}
            strong
            options={{
              currency: "VND",
              style: "currency",
              // notation: "compact",
            }}
            value={dataSumMoneyBillNotStatusDaHuy}
          />
          {/* {(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />} */}
          <IncreaseIcon />
        </TitleAreNumber>
      </Row>
      {/* </TitleArea> */}

      <LineChart width={450} height={150} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="rgb(75, 192, 192)" />
      </LineChart>
      {/* 1 */}
      <TitleArea>
        <Title level={4} style={{ color: "red" }}>
          * Doanh Thu Dự Tính Hôm Nay
        </Title>

        <NumberField
          style={{ fontSize: 20, color: "red" }}
          strong
          options={{
            currency: "VND",
            style: "currency",
            // notation: "compact",
          }}
          value={dataSumMoneyBill}
        />
      </TitleArea>
      {/* 2 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          1MU - Tổng tiền đơn hàng chờ xác nhận
        </Title>

        <NumberField
          style={{ fontSize: 20, color: "white" }}
          strong
          options={{
            currency: "VND",
            style: "currency",
            // notation: "compact",
          }}
          value={dataSumToTalMoneyBillUnconfimred}
        />
      </TitleArea>

      {/* 3 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          2MC - Tổng tiền đơn hàng đã xác nhận
        </Title>

        <NumberField
          style={{ fontSize: 20, color: "white" }}
          strong
          options={{
            currency: "VND",
            style: "currency",
            // notation: "compact",
          }}
          value={dataSumMoneyBillConfirmed}
        />
      </TitleArea>
      {/* 4 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          3MAD - Tổng tiền đơn hàng đang vận chuyển
        </Title>

        <NumberField
          style={{ fontSize: 20, color: "white" }}
          strong
          options={{
            currency: "VND",
            style: "currency",
            // notation: "compact",
          }}
          value={dataSumMoneyBillAreDelivering}
        />
      </TitleArea>
      {/* 5 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          4MAP - Tổng tiền đơn hàng đã thanh toán
        </Title>

        <NumberField
          style={{ fontSize: 20, color: "white" }}
          strong
          options={{
            currency: "VND",
            style: "currency",
            // notation: "compact",
          }}
          value={dataSumMoneyBillAlreadyPaid}
        />
      </TitleArea>
      {/* 6 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          5MNR - Tổng tiền đơn hàng không hoàn trả
        </Title>

        <NumberField
          style={{ fontSize: 20, color: "white" }}
          strong
          options={{
            currency: "VND",
            style: "currency",
            // notation: "compact",
          }}
          value={dataSumMoneyBillNoReturn}
        />
      </TitleArea>
      {/* 7 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          6MR - Tổng tiền đơn hàng hoàn trả
        </Title>

        <NumberField
          style={{ fontSize: 20, color: "white" }}
          strong
          options={{
            currency: "VND",
            style: "currency",
            // notation: "compact",
          }}
          value={dataSumMoneyBillReturns}
        />
      </TitleArea>
      {/* 8 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          7MCO - Tổng tiền đơn hàng huỷ đơn
        </Title>

        <NumberField
          style={{ fontSize: 20, color: "white" }}
          strong
          options={{
            currency: "VND",
            style: "currency",
            // notation: "compact",
          }}
          value={dataSumMoneyBillCancelOrder}
        />
      </TitleArea>
    </DailyRevenueWrapper>
  );
};
export default DailyRevenue;
