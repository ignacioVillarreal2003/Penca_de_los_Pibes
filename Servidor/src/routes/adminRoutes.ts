import express from "express";

const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/getChampionshipsAdmin', adminController.getChampionshipsAdmin);
router.post('/postChampionshipAdmin', adminController.postChampionshipAdmin);
router.post('/activeChampionship', adminController.activeChampionship);
router.get('/getTeamsAdmin/:championshipName', adminController.getTeamsAdmin);
router.get('/getAllTeamsAdmin', adminController.getAllTeamsAdmin);
router.post('/postTeamAdmin', adminController.postTeamAdmin);
router.post('/addTeamAdmin', adminController.addTeamAdmin);
router.get('/getMatchesAdmin/:championshipName', adminController.getMatchesAdmin);
router.post('/postMatchAdmin', adminController.postMatchAdmin);
router.get('/getResultsAdmin/:championshipName', adminController.getResultsAdmin);
router.post('/postResultAdmin', adminController.postResultAdmin);
router.post('/scoreReset', adminController.scoreReset);

export default router;
