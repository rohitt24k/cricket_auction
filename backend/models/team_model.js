const mongoose = require("mongoose");

// Define player schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  previous_team: { type: String },
  role: { type: String, required: true },
  base_price: { type: String, required: true },
  sold_price: { type: Number },
  image: {
    type: String,
    default: "",
  },
});

// Define team schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number },
  players: [playerSchema], // Array of players using playerSchema
});

// Create Team model
const team_model = mongoose.model("Team", teamSchema);

module.exports = team_model;
