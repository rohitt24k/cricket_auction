const express = require("express");
const team_model = require("../models/team_model");

const router = express.Router();

router.get("/:team_name", async (req, res) => {
  const team_name = req.params.team_name;
  const data = await team_model.findOne({ name: team_name }, { points: 1 });
  res.send(data);
});

router.get("/", async (req, res) => {
  const data = await team_model.find({}, { points: 1 });
  res.send(data);
});

module.exports = router;
