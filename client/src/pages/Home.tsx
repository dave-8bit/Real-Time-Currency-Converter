import { useConverter } from "../hooks/useConverter";
import AmountInput from "../components/AmountInput";
import CurrencyInput from "../components/CurrencyInput";
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

  const currencyOptions = Object.keys(rates);

  const swapCurrencies = () => {
    setBase(target);
    setTarget(base);
  };

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
      </div>
    </>
  );
}