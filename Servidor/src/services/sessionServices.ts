import { IUser } from "../types";

const session = require('../database/session');
const jwt = require('jsonwebtoken');

function generateAccessToken(ci: string) {
    return jwt.sign({ ci: ci }, process.env.SECRET, { expiresIn: '1h' });
}

const registerUser = async (ci: string, password: string, username: string, champion: string, subChampion: string) => {
    try {     
        const existingUser: IUser = await session.getUserByCi(ci);                 
        if (existingUser) {
            return { status: 400, message: "El usuario ya ha sido registrado." };
        } else {    
            try {
                await session.postUser(ci, password);
                await session.postParticipant(ci, username);
                await session.postForecast(ci, champion, subChampion);
                const token = generateAccessToken(ci);
                return { status: 200, token: token };
            } catch (error) {
                await session.deleteUser(ci);
                await session.deleteParticipant(ci);
                await session.deleteForecast(ci);
                return { status: 400, message: "Error procesando los datos." };
            }
        }
    } catch (error) {        
        throw new Error("Error procesando los datos.");
    }
}

const loginUser = async (ci: string, password: string) => {
    try {
        const existingUser: IUser = await session.getUserByCi(ci); 
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
        const existingUser: IUser = await session.getAdminByCi(ci); 
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