const adminServices = require('../services/adminService');

const postChampionshipAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.startDate || !body.endDate) {            
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postChampionshipAdmin(body.championshipName, body.startDate, body.endDate);
            if (result.championshipName) {
                res.status(result.status).send({ championshipName: result.championshipName })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const postCountryAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.teamName) {            
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {            
            const result = await adminServices.postCountryAdmin(body.teamName);
            if (result.teamName) {                
                res.status(result.status).send({ teamName: result.teamName })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const postTeamAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.teamName || !body.group) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postTeamAdmin(body.championshipName, body.teamName, body.group);
            if (result.championshipName) {
                res.status(result.status).send({ championshipName: result.championshipName })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const postMatchAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.team1 || !body.team2 || !body.date || !body.stage || !body.location) {            
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postMatchAdmin(body.championshipName, body.team1, body.team2, body.date, body.stage, body.location);
            if (result.championshipName) {
                res.status(result.status).send({ championshipName: result.championshipName })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const postResultAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.team1 || !body.team2 || !body.scoreTeam1 || !body.scoreTeam2 || !body.dateMatch) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postResultAdmin(body.scoreTeam1, body.scoreTeam2, body.championshipName, body.team1, body.team2, body.dateMatch);
            if (result.championshipName) {
                res.status(result.status).send({ championshipName: result.championshipName })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const getChampionshipsAdmin = async (_req: any, res: any) => {
    try {
        const result = await adminServices.getChampionshipsAdmin();
        if (result.championships) {
            res.status(result.status).send({ championships: result.championships })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const getTeamsAdmin = async (req: any, res: any) => {
    try {
        const championshipName = req.params.championshipName;
        if (!championshipName) {  
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.getTeamsAdmin(championshipName);
            if (result.teams) {
                res.status(result.status).send({ teams: result.teams })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const getMatchesAdmin = async (req: any, res: any) => {
    try {
        const championshipName = req.params.championshipName;
        if (!championshipName) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.getMatchesAdmin(championshipName);
            if (result.matches) {
                res.status(result.status).send({ matches: result.matches })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const getResultsAdmin = async (req: any, res: any) => {
    try {
        const championshipName = req.params.championshipName;
        if (!championshipName) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.getResultsAdmin(championshipName);
            if (result.results) {
                res.status(result.status).send({ results: result.results })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
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