const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController')
const playerController = require('../controllers/playerController')
const matchController =require('../controllers/matchController')

router.post('/teams/create', teamController.create);
router.get('/teams/read', teamController.read);
router.put('/teams/update/:id', teamController.update);
router.delete('/teams/delete/:id', teamController.delete);

router.post('/players/create', playerController.create);
router.get('/players/read', playerController.read);
router.put('/players/update/:id', playerController.update);
router.delete('/players/delete/:id', playerController.delete);

router.post('/matches/create', matchController.createMatch); 
router.get('/matches/getall', matchController.getAllMatches);
router.get('/matches/:id', matchController.getMatchDetails);
router.put('/matches/update/:id', matchController.updateMatch); 
router.delete('/matches/delete/:id', matchController.deleteMatch); 




module.exports = router