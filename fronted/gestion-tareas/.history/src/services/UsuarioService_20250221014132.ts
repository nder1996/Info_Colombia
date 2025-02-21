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

    private static readonly baseUrl = 'http://localhost:8700/api/usuario';

    static async obtenerRolesXUser(email: string): Promise<any> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            return await axios.get(
                `${this.baseUrl}/getRolesXUsuario/${email}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
        } catch (error) {
            return null;
        }
    }
    

}