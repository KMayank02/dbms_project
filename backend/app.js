const express = require("express");
const app = express();
require("dotenv").config();
require("./connections/connection");
const cors = require('cors');
app.use(cors());
app.use(express.json());

const User = require("./routes/user");
const Game = require("./routes/game");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use("/api/v1",User);
app.use("/api/v1",Game);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);

app.listen(process.env.PORT, ()=>{
    console.log(`Serve Started!!!${process.env.PORT}`);
});