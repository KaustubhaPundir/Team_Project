const { Contest } = require("../models/contest");

// Create a Contest
exports.createContest = async (req, res) => {
  try {
    const data = req.body;

    const contest = await Contest.create(data);

    res.status(201).json({
         message: "Contest created successfully",
          contest });
  } catch (error) {
    res.status(500).json({
         message: "Error creating contest",
         error });
  }
};

// Get All Contests
exports.getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().populate(
      "matchId",
      "team1 team2 date"
    );
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contests", error });
  }
};

// Get Contest by ID
exports.getContestById = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate("matchId");
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    res.status(200).json(contest);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contest", error });
  }
};

// Update Contest
exports.updateContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    res.status(200).json({ message: "Contest updated successfully", contest });
  } catch (error) {
    res.status(500).json({ message: "Error updating contest", error });
  }
};

// Delete Contest
exports.deleteContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contest", error });
  }
};
