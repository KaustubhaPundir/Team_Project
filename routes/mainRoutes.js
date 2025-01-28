const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController')
const playerController = require('../controllers/playerController')
const matchController = require('../controllers/matchController')
const contestController = require("../controllers/contestController")
const betController = require("../controllers/betController")
const { registerUser, loginUser } = require('../middleware/authMiddleware');


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

router.post("/cont/create",contestController.createContest);
router.get("/cont/getall", contestController.getAllContests);
router.get("/cont/:id", contestController.getContestById);
router.put("/cont/update/:id", contestController.updateContest);
router.delete("/cont/delete/:id", contestController.deleteContest);

router.post("/bet/create", betController.createBet);
router.get("/bet/getall", betController.getAllBets);
router.get("/bet/:id", betController.getBetById);
router.put("/bet/update/:id", betController.updateBet);
router.delete("/bet/delete/:id", betController.deleteBet);
router.get("/bet/history/:userId", betController.getBetHistory);

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router