export type Room = 'Feedback' | 'MultipleChoice' | 'Brainstorming' | 'Quiz';

/* User */
export interface IRegister{
    username: string,
    ci: string
    password: string,
    champion: string,
    runnerUp: string
}

export interface ILogin{
    ci: string
    password: string
}

export interface IMatch{
    team1: string,
    team2: string,
    shieldTeam1: string,
    shieldTeam2: string,
    scoreTeam1: number,
    scoreTeam2: number,
    date: Date,
    group: string,
    stage: string
}

export interface IRanking{
    username: string,
    score: number
}

export interface IChampionship{
    championshipName: string,
    startDate: Date,
    endDate
}

export interface ITeam{
    teamName: string,
    country: string,
}

export interface IResult{
    match: IMatch,
    scoreTeam1: number,
    scoreTeam2: number
}