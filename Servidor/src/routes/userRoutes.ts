import express from "express";

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getChampionshipTeams', userController.getChampionshipTeams);
router.get('/getRanking', userController.getRanking);
router.get('/getChampionshipMatches', userController.getChampionshipMatches);
router.post('/postMatchPrediction', userController.postMatchPrediction);
router.post('/postCareer', userController.postCareer);


export default router;
