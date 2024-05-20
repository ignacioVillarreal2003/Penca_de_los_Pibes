export type Room = 'Feedback' | 'MultipleChoice' | 'Brainstorming' | 'Quiz';

/* User */
export interface IUser{
    username: string,
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