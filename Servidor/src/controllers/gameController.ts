import {Request, Response} from 'express';
import {GameService} from '../services/gameServices'

export class GameController {

    static async getMatches(_req: Request, res: Response) {
        try {
            const result = await GameService.getMatches();
            if (result) {
                res.status(200).send({ matches: result });
            } else {
                res.status(400).send({ message: "The room code is incorrect." });
            }
        } catch (error) {
            res.status(500).send({ message: error });
        }
    }

    static async postMatchResult(req: Request, res: Response): Promise<void> {
        try {
            const ci = req.body.ci;
            if (!ci) {
                res.status(400).send({ message: "Ci is required." });
                return; // Return here to exit the function after sending the response
            }

            const fecha = req.body.fecha;
            const eq1 = req.body.eq1;
            const eq2 = req.body.eq2;
            const campeonato = req.body.campeonato;

            if (fecha == null || eq1 == null || eq2 == null || campeonato == null) {
                res.status(400).send({ message: "Match data is required" });
                return; // Return here to exit the function after sending the response
            }
            const result = await GameService.getMatchByPk(fecha, eq1, eq2, campeonato);
            if (result) {
                await GameService.postMatchResult(result[0], req.body.goles_equipo_1, req.body.goles_equipo_2);
            } else {
                res.status(404).send({ message: "No match found" });
            }

        } catch (error) {
            res.status(500).send({ message: error });
            return; // Return here to exit the function after sending the response
        }
    }


}
