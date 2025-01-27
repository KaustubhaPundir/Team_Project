const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
});
exports.Team = mongoose.model('Team', teamSchema);