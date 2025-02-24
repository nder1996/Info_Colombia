import axios from "axios";
import { AuthData, AuthService } from "./AuthService";



export class SesionServices  {
    private static readonly baseUrl = 'http://localhost:8700/api/auth';


    public static async login(username: string, password: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/login`, {
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
            return JSON.stringify(authData);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
}