/* Login */
export interface ILogin{
    ci: string
    password: string
}

export interface IRegister extends ILogin{
    username: string,
    champion: string,
    subChampion: string
}

/* User */
export interface ITeamUser{
    teamName: string
}

export interface ICareerUser{
    career: string
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

/* Admin */
export interface IChampionshipAdmin{
    championshipName: string,
    startDate: string,
    endDate: string
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
    dateMatch: string
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