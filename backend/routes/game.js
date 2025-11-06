const router = require("express").Router();
const User = require("../schemas/user");
const Game = require("../schemas/game");

router.post("/add-game", async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({ msg: "Access Denied!!!" });
    }
    const new_game = new Game({
      img_url: req.body.img_url,
      title: req.body.title,
      platform: req.body.platform,
      studio: req.body.studio,
      release_year: req.body.release_year,
      description: req.body.description,
      price: req.body.price,
    });
    await new_game.save();
    return res.status(200).json({ msg: "Game added!!!" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.put("/update-game", async (req, res) => {
  try {
    const { game_id } = req.headers;
    await Game.findByIdAndUpdate(game_id, {
      img_url: req.body.img_url,
      title: req.body.title,
      platform: req.body.platform,
      studio: req.body.studio,
      release_year: req.body.release_year,
      description: req.body.description,
      price: req.body.price,
    });

    return res.status(200).json({
      msg: "Game Updated!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.delete("/delete-game", async (req, res) => {
  try {
    const { game_id } = req.headers;
    await Game.findByIdAndDelete(game_id);

    return res.status(200).json({
      msg: "Game Deleted!!!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.get("/fetch-games", async (req, res) => {
  try {
    const games = await Game.find().sort({createdAt: -1});

    return res.status(200).json({
      msg: "Games Fetched",
      data: games,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.get("/recent-games", async (req, res) => {
  try {
    const games = await Game.find().sort({createdAt: -1}).limit(8);

    return res.status(200).json({
      msg: "Games Fetched",
      data: games,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

router.get("/get-game-by-id/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const game = await Game.findById(id);

    return res.status(200).json({
      msg: "Game Fetched",
      data: game,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!!!" });
  }
});

module.exports = router;
