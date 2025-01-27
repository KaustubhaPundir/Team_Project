const mongoose = require('mongoose');
const Team=require('../models/team');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});
exports.Player = mongoose.model('Player', playerSchema);
