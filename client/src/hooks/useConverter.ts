import { useEffect, useState } from "react";
import { fetchRates } from "../services/api";

type Rates = Record<string, number>;

export function useConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [base, setBase] = useState<string>("USD");
  const [target, setTarget] = useState<string>("EUR");
  const [rates, setRates] = useState<Rates>({});
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch rates when base changes
  useEffect(() => {
    const loadRates = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchRates(base);
        setRates(data.rates);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    loadRates();
  }, [base]);

  // Compute conversion result
  useEffect(() => {
    if (!rates[target]) {
      setResult(0);
      return;
    }

    setResult(amount * rates[target]);
  }, [amount, rates, target]);

  return {
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
  };
}