import React, { useEffect, useState } from "react";
import { Alert, Typography } from "antd";
import { useRef } from "react";
import { IncreaseIcon } from "../../icon/increase";
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

import isEqual from "lodash/isEqual";
// import { ISalesChart } from "../../../interfaces";
import { DailyOrderWrapper, TitleArea, TitleAreNumber } from "./styled";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DailyOrders = (props) => {
  const [dataDailyOrder, setDataDailyOrder] = useState([]);
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
  const prevData = useRef();
  const [billSeachKhoangNgay, setLocalStorageData] = useState(
    localStorage.getItem("billSeachKhoangNgay")
  );
  useEffect(() => {
    let unconfirmedData = 0;
    let confirmedData = 0;
    let alreadyPaidData = 0;
    let areDeliveringData = 0;
    let noReturnData = 0;
    let returnsData = 0;
    let cancelOrderData = 0;
    if (billSeachKhoangNgay !== null) {
      if (billSeachKhoangNgay.check === true) {
        unconfirmedData = billSeachKhoangNgay.choXacNhan;
        confirmedData = billSeachKhoangNgay.choVanChuyen;
        areDeliveringData = billSeachKhoangNgay.dangVanChuyen;
        alreadyPaidData = billSeachKhoangNgay.daThanhToan;
        noReturnData = 0;
        returnsData = billSeachKhoangNgay.hoanTra;
        cancelOrderData = billSeachKhoangNgay.donHuy;
        fetchDataFromBackend(
          unconfirmedData,
          confirmedData,
          areDeliveringData,
          alreadyPaidData,
          noReturnData,
          returnsData,
          cancelOrderData
        );

        setDataSumAllBill(billSeachKhoangNgay.sumBill);
        setDataSumUnconfimred(billSeachKhoangNgay.choXacNhan);
        setDataSumConfimred(billSeachKhoangNgay.choVanChuyen);
        setDataSumAreDelivering(billSeachKhoangNgay.dangVanChuyen);
        setDataSumAlreadyPaid(billSeachKhoangNgay.daThanhToan);
        setDataSumNoReturn(0);
        setDataSumReturns(billSeachKhoangNgay.hoanTra);
        setDataSumCancelOrder(billSeachKhoangNgay.donHuy);
      }
    } else {
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
          setDataSumUnconfimred(response.data);
          // setDataOrder([...dataOrder, response.data]);
          unconfirmedData = response.data;
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
      //3
      sumBillConfirmed()
        .then((response) => {
          setDataSumConfimred(response.data);
          confirmedData = response.data;
          // setDataOrder(response.data);
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

      //4
      sumBillAreDelivering()
        .then((response) => {
          setDataSumAreDelivering(response.data);
          areDeliveringData = response.data;
          // setDataOrder(response.data);
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
      //5
      sumBillAlreadyPaid()
        .then((response) => {
          setDataSumAlreadyPaid(response.data);
          alreadyPaidData = response.data;
          // setDataOrder(response.data);
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
      //6
      sumBillNoReturn()
        .then((response) => {
          console.log(response.data);
          setDataSumNoReturn(response.data);
          noReturnData = response.data;
          // setDataOrder(response.data);
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
      //7
      sumBillReturns()
        .then((response) => {
          setDataSumReturns(response.data);
          returnsData = response.data;
          // setDataOrder(response.data);
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
      //8
      sumBillCancelOrder()
        .then((response) => {
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
    }
  }, []);

  const fetchDataFromBackend = (a, b, c, d, e, f, g) => {
    // Replace this with actual API call to your backend
    const dataFromBackend = [
      { name: "1U", orders: a },
      { name: "2C", orders: b },
      { name: "3AD", orders: c },
      { name: "4AP", orders: d },
      // { name: "5NR", orders: e },
      { name: "5R", orders: f },
      { name: "6CO", orders: g },
    ];
    setDataDailyOrder(dataFromBackend);
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

      <LineChart width={330} height={150} data={dataDailyOrder}>
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
          2C - Đơn hàng chờ vận chuyển
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
      {/* <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          5NR - Đơn hàng không hoàn trả
        </Title>
        <TitleAreNumber>
          <Title level={5} style={{ color: "white" }}>
            {dataSumNoReturn}
          </Title>
        </TitleAreNumber>
      </TitleArea> */}
      {/* 6 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          5R - Đơn hàng trả
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
          6CO - Đơn hàng huỷ
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
