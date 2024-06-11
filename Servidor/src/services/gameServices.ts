import { Match } from "../database/match"
import { connection } from "../index";

export class GameService {
    //funca
    static getMatches() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM Juegan_Partido", (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(res as Match[]);
            });
        });
    }

    //funca
    static getMatchByPk(fecha_partido: Date, eq1: string, eq2: string, campeonato: string) {
        return new Promise<Match[]>((resolve, reject) => {
            connection.query("SELECT * FROM Juegan_Partido WHERE fecha_partido = ? AND nombre_equipo_1 = ? AND nombre_equipo_2 = ? AND nombre_campeonato1 = ? AND nombre_campeonato2 = ?",
                [fecha_partido, eq1, eq2, campeonato, campeonato], (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(res as unknown as Match[]);
                });
        });
    }

    //funca
    static async postMatchResult(match: Match, goles_equipo_1: number, goles_equipo_2: number): Promise<boolean> {
        try {
            console.log(match);
            return await new Promise<boolean>((resolve, reject) => {
                connection.query("UPDATE Juegan_Partido SET goles_equipo1 = ?, goles_equipo2 = ? WHERE nombre_equipo_1 = ? AND  nombre_equipo_2 = ? AND fecha_partido = ? AND nombre_campeonato1 = ? AND nombre_campeonato2 = ?",
                    [goles_equipo_1, goles_equipo_2, match.nombre_equipo_1, match.nombre_equipo_2, match.fecha_partido, match.nombre_campeonato1, match.nombre_campeonato2], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(true);
                        }
                    });
            });
        } catch (error) {
            return false;
        }
    }


}
