import { Championship } from "../database/championship";
import { connection } from "../index";

export class ChampionshipService {

    //funca
    static getChampionships(): Promise<Championship[]> {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM Campeonato", (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(res as Championship[]);
            });
        });
    }
}
