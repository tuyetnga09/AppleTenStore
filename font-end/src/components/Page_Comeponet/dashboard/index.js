import {
  Row,
  Col,
  Card,
  Typography,
  Layout,
  Menu,
  Button,
  theme,
  List as AntdList,
  // Tooltip,
  ConfigProvider,
  notification,
  Select,
} from "antd";
import { Option } from "antd/es/mentions";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import DailyRevenue from "../dashboard/dailyRevenue/index";
import DailyOrders from "../dashboard/dailyOrders/index";
import NewCustomers from "../dashboard/newCustomers/index";
import DeliveryMap from "../dashboard/deliveryMap/index";
import OrderTimeline from "../dashboard/orderTimeline/index";
import RecentOrders from "../dashboard/recentOrders/index";
import TrendingMenu from "../dashboard/trendingMenu/index";
import OffLayoutArea from "../offLayoutArea/index";
import HeaderDashBoard from "../header/index";
import "./style.css";

import {
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,
  GiftOutlined,
  LogoutOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
//DailyRevenue
import { NumberField } from "@refinedev/antd";
import {
  DailyRevenueWrapper,
  // TitleAreNumber,
  // TitleArea,
  TitleAreaAmount,
  // RangePicker,
} from "./dailyRevenue/styled";
import "./dailyRevenue/style.css";
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
  getListYearOfBill,
  seachDoanhThuTeaoNam,
} from "../../../service/dashboard/admin_bill.service";

//DailyOder
import {
  DailyOrderWrapper,
  // TitleArea,
  // TitleAreNumber,
} from "./dailyOrders/styled";
import {
  sumAllBill,
  sumBillAlreadyPaid,
  sumBillAreDelivering,
  sumBillCancelOrder,
  sumBillConfirmed,
  sumBillNoReturn,
  sumBillReturns,
  sumBillUnconfimred,
} from "../../../service/dashboard/admin_bill.service";

//Customer
import { IncreaseIcon } from "../icon/increase";
import {
  countCustomersOrderToday,
  countCustomersCanceledToday,
  countCustomersPaidToday,
  countCustomersReturnedToday,
  tongTaiKhoanTrongThangHienTai,
  tongTaiKhoanHoatDongHienTai,
  tongTaiKhoanHienTai,
  tongTaiKhoanHomNay,
} from "../../../service/dashboard/admin_bill.service";
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
} from "../../../service/Account/account.service";

import {
  // Header,
  HeaderNumbers,
  NewCustomersWrapper,
  TitleArea,
  TitleAreNumber,
} from "./newCustomers/styled";

//DeliveryMap
import { revenue } from "../../../service/dashboard/admin_bill.service";
// ordertimeline
import { seachKhoangNgay } from "../../../service/dashboard/admin_bill.service";
import { useTranslate, useNavigation } from "@refinedev/core";
import {
  TimelineContent,
  CreatedAt,
  Number,
  Timeline,
  TimelineItem,
} from "./orderTimeline/styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// import { useEffect } from "react";
const { SubMenu } = Menu;
const { Text } = Typography;
const { Header, Sider, Content } = Layout;

