import express from "express";
import cors from "cors";
import ratesRoutes from "./routes/ratesRoutes";
import { historicalRoutes } from "./routes/historicalRoutes"; // ✅ named import

const app = express();

app.use(cors());
app.use(express.json());

app.use("/rates", ratesRoutes);
app.use("/historical", historicalRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;