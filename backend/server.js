// server.js

const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", customerRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Customer Portal API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
