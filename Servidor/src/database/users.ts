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
        INSERT INTO Participante(cedula, mail, puntaje, nombre) VALUES (?, ?, ?, ?);`;

    const mail = "algo@gmail.com";
    const puntaje = 0;
    
    return new Promise((resolve, reject) => {
        connection.query(query, [ci, mail, puntaje, username], (error: any, results: any) => {
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

async function postChampion(ci: string, champion: string): Promise<any> {
    const query = `
        INSERT INTO Pronostican_campeon(cedula, nombre_campeonato, nombre_equipo_campeon) VALUES (?, ?, ?);`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci, "Copa América 2024", champion], (error: any, results: any) => {
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

async function postSubChamion(ci: string, subChampion: string): Promise<any> {
    const query = `
        INSERT INTO Pronostican_subcampeon(cedula, nombre_campeonato, nombre_equipo_subcampeon) VALUES (?, ?, ?);`;

    return new Promise((resolve, reject) => {
        connection.query(query, [ci, "Copa América 2024", subChampion], (error: any, results: any) => {
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

export { getUserByCi, getAdminByCi, postUser, postChampion, postSubChamion, postParticipant };
