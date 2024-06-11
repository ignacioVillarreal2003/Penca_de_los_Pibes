import express from "express";

const router = express.Router();
import { GameController } from '../controllers/gameController';

router.get('', GameController.getMatches);
router.post('', GameController.postMatchResult);

export default router;
