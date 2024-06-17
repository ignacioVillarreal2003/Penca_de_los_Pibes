const user = require('../database/user');

export const getChampionshipTeams = async () => {
    try {        
        const teams: any = await user.getChampionshipTeams();       
        if (teams) {            
            return { status: 200, teams: teams };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getRanking = async () => {
    try {        
        const ranking: any[] = await user.getRanking();        
        if (ranking) {
            return { status: 200, ranking: ranking };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getChampionshipMatches = async () => {
    try {
        const matches: any[] = await user.getChampionshipMatches();                
        if (matches) {
            return { status: 200, matches: matches };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postMatchPrediction = async (ci: string, dateMatch: Date, team1: string, team2: string, championshipName: string, datePrediction: Date, scoreTeam1: number, scoreTeam2: number) => {
    try {        
        await user.postMatchPrediction(ci, dateMatch, team1, team2, championshipName, datePrediction, scoreTeam1, scoreTeam2);
        return { status: 200, message: "Predicción realizada con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postCareer = async (ci: string, career: string) => {
    try {
        await user.postCareer(ci, career);
        return { status: 200, message: "bien" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

module.exports = { 
    getChampionshipTeams, 
    getRanking, 
    getChampionshipMatches, 
    postMatchPrediction, 
    postCareer 
}