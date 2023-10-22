import { width } from "@mui/system";
import React, { useEffect, useState } from "react";
import { revenue } from "../../../../service/dashboard/admin_bill.service";
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
  const [data, setData] = useState([]);

  // Simulate data from the backend
  const fetchDataFromBackend = (res) => {
    // Replace this with actual API call to your backend

    const dataFromBackend = [
      { name: "Jan", sales: res[0].totalMoney },
      { name: "Feb", sales: res[1].totalMoney },
      { name: "Mar", sales: res[2].totalMoney },
      { name: "Apr", sales: res[3].totalMoney },
      { name: "May", sales: res[4].totalMoney },
      { name: "Jun", sales: res[5].totalMoney },
      { name: "Jul", sales: res[6].totalMoney },
      { name: "Aug", sales: res[7].totalMoney },
      { name: "Sep", sales: res[8].totalMoney },
      { name: "Oct", sales: res[9].totalMoney },
      { name: "Nov", sales: res[10].totalMoney },
      { name: "Dec", sales: res[11].totalMoney },
    ];
    setData(dataFromBackend);
  };

  useEffect(() => {
    revenue()
      .then((response) => {
        const res = response.data;
        console.log(res + " ----------------1");
        fetchDataFromBackend(res);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);

  return (
    <div>
      {/* <h2>Sales Chart</h2> */}
      <LineChart width={875} height={550} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="rgb(75, 192, 192)" />
      </LineChart>
    </div>
  );
};

export default DeliveryMap;
