"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
// Serve React build
const clientPath = path_1.default.join(__dirname, "../../client/dist");
app_1.default.use(express_1.default.static(clientPath));
// Catch-all (Express 5 SAFE). Just send back index.html for any unknown routes to let React Router handle it.
app_1.default.use((req, res) => {
    res.sendFile(path_1.default.join(clientPath, "index.html"));
});
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map