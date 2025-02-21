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
            const { data } = await axios.get<usuarioRol[]>(
                this.baseUrl + 'getAllData',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return data;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            return null;
        }
    }

}