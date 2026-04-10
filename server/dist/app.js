"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ratesRoutes_1 = __importDefault(require("./routes/ratesRoutes"));
const historicalRoutes_1 = require("./routes/historicalRoutes"); // ✅ named import
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/rates", ratesRoutes_1.default);
app.use("/historical", historicalRoutes_1.historicalRoutes);
// Health check
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK" });
});
exports.default = app;
//# sourceMappingURL=app.js.map