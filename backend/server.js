const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

/* =========================
   Middleware
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Data File Path
========================= */
const ordersFilePath = path.join(__dirname, "data", "orders.json");

/* =========================
   Ensure orders.json exists
========================= */
if (!fs.existsSync(ordersFilePath)) {
    fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2));
}

/* =========================
   Routes
========================= */

// Health check (optional but useful)
app.get("/", (req, res) => {
    res.send("KAYNO Hoodies Backend is running 🚀");
});

// Create new order
app.post("/order", (req, res) => {
    const order = {
        id: Date.now(),
        email: req.body.email,
        product: req.body.product,
        price: req.body.price,
        createdAt: new Date().toISOString(),
    };

    const orders = JSON.parse(fs.readFileSync(ordersFilePath));
    orders.push(order);

    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

    res.status(201).json({
        message: "Order placed successfully",
        order,
    });
});

// Get all orders (admin use)
app.get("/orders", (req, res) => {
    const orders = JSON.parse(fs.readFileSync(ordersFilePath));
    res.json(orders);
});

/* =========================
   PORT (RENDER FIX)
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
