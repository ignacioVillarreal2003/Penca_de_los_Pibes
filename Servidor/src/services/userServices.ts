const user = require('../database/user');
const session = require('../database/session');

export const getChampionshipTeams = async () => {
    try {
        const teams: any = await user.getChampionshipTeams();
        if (teams) {
            return { status: 200, teams: teams };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const getRanking = async () => {
    try {
        const ranking: any[] = await user.getRanking();
        if (ranking) {
            return { status: 200, ranking: ranking };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const getChampionshipMatches = async () => {
    try {
        const matches: any[] = await user.getChampionshipMatches();
        if (matches) {
            return { status: 200, matches: matches };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const postMatchPrediction = async (ci: string, dateMatch: string, team1: string, team2: string, championshipName: string, datePrediction: string, scoreTeam1: number, scoreTeam2: number) => {
    try {
        dateMatch = dateMatch.replace('T', ' ');
        datePrediction = dateMatch.replace('T', ' ');
        dateMatch = dateMatch.replace('.000Z', '');
        datePrediction = dateMatch.replace('.000Z', '');
        const prediction = await user.getMatchPrediction(ci, dateMatch, team1, team2, championshipName);
        if (prediction.length > 0) {
            await user.updateMatchPrediction(ci, dateMatch, team1, team2, championshipName, datePrediction, scoreTeam1, scoreTeam2);
            return { status: 200, message: "Predicción actualizada con éxito" };
        } else {
            await user.postMatchPrediction(ci, dateMatch, team1, team2, championshipName, datePrediction, scoreTeam1, scoreTeam2);
            return { status: 200, message: "Predicción realizada con éxito" };
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const getCareers = async () => {
    try {
        const careers: any[] = await user.getCareers();
        if (careers) {
            return { status: 200, careers: careers };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const changeCareer = async (ci: string, career: string) => {
    try {
        const lastCareer = await user.getCareer(ci, career);
        if (lastCareer) {
            await user.changeCareer(ci, career);
            return { status: 200, message: "Carrera cambiada con exito." };
        } else {
            await user.assignCareer(ci, career);
            return { status: 200, message: "Carrera asignada con exito." };
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const changeMail = async (ci: string, mail: string) => {
    try {
        await user.changeMail(ci, mail);
        return { status: 200, message: "Mail cambiado con exito." };
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const changePassword = async (ci: string, oldPassword: string, newPassword: string) => {
    try {
        const u = await session.getUserByCi(ci);
        if (u[0].password == oldPassword) {
            await user.changePassword(ci, newPassword);
            return { status: 200, message: "Contraseña cambiada con exito." };
        } else {
            return { status: 500, message: "Error procesando los datos." };
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}

export const getUserMatches = async (ci: string) => {
    try {
        const matches: any[] = await user.getUserMatches(ci);
        if (matches) {
            return { status: 200, matches: matches };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error procesando los datos.");
    }
}