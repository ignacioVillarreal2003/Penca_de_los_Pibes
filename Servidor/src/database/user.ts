import { connection } from '../index';
const { getChampionship } = require('../variables');

export async function getAllUsers(): Promise<any> {
    const query = `
        SELECT * FROM Participante`;

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

export async function getChampionshipTeams(): Promise<any> {
    const query = `
        SELECT P.teamName FROM Participan P
        WHERE championshipName = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [getChampionship()], (error: any, results: any) => {
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

export async function getRanking(): Promise<any> {
    const query = `
        SELECT P.username, P.score FROM Participante P
        ORDER BY P.score DESC
        LIMIT 10;`;    
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

export async function getChampionshipMatches(): Promise<any> {    
    const query = ` 
        SELECT jp.*, p1.teamGroup AS teamGroup1, p2.teamGroup AS teamGroup2 FROM Juegan_partido jp
        JOIN Participan p1 ON jp.team1 = p1.teamName AND jp.championshipName1 = p1.championshipName
        JOIN Participan p2 ON jp.team2 = p2.teamName AND jp.championshipName2 = p2.championshipName
        WHERE jp.championshipName1 = ? AND jp.championshipName2 = ?;`;

    return new Promise((resolve, reject) => {
        connection.query(query, [getChampionship(), getChampionship()], (error: any, results: any) => {
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

export async function getMatchPrediction(ci: string, dateMatch: string, team1: string, team2: string, championshipName: string): Promise<any> {
    const query = `
        SELECT * FROM Predicen
        WHERE ci = ? AND dateMatch = ? AND team1 = ? AND team2 = ?  AND championshipName1 = ? AND championshipName2 = ?;`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci, dateMatch, team1, team2, championshipName, championshipName], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}

export async function postMatchPrediction(ci: string, dateMatch: string, team1: string, team2: string, championshipName: string, datePrediction: string, scoreTeam1: number, scoreTeam2: number): Promise<any> {
    const query = `
        INSERT INTO Predicen(ci, dateMatch, team1, team2, championshipName1, championshipName2, datePrediction, scoreTeam1, scoreTeam2) 
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

export async function updateMatchPrediction(ci: string, dateMatch: string, team1: string, team2: string, championshipName: string, datePrediction: string, scoreTeam1: number, scoreTeam2: number): Promise<any> {    
    const query = `
        UPDATE Predicen
        SET scoreTeam1 = ?, scoreTeam2 = ?, datePrediction = ?
        WHERE ci = ? AND dateMatch = ? AND team1 = ? AND team2 = ? AND championshipName1 = ? AND championshipName2 = ?;`;

    return new Promise((resolve, reject) => {
        connection.query(query, [scoreTeam1, scoreTeam2, datePrediction, ci, dateMatch, team1, team2, championshipName, championshipName], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}


export async function getCareers(): Promise<any> {
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

export async function getCareer(ci: string): Promise<any> {
    const query = `
        SELECT * FROM Pertenecen
        WHERE ci = ?;`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci], (error: any, results: any) => {
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

export async function changeCareer(ci: string, career: string): Promise<any> {
    const query = `
        UPDATE Pertenecen
        SET career = ?
        WHERE ci = ?;`;
    
    return new Promise((resolve, reject) => {
        connection.query(query, [career, ci], (error: any, results: any) => {
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

export async function assignCareer(ci: string, career: string): Promise<any> {
    const query = `
        INSERT INTO Pertenecen(ci, career) VALUES (?, ?);`;
    
    return new Promise((resolve, reject) => {
        connection.query(query, [ci, career], (error: any, results: any) => {
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

export async function changeMail(ci: string, mail: string): Promise<any> {
    const query = `
        UPDATE Participante
        SET mail = ?
        WHERE ci = ?;`;
    
    return new Promise((resolve, reject) => {
        connection.query(query, [mail, ci], (error: any, results: any) => {
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

export async function changePassword(ci: string, newPassword: string): Promise<any> {
    const query = `
        UPDATE Usuario
        SET password = ?
        WHERE ci = ?;`;
    
    return new Promise((resolve, reject) => {
        connection.query(query, [newPassword, ci], (error: any, results: any) => {
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

export async function getUserMatches(ci: string): Promise<any> {
    const query = `
        SELECT * FROM Predicen
        WHERE ci = ?`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci], (error: any, results: any) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(results);
        });
    });
}