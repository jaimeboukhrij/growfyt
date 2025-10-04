export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
export declare const APP_NAME = "Growfit";
