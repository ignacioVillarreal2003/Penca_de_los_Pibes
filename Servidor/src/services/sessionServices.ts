const session = require('../database/session');
const jwt = require('jsonwebtoken');

function generateAccessToken(ci: string) {
    return jwt.sign({ ci: ci }, process.env.SECRET, { expiresIn: '1h' });
}

export const registerUser = async (ci: string, password: string, username: string, champion: string, subChampion: string) => {
    try {             
        const existingUser = await session.getUserByCi(ci);           
        if (existingUser) {
            return { status: 400, message: "El usuario ya ha sido registrado." };
        } else {    
            try {
                await session.postUser(ci, password);
                await session.postParticipant(ci, username);
                await session.postForecast(ci, champion, subChampion);
                const user = await session.getUserData(ci);                                
                const token = generateAccessToken(ci);
                return { status: 200, token: token, user: user };
            } catch (error) {
                console.log(error);
                await session.deleteForecast(ci);
                await session.deleteParticipant(ci);
                await session.deleteUser(ci);
                return { status: 400, message: "Error procesando los datos." };
            }
        }
    } catch (error) {  
        console.log(error);      
        throw new Error("Error procesando los datos.");
    }
}

export const loginUser = async (ci: string, password: string) => {
    try {
        const existingUser = await session.getUserByCi(ci); 
        if (!existingUser) {
            return { status: 400, message: "El usuario no esta registrado." };
        } else {
            if (existingUser[0].password != password) {
                return { status: 400, message: "Contraseña incorrecta." };
            } else {
                const user = await session.getUserData(ci);
                const token = generateAccessToken(ci);
                return { status: 200, token: token, user: user };
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const loginAdmin = async (ci: string, password: string) => {
    try {
        const existingUser = await session.getAdminByCi(ci);                 
        if (!existingUser) {
            return { status: 400, message: "El administrador no esta registrado." };
        } else {
            if (existingUser[0].password != password) {
                return { status: 400, message: "Contraseña incorrecta." };
            } else {
                const token = generateAccessToken(ci);
                return { status: 200, token: token };
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}