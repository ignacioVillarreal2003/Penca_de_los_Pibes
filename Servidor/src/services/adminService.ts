const admin = require('../database/admin');
const { transporter, createMailOptions } = require('../mail');

export const getChampionshipsAdmin = async () => {
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

export const postWinners = async () => {
    try {
        const users: any[] = await admin.postWinners(); 
        let text = `¡Felicidades! Ganaste uno de los premios por participar en la penca.`;
        users.forEach((user: any) => {
            if (user.mail){
                const mailOptions = createMailOptions(process.env.MAIL, user.mail, 'Penca UCU', text);
                transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Correo enviado: ' + info.response);
                }
                });
            }
        })
        return { status: 200, message: "Correos enviados con exito." };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

export const postChampionshipAdmin = async (championshipName: string, startDate: Date, endDate: Date) => {
    try {
        await admin.postChampionshipAdmin(championshipName, startDate, endDate);
        return { status: 200, message: "Campeonato ingresado con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

export const getTeamsAdmin = async (championshipName: string) => {
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

export const getAllTeamsAdmin = async () => {
    try {
        const teams: any = await admin.getAllTeamsAdmin();
        if (teams) {
            return { status: 200, teams: teams };
        } else {
            throw new Error("Error procesando los datos.");
        }
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

export const postTeamAdmin = async (championshipName: string, teamName: string, teamGroup: string) => {
    try {
        await admin.postTeamAdmin(championshipName, teamName, teamGroup);
        return { status: 200, message: "Equipo asignado a campeonato con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

export const addTeamAdmin = async (teamName: string) => {    
    try {
        await admin.addTeamAdmin(teamName);
        return { status: 200, message: "Equipo ingresado con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

export const getMatchesAdmin = async (championshipName: string) => {
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

export const postMatchAdmin = async (championshipName: string, team1: string, team2: string, date: Date, stage: string, location: string) => {
    try {
        await admin.postMatchAdmin(championshipName, team1, team2, date, stage, location);
        return { status: 200, message: "Partido creado con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

export const getResultsAdmin = async (championshipName: string) => {
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

export const postResultAdmin = async (scoreTeam1: number, scoreTeam2: number, championshipName: string, team1: string, team2: string) => {
    try {                        
        await admin.postResultAdmin(scoreTeam1, scoreTeam2, championshipName, team1, team2);
        const predicciones: any[] = await admin.getPredictions(championshipName, team1, team2);    
        console.log(predicciones);
                
        if (predicciones){
            predicciones.forEach((e: any) => {
                if (scoreTeam1 == e.scoreTeam1 && scoreTeam2 == e.scoreTeam2) {
                    admin.postPoints(e.ci, 4)
                } else if (scoreTeam1 > scoreTeam2 && e.scoreTeam1 > e.scoreTeam2) {
                    admin.postPoints(e.ci, 2)
                } else if (scoreTeam2 > scoreTeam1 && e.scoreTeam2 > e.scoreTeam1) {
                    admin.postPoints(e.ci, 2)
                }
            })
        }    
        return { status: 200, message: "Resultado atribuído con éxito" };
    } catch (error) {
        console.log(error);
        
        throw new Error("Error procesando los datos.");
    }
}

export const postChampionSubchampion = async (championship: string, champion: string, subchampion: string) => {
    try {
        const predicciones: any[] = await admin.getChampionSubchampion(championship);
        predicciones.forEach((e: any) => {
            if (e.champion == champion) {
                admin.postPoints(e.ci, 10)
            }
            if (e.subChampion == subchampion) {
                admin.postPoints(e.ci, 5)
            }
        })
        return { status: 200, message: "Resultado atribuído con éxito" };
    } catch (error) {
        throw new Error("Error procesando los datos.");
    }
}

export const scoreReset = async () => {
    try {
        await admin.scoreReset();
        return { status: 200, message: "Puntuaciones actualizadas" };
    } catch (error) {        
        throw new Error("Error procesando los datos.");
    }
}