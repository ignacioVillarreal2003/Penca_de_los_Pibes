const admin = require('../database/admin');

export const postChampionshipAdmin = async (championshipName: string, startDate: Date, endDate: Date) => {
    try {
        await admin.postChampionshipAdmin(championshipName, startDate, endDate);
        return { status: 200, message: "bien" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postCountryAdmin = async (teamName: string) => {
    try {
        await admin.postCountryAdmin(teamName);
        return { status: 200, message: "bien" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postTeamAdmin = async (championshipName: string, teamName: string, group: string) => {
    try {
        await admin.postTeamAdmin(championshipName, teamName, group);
        return { status: 200, message: "bien" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postMatchAdmin = async (championshipName: string, team1: string, team2: string, date: Date, stage: string, location: string) => {
    try {
        await admin.postMatchAdmin(championshipName, team1, team2, date, stage, location);
        return { status: 200, message: "bien" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const postResultAdmin = async (championshipName: string, team1: string, team2: string, scoreTeam1: number, scoreTeam2: number) => {
    try {
        await admin.postResultAdmin(championshipName, team1, team2, scoreTeam1, scoreTeam2);
        return { status: 200, message: "bien" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getChampionshipsAdmin = async () => {
    try {
        const championships: any[] = await admin.getChampionshipsAdmin();
        if (championships) {
            return { status: 400, championships: championships };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getTeamsAdmin = async (championshipName: string) => {
    try {
        const championship: any = await admin.getTeamsAdmin(championshipName);
        if (championship) {
            return { status: 400, championship: championship };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getMatchesAdmin = async (championshipName: string) => {
    try {
        const championship: any = await admin.getMatchesAdmin(championshipName);
        if (championship) {
            return { status: 400, championship: championship };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

const getResultsAdmin = async (championshipName: string) => {
    try {
        const championship: any = await admin.getResultsAdmin(championshipName);
        if (championship) {
            return { status: 400, championship: championship };
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