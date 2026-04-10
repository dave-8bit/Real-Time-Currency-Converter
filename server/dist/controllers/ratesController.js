"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRates = fetchRates;
const exchangeService_1 = require("../services/exchangeService");
async function fetchRates(req, res) {
    const base = req.query.base || "USD";
    try {
        const data = await (0, exchangeService_1.getRates)(base);
        res.json({
            base,
            rates: data.rates,
            source: data.source,
            timestamp: Date.now()
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
//# sourceMappingURL=ratesController.js.map