const express = require("express");
const team_model = require("../models/team_model");
const player_model = require("../models/player_model");
const { model } = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  const team_data = await team_model.find();
  res.json(team_data);
});

router.post("/buy", async (req, res) => {
  const { team_name, player_id } = req.body;
  try {
    const player = await player_model.findById(player_id);
    const team = await team_model.updateOne(
      { name: team_name },
      { $push: { players: player } }
    );
    if (team.modifiedCount == 0) {
      res.status(500).json({ error: "The team doesn't exists" });
    } else {
      const sold_player = await player_model.updateOne(
        { _id: player_id },
        {
          sold: true,
        }
      );
      res.status(200).send("player added to the team now refresh");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
