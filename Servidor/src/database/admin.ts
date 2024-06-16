import { connection } from '../index';

async function postChampionshipAdmin(championshipName: string, startDate: Date, endDate: Date): Promise<any> {
    const query = `
        INSERT INTO Campeonato(nombre_campeonato, fecha_inicio, fecha_fin) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [championshipName, startDate, endDate], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function postCountry(teamName: string): Promise<any> {
    const query = `
        INSERT INTO Equipo(nombre_equipo) VALUES (?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [teamName], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function postTeamAdmin(championshipName: string, teamName: string, group: string): Promise<any> {
    const query = `
        INSERT INTO Participan(nombre_campeonato, nombre_equipo, grupo) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [championshipName, teamName, group], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function postMatchAdmin(championshipName: string, team1: string, team2: string, date: Date, stage: string, location: string): Promise<any> {
    const query = `
        INSERT INTO Juegan_partido(fecha_partido, nombre_equipo_1, nombre_equipo_2, nombre_campeonato1, nombre_campeonato2, ubicacion, goles_partido1, goles_partido2, etapa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        connection.query(query, [date, team1, team2, championshipName, championshipName, location, 0, 0, stage], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function postResultAdmin(scoreTeam1: number, scoreTeam2: number, championshipName: string, team1: string, team2: string, dateMatch: Date): Promise<any> {
    const query = `
        UPDATE Juegan_partido
        SET goles_partido1 = ?, goles_partido2 = ?
        WHERE nombre_campeonato1 = ? AND nombre_equipo_1 = ? AND nombre_equipo_2 = ? AND fecha_partido = ?;`;

    return new Promise((resolve, reject) => {
        connection.query(query, [scoreTeam1, scoreTeam2, championshipName, team1, team2, dateMatch], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function getChampionshipsAdmin(): Promise<any> {
    const query = `
        SELECT * FROM Campeonato`;

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

async function getTeamsAdmin(championshipName: string): Promise<any> {
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

async function getMatchesAdmin(championshipName: string): Promise<any> {
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

async function getResultsAdmin(championshipName: string): Promise<any> {
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

export { postChampionshipAdmin, postCountry, postTeamAdmin, postMatchAdmin, postResultAdmin, getChampionshipsAdmin, getTeamsAdmin, getMatchesAdmin, getResultsAdmin };
