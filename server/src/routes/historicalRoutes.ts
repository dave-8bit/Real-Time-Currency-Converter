import { Router } from "express";
import { fetchHistorical } from "../controllers/historicalController";

export const historicalRoutes = Router();

// GET /historical?base=USD&target=EUR&days=30
historicalRoutes.get("/", fetchHistorical);