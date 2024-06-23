const userServices = require('../services/userServices');

export const getChampionshipTeams = async (_req: any, res: any) => {
    try {
        const result = await userServices.getChampionshipTeams();
        if (result.teams) {
            res.status(result.status).send({ teams: result.teams })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const getRanking = async (_req: any, res: any) => {
    try {
        const result = await userServices.getRanking();
        if (result.ranking) {
            res.status(result.status).send({ ranking: result.ranking })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const getChampionshipMatches = async (_req: any, res: any) => {
    try {
        const result = await userServices.getChampionshipMatches();
        if (result.matches) {
            res.status(result.status).send({ matches: result.matches })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const postMatchPrediction = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.ci || !body.dateMatch || !body.championshipName || !body.team1 || !body.team2 || !body.datePrediction) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {            
            const result = await userServices.postMatchPrediction(body.ci, body.dateMatch, body.team1, body.team2, body.championshipName, body.datePrediction, body.scoreTeam1, body.scoreTeam2);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const getCareers = async (_req: any, res: any) => {
    try {
        const result = await userServices.getCareers();
        if (result.careers) {
            res.status(result.status).send({ careers: result.careers })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const changeCareer = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.ci || !body.career) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await userServices.changeCareer(body.ci, body.career);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const changeMail = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.ci || !body.mail) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await userServices.changeMail(body.ci, body.mail);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const changePassword = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.ci || !body.oldPassword || !body.newPassword) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await userServices.changePassword(body.ci, body.oldPassword, body.newPassword);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const getUserMatches = async (req: any, res: any) => {
    try {
        const ci = req.params.ci;
        if (!ci) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {                        
            const result = await userServices.getUserMatches(ci);
            if (result.matches) {
                res.status(result.status).send({ matches: result.matches })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}