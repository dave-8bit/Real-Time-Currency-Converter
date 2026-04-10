"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHistorical = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchHistorical = async (req, res) => {
    const base = req.query.base?.toUpperCase() || "USD";
    const target = req.query.target?.toUpperCase() || "EUR";
    const days = parseInt(req.query.days) || 30;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];
    try {
        const url = `https://api.frankfurter.app/${startStr}..${endStr}?from=${base}&to=${target}`;
        const response = await axios_1.default.get(url);
        if (!response.data || !response.data.rates) {
            console.error("Frankfurter API invalid:", response.data);
            throw new Error("Invalid API response");
        }
        const historical = {};
        Object.entries(response.data.rates).forEach(([date, value]) => {
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
    }
    catch (err) {
        console.error("Historical endpoint error:", err.message);
        res.status(500).json({ error: err.message });
    }
};
exports.fetchHistorical = fetchHistorical;
//# sourceMappingURL=historicalController.js.map