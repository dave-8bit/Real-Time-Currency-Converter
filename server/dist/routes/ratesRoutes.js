"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratesController_1 = require("../controllers/ratesController");
const router = (0, express_1.Router)();
router.get("/", ratesController_1.fetchRates);
exports.default = router;
//# sourceMappingURL=ratesRoutes.js.map