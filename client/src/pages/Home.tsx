import { useEffect, useState } from "react";
import { useConverter } from "../hooks/useConverter";
import AmountInput from "../components/AmountInput";
import CurrencyInput from "../components/CurrencyInput";
import type { HistoricalResponse } from "../services/api";
import { fetchHistorical } from "../services/api";
import HistoryChart from "../components/HistoryChart";
import styles from "./Home.module.css";

export default function Home() {
  const {
    amount,
    base,
    target,
    result,
    rates,
    loading,
    error,
    setAmount,
    setBase,
    setTarget,
  } = useConverter();

  const [chartData, setChartData] = useState<{ date: string; value: number }[]>([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);

  const currencyOptions = Object.keys(rates);

  const swapCurrencies = () => {
    setBase(target);
    setTarget(base);
  };

  // Fetch historical data whenever base or target changes
  useEffect(() => {
    const loadHistory = async () => {
      if (!base || !target) return;

      setChartLoading(true);
      setChartError(null);

      try {
        const data: HistoricalResponse = await fetchHistorical(base, target, 7);

        const formatted = Object.entries(data.historical)
          .map(([date, value]) => ({ date, value: value as number }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setChartData(formatted);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setChartError(err.message);
        } else {
          setChartError("Unknown error occurred");
        }
      } finally {
        setChartLoading(false);
      }
    };

    loadHistory();
  }, [base, target]);

  return (
    <>
      {/* Animated background shapes */}
      <div className={styles.bgShapes}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.container}>
        <h1>Currency Converter</h1>

        <AmountInput value={amount} onChange={setAmount} />

        <CurrencyInput
          value={base}
          options={currencyOptions}
          onChange={(val) => setBase(val)}
          label="Base Currency"
        />

        <CurrencyInput
          value={target}
          options={currencyOptions}
          onChange={(val) => setTarget(val)}
          label="Target Currency"
        />

        <button className={styles.swapBtn} onClick={swapCurrencies}>
          Swap
        </button>

        {loading && <p>Loading rates...</p>}
        {error && <p style={{ color: "#f87171" }}>{error}</p>}

        <h2 className={styles.result}>
          {amount} {base} = {result.toFixed(4)} {target}
        </h2>

        {/* Historical Chart */}
        <div className={styles.chart}>
          {chartLoading && <p>Loading historical data...</p>}
          {chartError && <p style={{ color: "#f87171" }}>{chartError}</p>}
          {!chartLoading && !chartError && chartData.length > 0 && (
           <HistoryChart base={base} target={target} />
          )}
        </div>
      </div>
    </>
  );
}