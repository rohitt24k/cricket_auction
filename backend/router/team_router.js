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
  const { team_name, player_id, bid_price } = req.body;
  try {
    const player = await player_model.findById(player_id);
    const team = await team_model.findOne({ name: team_name }, { points: 1 });
    if (!team) {
      return res.status(500).json({ error: "The team doesn't exist" });
    }

    const existingPoints = team.points;
    const new_price = existingPoints - bid_price;
    // console.log(bid_price, existingPoints, new_price);
    if (new_price < 0) {
      return res
        .status(500)
        .json({ error: "The points left cant be less than 0" });
    }
    player.sold_price = Number(bid_price);
    const updatedTeam = await team_model.updateOne(
      { name: team_name },
      {
        $push: { players: player },
        points: new_price,
      }
    );

    await player.save();
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
