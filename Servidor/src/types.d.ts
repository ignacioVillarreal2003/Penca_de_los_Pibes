export type Room = 'Feedback' | 'MultipleChoice' | 'Brainstorming' | 'Quiz';

/* User */
export interface IUser{
    username: string,
    password: string
}