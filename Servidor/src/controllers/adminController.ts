const adminServices = require('../services/adminService');

const postChampionshipAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.startDate || !body.endDate) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postChampionshipAdmin(body.championshipName, body.startDate, body.endDate);
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

const postCountryAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.teamName) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postTeamAdmin(body.teamName);
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

const postTeamAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.teamName || !body.group) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postTeamAdmin(body.championshipName, body.teamName, body.group);
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

const postMatchAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.team1 || !body.team2 || !body.date || !body.group || !body.stage || !body.location) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postMatchAdmin(body.championshipName, body.team1, body.team2, body.date, body.group, body.stage, body.location);
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

const postResultAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.team1 || !body.team2 || !body.scoreTeam1 || !body.scoreTeam2) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postResultAdmin(body.championshipName, body.team1, body.team2, body.scoreTeam1, body.scoreTeam2);
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

const getChampionshipsAdmin = async (_req: any, res: any) => {
    try {
        const result = await adminServices.getChampionshipsAdmin();
        if (result.message) {
            res.status(result.status).send({ message: result.message })
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

const getMatchesAdmin = async (req: any, res: any) => {
    try {
        const championshipName = req.params.championshipName;
        if (!championshipName) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.getMatchesAdmin(championshipName);
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

const getResultsAdmin = async (req: any, res: any) => {
    try {
        const championshipName = req.params.championshipName;
        if (!championshipName) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.getResultsAdmin(championshipName);
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