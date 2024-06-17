import { connection } from '../index';
const { getChampionship } = require('../variables');

async function getChampionshipTeams(): Promise<any> {
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

async function getRanking(): Promise<any> {
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

async function getChampionshipMatches(): Promise<any> {    
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

async function postMatchPrediction(ci: string, dateMatch: Date, team1: string, team2: string, championshipName: string, datePrediction: Date, scoreTeam1: number, scoreTeam2: number): Promise<any> {
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

async function postCareer(ci: string, career: string): Promise<any> {
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

export { getChampionshipTeams, getRanking, postCareer, postMatchPrediction, getCareers, getChampionshipMatches };