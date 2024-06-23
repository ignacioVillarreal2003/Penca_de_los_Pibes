import express from "express";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getChampionshipTeams', userController.getChampionshipTeams);
router.get('/getRanking', authenticate, userController.getRanking);
router.get('/getChampionshipMatches', authenticate, userController.getChampionshipMatches);
router.post('/postMatchPrediction', authenticate, userController.postMatchPrediction);
router.get('/getCareers', authenticate, userController.getCareers);
router.post('/changeCareer', authenticate, userController.changeCareer);
router.post('/changeMail', authenticate, userController.changeMail);
router.post('/changePassword', authenticate, userController.changePassword);
router.get('/getUserMatches/:ci', authenticate, userController.getUserMatches);

export default router;