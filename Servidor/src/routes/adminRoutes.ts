import express from "express";

const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/addTeamAdmin', adminController.addTeamAdmin);
router.post('/activeChampionship', adminController.activeChampionship);
router.post('/postChampionshipAdmin', adminController.postChampionshipAdmin);
router.post('/postTeamAdmin', adminController.postTeamAdmin);
router.post('/postMatchAdmin', adminController.postMatchAdmin);
router.post('/postResultAdmin', adminController.postResultAdmin);
router.get('/getChampionshipsAdmin', adminController.getChampionshipsAdmin);
router.get('/getTeamsAdmin/:championshipName', adminController.getTeamsAdmin);
router.get('/getAllTeamsAdmin', adminController.getAllTeamsAdmin);
router.get('/getMatchesAdmin/:championshipName', adminController.getMatchesAdmin);
router.get('/getResultsAdmin/:championshipName', adminController.getResultsAdmin);

export default router;
