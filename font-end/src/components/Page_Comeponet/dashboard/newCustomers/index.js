import React, { useEffect, useState } from "react";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { ConfigProvider, theme, Typography } from "antd";
import { Column } from "@ant-design/charts";
import { ColumnConfig } from "@ant-design/plots/lib/components/column";
import { IncreaseIcon } from "../../icon/increase";
import { DecreaseIcon } from "../../icon/decrease";
import Timelin from "../orderTimeline/index";
import {
  countCustomersOrderToday,
  countCustomersCanceledToday,
  countCustomersPaidToday,
  countCustomersReturnedToday,
  tongTaiKhoanTrongThangHienTai,
  tongTaiKhoanHoatDongHienTai,
  tongTaiKhoanHienTai,
  tongTaiKhoanHomNay,
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

const NewCustomers = (props) => {
  const { dataCustomer } = props;
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

  const [dataTongTaiKhoan, setDataTongTaiKhoan] = useState();

  const [dataTongTaiKhoanMoi, setDataTongTaiKhoanMoi] = useState();

  const [dataTongTaiKhoanDangSuDung, setDataTongTaiKhoanDangSuDung] =
    useState();

  const [dataTongTaiKhoanTrongThang, setDataTongTaiKhoanTrongThang] =
    useState();

  // const billSeachKhoangNgay = JSON.parse(
  //   localStorage.getItem("billSeachKhoangNgay")
  // );

  const fetchData = (a, b) => {
    const dataFromBackend = [
      { name: "Last Month", customers: a },
      { name: "This Month", customers: b },
    ];
    setData(dataFromBackend);
  };

  const [dataCheck, setDataCheck] = useState({
    check: false,
    choXacNhan: 0,
    choVanChuyen: 0,
    dangVanChuyen: 0,
    daThanhToan: 0,
    hoanTra: 0,
    donHuy: 0,
  });

  const [billSeachKhoangNgay, setLocalStorageData] = useState(
    localStorage.getItem("billSeachKhoangNgay11")
  );
  useEffect(() => {
    // setLocalStorageData(
    //   JSON.parse(localStorage.getItem("billSeachKhoangNgay"))
    // );
    let last = 0;
    let first = 0;
    // console.log(billSeachKhoangNgay.check);

    // if (billSeachKhoangNgay?.check === true) {
    //   setDataCheck(billSeachKhoangNgay);
    //   // setDataCheck(true);
    //   console.log(billSeachKhoangNgay.check);
    //   alert(billSeachKhoangNgay.check);

    //   setDataTongTaiKhoan(billSeachKhoangNgay.tongTaiKhoan);
    //   setDataTongTaiKhoanMoi(billSeachKhoangNgay.tongTaiKhoanMoi);
    //   setDataTongTaiKhoanDangSuDung(billSeachKhoangNgay.tongTaiKhoanDangSuDung);
    //   setDataTongTaiKhoanTrongThang(billSeachKhoangNgay.tongTaiKhoanTrongThang);
    //   setDataCountCustomersOrderToday(billSeachKhoangNgay.tongTaiKhoanDatHang);
    //   setDataCountCustomersPaidToday(
    //     billSeachKhoangNgay.tongTaiKhoanDaThanhToan
    //   );
    //   setDataCountCustomersCanceledToday(
    //     billSeachKhoangNgay.tongTaiKhoanHuyDon
    //   );
    // } else {
    //   console.log(billSeachKhoangNgay.check);
    // console.log(data.check + " data");
    // console.log(searchData + " searchData");

    numberOfCustomersLastMonth()
      .then((response) => {
        setDataLastMonth(response.data);
        last = response.data;
        fetchData(last, first);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    numberOfCustomersThisMonth()
      .then((response) => {
        setDataThisMonth(response.data);
        first = response.data;
        fetchData(last, first);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    countCustomersOrderToday()
      .then((response) => {
        setDataCountCustomersOrderToday(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    countCustomersCanceledToday()
      .then((response) => {
        setDataCountCustomersCanceledToday(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    countCustomersPaidToday()
      .then((response) => {
        setDataCountCustomersPaidToday(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });

    tongTaiKhoanTrongThangHienTai()
      .then((response) => {
        setDataTongTaiKhoanTrongThang(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    tongTaiKhoanHoatDongHienTai()
      .then((response) => {
        setDataTongTaiKhoanDangSuDung(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    tongTaiKhoanHienTai()
      .then((response) => {
        setDataTongTaiKhoan(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    tongTaiKhoanHomNay()
      .then((response) => {
        setDataTongTaiKhoanMoi(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    // setDataCheck(dataCheck);
    // }
    // console.log(searchData + " heplme");
    console.log(dataCustomer + " heplme2");
  }, [dataCustomer]);

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
          <Title level={3}>Tài Khoản Mới Hôm Nay</Title>
          <TitleAreNumber>
            <Text strong>{dataTongTaiKhoanMoi}</Text>

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
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            1 - test
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              - {dataCustomer}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 1 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            1 - Tổng Tài khoản
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataTongTaiKhoan}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 1 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            2 - Tài khoản Đang Sử Dụng
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataTongTaiKhoanDangSuDung}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 1 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            3 - Tài khoản Mới Trong Tháng
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataTongTaiKhoanTrongThang}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 1 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            4 - Tài khoản đã đặt hàng
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
            5 - Tài khoản đã thanh toán
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataCountCustomersPaidToday}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 3 */}
        {/* <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            6 - Tài khoản đã trả hàng
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataCountCustomersReturnedToday}
            </Title>
          </TitleAreNumber>
        </TitleArea> */}
        {/* 4 */}
        <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            6 - Tài khoản đã huỷ đơn
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              {dataCountCustomersCanceledToday}
            </Title>
          </TitleAreNumber>
        </TitleArea>
        {/* 5 */}
        {/* <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            -
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              -
            </Title>
          </TitleAreNumber>
        </TitleArea> */}
        {/* 6 */}
        {/* <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            -
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              -
            </Title>
          </TitleAreNumber>
        </TitleArea> */}
        {/* 7 */}
        {/* <TitleArea>
          <Title level={5} style={{ color: "white" }}>
            -
          </Title>
          <TitleAreNumber>
            <Title level={5} style={{ color: "white" }}>
              -
            </Title>
          </TitleAreNumber>
        </TitleArea> */}
      </NewCustomersWrapper>
    </ConfigProvider>
  );
};

export default NewCustomers;
