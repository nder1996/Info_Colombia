import axios from 'axios';




export interface EstadoTarea {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
}

export class SummaryService {
    private static readonly baseUrl = 'http://localhost:8700/api/summary/';

    static async obtenerSummary(): Promise<EstadoTarea[] | null> {
        try {
            const { data } = await axios.get<EstadoTarea[]>(
                this.baseUrl + 'getAllData'
            );
            return data;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            return null;
        }
    }
    static async obtenerSummaryPorId(id: number): Promise<EstadoTarea | null> {
        try {
            const { data } = await axios.get<EstadoTarea>(
                this.baseUrl + `getByData/${id}`
            );
            return data;
        } catch (error) {
            console.error('Error al obtener la tarea:', error);
            return null;
        }
    }
}


