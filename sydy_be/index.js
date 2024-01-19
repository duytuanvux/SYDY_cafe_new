const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const paypal = require("./paypal-api"); 
dotenv.config();

// Load environment variables from .env file

// Create an Express application
const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Your Express routes go here...
const itemRoutes = require("./app/routes/item.router");
const fbRoutes = require("./app/routes/feedback.router");
const orderRoutes = require("./app/routes/order.router");
const userRoutes = require("./app/routes/user.router");
const commonRoutes = require("./app/routes/common.router");
const PDFRoutes = require("./app/routes/PDF.router")

// Mount routes
app.use("/item", itemRoutes);
app.use("/feedback", fbRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/common", commonRoutes);
app.use("/print", PDFRoutes);

app.post("/my-server/create-paypal-order", async (req, res) => {
  try {
    const body = req.body
    const order = await paypal.createOrder(body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
