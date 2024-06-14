const sessionServices = require('../services/sessionServices');

const registerUser = async (req: any, res: any) => {
    try {
        const { body } = req;                
        if (!body.ci || !body.password || !body.username || !body.champion || !body.subChampion) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {                        
            const result = await sessionServices.registerUser(body.ci, body.password, body.username, body.champion, body.subChampion);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else if (result.token) {
                res.status(result.status).send({ token: result.token })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

const loginUser = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.ci || !body.password) {
            res.status(500).send({ message: "Error processing the request." });
        } else {
            const result = await sessionServices.loginUser(body.ci, body.password);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else if (result.token) {
                res.status(result.status).send({ token: result.token })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error processing the request." });
    }
}

const loginAdmin = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.ci || !body.password) {
            res.status(500).send({ message: "Error processing the request." });
        } else {
            const result = await sessionServices.loginAdmin(body.ci, body.password);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else if (result.token) {
                res.status(result.status).send({ token: result.token })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error processing the request." });
    }
}

module.exports = { loginUser, registerUser, loginAdmin }