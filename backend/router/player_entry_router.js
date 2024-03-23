const express = require("express");
const player_model = require("../models/player_model"); // Import the Player model
const team_model = require("../models/team_model");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const existingPlayer = await player_model.findOne({
      email: req.body.email,
    });
    if (existingPlayer) {
      return res
        .status(400)
        .json({ error: "Player with this email already exists" });
    }

    if (req.body.player_type === "team_leader" && req.body.team_name) {
      const existingTeam = await team_model.findOne({
        name: req.body.team_name,
      });
      if (existingTeam) {
        return res
          .status(400)
          .json({ error: "Team with this name already exists" });
      }
    }

    // Create a new player instance with the data from the request body
    if (req.body.player_type == "team_leader" && req.body.team_name) {
      const newTeam = await team_model({
        name: req.body.team_name,
        players: [
          {
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            year: req.body.year,
            role: req.body.role,
            base_price: req.body.base_price,
          },
        ],
      });
      const savedTeam = await newTeam.save();
    }
    const newPlayer = new player_model(req.body);

    // Save the new player data to the database
    const savedPlayer = await newPlayer.save();

    // Send a response indicating success
    res.json({
      message: "Player data inserted successfully",
      player: savedPlayer,
    });
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
