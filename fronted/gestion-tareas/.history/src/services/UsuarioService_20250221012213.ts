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

    static async obtenerRolesXUser(): Promise<usuarioRol[] | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            const response = await axios.get<usuarioRol[]>(
                `${this.baseUrl}/Usuario/getRolesXUsuario/admin@sistema.com`,
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