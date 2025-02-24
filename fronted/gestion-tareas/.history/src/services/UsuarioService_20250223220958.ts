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

    static async obtenerRolesXUser(email: string): Promise<ApiResponse<usuarioRol[]>> {
        try {
          const response = await InterceptorAuth.usuario.get<ApiResponse<usuarioRol[]>>(
            `/getRolesXUsuario/${email}`
          );
          return response.data;
        } catch (error) {
          console.error('Error:', error);
          return {
            meta: {
              statusCode: 500
            },
            data: [],
            error: {
              code: 'ERROR_GET_ROLES_X_USER',
              description: "Error"
            }
          };
        }
       }

    static async getAllUsuario(): Promise<ApiResponse<usuario[]>> {
        try {
            const response = await InterceptorAuth.usuario.get<usuario[]>(
                '/getAllUsuario'
            );
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return {
                meta: {
                  statusCode: 500
                },
                data: [],
                error: {
                  code: 'ERROR_GET_ROLES_X_USER',
                  description: "Error"
                }
              };
        }
    }





}