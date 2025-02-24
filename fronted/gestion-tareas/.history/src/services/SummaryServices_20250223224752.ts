import axios from 'axios';
import { ApiResponse } from 'src/models/ApiResponse';




export interface EstadoTarea {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
}

export class SummaryService {
    private static readonly baseUrl = 'http://localhost:8700/api/summary/';

    static async obtenerSummary(): Promise<ApiResponse<EstadoTarea[]>> {
        try {
            const response = await axios.get<ApiResponse<EstadoTarea[]>>(
                this.baseUrl + 'getAllData'
            );
            return response.data;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            return {
                meta: {
                    statusCode: 500
                },
                data: [],
                error: {
                    code: 'ERROR_GET_SUMMARY',
                    description: "Error al obtener los datos"
                }
            };
        }
    }

    static async obtenerSummaryPorId(id: number): Promise<ApiResponse<EstadoTarea>> {
        try {
            const response = await axios.get<ApiResponse<EstadoTarea>>(
                this.baseUrl + `getByData/${id}`
            );
            return response.data;
        } catch (error) {
            console.error('Error al obtener la tarea:', error);
            return {
                meta: {
                    statusCode: 500
                },
                data: [],
                error: {
                    code: 'ERROR_GET_SUMMARY_BY_ID',
                    description: "Error al obtener la tarea por ID"
                }
            };
        }
    }
}


