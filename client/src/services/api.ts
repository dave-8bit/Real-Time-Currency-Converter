const BASE_URL = "http://localhost:5000";

/* =========================
   TYPES
========================= */

export type RatesResponse = {
  rates: Record<string, number>;
  source: string;
  timestamp: number;
};

export type HistoricalResponse = {
  base: string;
  target: string;
  historical: Record<string, number>;
};

/* =========================
   FETCH RATES
========================= */

export async function fetchRates(base: string): Promise<RatesResponse> {
  const res = await fetch(`${BASE_URL}/rates?base=${base}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch rates: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (isRatesResponse(data)) {
    return data;
  }

  throw new Error("Invalid API response structure");
}

/* =========================
   FETCH HISTORICAL
========================= */

export async function fetchHistorical(
  base: string,
  target: string,
  days: number = 7
): Promise<HistoricalResponse> {
  const res = await fetch(
    `${BASE_URL}/historical?base=${base}&target=${target}&days=${days}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch historical data: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (isHistoricalResponse(data)) {
    return data;
  }

  throw new Error("Invalid historical API response structure");
}

/* =========================
   TYPE GUARDS
========================= */

function isRatesResponse(data: unknown): data is RatesResponse {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.rates === "object" &&
    obj.rates !== null &&
    typeof obj.source === "string" &&
    typeof obj.timestamp === "number"
  );
}

function isHistoricalResponse(data: unknown): data is HistoricalResponse {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.base === "string" &&
    typeof obj.target === "string" &&
    typeof obj.historical === "object" &&
    obj.historical !== null
  );
}