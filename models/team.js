const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
    
  name: { type: String, required: true },
  location: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});

exports.Team = mongoose.model("Team", teamSchema);
