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
    username?: string;
    idEstadoTarea?: number;
    vencimientoTarea?: Date;
 }

export class GestionTareasService {
 

    static async obtenerTareas(): Promise<TareasResponse[] | null> {
        try {
            const respuesta = await InterceptorAuth.tarea.get<TareasResponse[]>('tareas');
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            return null;
        }
    }

    static async getTareasXUsuario(username: string | null): Promise<ApiResponse<TareasResponse[]>> {
        try {
            const response = await InterceptorAuth.tarea.get(`tareasXUsuario/${username}`);
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

    static async createTarea(tarea: Tarea): Promise<ApiResponse<string>> {
        try {
            AlternateEmailTwoTone()
            const response = await InterceptorAuth.tarea.post<ApiResponse<string>>('createTarea', tarea);
            return response.data;
        } catch (error) {
            console.error('Error al crear tarea:', error);
            return {
                meta: { message: "Error", statusCode: 500 },
                error: {
                    code: "ERROR_CREATE_TAREA",
                    description: "HUBO UN ERROR AL CREAR LA TAREA"
                }
            };
        }
    }

    static async updateTask(task: Tarea): Promise<ApiResponse<string>> {
        try {
            const response = await InterceptorAuth.tarea.put<ApiResponse<string>>('updateTarea', task);
            return response.data;
        } catch (error) {
            console.error('Error actualizando tarea:', error);
            return {
                meta: { message: "Error", statusCode: 500 },
                error: {
                    code: "ERROR_UPDATE_TAREA",
                    description: "Error al actualizar la tarea"
                }
            };
        }
     }

    static async inactivarTarea(id?: number): Promise<string | null> {
        try {
            const response = await InterceptorAuth.tarea.put(`inactivarTarea/${id}`, {});
            return response.data;
        } catch (error) {
            console.error('Error inactivando tarea:', error);
            return null;
        }
    }
}
