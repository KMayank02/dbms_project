const router = require("express").Router();
const User = require("../schemas/user");
const Game = require("../schemas/game");

router.put("/add-fav", async (req, res) => {
  try {
    const { game_id, id } = req.headers;

    const user = await User.findById(id);
    const is_fav = await user.favourites.includes(game_id);

    if (is_fav) {
      return res.status(200).json({
        status: "success",
        msg: "Game already in Favourites",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: game_id } });

    return res.status(200).json({
      status: "success",
      msg: "Game added to Favourites",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.put("/remove-fav", async (req, res) => {
  try {
    const { game_id, id } = req.headers;

    const user = await User.findById(id);
    const is_fav = await user.favourites.includes(game_id);

    if (is_fav) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: game_id } });
    }

    return res.status(200).json({
      status: "success",
      msg: "Game removed from Favourites",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.get("/fetch-fav", async (req, res) => {
  try {
    const { id } = req.headers;

    const user = await User.findById(id).populate("favourites");
    const favs = user.favourites;

    return res.status(200).json({
      status: "success",
      msg: "Favourites Fetched",
      data: favs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

module.exports = router;
