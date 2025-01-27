const {Player} = require('../models/player');
exports.create = async (req, res) => {
  try {
    const data = req.body;
    const player = await Player.create(data);
    res.status(201).json({
         message: "Team created successfully", 
         player 
        });
  } catch (error) {
    res
      .status(500)
      .json({ 
        error: "Error creating team",
         details: error.message });
  }
};
exports.read = async (req, res) => {
    const players = await Player.find().populate('team');
    res.json(players);
}
exports.update = async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.delete = async (req, res) => {
    try {
        await Player.findByIdAndDelete(req.params.id);
        res.json({ message: 'Player deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
