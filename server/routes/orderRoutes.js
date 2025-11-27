const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();

// CREATE order + reduce stock
router.post("/", async (req, res) => {
  const { items } = req.body;

  let total = 0;

  for (let item of items) {
    const product = await Product.findById(item.productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < item.qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    product.stock -= item.qty;
    await product.save();

    total += product.price * item.qty;
  }

  const order = new Order({
    items,
    totalAmount: total
  });

  await order.save();
  res.json(order);
});

// GET all orders
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("items.productId");
  res.json(orders);
});

module.exports = router;
