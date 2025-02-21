import axios, { AxiosResponse } from "axios";
import { AuthService } from "./AuthService";


interface usuarioRol {
    id: number;
    idRol: number;
    idUsuario: number;
    nombreRol: string;
    nombreCompleto: string;
}
export class UsuarioService{

    private static readonly baseUrl = 'http://localhost:8700/api/usuario';

    static async obtenerRolesXUser(email: string): Promise<AxiosResponse<usuarioRol[]>> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            console.log("Token obtener roles : "+token);
            const response = await axios.get<usuarioRol[]>(
                `${this.baseUrl}/getRolesXUsuario/${email}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log("Roles del usuario obtenerRolesXUser : "+JSON.stringify(response));
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error; // Lanza el error en lugar de devolver `null`
        }
    }
    

}