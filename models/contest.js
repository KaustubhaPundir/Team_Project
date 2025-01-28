const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  name:{type:String}  ,
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  entryPrice: { type: Number, required: true },
  isLive: { type: Boolean, default: false },
  userLimit: { type: Number, required: true },
  totalPrice: { type: Number, default: 5000 },
});

exports.Contest = mongoose.model("Contest", contestSchema);
