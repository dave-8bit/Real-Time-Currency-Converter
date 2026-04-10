"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRates = getRates;
const axios_1 = __importDefault(require("axios"));
const cache = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
async function getRates(base) {
    const now = Date.now();
    console.log("Fetching rates for:", base);
    // 1. Return fresh cache if valid
    if (cache[base] && now - cache[base].timestamp < CACHE_TTL) {
        console.log("Returning fresh cache");
        return {
            rates: cache[base].rates,
            source: "cache",
            timestamp: cache[base].timestamp,
        };
    }
    try {
        console.log("Calling external API...");
        const response = await axios_1.default.get(`https://open.er-api.com/v6/latest/${base}`);
        // Validate API response
        if (response.data.result !== "success") {
            throw new Error("Invalid API response");
        }
        const rates = response.data.rates;
        // Save to cache
        cache[base] = {
            rates,
            timestamp: now,
        };
        console.log("Returning fresh API data");
        return {
            rates,
            source: "api",
            timestamp: now,
        };
    }
    catch (err) {
        console.error("API FAILED:", err.message);
        // 2. Fallback to stale cache
        if (cache[base]) {
            console.log("Returning STALE cache");
            return {
                rates: cache[base].rates,
                source: "stale-cache",
                timestamp: cache[base].timestamp,
            };
        }
        // 3. Hard failure
        throw new Error("Unable to fetch exchange rates");
    }
}
//# sourceMappingURL=exchangeService.js.map