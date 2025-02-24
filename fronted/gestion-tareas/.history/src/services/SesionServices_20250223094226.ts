import axios from "axios";
import { AuthData, AuthService } from "./AuthService";
import { LocalStarogeService } from "./LocalStorageService";
import { ApiResponse } from "src/models/ApiResponse";
import InterceptorAuth from "./InterceptorAuth";



export interface usuarioRegister {
    id: number;
    nombre: string;
    email: string;
    password: string;
}
export class SesionServices  {
    private static readonly baseUrl = '/auth';


    public static async login(username: string, password: string): Promise<void> {
        try {
            const response = await InterceptorAuth.auth.post(`${this.baseUrl}/login`, {
                username,
                password
            });
    
            const token = response.data.token;
            const authData: AuthData = {
                token: token,
                username: username,
                isAuthenticated: true
            };
            
            AuthService.saveToken(authData);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    public static async registre(user: usuarioRegister): Promise<ApiResponse<string>> {
        try {
            const response = await InterceptorAuth.auth.post(`${this.baseUrl}`, user);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    
}