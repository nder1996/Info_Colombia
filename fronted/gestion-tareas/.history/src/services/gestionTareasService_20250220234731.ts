import axios from 'axios';
import { AuthService } from 'services/AuthService';


export interface EstadoTarea {
    id: number;
    nombre: string;
}

export interface Usuario {
    id: number;
    nombre: string;
}

export interface TareasResponse {
    id: number;
    estadoTarea: EstadoTarea;
    usuario: Usuario;
    titulo: string;
    descripcion: string;
    createAt: Date;
    updateAt: Date;
    estado: string;
    vencimientoTarea: Date;
}

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    idUsuario: string;
    idEstadoTarea: number;
    vencimientoTarea: Date;
}

export class GestionTareasService {
    private static readonly baseUrl = 'http://localhost:8700/api/tarea/';
    //private static readonly token = AuthService.getToken();

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



    static async testAxios() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            // console.log('Test Axios Response:', response.data);
        } catch (error) {
            console.error('Error in testAxios:', error);
        }
    }

    static async createTarea(tarea: Tarea): Promise<string | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            console.log("token crear tarea : " + JSON.stringify(token));
            const response = await axios.post(this.baseUrl + 'createTarea', tarea, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear tarea:', error);
            return null;
        }
    }

    static async updateTask(task: Tarea): Promise<string | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            const response = await axios.put(this.baseUrl + 'updateTarea', task, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
    }

    static async inactivarTarea(id: number): Promise<string | null> {
        try {
            console.log("ENTRO token inactivar tarea : ");
            const token = AuthService.getToken()?.replace(/"/g, '');
            console.log("token inactivar tarea : " + JSON.stringify(token));
            const response = await axios.put(this.baseUrl + 'inactivarTarea', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error inactivando tarea:', error);
            return null;
        }
    }
}

