const admin = require('../database/admin');

export const postChampionshipAdmin = async (championshipName: string, startDate: Date, endDate: Date) => {
    try {
        await admin.postChampionshipAdmin(championshipName, startDate, endDate);
        return { status: 200, message: "Campeonato ingresado con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postCountryAdmin = async (teamName: string) => {
    try {
        await admin.postCountry(teamName);
        return { status: 200, message: "Equipo ingresado con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postTeamAdmin = async (championshipName: string, teamName: string, group: string) => {
    try {
        await admin.postTeamAdmin(championshipName, teamName, group);
        return { status: 200, message: "Equipo asignado a campeonato con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postMatchAdmin = async (championshipName: string, team1: string, team2: string, date: Date, stage: string, location: string) => {
    try {
        await admin.postMatchAdmin(championshipName, team1, team2, date, stage, location);
        return { status: 200, message: "Partido creado con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postResultAdmin = async (scoreTeam1: number, scoreTeam2: number, championshipName: string, team1: string, team2: string, dateMatch: Date) => {
    try {
        await admin.postResultAdmin(scoreTeam1, scoreTeam2, championshipName, team1, team2, dateMatch);
        return { status: 200, message: "Resultado atribuído con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getChampionshipsAdmin = async () => {
    try {
        const championships: any[] = await admin.getChampionshipsAdmin();
        if (championships) {
            return { status: 200, championships: championships };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getTeamsAdmin = async (championshipName: string) => {
    try {
        const teams: any = await admin.getTeamsAdmin(championshipName);
        if (teams) {
            return { status: 200, teams: teams };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getMatchesAdmin = async (championshipName: string) => {
    try {
        const matches: any = await admin.getMatchesAdmin(championshipName);        
        if (matches) {
            return { status: 200, matches: matches };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getResultsAdmin = async (championshipName: string) => {
    try {
        const results: any = await admin.getResultsAdmin(championshipName);
        if (results) {
            return { status: 200, results: results };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

module.exports = {
    postChampionshipAdmin,
    postCountryAdmin,
    postTeamAdmin,
    postMatchAdmin,
    postResultAdmin,
    getChampionshipsAdmin,
    getTeamsAdmin,
    getMatchesAdmin,
    getResultsAdmin
}