import { width } from "@mui/system";
import React, { useEffect, useState } from "react";
import { revenue } from "../../../../service/dashboard/admin_bill.service";
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
import numeral from "numeral";

const DeliveryMap = () => {
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

  useEffect(() => {
    revenue()
      .then((response) => {
        const res = response.data;
        fetchDataFromBackendDeliveryMap(res);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);

  return (
    <div>
      {/* <h2>Sales Chart</h2> */}
      <LineChart width={885} height={550} data={dataDeliveryMap}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="TongTien" stroke="rgb(75, 192, 192)" />
        <Line type="monotone" dataKey="TongHoaDon" stroke="rgb(75, 192, 192)" />
      </LineChart>
    </div>
  );
};

export default DeliveryMap;
