import app from "./app";
import path from "path";
import express from "express";

// Serve React build
const clientPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientPath));

// Catch-all (Express 5 SAFE). Just send back index.html for any unknown routes to let React Router handle it.
app.use((req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});