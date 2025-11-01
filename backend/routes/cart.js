const router = require("express").Router();
const User = require("../schemas/user");
const Game = require("../schemas/game");

router.put("/add-to-cart", async (req, res) => {
  try {
    const { game_id, id } = req.headers;

    const user = await User.findById(id);
    const in_cart = await user.cart.includes(game_id);

    if (in_cart) {
      return res.status(200).json({
        status: "success",
        msg: "Already added to Cart",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: game_id } });

    return res.status(200).json({
      status: "Success",
      msg: "Game added to Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.put("/remove-from-cart", async (req, res) => {
  try {
    const { game_id, id } = req.headers;

    const user = await User.findById(id);
    const in_cart = await user.cart.includes(game_id);

    if (in_cart) {
      await User.findByIdAndUpdate(id, { $pull: { cart: game_id } });
    }

    return res.status(200).json({
      status: "success",
      msg: "Game removed from Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.get("/fetch-cart", async (req, res) => {
  try {
    const { id } = req.headers;

    const user = await User.findById(id).populate("cart");
    const cart = user.cart.reverse();

    return res.status(200).json({
      status: "success",
      msg: "Cart Fetched",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

module.exports = router;
