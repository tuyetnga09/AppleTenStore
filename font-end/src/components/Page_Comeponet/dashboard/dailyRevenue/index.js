import React, { useState, useEffect } from "react";
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
import "./style.css";
import {
  DailyRevenueWrapper,
  TitleAreNumber,
  TitleArea,
  TitleAreaAmount,
  // RangePicker,
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
import { style } from "@mui/system";

const DailyRevenue = () => {
  const [dataDailyRevenue, setDataDailyRevenue] = useState([]);
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

  const [billSeachKhoangNgay, setBillSeachKhoangNgay] = useState();

  // Simulate data from the backend
  const fetchDataFromBackendDailyRevenue = (a, b, c, d, e, f, g) => {
    const dataFromBackend = [
      { name: "1MU", Tien: a },
      { name: "2MC", Tien: b },
      { name: "3MAD", Tien: c },
      { name: "4MAP", Tien: d },
      // { name: "5MNR", revenue: e },
      { name: "5MR", Tien: f },
      { name: "6MCO", Tien: g },
    ];
    setDataDailyRevenue(dataFromBackend);
  };

  useEffect(() => {
    let unconfirmedDataDailyRevenue = 0;
    let confirmedDataDailyRevenue = 0;
    let alreadyPaidDataDailyRevenue = 0;
    let areDeliveringDataDailyRevenue = 0;
    let noReturnDataDailyRevenue = 0;
    let returnsDataDailyRevenue = 0;
    let cancelOrderDataDailyRevenue = 0;
    if (billSeachKhoangNgay !== null) {
      if (billSeachKhoangNgay.check === true) {
        unconfirmedDataDailyRevenue = billSeachKhoangNgay.tongTienDonChoXacNhan;
        confirmedDataDailyRevenue = billSeachKhoangNgay.tongTienDonChoVanChuyen;
        areDeliveringDataDailyRevenue =
          billSeachKhoangNgay.tongTienDonDangVanChuyen;
        alreadyPaidDataDailyRevenue = billSeachKhoangNgay.tongTienDnDaThanhToan;
        noReturnDataDailyRevenue = 0;
        returnsDataDailyRevenue = billSeachKhoangNgay.tongTienDonHoanTra;
        cancelOrderDataDailyRevenue = billSeachKhoangNgay.tongTienDonHangHuy;
        fetchDataFromBackendDailyRevenue(
          unconfirmedDataDailyRevenue,
          confirmedDataDailyRevenue,
          areDeliveringDataDailyRevenue,
          alreadyPaidDataDailyRevenue,
          noReturnDataDailyRevenue,
          returnsDataDailyRevenue,
          cancelOrderDataDailyRevenue
        );

        setDataSumMoneyBill(0);
        setDataSumMoneyBillNotStatusDaHuy(billSeachKhoangNgay.tongTienThucThu);
        setDataSumToTalMoneyBillUnconfimred(
          billSeachKhoangNgay.tongTienDonChoXacNhan
        );
        setDataSumMoneyBillConfirmed(
          billSeachKhoangNgay.tongTienDonChoVanChuyen
        );
        setDataSumMoneyBillAreDelivering(
          billSeachKhoangNgay.tongTienDonDangVanChuyen
        );
        setDataSumMoneyBillAlreadyPaid(
          billSeachKhoangNgay.tongTienDnDaThanhToan
        );
        setDataSumMoneyBillNoReturn(0); // k dung nua
        setDataSumMoneyBillReturns(billSeachKhoangNgay.tongTienDonHoanTra);
        setDataSumMoneyBillCancelOrder(billSeachKhoangNgay.tongTienDonHangHuy);
      }
    } else {
      //1 - hien tai khong dung nua
      sumMoneyBill()
        .then((response) => {
          setDataSumMoneyBill(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });

      //2
      sumMoneyBillNotStatusDaHuy()
        .then((response) => {
          setDataSumMoneyBillNotStatusDaHuy(response.data);
        })
        .catch((error) => {
          console.log(`${error}`);
        });

      //3----
      sumToTalMoneyBillUnconfimred()
        .then((response) => {
          setDataSumToTalMoneyBillUnconfimred(response.data);
          unconfirmedDataDailyRevenue = response.data;
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      //4
      sumToTalMoneyBillConfirmed()
        .then((response) => {
          setDataSumMoneyBillConfirmed(response.data);
          confirmedDataDailyRevenue = response.data;
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      //5
      sumToTalMoneyBillAreDelivering()
        .then((response) => {
          setDataSumMoneyBillAreDelivering(response.data);
          areDeliveringDataDailyRevenue = response.data;
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      //6
      sumToTalMoneyBillAlreadyPaid()
        .then((response) => {
          setDataSumMoneyBillAlreadyPaid(response.data);
          alreadyPaidDataDailyRevenue = response.data;
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      //7
      sumToTalMoneyBillNoReturn()
        .then((response) => {
          setDataSumMoneyBillNoReturn(response.data);
          noReturnDataDailyRevenue = response.data;
        })
        .catch((error) => {
          console.log(`${error}`);
        });

      //8
      sumToTalMoneyBillReturns()
        .then((response) => {
          setDataSumMoneyBillReturns(response.data);
          returnsDataDailyRevenue = response.data;
        })
        .catch((error) => {
          console.log(`${error}`);
        });
      //9
      sumToTalMoneyBillCancelOrder()
        .then((response) => {
          setDataSumMoneyBillCancelOrder(response.data);

          cancelOrderDataDailyRevenue = response.data;

          fetchDataFromBackendDailyRevenue(
            unconfirmedDataDailyRevenue,
            confirmedDataDailyRevenue,
            areDeliveringDataDailyRevenue,
            alreadyPaidDataDailyRevenue,
            noReturnDataDailyRevenue,
            returnsDataDailyRevenue,
            cancelOrderDataDailyRevenue
          );
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }
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

      <LineChart
        width={450}
        height={150}
        data={dataDailyRevenue}
        id="id-linechart"
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Tien" stroke="rgb(75, 192, 192)" />
      </LineChart>

      {/* 1 */}
      {/* <TitleArea>
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
      </TitleArea> */}
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
          2MC - Tổng tiền đơn hàng chờ vận chuyển
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
      {/* <TitleArea>
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
      </TitleArea> */}
      {/* 7 */}
      <TitleArea>
        <Title level={5} style={{ color: "white" }}>
          5MR - Tổng tiền đơn hàng hoàn trả
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
          6MCO - Tổng tiền đơn hàng huỷ đơn
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
