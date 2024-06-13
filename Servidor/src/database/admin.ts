import { connection } from '../index';

async function postChampionshipAdmin(championshipName: string, startDate: Date, endDate: Date): Promise<any> {
    const query = `
        INSERT INTO Campeonato(nombre_campeonato, fecha_comienzo, fecha_fin) VALUES (?, ?, ?)`;

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

async function postTeamAdmin(championshipName: string, teamName: Date): Promise<any> {
    const query = `
        INSERT INTO Equipos(nombre_equipo, país, grupo) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [championshipName, teamName, null], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function postMatchAdmin(championshipName: string, team1: string, team2: string, date: Date, group: string, stage: string, location: string): Promise<any> {
    const query = `
        INSERT INTO Juegan_partido(fecha_partido, nombre_equipo_1, nombre_equipo_2, nombre_campeonato, ubicación, goles_equipo_1, goles_equipo_2, etapa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log(group);
    return new Promise((resolve, reject) => {
        connection.query(query, [date, team1, team2, championshipName, location, 0, 0, stage], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function postResultAdmin(championshipName: string, team1: string, team2: string, scoreTeam1: number, scoreTeam2: number): Promise<any> {
    const query = `
        UPDATE Juegan_partido
        SET goles_equipo_1 = ?, goles_equipo_2 = ?
        WHERE nombre_campeonato = ? AND nombre_equipo_1 = ? AND nombre_equipo_2 = ?;`;

    return new Promise((resolve, reject) => {
        connection.query(query, [championshipName, scoreTeam1, scoreTeam2, team1, team2], (error: any, results: any) => {
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
        SELECT * FROM Equipos
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

async function getResultsAdmin(championshipName: string): Promise<any> {
    const query = `
        SELECT * FROM Juegan_partido
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

export { postChampionshipAdmin, postTeamAdmin, postMatchAdmin, postResultAdmin, getChampionshipsAdmin, getTeamsAdmin, getMatchesAdmin, getResultsAdmin };
