import { useTranslate, useNavigation } from "@refinedev/core";
import { useSimpleList } from "@refinedev/antd";
import React, { useEffect, useState } from "react";
import { seachKhoangNgay } from "../../../../service/dashboard/admin_bill.service";
import DailyOrders from "../dailyOrders/index";
import Customer from "../newCustomers/index";
import {
  Typography,
  List as AntdList,
  Tooltip,
  ConfigProvider,
  theme,
  Row,
  notification,
} from "antd";
// import { Row, Col, Card, Typography, Layout, theme } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// import { IOrder } from "../../../interfaces";
import {
  TimelineContent,
  CreatedAt,
  Number,
  Timeline,
  TimelineItem,
} from "./styled";

dayjs.extend(relativeTime);

const OrderTimeline = () => {
  const t = useTranslate();
  const { show } = useNavigation();

  const { Text } = Typography;
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
  };

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
          // localStorage.setItem("oop", true);
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  // useEffect(() => {}, [billSeachKhoangNgay]);

  return (
    // <AntdList
    //   //   {...listProps}
    //   pagination={{
    //     // ...listProps.pagination,
    //     simple: true,
    //   }}
    // >
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Timeline>
        <div>
          <button
            // type="submit"
            class="btn btn-outline-danger"
            style={{ marginTop: "15px" }}
            onClick={() => xoaLoc()}
          >
            Xoá Lọc
          </button>
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
          {/* <Customer searchData={searchData} /> */}
        </div>
      </Timeline>
    </ConfigProvider>
    // </AntdList>
  );
};

export default OrderTimeline;
