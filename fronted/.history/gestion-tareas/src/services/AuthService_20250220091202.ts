import axios from 'axios';
import { storage } from 'services/localStorageService';

export class AuthService {


    private static readonly baseUrl = 'http://localhost:8700/api/auth';
    
    public static async login(username: string, password: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/login`, {
                username,
                password
            });
            
            const token = response.data.token;
            // Optionally store token in localStorage
            localStorage.setItem('authToken', token);
            
            return token;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    
    public static getToken(): string | null {
        return localStorage.getItem('authToken');
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