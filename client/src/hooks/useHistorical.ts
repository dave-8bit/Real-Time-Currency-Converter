// client/src/hooks/useHistorical.ts
export type HistoricalResponse = {
  base: string;
  target: string;
  historical: Record<string, number>;
  source: string;
};

// Fetch historical rates safely
export async function fetchHistorical(
  base: string,
  target: string,
  days: number
): Promise<HistoricalResponse> {
  const res = await fetch(
    `http://localhost:5000/historical?base=${base}&target=${target}&days=${days}`
  );

  if (!res.ok) {
    // Human readable error based on status
    throw new Error("We couldn't get the historical rates right now. Please try again in a few minutes.");
  }

  const data: unknown = await res.json();

  // Runtime type guard - using Record<string, unknown> instead of any
  const d = data as Record<string, unknown>;

  if (
    typeof data === "object" &&
    data !== null &&
    "base" in data &&
    "target" in data &&
    "historical" in data &&
    typeof d.historical === "object" && 
    d.historical !== null
  ) {
    // Ensure values are numbers
    const hist = Object.entries(d.historical as Record<string, unknown>).reduce(
      (acc, [date, value]) => {
        const num = Number(value);
        if (!isNaN(num)) acc[date] = num;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      base: String(d.base),
      target: String(d.target),
      historical: hist,
      source: (d.source as string) ?? "api",
    };
  }

  throw new Error("The data from the server looks a bit messy. Please refresh the page.");
}