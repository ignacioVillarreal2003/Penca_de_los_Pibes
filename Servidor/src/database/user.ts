import { connection } from '../index';

async function getCarrers(): Promise<any> {
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

export { postCareer, getCarrers };
