import axios from "axios";
import { AuthData, AuthService } from "./AuthService";
import { LocalStarogeService } from "./LocalStorageService";
import { usuarioRegister } from "./UsuarioService";



export class SesionServices  {
    private static readonly baseUrl = 'http://localhost:8700/api/auth';


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
                isAuthenticated: true
            };
            
            AuthService.saveToken(authData);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    public static async registre(user: usuarioRegister): Promise<string> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            const response = await axios.post(`${this.baseUrl}`, user);
            LocalStarogeService.save('register user', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    
}