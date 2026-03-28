import { Request, Response } from "express";
import { getRates } from "../services/exchangeService";

export async function fetchRates(req: Request, res: Response) {
  const base = (req.query.base as string) || "USD";

  try {
    const data = await getRates(base);
    res.json({
      base,
      rates: data.rates,
      source: data.source,
      timestamp: Date.now()
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}