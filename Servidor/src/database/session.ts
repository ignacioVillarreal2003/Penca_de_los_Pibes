import { connection } from '../index';

async function getUserByCi(ci: string): Promise<any> {
    const query = `
        SELECT * FROM Usuario U 
        JOIN Participante as P on U.ci = P.ci 
        WHERE P.ci = ?;`;

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

async function getAdminByCi(ci: string): Promise<any> {
    const query = `
        SELECT * FROM Usuario U 
        JOIN Administrador as A on U.ci = A.ci 
        WHERE A.ci = ?;`;

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

async function postUser(ci: string, password: string): Promise<any> {
    const query = `
        INSERT INTO Usuario(ci, password) VALUES (?, ?);`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci, password], (error: any, results: any) => {
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

async function postParticipant(ci: string, username: string): Promise<any> {
    const query = `
        INSERT INTO Participante(ci, score, username) VALUES (?, ?, ?);`;
    
    return new Promise((resolve, reject) => {
        connection.query(query, [ci, 0, username], (error: any, results: any) => {
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

async function postForecast(ci: string, champion: string, subChampion: string): Promise<any> {
    const query = `
        INSERT INTO Pronostico_inicial(ci, championshipName, champion, subChampion) VALUES (?, ?, ?, ?);`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci, "Copa América 2024", champion, subChampion], (error: any, results: any) => { // VER LO DE EL CAMPEONATO
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

async function deleteUser(ci: string): Promise<any> {
    const query = `
        DELETE FROM Usuario WHERE ci = ?;`;

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

async function deleteParticipant(ci: string): Promise<any> {
    const query = `
        DELETE FROM Participante WHERE ci = ?;`;

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

async function deleteForecast(ci: string): Promise<any> {
    const query = `
        DELETE FROM Pronostico_inicial WHERE ci = ?;`;

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

export { getUserByCi, getAdminByCi, postUser, postForecast, postParticipant, deleteUser, deleteParticipant, deleteForecast };
