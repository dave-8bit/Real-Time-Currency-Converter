import app from "./app";
import path from "path";
import express from "express";

const clientPath = path.join(__dirname, "../../client/dist");

// ✅ API routes are already inside app.ts
// DO NOT override them here

// ✅ Serve static frontend AFTER API
app.use(express.static(clientPath));

// ✅ Catch-all LAST
app.use((req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
