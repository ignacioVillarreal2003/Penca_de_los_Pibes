import { connection } from '../index';

export class UserService {

    static getUserById(ci: number) {
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

    //funca
    static getAdminByCi(ci: number) {
        const query = `
        SELECT * FROM Administrador A 
        JOIN Participante as P on A.cedula = P.cedula 
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

}