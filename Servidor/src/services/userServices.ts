const user = require('../database/user');

export const getChampionshipTeams = async () => {
    try {
        const teams: any = await user.getChampionshipTeams("Copa america 1"); // ver parametro
        if (teams) {
            return { status: 400, teams: teams };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getChampionshipMatches = async () => {
    try {
        const matches: any[] = await user.getChampionshipMatches("Copa america 1");
        if (matches) {
            return { status: 200, matches: matches };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postMatchPrediction = async (championshipName: string, team1: string, team2: string, scoreTeam1: number, scoreTeam2: number) => {
    try {
        await user.postMatchPrediction(championshipName, team1, team2, scoreTeam1, scoreTeam2);
        return { status: 200, message: "bien" };
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

const postCareer = async (ci: string, carrer: string) => {
    try {
        await user.postCareer(ci, carrer);
        return { status: 200, message: "bien" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

module.exports = {
    getChampionshipTeams,
    getChampionshipMatches,
    postMatchPrediction,
    getRanking,
    postCareer
}