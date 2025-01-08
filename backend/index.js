const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for the frontend
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow cookies if necessary
}));

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
// Sample Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
