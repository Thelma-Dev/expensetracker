
export interface User {
    id: string;
    username: string;
    income: number;
    email: string;
    passwordHash: string;
    createdAt: Date;
}