import { connection } from '../index';

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

async function getChampionSubchampion(championshipName: string): Promise<any> {
    const query = `
        SELECT * FROM Pronostico_inicial WHERE championshipName = ?;`;

    console.log(championshipName);

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

async function postChampionshipAdmin(championshipName: string, startDate: Date, endDate: Date): Promise<any> {
    const query = `
        INSERT INTO Campeonato(championshipName, startDate, endDate) VALUES (?, ?, ?)`;

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

async function getTeamsAdmin(championshipName: string): Promise<any> {
    const query = `
        SELECT * FROM Participan
        WHERE championshipName = ?`;

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

async function getAllTeamsAdmin(): Promise<any> {
    const query = `
        SELECT * FROM Equipo`;

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

async function postTeamAdmin(championshipName: string, teamName: string, teamGroup: string): Promise<any> {
    const query = `
        INSERT INTO Participan(championshipName, teamName, teamGroup) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [championshipName, teamName, teamGroup], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

async function addTeamAdmin(teamName: string): Promise<any> {
    const query = `
        INSERT INTO Equipo(teamName) VALUES (?)`;

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

async function getMatchesAdmin(championshipName: string): Promise<any> {
    const query = `
        SELECT * FROM Juegan_partido
        WHERE championshipName1 = ? AND championshipName2 = ?`;

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

async function postMatchAdmin(championshipName: string, team1: string, team2: string, date: Date, stage: string, location: string): Promise<any> {
    const query = `
        INSERT INTO Juegan_partido(dateMatch, team1, team2, championshipName1, championshipName2, location, scoreTeam1, scoreTeam2, stage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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

async function getResultsAdmin(championshipName: string): Promise<any> {
    const query = `
        SELECT * FROM Juegan_partido
        WHERE championshipName1 = ? AND championshipName2 = ?`;

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

async function postResultAdmin(scoreTeam1: number, scoreTeam2: number, championshipName: string, team1: string, team2: string, dateMatch: Date): Promise<any> {
    const query = `
        UPDATE Juegan_partido
        SET scoreTeam1 = ?, scoreTeam2 = ?
        WHERE championshipName1 = ? AND team1 = ? AND team2 = ? AND dateMatch = ?;`;

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

export async function postPoints(ci: string, points: number): Promise<any> {
    const query = `
        UPDATE Participante
        SET score = score + ?
        WHERE ci = ?;`;

    return new Promise((resolve, reject) => {
        connection.query(query, [points, ci], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

export async function getPredictions(championshipName: string, team1: string, team2: string, dateMatch: Date): Promise<any> {
    const query = `
        SELECT * FROM Predicen
        WHERE championshipName1 = 'Copa América 2024' 
        AND team1 = 'Paraguay' 
        AND team2 = 'Costa Rica' 
        AND dateMatch = '2024-06-24';`;

    return new Promise((resolve, reject) => {
        connection.query(query, [championshipName, team1, team2, dateMatch], (error: any, results: any) => {
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

async function scoreReset(): Promise<any> {
    const query = `
        UPDATE Participante
        SET score = 0;`;

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

export { 
    postChampionshipAdmin, 
    addTeamAdmin, 
    postTeamAdmin, 
    postMatchAdmin, 
    postResultAdmin, 
    getChampionshipsAdmin, 
    getTeamsAdmin, 
    getMatchesAdmin, 
    getResultsAdmin, 
    getAllTeamsAdmin,
    scoreReset,
    getChampionSubchampion,
};
