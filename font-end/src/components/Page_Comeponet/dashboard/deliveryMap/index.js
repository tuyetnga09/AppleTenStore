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

const DeliveryMap = () => {
  const [data, setData] = useState([]);

  // Simulate data from the backend
  const fetchDataFromBackend = () => {
    // Replace this with actual API call to your backend
    const dataFromBackend = [
      { name: "Jan", sales: 2 },
      { name: "Feb", sales: 25 },
      { name: "Mar", sales: 12 },
      { name: "Apr", sales: 32 },
      { name: "May", sales: 18 },
      { name: "Jun", sales: 10 },
      { name: "Jul", sales: 25 },
      { name: "Aug", sales: 12 },
      { name: "Sep", sales: 32 },
      { name: "Oct", sales: 18 },
      { name: "Nov", sales: 32 },
      { name: "Dec", sales: 18 },
    ];
    setData(dataFromBackend);
  };

  useEffect(() => {
    revenue()
      .then((response) => {
        const data = response.data;
        console.log(data + " Ann1 --------------------------------------");
      })
      .catch((error) => {
        console.log(`${error}`);
      });
    fetchDataFromBackend();
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
