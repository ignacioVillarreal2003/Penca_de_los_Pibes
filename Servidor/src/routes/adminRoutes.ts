import express from "express";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/postWinners', adminController.postWinners);
router.get('/getChampionshipsAdmin', authenticate, adminController.getChampionshipsAdmin);
router.post('/postChampionshipAdmin', authenticate, adminController.postChampionshipAdmin);
router.post('/activeChampionship', authenticate, adminController.activeChampionship);
router.get('/getTeamsAdmin/:championshipName', authenticate, adminController.getTeamsAdmin);
router.get('/getAllTeamsAdmin', authenticate, adminController.getAllTeamsAdmin);
router.post('/postTeamAdmin', authenticate, adminController.postTeamAdmin);
router.post('/addTeamAdmin', authenticate, adminController.addTeamAdmin);
router.get('/getMatchesAdmin/:championshipName', authenticate, adminController.getMatchesAdmin);
router.post('/postMatchAdmin', authenticate, adminController.postMatchAdmin);
router.get('/getResultsAdmin/:championshipName', authenticate, adminController.getResultsAdmin);
router.post('/postResultAdmin', authenticate, adminController.postResultAdmin);
router.post('/scoreReset', authenticate, adminController.scoreReset);
router.post('/championshipEnd', adminController.postChampionshipEnd);

export default router;
