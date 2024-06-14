import { connection } from '../index';

async function getCareers(): Promise<any> {
    const query = `
        SELECT * FROM Carrera`;

    return new Promise((resolve, reject) => {
        connection.query(query, [], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(undefined);
            }
        });
    });
}

async function postCareer(ci: string, carrer: string): Promise<any> {
    const query = `
        INSERT INTO Pertenecen(cedula_participante, nombre_carrera) VALUES (?, ?);`;
    
    return new Promise((resolve, reject) => {
        connection.query(query, [ci, carrer], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(undefined);
            }
        });
    });
}

async function getChampionshipTeams(championshipName: string): Promise<any> {
    const query = `
        SELECT * FROM Participan
        WHERE nombre_campeonato = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [championshipName], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(undefined);
            }
        });
    });
}

async function getChampionshipMatches(championshipName: string): Promise<any> {
    const query = `
        SELECT * FROM Juegan_partido
        WHERE nombre_campeonato1 = ? AND nombre_campeonato2 = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [championshipName, championshipName], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(undefined);
            }
        });
    });
}

async function postMatchPrediction(ci: string, dateMatch: Date, team1: string, team2: string, championshipName: string, datePrediction: Date, scoreTeam1: number, scoreTeam2: number): Promise<any> {
    const query = `
        INSERT INTO Predicen(cedula_participante, fecha_partido, nombre_equipo_1, nombre_equipo_2, nombre_campeonato1, nombre_campeonato2, fecha_prediccion, prediccion_goles_equipo_1, prediccion_goles_equipo_2) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci, dateMatch, team1, team2, championshipName, championshipName, datePrediction, scoreTeam1, scoreTeam2], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function getRanking(): Promise<any> {
    const query = `
        SELECT * FROM Participante P
        ORDER BY P.puntaje DESC
        LIMIT 20;`;

    return new Promise((resolve, reject) => {
        connection.query(query, [], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}


export { postCareer, getCareers, getChampionshipTeams, getChampionshipMatches, postMatchPrediction, getRanking };
