import axios from 'axios';



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

export class GestionTareasService {
    private static readonly baseUrl = 'http://localhost:8700/api/tarea';
    private static readonly token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzQwMDMyNTcyLCJleHAiOjE3NDAwMzYxNzJ9.hNR9m_-RCB6nAAD7t9yFjql2pS6hRTh0_NzYwo8i-6w";

    static async obtenerTareas(): Promise<TareasResponse[] | null> {
        try {
            const respuesta = await axios.get<TareasResponse[]>(this.baseUrl + 'tareas', {
                headers: {
                    'Authorization': `${this.token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Tareas obtenidas:', JSON.stringify(respuesta) );
            return respuesta.data;
        } catch (error) {
            console.error('Error al obtener tareas:', error);
            return null; // O lanzar una excepción: throw new Error('Error al obtener tareas');
        }
    }

    static async testAxios() {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
          console.log('Test Axios Response:', response.data);
        } catch (error) {
          console.error('Error in testAxios:', error);
        }
      }
}