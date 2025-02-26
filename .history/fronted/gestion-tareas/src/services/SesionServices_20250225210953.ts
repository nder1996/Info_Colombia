import axios from "axios";
import { AuthData, AuthService } from "./AuthService";
import { LocalStarogeService } from "./localStorageService";
import { ApiResponse } from "src/models/ApiResponse";
import { UsuarioService } from "./UsuarioService";



export interface usuarioRegister {
    id: number;
    nombre: string;
    email: string;
    password: string;
}
export class SesionServices {
    private static readonly baseUrl = 'https://info-colombia.onrender.com/api/auth';


    public static async login(username: string, password: string): Promise<void> {
        try {
            const response = await axios.post(`${this.baseUrl}/login`, {
                username,
                password
            });
            const token = response.data.token;
            const authData: AuthData = {
                token: token,
                username: username,
                isAuthenticated: true,
                rolAdmin:false
            };
            await AuthService.saveToken(authData);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    public static async registre(user: usuarioRegister): Promise<ApiResponse<string>> {
        try {
            const response = await axios.post(`${this.baseUrl}/register`, user);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }


}