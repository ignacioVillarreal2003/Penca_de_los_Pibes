import { IUser } from "../types";

const users = require('../database/users');
const matches = require('../database/matches');

const errorMessage = "Error in the service when processing the request.";

const getMatches = async () => {
    try {
        const result = await matches.getMatches();
        if (result) {
            return { status: 200, matches: result };
        } else {
            return { status: 400, message: "The room code is incorrect." };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postMatchResult = async (username: string) => {
    try {
        const existingUser: IUser = await users.getUser(username);
        if (!existingUser) {
            return { status: 400, message: "The user does not exist." };
        } else {
            const result = await matches.postMatchResult(username);
            if (result) {
                return { status: 200, message: "The room has been published." };
            }
            return { status: 500, message: errorMessage };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

module.exports = {
    getMatches,
    postMatchResult
}