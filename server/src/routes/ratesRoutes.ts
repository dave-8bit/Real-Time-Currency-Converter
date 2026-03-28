import { Router } from "express";
import { fetchRates } from "../controllers/ratesController";

const router = Router();

router.get("/", fetchRates);

export default router;