import axios from "axios";
import { AuthService } from "./AuthService";


interface usuarioRol {
    id: number;
    idRol: number;
    idUsuario: number;
    nombreRol: string;
    nombreCompleto: string;
}
export class UsuarioService{

    private static readonly baseUrl = 'http://localhost:8700/api/Usuario/';

    static async obtenerRolesXUser(email: string): Promise<usuarioRol[] | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            console.log("Token obtener roles : "+JSON.stringify(token));
            const response = await axios.get<usuarioRol[]>(
                `${this.baseUrl}/Usuario/getRolesXUsuario/${email}`,
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