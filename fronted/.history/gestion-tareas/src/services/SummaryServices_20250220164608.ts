import axios from 'axios';
import { AuthService } from 'services/AuthService';



interface EstadoTarea {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
}



export class GestionTareasService {
    private static readonly baseUrl = 'http://localhost:8700/api/summary/';


    static async obtenerTareas(): Promise<EstadoTarea[] | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            const respuesta = await axios.get<EstadoTarea[]>(this.baseUrl + 'getAllData', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            return null;
        }
    }

    static async obtenerTareaPorId(id: number): Promise<EstadoTarea | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            const respuesta = await axios.get<EstadoTarea>(this.baseUrl + `getByData/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener la tarea:', error);
            return null;
        }
    }





}