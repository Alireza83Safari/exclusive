import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export type barChartPropsType = {
  key: string;
  value: number;
};

const BarChartComponent = ({ datas }: barChartPropsType[]) => {

  return (
    <ResponsiveContainer width="100%" height={310}>
      <BarChart data={datas}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis dataKey="key" />
        <Tooltip />
        <Bar dataKey="value" fill="#00000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
