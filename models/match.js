const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  team1: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, 
  team2: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, 
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], 
    
 score: {
    team1: { type: Number, default: 0 }, 
    team2: { type: Number, default: 0 }, 
  },
  location:{
    type:String
  }
},
{timestamps:true});


exports.Match = mongoose.model("Match", matchSchema);
