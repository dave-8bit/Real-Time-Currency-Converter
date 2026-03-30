const BASE_URL = "http://localhost:5000";

export type RatesResponse = {
  rates: Record<string, number>;
  source: string;
  timestamp: number;
};

export async function fetchRates(base: string): Promise<RatesResponse> {
  const res = await fetch(`${BASE_URL}/rates?base=${base}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch rates: ${res.status}`);
  }

  const data: unknown = await res.json();

  // Runtime type guard (no 'any')
  if (isRatesResponse(data)) {
    return data;
  }

  throw new Error("Invalid API response structure");
}

// Type guard
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