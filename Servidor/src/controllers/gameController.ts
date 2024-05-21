const gameServices = require('../services/gameServices');

const errorMessage = "Error processing the request.";

const getMatches = async (res: any) => {
    try {
        const result = await gameServices.getMatches();
        if (result) {
            res.status(result.status).send({ matches: result.matches })
        } else {
            res.status(500).send({ message: errorMessage })
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postMatchResult = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.username) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await gameServices.postMatchResult(body.username);
            if (result) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

module.exports = {
    getMatches,
    postMatchResult
}