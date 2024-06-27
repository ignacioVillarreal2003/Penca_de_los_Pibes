const adminServices = require('../services/adminService');
const { setChampionship, getChampionship } = require('../variables');

export const getChampionshipsAdmin = async (_req: any, res: any) => {
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

export const postWinners = async (_req: any, res: any) => {
    try {        
        const result = await adminServices.postWinners();
        if (result.message) {
            res.status(result.status).send({ message: result.message })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const postChampionshipAdmin = async (req: any, res: any) => {
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

export const activeChampionship = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            setChampionship(body.championshipName);
            return res.status(200).send({ message: "Campeonato activado." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const getTeamsAdmin = async (req: any, res: any) => {
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

export const getAllTeamsAdmin = async (_req: any, res: any) => {
    try {
        const result = await adminServices.getAllTeamsAdmin();
        if (result.teams) {
            res.status(result.status).send({ teams: result.teams })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const postTeamAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.teamName || !body.teamGroup) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postTeamAdmin(body.championshipName, body.teamName, body.teamGroup);
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

export const addTeamAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.teamName) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.addTeamAdmin(body.teamName);
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

export const getMatchesAdmin = async (req: any, res: any) => {
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

export const postMatchAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.championshipName || !body.team1 || !body.team2 || !body.date || !body.stage || !body.location) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postMatchAdmin(body.championshipName, body.team1, body.team2, body.date, body.stage, body.location);
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

export const getResultsAdmin = async (req: any, res: any) => {
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

export const postResultAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;        
        if (!body.championshipName || !body.team1 || !body.team2) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postResultAdmin(body.scoreTeam1, body.scoreTeam2, body.championshipName, body.team1, body.team2);
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

export const postChampionshipEnd = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (getChampionship() == null || !body.champion || !body.subchampion) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {
            const result = await adminServices.postChampionSubchampion(getChampionship(), body.champion, body.subchampion);
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

export const scoreReset = async (_req: any, res: any) => {
    try {
        const result = await adminServices.scoreReset();
        if (result.message) {
            res.status(result.status).send({ message: result.message })
        } else {
            res.status(500).send({ message: "Error procesando los datos." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error procesando los datos." });
    }
}