const DashboardPage = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //DailyRevenue
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

  //customer
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

  const fetchData = (a, b) => {
    const dataFromBackend = [
      { name: "Last Month", customers: a },
      { name: "This Month", customers: b },
    ];
    setData(dataFromBackend);
  };

  //DeliveryMap
  const [dataDeliveryMap, setDataDeliveryMap] = useState([]);

  // Simulate data from the backend
  const fetchDataFromBackendDeliveryMap = (res) => {
    // Replace this with actual API call to your backend
    // <NumberField
    //   strong
    //   options={{
    //     currency: "VND",
    //     style: "currency",
    //     notation: "standard",
    //   }}
    //   value={entry.price}
    // />;
    const dataFromBackend = [
      {
        name: "T 1",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[0].totalMoney}
          />
        ),
        TongHoaDon: res[0].quantity,
      },
      {
        name: "T 2",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[1].totalMoney}
          />
        ),
        TongHoaDon: res[1].quantity,
      },
      {
        name: "T 3",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[2].totalMoney}
          />
        ),
        TongHoaDon: res[2].quantity,
      },
      {
        name: "T 4",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[3].totalMoney}
          />
        ),
        TongHoaDon: res[3].quantity,
      },
      {
        name: "T 5",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[4].totalMoney}
          />
        ),
        TongHoaDon: res[4].quantity,
      },
      {
        name: "T 6",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[5].totalMoney}
          />
        ),
        TongHoaDon: res[5].quantity,
      },
      {
        name: "T 7",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[6].totalMoney}
          />
        ),
        TongHoaDon: res[6].quantity,
      },
      {
        name: "T 8",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[7].totalMoney}
          />
        ),
        TongHoaDon: res[7].quantity,
      },
      {
        name: "T 9",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[8].totalMoney}
          />
        ),
        TongHoaDon: res[8].quantity,
      },
      {
        name: "T 10",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[9].totalMoney}
          />
        ),
        TongHoaDon: res[9].quantity,
      },
      {
        name: "T 11",

        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[10].totalMoney}
          />
        ),
        TongHoaDon: res[10].quantity,
      },
      {
        name: "T 12",
        TongTien: (
          <NumberField
            strong
            options={{
              currency: "VND",
              style: "currency",
              notation: "standard",
            }}
            value={res[11].totalMoney}
          />
        ),
        TongHoaDon: res[11].quantity,
      },
    ];
    setDataDeliveryMap(dataFromBackend);
  };
  const [dataYear, setdataYear] = useState([]);
  const [searchDataMap, setSearchDataMap] = useState([]);
  //deliveryMap
  const [dataYearMap, setDataYearMap] = useState({
    checkYear: "",
    year: "",
  });
  const handleInputChangeSize = (value) => {
    setDataYearMap({
      ...dataYearMap,
      year: value,
    });
    // alert(value);
  };

  const handleSubmitYear = (event) => {
    // alert(dataYearMap.year + " hihi");
    event.preventDefault();
    if (dataYearMap.year === null || dataYearMap.year === "") {
      notification.warning({
        message: "Hãy chọn năm!",
      });
    } else {
      seachDoanhThuTeaoNam(dataYearMap.year)
        .then((res) => {
          console.log(res.data);
          setSearchDataMap(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };
  //order time line
  const [dataDateTruoc, setDataDateTruoc] = useState();
  const [dataDateSau, setDataDateSau] = useState();

  const handleDateBillTruoc = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setDataDateTruoc(value);
  };

  const [searchData, setSearchData] = useState(null);
  // truyền thông tin ra bnagr bên ngoài
  const handleClick = (dataCustomer) => {
    setSearchData(dataCustomer);
    console.log(dataCustomer);
  };

  useEffect(() => {
    //DailyRevenue
    let unconfirmedDataDailyRevenue = 0;
    let confirmedDataDailyRevenue = 0;
    let alreadyPaidDataDailyRevenue = 0;
    let areDeliveringDataDailyRevenue = 0;
    let noReturnDataDailyRevenue = 0;
    let returnsDataDailyRevenue = 0;
    let cancelOrderDataDailyRevenue = 0;
    //DailyOrder
    let unconfirmedData = 0;
    let confirmedData = 0;
    let alreadyPaidData = 0;
    let areDeliveringData = 0;
    let noReturnData = 0;
    let returnsData = 0;
    let cancelOrderData = 0;
    //customer
    let last = 0;
    let first = 0;

    if (searchData?.check === true && searchData !== null) {
      //DailyRevenue
      unconfirmedDataDailyRevenue = searchData.tongTienDonChoXacNhan;
      confirmedDataDailyRevenue = searchData.tongTienDonChoVanChuyen;
      areDeliveringDataDailyRevenue = searchData.tongTienDonDangVanChuyen;
      alreadyPaidDataDailyRevenue = searchData.tongTienDnDaThanhToan;
      noReturnDataDailyRevenue = 0;
      returnsDataDailyRevenue = searchData.tongTienDonHoanTra;
      cancelOrderDataDailyRevenue = searchData.tongTienDonHangHuy;
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
      setDataSumMoneyBillNotStatusDaHuy(searchData.tongTienThucThu);
      setDataSumToTalMoneyBillUnconfimred(searchData.tongTienDonChoXacNhan);
      setDataSumMoneyBillConfirmed(searchData.tongTienDonChoVanChuyen);
      setDataSumMoneyBillAreDelivering(searchData.tongTienDonDangVanChuyen);
      setDataSumMoneyBillAlreadyPaid(searchData.tongTienDnDaThanhToan);
      setDataSumMoneyBillNoReturn(0); // k dung nua
      setDataSumMoneyBillReturns(searchData.tongTienDonHoanTra);
      setDataSumMoneyBillCancelOrder(searchData.tongTienDonHangHuy);

      //DailyOrder
      unconfirmedData = searchData.choXacNhan;
      confirmedData = searchData.choVanChuyen;
      areDeliveringData = searchData.dangVanChuyen;
      alreadyPaidData = searchData.daThanhToan;
      noReturnData = 0;
      returnsData = searchData.hoanTra;
      cancelOrderData = searchData.donHuy;
      fetchDataFromBackend(
        unconfirmedData,
        confirmedData,
        areDeliveringData,
        alreadyPaidData,
        noReturnData,
        returnsData,
        cancelOrderData
      );

      setDataSumAllBill(searchData.sumBill);
      setDataSumUnconfimred(searchData.choXacNhan);
      setDataSumConfimred(searchData.choVanChuyen);
      setDataSumAreDelivering(searchData.dangVanChuyen);
      setDataSumAlreadyPaid(searchData.daThanhToan);
      setDataSumNoReturn(0);
      setDataSumReturns(searchData.hoanTra);
      setDataSumCancelOrder(searchData.donHuy);

      //Customer
      setDataTongTaiKhoan(searchData.tongTaiKhoan);
      setDataTongTaiKhoanMoi(searchData.tongTaiKhoanMoi);
      setDataTongTaiKhoanDangSuDung(searchData.tongTaiKhoanDangSuDung);
      setDataTongTaiKhoanTrongThang(searchData.tongTaiKhoanTrongThang);
      setDataCountCustomersOrderToday(searchData.tongTaiKhoanDatHang);
      setDataCountCustomersPaidToday(searchData.tongTaiKhoanDaThanhToan);
      setDataCountCustomersCanceledToday(searchData.tongTaiKhoanHuyDon);
    } else {
      //DailyRevenue
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

      //DailyOrder
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

      // Customer
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
    }
    console.log(searchData + " heplme");

    if (searchDataMap.length > 0 && searchDataMap !== null) {
      const res = searchDataMap;
      fetchDataFromBackendDeliveryMap(res);
    } else {
      //DeliveryMap
      revenue()
        .then((response) => {
          const res = response.data;
          fetchDataFromBackendDeliveryMap(res);
        })
        .catch((error) => {
          console.log(`${error}`);
        });
    }

    getListYearOfBill()
      .then((response) => {
        setdataYear(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [searchData, searchDataMap]);

  //customer
  const { Text, Title } = Typography;

  function phanTram() {
    if (dataLastMonth == 0) {
      return ((dataThisMonth - dataLastMonth) / 1) * 100;
    } else {
      return ((dataThisMonth - dataLastMonth) / dataLastMonth) * 100;
    }
  }

  //order time line
  const handleDateBillSau = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setDataDateSau(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (dataDateTruoc > dataDateSau) {
      notification.warning({
        message: "Khoảng ngày sau phải lớn hơn hoặc bằng ngày trước!",
      });
    } else {
      seachKhoangNgay(dataDateTruoc, dataDateSau)
        .then((res) => {
          handleClick(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };
  const xoaLoc = () => {
    const data = {
      check: false,
      choVanChuyen: 0,
      choXacNhan: 0,
      daThanhToan: 0,
      dangVanChuyen: 0,
      donHuy: 0,
      hoanTra: 0,
      sumBill: 0,
      tongTaiKhoan: 0,
      tongTaiKhoanDaThanhToan: 0,
      tongTaiKhoanDangSuDung: 0,
      tongTaiKhoanDatHang: 0,
      tongTaiKhoanHuyDon: 0,
      tongTaiKhoanMoi: 0,
      tongTaiKhoanTrongThang: 0,
      tongTienDnDaThanhToan: 0,
      tongTienDonChoVanChuyen: 0,
      tongTienDonChoXacNhan: 0,
      tongTienDonDangVanChuyen: 0,
      tongTienDonHangHuy: 0,
      tongTienDonHoanTra: 0,
      tongTienThucThu: 0,
    };
    setSearchData(data);

    const dataMap = [];
    setSearchDataMap(dataMap);
    document.getElementById("id-ngay-truoc").value = "";
    document.getElementById("id-ngay-sau").value = "";
    document.getElementById("id-seach-nam").value = "";
  };

  // daily order

  const [dataDailyOrder, setDataDailyOrder] = useState([]);
  const [dataSumAllBill, setDataSumAllBill] = useState();
  const [dataSumUnconfimred, setDataSumUnconfimred] = useState();
  const [dataSumConfimred, setDataSumConfimred] = useState();
  const [dataSumAreDelivering, setDataSumAreDelivering] = useState();
  const [dataSumAlreadyPaid, setDataSumAlreadyPaid] = useState();
  const [dataSumNoReturn, setDataSumNoReturn] = useState();
  const [dataSumReturns, setDataSumReturns] = useState();
  const [dataSumCancelOrder, setDataSumCancelOrder] = useState();

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
  // useEffect(() => {}, [searchData]);

  const storedUser = JSON.parse(localStorage.getItem("account"));
  const history = useHistory();
  useEffect(() => {
    if (storedUser?.roles !== "ADMIN" || storedUser === null) {
      notification.error({
        message: "Bạn không có quyền!",
      });

      history.replace("/");
    }
  });

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="0">
              <img
                src="/img/logo.jpg"
                alt="Trang chủ Smartphone Store"
                title="Trang chủ Smartphone Store"
                style={{ width: "150px" }}
              />
            </Menu.Item>
            <Menu.Item key="0" icon={<FileDoneOutlined />}>
              <Link to="/sell">SELL OFFLINE</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShopOutlined />}>
              <Link to="/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
              <Link to="/product">Product</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<GiftOutlined />}>
              <Link to="/voucher">Voucher</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UnorderedListOutlined />}>
              <Link to="/categories">Categories</Link>
            </Menu.Item>
            <SubMenu
              key="8"
              title="Product-Detail"
              icon={<AppstoreAddOutlined />}
            >
              <Menu.Item key="8">
                <Link to="/admin/product-detail">SKU</Link>
              </Menu.Item>
              <Menu.Item key="color">
                <Link to="/product-detail/color">Color</Link>
              </Menu.Item>
              <Menu.Item key="capacity">
                <Link to="/product-detail/capacity">Capacity</Link>
              </Menu.Item>
              <Menu.Item key="ram">
                <Link to="/product-detail/ram">RAM</Link>
              </Menu.Item>
              <Menu.Item key="chip">
                <Link to="/product-detail/chip">Chip</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="7" icon={<LogoutOutlined />}>
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <HeaderDashBoard />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <OffLayoutArea />
            <Row gutter={[16, 16]}>
              <Col md={24}>
                <Row gutter={[16, 16]}>
                  <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                    <Card
                      bodyStyle={{
                        padding: 10,
                        paddingBottom: 0,
                      }}
                      style={{
                        background:
                          "url(https://example.admin.refine.dev/images/daily-revenue.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundSize: "cover",
                      }}
                    >
                      {/* <DailyRevenue /> */}
                      <DailyRevenueWrapper>
                        {/* <TitleArea> */}
                        <Row>
                          <TitleAreaAmount>
                            <Typography.Title level={3}>
                              Thực Thu Hôm Nay
                            </Typography.Title>
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
                              value={
                                dataSumMoneyBillNotStatusDaHuy !== undefined
                                  ? dataSumMoneyBillNotStatusDaHuy
                                  : 0
                              }
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
                          <Line
                            type="monotone"
                            dataKey="Tien"
                            stroke="rgb(75, 192, 192)"
                          />
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
                            value={
                              dataSumToTalMoneyBillUnconfimred !== undefined
                                ? dataSumToTalMoneyBillUnconfimred
                                : 0
                            }
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
                            value={
                              dataSumMoneyBillConfirmed !== undefined
                                ? dataSumMoneyBillConfirmed
                                : 0
                            }
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
                            value={
                              dataSumMoneyBillAreDelivering !== undefined
                                ? dataSumMoneyBillAreDelivering
                                : 0
                            }
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
                            value={
                              dataSumMoneyBillAlreadyPaid !== undefined
                                ? dataSumMoneyBillAlreadyPaid
                                : 0
                            }
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
                            value={
                              dataSumMoneyBillReturns !== undefined
                                ? dataSumMoneyBillReturns
                                : 0
                            }
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
                            value={
                              dataSumMoneyBillCancelOrder !== undefined
                                ? dataSumMoneyBillCancelOrder
                                : 0
                            }
                          />
                        </TitleArea>
                      </DailyRevenueWrapper>
                    </Card>
                  </Col>
                  <Col xl={7} lg={12} md={24} sm={24} xs={24}>
                    <Card
                      bodyStyle={{
                        padding: 10,
                        paddingBottom: 0,
                      }}
                      style={{
                        background:
                          "url(https://example.admin.refine.dev/images/daily-order.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundSize: "cover",
                      }}
                    >
                      {/* <DailyOrders /> */}
                      <DailyOrderWrapper>
                        <TitleArea>
                          <Title level={3}>Đơn Hàng Hôm Nay</Title>
                          <TitleAreNumber>
                            <Text strong>
                              {dataSumAllBill !== null ? dataSumAllBill : 0}
                            </Text>

                            {/* {(data?.data?.trend ?? 0) > 0 ? <IncreaseIcon /> : <DecreaseIcon />} */}
                            <IncreaseIcon />
                            {/* <DecreaseIcon /> */}
                          </TitleAreNumber>
                        </TitleArea>
                        <div>
                          <Text strong>-</Text>
                        </div>

                        <LineChart
                          width={330}
                          height={150}
                          data={dataDailyOrder}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="orders"
                            stroke="rgb(75, 192, 192)"
                          />
                        </LineChart>
                        {/* 1 */}
                        <TitleArea>
                          <Title level={5} style={{ color: "white" }}>
                            1U - Đơn hàng chờ xác nhận
                          </Title>
                          <TitleAreNumber>
                            <Title level={5} style={{ color: "white" }}>
                              {dataSumUnconfimred !== null
                                ? dataSumUnconfimred
                                : 0}
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
                            5R - Đơn hàng hoàn trả
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
                    </Card>
                  </Col>
                  <Col xl={7} lg={12} md={24} sm={24} xs={24}>
                    <Card
                      bodyStyle={{
                        padding: 10,
                        paddingBottom: 0,
                      }}
                      style={{
                        background:
                          "url(https://example.admin.refine.dev/images/new-orders.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundSize: "cover",
                      }}
                    >
                      {/* <NewCustomers /> */}
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
                            <CartesianGrid
                              stroke="#ccc"
                              strokeDasharray="5 5"
                            />
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
                                {/* - {dataCustomer} */}
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
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col xl={17} lg={16} md={24} sm={24} xs={24}>
                <Card
                  bodyStyle={{
                    height: 550,
                    padding: 0,
                  }}
                  title={
                    <Text
                      strong /* style={{ fontSize: 24, fontWeight: 800 }} */
                    >
                      Doanh Thu Của Năm
                    </Text>
                  }
                >
                  {/* <DeliveryMap /> */}
                  <div>
                    {/* <h2>Sales Chart</h2> */}
                    <LineChart width={885} height={550} data={dataDeliveryMap}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="TongTien"
                        stroke="rgb(75, 192, 192)"
                      />
                      <Line
                        type="monotone"
                        dataKey="TongHoaDon"
                        stroke="rgb(75, 192, 192)"
                      />
                    </LineChart>
                  </div>
                </Card>
              </Col>
              <Col xl={7} lg={8} md={24} sm={24} xs={24}>
                <Card
                  bodyStyle={{
                    height: 550,
                    overflowY: "scroll",
                  }}
                  title={
                    <Text strong style={{ textTransform: "capitalize" }}>
                      Thống kê
                    </Text>
                  }
                >
                  {/* <OrderTimeline /> */}
                  <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
                    {/* <Timeline> */}
                    <div>
                      <button
                        class="btn btn-outline-danger"
                        style={{ marginTop: "15px", marginBottom: "18px" }}
                        onClick={() => xoaLoc()}
                      >
                        Xoá thống kê
                      </button>
                      {/* Thống kê theo ngày tháng */}
                      <p></p>
                      <u>
                        <h6>Thống kê theo ngày tháng:</h6>
                      </u>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div class="user-box">
                            <label
                              style={{
                                color: "black",
                                fontSize: "12px",
                                marginRight: "17px",
                              }}
                            >
                              Từ ngày:
                            </label>
                            <input
                              id="id-ngay-truoc"
                              type="date"
                              name="dateBillTruoc"
                              required
                              style={{
                                borderTop: "none",
                                borderRight: "none",
                                borderLeft: "none",
                                borderBottom: "1px solid black",
                                outline: "none",
                              }}
                              onChange={handleDateBillTruoc}
                            />
                          </div>
                        </div>

                        <div>
                          <div class="user-box">
                            <label
                              style={{
                                color: "black",
                                fontSize: "12px",
                                marginRight: "10px",
                              }}
                            >
                              Đến ngày:
                            </label>
                            <input
                              id="id-ngay-sau"
                              type="date"
                              name="dateBillSau"
                              required
                              style={{
                                borderTop: "none",
                                borderRight: "none",
                                borderLeft: "none",
                                borderBottom: "1px solid black",
                                outline: "none",
                              }}
                              onChange={handleDateBillSau}
                            />
                          </div>
                        </div>
                        <button
                          // type="submit"
                          class="btn btn-outline-success"
                          style={{ marginTop: "15px" }}
                        >
                          Thống kê
                        </button>
                      </form>

                      {/* thống kê theo năm */}
                      <p></p>
                      <u>
                        <h6 style={{ marginTop: "20px" }}>
                          Thống kê theo năm:
                        </h6>
                      </u>
                      <form
                        onSubmit={handleSubmitYear}
                        style={{ marginTop: "20px" }}
                      >
                        <div>
                          <div class="user-box">
                            <label
                              style={{
                                color: "black",
                                fontSize: "12px",
                                marginRight: "10px",
                              }}
                            >
                              Năm:
                            </label>

                            <Select
                              id="id-seach-nam"
                              name="year"
                              value={dataYearMap.year}
                              onChange={handleInputChangeSize}
                              required
                              style={{
                                // border: "2px solid black",
                                // backgroundColor: "#009999",
                                // color: "white",
                                width: "130px",
                                height: "36px",
                              }}
                            >
                              {dataYear.map((d) => {
                                return <Option value={d.year}>{d.year}</Option>;
                              })}
                            </Select>
                          </div>
                        </div>
                        <button
                          // type="submit"
                          class="btn btn-outline-success"
                          style={{ marginTop: "15px" }}
                        >
                          Thống kê
                        </button>
                      </form>
                      {/* <Customer searchData={searchData} /> */}
                    </div>
                    {/* </Timeline> */}
                  </ConfigProvider>
                </Card>
              </Col>
              <Col xl={17} lg={16} md={24} sm={24} xs={24}>
                <Card
                  title={
                    <Text strong>Đơn hàng đã được đặt thành công hôm nay</Text>
                  }
                >
                  <Row
                    style={{
                      backgroundColor: "orange",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <div strong style={{ paddingLeft: "75px" }}>
                      <b>Ảnh</b>
                    </div>
                    <div strong style={{ paddingLeft: "200px" }}>
                      <b>Mã Hoá Đơn</b>
                    </div>
                    <div strong style={{ paddingLeft: "150px" }}>
                      <b>Khách Hàng</b>
                    </div>
                    <div strong style={{ paddingLeft: "140px" }}>
                      <b>Tổng Tiền</b>
                    </div>
                  </Row>
                  <RecentOrders />
                </Card>
              </Col>
              <Col xl={7} lg={8} md={24} sm={24} xs={24}>
                <Card
                  title={
                    <Text strong>
                      Top8 sản phẩm bán nhiều nhất 30 ngày gần đây
                    </Text>
                  }
                >
                  <TrendingMenu />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardPage;
