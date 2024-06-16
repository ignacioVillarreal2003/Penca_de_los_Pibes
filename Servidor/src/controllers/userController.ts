const userServices = require('../services/userServices');

const getChampionshipTeams = async (_req: any, res: any) => {
    try {                        
        const result = await userServices.getChampionshipTeams();                
        if (result.teams) {
            res.status(result.status).send({ teams: result.teams })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }

    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const getChampionshipMatches = async (_req: any, res: any) => {
    try {
        const result = await userServices.getChampionshipMatches();
        if (result.matches) {
            res.status(result.status).send({ matches: result.matches })
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
        console.log(body);
                    
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
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const getRanking = async (_req: any, res: any) => {
    try {
        const result = await userServices.getRanking();
        if (result.ranking) {
            res.status(result.status).send({ ranking: result.ranking })
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
        if (!body.ci || !body.career) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {                        
            const result = await userServices.postCareer(body.ci, body.career);
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