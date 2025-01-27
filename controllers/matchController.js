const { Match } = require("../models/match");
const { Team } = require("../models/team");
const { Player } = require("../models/player");

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const { team1, team2, location, score } = req.body;

    const team1Data = await Team.findById(team1);
    const team2Data = await Team.findById(team2);

    if (!team1Data || !team2Data) {
      return res.status(404).json({ message: "One or both teams not found" });
    }

    const players = await Player.find({ team: { $in: [team1, team2] } });

    const match = await Match.create({
      team1,
      team2,
      players: players.map((player) => player._id),
      location,
      score,
    });

    res.status(201).json({ message: "Match created successfully", match });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating match", error: error.message });
  }
};

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("team1", "name location")
      .populate("team2", "name location")
      .populate("players", "name position");

    res.status(200).json(matches);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching matches", error: error.message });
  }
};

// Get match details by ID
exports.getMatchDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await Match.findById(id)
      .populate("team1", "name location")
      .populate("team2", "name location")
      .populate("players", "name position");

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json(match);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching match details", error: error.message });
  }
};

// Update 
exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { team1, team2, date, location, score } = req.body;

    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    if (team1) match.team1 = team1;
    if (team2) match.team2 = team2;
    if (date) match.date = date;
    if (location) match.location = location;
    if (score) match.score = score;

    await match.save();

    res.status(200).json({ message: "Match updated successfully", match });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating match", error: error.message });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await Match.findByIdAndDelete(id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting match", error: error.message });
  }
};
