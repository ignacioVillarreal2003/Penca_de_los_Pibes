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

export { getUserByCi };
