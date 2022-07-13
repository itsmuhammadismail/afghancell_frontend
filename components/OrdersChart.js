import React, { PureComponent, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import getWeekOrders from "../api/get_week_orders";
import { useCookies } from "react-cookie";

const OrdersChart = () => {
  const [data, setData] = useState(null);
  const [cookie, removeCookie] = useCookies(["token"]);

  const getData = async () => {
    const res = await getWeekOrders(cookie["token"]);
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default OrdersChart;
