import app from "./app";
import path from "path";
import express from "express";

// Serve React build
const clientPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientPath));

// Catch-all route for React or rather frontend.
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});