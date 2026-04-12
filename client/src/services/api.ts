   //I did this instead of having to hardcode the localhost URL. It will throw back to this frontend URL instead

const BASE_URL = import.meta.env.VITE_API_URL || "";

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
   FETCH RATES Here David
========================= */

export async function fetchRates(base: string): Promise<RatesResponse> {
  const res = await fetch(`${BASE_URL}/rates?base=${base}`);

  if (!res.ok) {
    throw new Error("Unable to fetch exchange rates. Please try again later.");
  }

  const data: unknown = await res.json();

  if (isRatesResponse(data)) {
    return data;
  }

  throw new Error("Unexpected response from server.");
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
    throw new Error("Unable to load historical data.");
  }

  const data: unknown = await res.json();

  if (isHistoricalResponse(data)) {
    return data;
  }

  throw new Error("Unexpected historical data format.");
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