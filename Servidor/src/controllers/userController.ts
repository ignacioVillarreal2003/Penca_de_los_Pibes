const userServices = require('../services/userServices');

const getChampionshipTeams = async (_req: any, res: any) => {
    try {
        const result = await sessionServices.getChampionshipTeams();
        if (result.message) {
            res.status(result.status).send({ message: result.message })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }

    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const getChampionshipMatches = async (_req: any, res: any) => {
    try {
        const result = await sessionServices.getChampionshipMatches();
        if (result.message) {
            res.status(result.status).send({ message: result.message })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }

    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const postMatchPrediction = async (req: any, res: any) => {
    try {
        const { body } = req;                
        if (!body.championshipName || !body.team1 || !body.team2 || !body.scoreTeam1 || !body.scoreTeam2) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {                        
            const result = await sessionServices.postMatchPrediction(body.team1, body.team2, body.scoreTeam1, body.scoreTeam2);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const getRanking = async (_req: any, res: any) => {
    try {
        const result = await sessionServices.getRanking();
        if (result.message) {
            res.status(result.status).send({ message: result.message })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }

    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const postCareer = async (req: any, res: any) => {
    try {
        const { body } = req;                
        if (!body.ci || !body.carrer) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {                        
            const result = await sessionServices.postCareer(body.ci, body.carrer);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

module.exports = {
    getChampionshipTeams,
    getChampionshipMatches,
    postMatchPrediction,
    getRanking,
    postCareer
}