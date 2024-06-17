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

export interface IMatch{
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
    dateMatch: string
}

export interface IChampionship{
    championshipName: string,
    startDate: Date,
    endDate: Date
}

export interface ITeamAdmin{
    championshipName: string
    teamName: string,
    teamGroup: string
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