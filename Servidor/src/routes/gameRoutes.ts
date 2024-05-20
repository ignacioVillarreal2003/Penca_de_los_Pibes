import express from "express";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

const gameController = require('../controllers/gameController');

router.get('/getMatches', gameController.getMatches);
router.post('/postMatchResult', authenticate, gameController.postMatchResult);

module.exports = router;