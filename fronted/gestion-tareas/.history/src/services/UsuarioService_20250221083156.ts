import axios from "axios";
import { AuthService } from "./AuthService";
import { LocalStarogeService } from 'services/localStorageService';

interface usuarioRol {
    id: number;
    idRol: number;
    idUsuario: number;
    nombreRol: string;
    nombreCompleto: string;
}
interface usuario {
    id: number;
    nombre: string;
    email: string;
}
interface usuarioRegister {
    id: number;
    nombre: string;
    email: string;
}
interface AuthData {
    token: string;
    username: string;
 }
export class UsuarioService {

    private static readonly baseUrl = 'http://localhost:8700/api/usuario';

    static async obtenerRolesXUser(email: string): Promise<usuarioRol[] | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            //console.log("Token obtener roles : " + token);
            const response = await axios.get<usuarioRol[]>(
                `${this.baseUrl}/getRolesXUsuario/${email}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async getAllUsuario(): Promise<usuario[] | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
           // console.log("Token obtener roles : " + token);
            const response = await axios.get<usuario[]>(
                `${this.baseUrl}/getAllUsuario`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

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

    public static async registre(username: string, password: string): Promise<string> {
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



}