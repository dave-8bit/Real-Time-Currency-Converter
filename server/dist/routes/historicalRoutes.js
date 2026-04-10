"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historicalRoutes = void 0;
const express_1 = require("express");
const historicalController_1 = require("../controllers/historicalController");
exports.historicalRoutes = (0, express_1.Router)();
// GET /historical?base=USD&target=EUR&days=30
exports.historicalRoutes.get("/", historicalController_1.fetchHistorical);
//# sourceMappingURL=historicalRoutes.js.map