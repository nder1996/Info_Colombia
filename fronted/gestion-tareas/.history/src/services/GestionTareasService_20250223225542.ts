import { ApiResponse } from 'src/models/ApiResponse';
import InterceptorAuth from './InterceptorAuth';

export interface EstadoTarea {
    id?: number;
    nombre?: string;
 }
 
 export interface Usuario {
    id?: number;
    nombre?: string;
 }
 
 export interface TareasResponse {
    id?: number;
    estadoTarea?: EstadoTarea;
    usuario?: Usuario;
    titulo?: string;
    descripcion?: string;
    createAt?: Date;
    updateAt?: Date;
    estado?: string;
    vencimientoTarea?: Date;
 }
 
 export interface Tarea {
    id?: number;
    titulo?: string;
    descripcion?: string;
    idUsuario?: string;
    idEstadoTarea?: number;
    vencimientoTarea?: Date;
 }

export class GestionTareasService {
    private static readonly api = InterceptorAuth.tarea; // Usa la instancia con los interceptores

    static async obtenerTareas(): Promise<TareasResponse[] | null> {
        try {
            const respuesta = await this.api.get<TareasResponse[]>('tareas');
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            return null;
        }
    }

    static async getTareasXUsuario(username: string | null): Promise<ApiResponse<TareasResponse[]>> {
        try {
            const response = await this.api.get(`tareasXUsuario/${username}`);
            return response.data;
        } catch (error:any) {
            console.error('Error fetching tareas:', error);
            return {
                meta: { message: "Error", statusCode: 500 },
                data: [],
                error: { 
                    code: "ERROR_TAREAS",
                    description: error.message
                }
            };
        }
    }

    static async createTarea(tarea: Tarea): Promise<string | null> {
        try {
            const response = await this.api.post('createTarea', tarea);
            return response.data;
        } catch (error) {
            console.error('Error al crear tarea:', error);
            return null;
        }
    }

    static async updateTask(task: Tarea): Promise<string | null> {
        try {
            const response = await this.api.put('updateTarea', task);
            return response.data;
        } catch (error) {
            console.error('Error actualizando tarea:', error);
            return null;
        }
    }

    static async inactivarTarea(id?: number): Promise<string | null> {
        try {
            const response = await this.api.put(`inactivarTarea/${id}`, {});
            return response.data;
        } catch (error) {
            console.error('Error inactivando tarea:', error);
            return null;
        }
    }
}
