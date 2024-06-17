export interface ILogin{
    ci: string
    password: string
}

export interface IRegister extends ILogin{
    username: string,
    champion: string,
    subChampion: string
}

export interface ITeam{
    teamName: string
}

export interface IRanking{
    username: string,
    score: number
}

export interface IMatchUser{
    team1: string,
    team2: string,
    scoreTeam1: number,
    scoreTeam2: number,
    stage: string,
    location: string,
    championshipName1: string,
    championshipName2: string,
    teamGroup1: string,
    teamGroup2: string,
    dateMatch: Date
}

export interface IChampionship{
    championshipName: string,
    startDate: Date,
    endDate: Date
}

export interface IMatchAdmin{
    team1: string,
    team2: string,
    scoreTeam1: number,
    scoreTeam2: number,
    stage: string,
    location: string,
    championshipName1: string,
    championshipName2: string,
    teamGroup1: string,
    teamGroup2: string,
    dateMatch: Date
}

export interface IResult{
    team1: string,
    team2: string,
    scoreTeam1: number,
    scoreTeam2: number,
    championshipName1: string,
    championshipName2: string,
    dateMatch: string,
    location: string,
    stage: string,

}



export interface ICareer {
    career: string
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