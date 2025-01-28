const mongoose = require("mongoose");

const betSchema = new mongoose.Schema(
    {
        contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest", required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        entryAmount: { type: Number, required: true },
        winningAmount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

exports.Bet = mongoose.model("Bet", betSchema);
