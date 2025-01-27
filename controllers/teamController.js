const {Team} = require('../models/team');

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const team = await Team.create(data);
    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    res
      .status(500)
      .json({ 
        error: "Error creating team",
         details: error.message });
  }
};

exports.read = async (req, res) => {
    const teams = await Team.find().populate('players');
    res.json(teams);
}
exports.update = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(team);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.delete = async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}