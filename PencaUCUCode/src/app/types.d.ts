/* User */
export interface IRegister{
    username: string,
    ci: string
    password: string,
    champion: string,
    subChampion: string
}

export interface ILogin{
    ci: string
    password: string
}

export interface IMatch{
    team1: string,
    team2: string,
    scoreTeam1: number,
    scoreTeam2: number,
    date: Date,
    group: string,
    stage: string,
    location: string,
    hour: string,
    championshipName: string
}

export interface IRanking {
    username: string,
    score: number
}

export interface IChampionship{
    championshipName: string,
    startDate: Date,
    endDate: Date
}

export interface ITeam{
    championshipName: string,
    teamName: string
}

export interface IResult {
    team1: string,
    team2: string,
    scoreTeam1: number,
    scoreTeam2: number,
    championshipName: string
}




export interface IChampionshipAdmin {
    championshipName: string,
    startDate: Date,
    endDate: Date
}

export interface ITeamAdmin {
    teamName: string
}

export interface IMatchAdmin {
    team1: string,
    team2: string,
    date: Date,
    group: string,
    stage: string,
    location: string,
}

export interface IResultAdmin {
    team1: string,
    team2: string,
    scoreTeam1: number,
    scoreTeam2: number,
}