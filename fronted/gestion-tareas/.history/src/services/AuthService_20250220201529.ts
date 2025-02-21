import axios from 'axios';
import { LocalStarogeService } from 'services/localStorageService';


interface AuthData {
    token: string;
    username: string;
 }
export class AuthService {


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
                username: username
             };
         //   console.log("creacion del TOKEN : "+JSON.stringify(authData))
            // Optionally store token in localStorage
            LocalStarogeService.save('authToken', JSON.stringify(authData));
            
            return token;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    
    public static getToken(): string {
        const token = LocalStarogeService.get('authToken') ?? "";
        console.log("desde el servicio de auth : "+token)
       // const auth = token;
        return "prueba";
     }

    
    
    public static isAuthenticated(): boolean {
        return !!this.getToken();
    }
    
    public static logout(): void {
        localStorage.removeItem('authToken');
    }
    
    public static getAuthHeader() {
        const token = this.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    

}