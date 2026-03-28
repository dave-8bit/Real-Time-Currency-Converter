import express from "express";
import cors from "cors";
import ratesRoutes from "./routes/ratesRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/rates", ratesRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;