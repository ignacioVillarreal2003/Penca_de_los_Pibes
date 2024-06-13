import { connection } from '../index';

async function getUserByCi(ci: string): Promise<any> {
    const query = `
        SELECT * FROM Usuario U 
        JOIN Participante as P on U.cedula = P.cedula 
        WHERE P.cedula = ?;`;

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
        JOIN Administrador as A on U.cedula = A.cedula 
        WHERE A.cedula = ?;`;

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
        INSERT INTO Usuario(cedula, contrasena) VALUES (?, ?);`;

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
        INSERT INTO Participante(cedula, puntaje, nombre) VALUES (?, ?, ?, ?);`;
    
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

async function postForecast(ci: string, championshipName: string, champion: string, subChampion: string): Promise<any> {
    const query = `
        INSERT INTO Pronostico_inicial(cedula, nombre_campeonato, nombre_equipo_campeon, nombre_equipo_subcampeon) VALUES (?, ?, ?);`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci, championshipName, champion, subChampion], (error: any, results: any) => {
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
        DELETE FROM Usuario U
        WHERE U.cedula = ?;`;

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
        DELETE FROM Participante P
        WHERE P.cedula = ?;`;

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
        DELETE FROM Pronostico_inicial P
        WHERE P.cedula = ?;`;

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
