const admin = require('../database/admin');
const user = require('../database/user');
const { getChampionship } = require('variables');

export const todosLosDias = async () => {
    try {
        const matches: any[] = await admin.getMatchesAdmin(getChampionship());  
        const users: any[] = await user.getAllUsers(); 
        let text = `Recuerda puntuar a:\n`;
        matches.forEach((match: any) => {
            if (match.dateMatch == new Date()){
                text += `${match.team1} vs ${match.team2}\n`
            }
        })
        users.forEach((user: any) => {
            // enviar mail
            // user.gmail
        })
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}