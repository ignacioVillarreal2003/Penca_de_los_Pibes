import { ChampionshipService } from "../services/championshipService";
import { Championship } from "../database/championship";
import { Request, Response } from "express"; // Import Request and Response

export class ChampionshipController {
    static async getChampionships(_req: Request, res: Response) {
        try {
            const championships: Championship[] = await ChampionshipService.getChampionships();
            res.json(championships);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
