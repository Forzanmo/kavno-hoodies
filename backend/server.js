const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/order", orderRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
