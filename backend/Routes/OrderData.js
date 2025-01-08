const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderdata", async (req, res) => {
  try {
    console.log(req.body);
    const { order_data, email, order_date } = req.body;

    if (!order_data || !email || !order_date) {
      return res.status(400).json({ message: "Incomplete request data" });
    }

    let existingOrder = await Order.findOne({ email });
    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [{ ...order_data, Order_date: order_date }],
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: { ...order_data, Order_date: order_date } } }
      );
    }

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
