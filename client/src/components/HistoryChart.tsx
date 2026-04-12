import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import styles from "./HistoryChart.module.css";
import { useHistorical } from "../hooks/useHistorical";

type Props = {
  base: string;
  target: string;
};

export default function HistoryChart({ base, target }: Props) {
  const [days, setDays] = useState(30);
  const [compare, setCompare] = useState(false);
  const [compareTarget, setCompareTarget] = useState("EUR");

  const { data, loading, error } = useHistorical(base, target, days);
  const compareHook = useHistorical(compare ? base : "", compareTarget, days);

  return (
    <div className={styles.chartWrapper}>
      {/* Controls */}
      <div className={styles.controls}>
        <label>
          Days:
          <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
            {[7, 14, 30, 60].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>

        <label>
          Compare:
          <input
            type="checkbox"
            checked={compare}
            onChange={(e) => setCompare(e.target.checked)}
          />
        </label>

        {compare && (
          <label>
            Target:
            <input
              type="text"
              value={compareTarget}
              onChange={(e) => setCompareTarget(e.target.value.toUpperCase())}
            />
          </label>
        )}
      </div>

      {/* States */}
      {loading && <p className={styles.message}>Loading chart...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <ResponsiveContainer width="100%" minWidth={320} height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ffffff33" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Main line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00ffff"
              strokeWidth={2}
              dot={false}
            />

            {/* Compare line */}
            {compare && (
              <Line
                type="monotone"
                data={compareHook.data}
                dataKey="value"
                stroke="#ff7f50"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}