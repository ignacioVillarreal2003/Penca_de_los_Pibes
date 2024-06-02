import { Time } from "@angular/common";

export type Room = 'Feedback' | 'MultipleChoice' | 'Brainstorming' | 'Quiz';

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
    hour: Time,
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