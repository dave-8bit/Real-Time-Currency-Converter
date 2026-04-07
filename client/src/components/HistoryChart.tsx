// client/src/components/HistoryChart.tsx
import { useState, useEffect } from "react";
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
import { fetchHistorical } from "../hooks/useHistorical";
import type { HistoricalResponse } from "../hooks/useHistorical";

type Props = {
  base: string;
  target: string;
};

export default function HistoryChart({ base, target }: Props) {
  const [data, setData] = useState<{ date: string; value: number }[]>([]);
  const [compareData, setCompareData] = useState<{ date: string; value: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  const [compare, setCompare] = useState(false);
  const [compareTarget, setCompareTarget] = useState("EUR");

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res: HistoricalResponse = await fetchHistorical(base, target, days);
        if (cancelled) return;

        setData(
          Object.entries(res.historical).map(([date, value]) => ({ date, value }))
        );

        if (compare) {
          const comp: HistoricalResponse = await fetchHistorical(base, compareTarget, days);
          if (cancelled) return;
          setCompareData(
            Object.entries(comp.historical).map(([date, value]) => ({ date, value }))
          );
        }
      } catch (err: unknown) {
        if (cancelled) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unknown error fetching historical data"
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [base, target, days, compare, compareTarget]);

  return (
    <div className={styles.chartWrapper}>
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
          <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
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

      {loading && <p className={styles.message}>Loading chart...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <ResponsiveContainer width="100%" minWidth={320} height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid stroke="#ffffff33" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: "#fff" }} />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip contentStyle={{ backgroundColor: "#00000099", color: "#fff" }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00ffff"
              strokeWidth={2}
              dot={{ r: 3, fill: "#00ffff" }}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
            {compare && (
              <Line
                type="monotone"
                data={compareData}
                dataKey="value"
                stroke="#ff7f50"
                strokeWidth={2}
                dot={{ r: 3, fill: "#ff7f50" }}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}