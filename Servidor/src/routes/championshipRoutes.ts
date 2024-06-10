import { ChampionshipController } from '../controllers/championshipController';
import express from "express";

const router = express.Router();

router.get("", ChampionshipController.getChampionships);

export default router;
