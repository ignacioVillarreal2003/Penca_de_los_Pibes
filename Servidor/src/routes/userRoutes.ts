import express from "express";

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getChampionshipTeams', userController.getChampionshipTeams);
router.get('/getRanking', userController.getRanking);
router.get('/getChampionshipMatches', userController.getChampionshipMatches);
router.post('/postMatchPrediction', userController.postMatchPrediction);
router.get('/getCareers', userController.getCareers);
router.post('/changeCareer', userController.changeCareer);
router.post('/changePassword', userController.changePassword);
router.get('/getUserMatches/:ci', userController.getUserMatches);

export default router;