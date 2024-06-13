import express from "express";

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getChampionshipTeams', userController.getChampionshipTeams);
router.get('/getChampionshipMatches', userController.getChampionshipMatches);
router.post('/postMatchPrediction', userController.postMatchPrediction);
router.get('/getRanking', userController.getRanking);
router.post('/postCareer', userController.postCareer);


export default router;
