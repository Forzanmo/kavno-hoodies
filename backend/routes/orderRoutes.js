const express = require("express");
const fs = require("fs");

const router = express.Router();

router.post("/", (req, res) => {
    const { email, product, price } = req.body;

    if (!email || !product || !price) {
        return res.status(400).json({ message: "Missing order data" });
    }

    const order = {
        id: Date.now(),
        email,
        product,
        price,
        status: "Pending",
        createdAt: new Date().toISOString()
    };

    const filePath = "data/orders.json";
    const orders = JSON.parse(fs.readFileSync(filePath, "utf8"));

    orders.push(order);

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    res.json({
        message: "Order placed successfully. We will contact you later."
    });
});

module.exports = router;
