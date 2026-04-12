// client/src/hooks/useHistorical.ts
import { useEffect, useState } from "react";
import { fetchHistorical as fetchHistoricalAPI } from "../services/api";

type DataPoint = {
  date: string;
  value: number;
};

export function useHistorical(base: string, target: string, days: number) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchHistoricalAPI(base, target, days);

        const formatted = Object.entries(res.historical).map(
          ([date, value]) => ({
            date,
            value,
          })
        );

        if (!ignore) setData(formatted);
      } catch (err: unknown) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading the chart."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [base, target, days]);

  return { data, loading, error };
}