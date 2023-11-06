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

import {useEffect, useState} from "react";
import {Typography} from "antd";

import {IncreaseIcon} from "../../icon/increase";
import {
    sumAllBill,
    sumBillAlreadyPaid,
    sumBillAreDelivering,
    sumBillCancelOrder,
    sumBillConfirmed,
    sumBillNoReturn,
    sumBillReturns,
    sumBillUnconfimred,
} from "../../../../service/dashboard/admin_bill.service";

// import { ISalesChart } from "../../../interfaces";
import {DailyOrderWrapper, TitleArea, TitleAreNumber} from "./styled";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis,} from "recharts";

const DailyOrders = () => {
  const [data, setData] = useState([]);
  const [dataSumAllBill, setDataSumAllBill] = useState();
  const [dataSumUnconfimred, setDataSumUnconfimred] = useState();
  const [dataSumConfimred, setDataSumConfimred] = useState();
  const [dataSumAreDelivering, setDataSumAreDelivering] = useState();
  const [dataSumAlreadyPaid, setDataSumAlreadyPaid] = useState();
  const [dataSumNoReturn, setDataSumNoReturn] = useState();
  const [dataSumReturns, setDataSumReturns] = useState();
  const [dataSumCancelOrder, setDataSumCancelOrder] = useState();
  const [dataOrder, setDataOrder] = useState([]);
  // Simulate data from the backend

  useEffect(() => {
    let unconfirmedData = null;
    let confirmedData = null;
    let alreadyPaidData = null;
    let areDeliveringData = null;
    let noReturnData = null;
    let returnsData = null;
    let cancelOrderData = null;
    //1
    sumAllBill()
      .then((response) => {
        console.log(response.data);
        setDataSumAllBill(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    //2
    sumBillUnconfimred()
      .then((response) => {
        console.log(response.data);
        setDataSumUnconfimred(response.data);
        // setDataOrder([...dataOrder, response.data]);
        unconfirmedData = response.data;
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //3
    sumBillConfirmed()
      .then((response) => {
        console.log(response.data);
        setDataSumConfimred(response.data);
        confirmedData = response.data;
        // setDataOrder(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    //4
    sumBillAreDelivering()
      .then((response) => {
        console.log(response.data);
        setDataSumAreDelivering(response.data);
        areDeliveringData = response.data;
        // setDataOrder(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //5
    sumBillAlreadyPaid()
      .then((response) => {
        console.log(response.data);
        setDataSumAlreadyPaid(response.data);
        alreadyPaidData = response.data;
        // setDataOrder(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //6
    sumBillNoReturn()
      .then((response) => {
        console.log(response.data);
        setDataSumNoReturn(response.data);
        noReturnData = response.data;
        // setDataOrder(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //7
    sumBillReturns()
      .then((response) => {
        console.log(response.data);
        setDataSumReturns(response.data);
        returnsData = response.data;
        // setDataOrder(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    //8
    sumBillCancelOrder()
      .then((response) => {
        console.log(response.data);
        setDataSumCancelOrder(response.data);
        cancelOrderData = response.data;
        // setDataOrder(response.data);
        // Gọi fetchDataFromBackend sau khi nhận được cả hai dữ liệu
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

  const fetchDataFromBackend = (a, b, c, d, e, f, g) => {
    console.log(a + " " + b + " " + c + " " + d + " " + e + " " + f + " " + g);
    console.log(dataOrder + " -------oder 2 : ");
    // Replace this with actual API call to your backend
    const dataFromBackend = [
      { name: "1U", orders: a },
      { name: "2C", orders: b },
      { name: "3AD", orders: c },
      { name: "4AP", orders: d },
      { name: "5NR", orders: e },
      { name: "6R", orders: f },
      { name: "7CO", orders: g },
    ];
    setData(dataFromBackend);
  };

  const { Text, Title } = Typography;

  return (
    <DailyOrderWrapper>
      <TitleArea>
        <Title level={3}>Đơn Hàng Hôm Nay</Title>
        <TitleAreNumber>
          <Text strong>{dataSumAllBill}</Text>

          {/* {(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />} */}
          <IncreaseIcon />
          {/* <DecreaseIcon /> */}
        </TitleAreNumber>
      </TitleArea>
      <div>
        <Text strong>-</Text>
      </div>

      <LineChart width={330} height={150} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" stroke="rgb(75, 192, 192)" />
      </LineChart>
      {/* 1 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          1U - Đơn hàng chờ xác nhận
        </Title>
        <TitleAreNumber>
          <Title level={5} style={{ color: "white" }}>
            {dataSumUnconfimred}
          </Title>
        </TitleAreNumber>
      </TitleArea>
      {/* 2 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          2C - Đơn hang đã xác nhận
        </Title>
        <TitleAreNumber>
          <Title level={5} style={{ color: "white" }}>
            {dataSumConfimred}
          </Title>
        </TitleAreNumber>
      </TitleArea>
      {/* 3 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          3AD - Đơn hàng đang vận chuyển
        </Title>
        <TitleAreNumber>
          <Title level={5} style={{ color: "white" }}>
            {dataSumAreDelivering}
          </Title>
        </TitleAreNumber>
      </TitleArea>

      {/* 4 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          4AP - Đơn hàng đã thanh toán
        </Title>
        <TitleAreNumber>
          <Title level={5} style={{ color: "white" }}>
            {dataSumAlreadyPaid}
          </Title>
        </TitleAreNumber>
      </TitleArea>
      {/* 5 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          5NR - Đơn hàng không hoàn trả
        </Title>
        <TitleAreNumber>
          <Title level={5} style={{ color: "white" }}>
            {dataSumNoReturn}
          </Title>
        </TitleAreNumber>
      </TitleArea>
      {/* 6 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          6R - Đơn hàng hoàn trả
        </Title>
        <TitleAreNumber>
          <Title level={5} style={{ color: "white" }}>
            {dataSumReturns}
          </Title>
        </TitleAreNumber>
      </TitleArea>
      {/* 7 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          7CO - Đơn hàng huỷ
        </Title>
        <TitleAreNumber>
          <Title level={5} style={{ color: "white" }}>
            {dataSumCancelOrder}
          </Title>
        </TitleAreNumber>
      </TitleArea>
    </DailyOrderWrapper>
  );
};

export default DailyOrders;
