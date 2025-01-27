const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController')
const playerController = require('../controllers/playerController')

router.post('/teams/create', teamController.create);
router.get('/teams/read', teamController.read);
router.put('/teams/update/:id', teamController.update);
router.delete('/teams/delete/:id', teamController.delete);

router.post('/players/create', playerController.create);
router.get('/players/read', playerController.read);
router.put('/players/update/:id', playerController.update);
router.delete('/players/delete/:id', playerController.delete);

module.exports = router