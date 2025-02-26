import { ApiResponse } from 'src/models/ApiResponse';
import InterceptorAuth from './InterceptorAuth';




export interface EstadoTarea {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
}

export interface Rol {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
}

export class SummaryService {

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
    
    static async obtenerSummaryRol(): Promise<ApiResponse<Rol[]>> {
        try {
            const response = await InterceptorAuth.summary.get<ApiResponse<Rol[]>>('getAllRoles');
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return {
                meta: {
                    statusCode: 500
                },
                data: [],
                error: {
                    code: 'ERROR_GET_SUMMARY_ROL',
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

    static async obtenerRolPorId(id: number): Promise<ApiResponse<Rol>> {
        try {
            const response = await InterceptorAuth.summary.get<ApiResponse<Rol>>(`getByDataRol/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return {
                meta: {
                    statusCode: 500
                },
                data: undefined,
                error: {
                    code: 'ERROR_GET_ROL',
                    description: "Error"
                }
            };
        }
    }
}


