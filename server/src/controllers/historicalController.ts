import { Request, Response } from "express";
import axios from "axios";

export const fetchHistorical = async (req: Request, res: Response) => {
  const base = (req.query.base as string)?.toUpperCase() || "USD";
  const target = (req.query.target as string)?.toUpperCase() || "EUR";
  const days = parseInt(req.query.days as string) || 30;

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  try {
    const url = `https://api.frankfurter.app/${startStr}..${endStr}?from=${base}&to=${target}`;
    const response = await axios.get(url);

    if (!response.data || !response.data.rates) {
      console.error("Frankfurter API invalid:", response.data);
      throw new Error("Invalid API response");
    }

    const historical: Record<string, number> = {};

    Object.entries(response.data.rates).forEach(([date, value]: any) => {
      if (value[target] !== undefined) {
        historical[date] = value[target];
      }
    });

    res.json({
      base,
      target,
      historical,
      source: "api",
    });

  } catch (err: any) {
    console.error("Historical endpoint error:", err.message);
    res.status(500).json({ error: err.message });
  }
};