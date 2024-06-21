const sessionServices = require('../services/sessionServices');

export const registerUser = async (req: any, res: any) => {
    try {
        const { body } = req;                        
        if (!body.ci || !body.password || !body.username || !body.champion || !body.subChampion) {
            return res.status(500).send({ message: "Error procesando los datos." });
        } else {                        
            const result = await sessionServices.registerUser(body.ci, body.password, body.username, body.champion, body.subChampion);            
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else if (result.token && result.user) {
                res.status(result.status).send({ token: result.token, user: result.user })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error procesando los datos." });
    }
}

export const loginUser = async (req: any, res: any) => {
    try {
        const { body } = req;                
        if (!body.ci || !body.password) {            
            res.status(500).send({ message: "Error processing the request." });
        } else {
            const result = await sessionServices.loginUser(body.ci, body.password);            
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else if (result.token && result.user) {
                res.status(result.status).send({ token: result.token, user: result.user })
            } else {
                res.status(500).send({ message: "Error procesando los datos." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error processing the request." });
    }
}

export const loginAdmin = async (req: any, res: any) => {
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