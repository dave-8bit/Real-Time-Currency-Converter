// client/src/components/HistoryChart.tsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "./HistoryChart.module.css";

type Props = {
  data: { date: string; value: number }[];
};

export default function HistoryChart({ data }: Props) {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" minWidth={320} height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid stroke="#ffffff33" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip contentStyle={{ backgroundColor: "#00000099", color: "#fff" }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00ffff"
            strokeWidth={2}
            dot={{ r: 3, fill: "#00ffff" }}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}