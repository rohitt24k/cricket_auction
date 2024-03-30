const mongoose = require("mongoose");

// Define the schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    default: "cse",
  },
  year: {
    type: String,
    required: true,
    default: "first",
  },
  role: {
    type: String,
    required: true,
    default: "all_rounder",
  },
  base_price: {
    type: Number,
    required: true,
    default: 500,
  },
  player_type: {
    type: String,
    required: true,
    default: "player",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  team_name: {
    type: String,
    required: function () {
      return this.player_type === "team_leader";
    },
  },
  sold: {
    type: Boolean,
    default: false,
  },
  sold_price: {
    type: Number,
  },
});

// Create the model
const player_model = mongoose.model("Player", playerSchema);

module.exports = player_model;
