import axios from "axios";
import { AuthService } from "./AuthService";
import { LocalStarogeService } from "./LocalStorageService";
import { ApiResponse } from "src/models/ApiResponse";



export interface usuarioRol {
    id: number;
    idRol: number;
    idUsuario: number;
    nombreRol: string;
    nombreCompleto: string;
}

export interface usuario {
    id: number;
    nombre: string;
    email: string;
}



export interface AuthData {
    token: string;
    username: string;
}
export class UsuarioService {

    private static readonly baseUrl = 'http://localhost:8700/api/usuario';

    static async obtenerRolesXUser(email: string): Promise<ApiResponse<usuarioRol[]> | null> {
        try {
            const response = await axios.get<usuarioRol[]>(
                `${this.baseUrl}/getRolesXUsuario/${email}`
            );
            return response;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    static async getAllUsuario(): Promise<ApiResponse<usuario[]> | null> {
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





}