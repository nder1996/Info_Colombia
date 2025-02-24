import axios from 'axios';
import { ApiResponse } from 'src/models/ApiResponse';
import InterceptorAuth from './InterceptorAuth';




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
            const response = await InterceptorAuth.summary.get<ApiResponse<EstadoTarea[]>>('getAllData');
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return {
                meta: {
                    statusCode: 500
                },
                data: [],
                error: {
                    code: 'ERROR_GET_SUMMARY',
                    description: "Error"
                }
            };
        }
    }

    static async obtenerSummaryPorId(id: number): Promise<ApiResponse<EstadoTarea>> {
        try {
            const response = await InterceptorAuth.summary.get<ApiResponse<EstadoTarea>>(`getByData/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return {
                meta: {
                    statusCode: 500
                },
                data: undefined,
                error: {
                    code: 'ERROR_GET_SUMMARY',
                    description: "Error"
                }
            };
        }
    }
}


