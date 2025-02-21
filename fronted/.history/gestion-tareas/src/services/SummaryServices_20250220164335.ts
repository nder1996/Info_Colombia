import axios from 'axios';
import { AuthService } from 'services/AuthService';

export class GestionTareasService {
    private static readonly baseUrl = 'http://localhost:8700/api/summary/';

    static async obtenerTareas(): Promise<TareasResponse[] | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
          //  console.log("Token: ", token);
            const respuesta = await axios.get<TareasResponse[]>(this.baseUrl + 'tareas', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
           // console.log('Tareas obtenidas:', JSON.stringify(respuesta) );
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            return null; // O lanzar una excepción: throw new Error('Error al obtener tareas');
        }
    }
}