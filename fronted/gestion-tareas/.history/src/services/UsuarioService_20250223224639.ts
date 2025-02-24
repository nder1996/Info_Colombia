import axios from "axios";
import { AuthService } from "./AuthService";
import { LocalStarogeService } from "./LocalStorageService";
import { ApiResponse } from "src/models/ApiResponse";
import InterceptorAuth from "./InterceptorAuth";



export interface usuarioRol {
    id?: number;
    idRol?: number;
    idUsuario?: number;
    nombreRol?: string;
    nombreCompleto?: string;
 }
 
 export interface usuario {
    id?: number;
    nombre?: string;
    email?: string;
 }
 
 export interface AuthData {
    token?: string;
    username?: string;
 }
export class UsuarioService {

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
            data: null,
            error: {
                code: 'ERROR_GET_SUMMARY_BY_ID',
                description: "Error al obtener la tarea por ID"
            }
        };
    }
}





}