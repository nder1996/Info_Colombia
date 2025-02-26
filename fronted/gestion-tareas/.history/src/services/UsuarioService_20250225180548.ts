import axios from "axios";
import { AuthService } from "./AuthService";
import { LocalStarogeService } from "./localStorageService";
import { ApiResponse } from "src/models/ApiResponse";
import InterceptorAuth from "./InterceptorAuth";
import { usuarioRegister } from "./SesionServices";



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

 export interface usuarioConRol {
  id?: number;
  nombre?: string;
  email?: string;
  fechaRegistro?: Date;
  estado?: string;
  idRol?: number;
  password?:string | undefined;
  Rol?: string;
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
          const response = await InterceptorAuth.usuario.get<ApiResponse<usuario[]>>(
            '/getAllUsuario'
          );
          return response.data;
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error:', error.message);
          }
          return {
            meta: {
              statusCode: 500
            },
            data: [],
            error: {
              code: 'ERROR_GETALL_USUARIO',
              description: "Error"
            }
          };
        }
       }

       
       static async getAllUsuariosConRol(): Promise<ApiResponse<usuarioConRol[]>> {
        try {
          const response = await InterceptorAuth.usuario.get<ApiResponse<usuario[]>>(
            '/getAllUsuariosConRol'
          );
          return response.data;
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error:', error.message);
          }
          return {
            meta: {
              statusCode: 500
            },
            data: [],
            error: {
              code: 'ERROR_GETALL_USUARIO',
              description: "Error"
            }
          };
        }
       }


      static async actualizarUsuario(request: usuarioConRol): Promise<ApiResponse<string>> {
        try {
          const response = await InterceptorAuth.usuario.put<ApiResponse<string>>(
            '/actualizar',
            request
          );
          return response.data;
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error:', error.message);
          }
          return {
            meta: {
              statusCode: 500
            },
            data: "",
            error: {
              code: 'ERROR_UPDATE_USUARIO',
              description: "Error al actualizar usuario"
            }
          };
        }
      }

      static async inactivarUsuario(email?: string): Promise<ApiResponse<string>> {
        try {
          const response = await InterceptorAuth.usuario.put<ApiResponse<string>>(
            `/inactivar/${email}`
          );
          //alert("inactivar usuario : "+JSON.stringify(response.data));
          return response.data;
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error:', error.message);
          }
          return {
            meta: {
              statusCode: 500
            },
            data: "",
            error: {
              code: 'ERROR_INACTIVAR_USUARIO',
              description: "Error al inactivar usuario"
            }
          };
        }
      }

      
      static async crearUsuario(usuario: usuarioConRol): Promise<ApiResponse<string>> {
        try {
          console.log("crear usuario : "+JSON.stringify(usuario));
          //alert("crear usuario : "+JSON.stringify(usuario));
          const response = await InterceptorAuth.usuario.post<ApiResponse<string>>(
            '/crear',
            usuario
          );
          alert("crear usuario : "+JSON.stringify(response.data));
          return response.data;
        } catch (error) {
          console.error('Error al crear usuario:', error);
          return {
            meta: { statusCode: 500 },
            data: undefined,
            error: {
              code: 'ERROR_CREAR_USUARIO',
              description: "Error al crear usuario"
            }
          };
        }
       }
}