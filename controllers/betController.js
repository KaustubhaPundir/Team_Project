const { Bet } = require("../models/bet");
const { Contest } = require("../models/contest");
const { User } = require("../models/user");

// Create a Bet
exports.createBet = async (req, res) => {
  try {
    const { contestId, userId, entryAmount } = req.body;

    // Validate the contest exists
    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    // Validate the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the Bet
    const newBet = new Bet({
      contestId,
      userId,
      entryAmount,
    });

    await newBet.save();
    res.status(201).json({
      message: "Bet created successfully",
      bet: newBet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating bet",
      error,
    });
  }
};

// Get All Bets
exports.getAllBets = async (req, res) => {
  try {
    const bets = await Bet.find()
      .populate("contestId", "name entryPrice") // Populate contest details
      .populate("userId", "username email") // Populate user details
      .exec();

    res.status(200).json(bets);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bets",
      error,
    });
  }
};

// Get a Bet by ID
exports.getBetById = async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id)
      .populate("contestId", "name entryPrice") // Populate contest details
      .populate("userId", "username email") // Populate user details
      .exec();

    if (!bet) {
      return res.status(404).json({ message: "Bet not found" });
    }

    res.status(200).json(bet);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bet",
      error,
    });
  }
};

// Update Bet (e.g., after match completion)
exports.updateBet = async (req, res) => {
  try {
    const { entryAmount, winningAmount } = req.body;

    // Update the Bet
    const bet = await Bet.findByIdAndUpdate(
      req.params.id,
      { entryAmount, winningAmount },
      { new: true }
    );

    if (!bet) {
      return res.status(404).json({ message: "Bet not found" });
    }

    res.status(200).json({
      message: "Bet updated successfully",
      bet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating bet",
      error,
    });
  }
};

// Delete Bet
exports.deleteBet = async (req, res) => {
  try {
    const bet = await Bet.findByIdAndDelete(req.params.id);
    if (!bet) {
      return res.status(404).json({ message: "Bet not found" });
    }
    res.status(200).json({ message: "Bet deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting bet",
      error,
    });
  }
};

// Get Bet History (bets placed by a specific user)
exports.getBetHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    const betHistory = await Bet.find({ userId })
      .populate("contestId", "name entryPrice") // Populate contest details
      .populate("userId", "username email") // Populate user details
      .exec();

    if (!betHistory || betHistory.length === 0) {
      return res.status(404).json({ message: "No bets found for this user" });
    }

    res.status(200).json(betHistory);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bet history",
      error,
    });
  }
};
