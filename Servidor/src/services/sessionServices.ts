import { IUser } from "../types";

const users = require('../database/users');
const jwt = require('jsonwebtoken');

function generateAccessToken(ci: string) {
    return jwt.sign({ ci: ci }, process.env.SECRET, { expiresIn: '1h' });
}

const registerUser = async (ci: string, password: string, username: string, champion: string, subChampion: string) => {
    try {     
        const existingUser: IUser = await users.getUserByCi(ci);                 
        if (existingUser) {
            return { status: 400, message: "El usuario ya ha sido registrado." };
        } else {    
            await users.postUser(ci, password); // problema, si falla en una no se borran los datos ya puestos.
            await users.postParticipant(ci, username);
            await users.postChampion(ci, champion);
            await users.postSubChamion(ci, subChampion);
            const token = generateAccessToken(ci);
            return { status: 200, token: token };
        }
    } catch (error) {        
        throw new Error("Error procesando los datos.");
    }
}

const loginUser = async (ci: string, password: string) => {
    try {
        const existingUser: IUser = await users.getUserByCi(ci); 
        if (!existingUser) {
            return { status: 400, message: "El usuario no esta registrado." };
        } else {
            if (existingUser.password != password) {
                return { status: 400, message: "Contraseña incorrecta." };
            } else {
                const token = generateAccessToken(ci);
                return { status: 200, token: token };
            }
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const loginAdmin = async (ci: string, password: string) => {
    try {
        const existingUser: IUser = await users.getAdminByCi(ci); 
        if (!existingUser) {
            return { status: 400, message: "El admin no esta registrado." };
        } else {
            if (existingUser.password != password) {
                return { status: 400, message: "Contraseña incorrecta." };
            } else {
                const token = generateAccessToken(ci);
                return { status: 200, token: token };
            }
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

module.exports = {
    registerUser,
    loginUser,
    loginAdmin
}