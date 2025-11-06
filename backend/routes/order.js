const router = require("express").Router();
const User = require("../schemas/user");
const Game = require("../schemas/game");
const Order = require("../schemas/order");
const { route } = require("./user");

router.post("/place-order", async (req, res) => {
  try {
    const { id } = req.headers;
    const { order_list } = req.body;

    for (const order of order_list) {
      const new_order = new Order({ user: id, game: order._id });
      const saved_order = await new_order.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: saved_order._id },
        $pull: { cart: order._id },
      });
      //   await User.findByIdAndUpdate(id, {
      //     $pull: { cart: order._id },
      //   });
    }

    return res.status(200).json({
      status: "success",
      msg: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.get("/fetch-order-history", async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate({
      path: "orders",
      populate: { path: "game" },
    });

    const order_list = user.orders.reverse();
    return res.status(200).json({
      status: "success",
      msg: "Order History Fetched",
      data: order_list,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.get("/fetch-orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "game",
      })
      .populate({
        path: "user",
      })
      .sort({ createdT: -1 });

    return res.status(200).json({
      status: "success",
      msg: "Orders Fetched",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.put("/update-order/:id", async (req, res) => {
  try {
    const {id} = req.params;
    await Order.findByIdAndUpdate(id,{status:req.body.status})

    return res.status(200).json({
      status: "success",
      msg: "Order Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

module.exports = router;
