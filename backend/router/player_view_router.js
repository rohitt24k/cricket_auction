const express = require("express");
const player_model = require("../models/player_model");

const router = express.Router();

router.get("/", async (req, res) => {
  const get_all_player = await player_model.find();
  res.json(get_all_player);
});

module.exports = router;
