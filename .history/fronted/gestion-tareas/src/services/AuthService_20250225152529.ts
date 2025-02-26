import useAuthStore from 'src/store/auth/useAuthStore';
import { create } from 'zustand';
import { LocalStarogeService } from './localStorageService';
import { UsuarioService } from './UsuarioService';




export interface AuthData {
  token: string | null;
  isAuthenticated: boolean | null;
  username: string | null;
  rolAdmin: boolean | null;
}


export class AuthService {


  static async saveToken(auth: AuthData) {
    try {
      if (!auth?.username) return;
      
      // Initial save
      LocalStarogeService.save('authToken', JSON.stringify(auth));
      
      // Get role info
      const rol = await UsuarioService.obtenerRolesXUser(auth.username);
      
      // Parse existing data before updating
      const storedAuth = JSON.parse(LocalStarogeService.get('authToken') ?? "");
      
      storedAuth.rolAdmin = rol?.meta?.statusCode == 200 && 
                          Array.isArray(rol.data) ? 
                          rol.data.some(role => role.id == 1) : 
                          false;
      
      // Save updated object
      LocalStarogeService.remove('authToken');
      LocalStarogeService.save('authToken', JSON.stringify(storedAuth));
      
    } catch (error) {
      console.error('Error al guardar token:', error);
    }
  }

  static getToken(): string {
    const authData = JSON.parse(LocalStarogeService.get('authToken') || "");

    return authData.token || '';
  }

  static getInfoSession(): AuthData {
    try {
      const session = LocalStarogeService.get('authToken');
      if (!session || typeof session !== 'string') {
        return { token: '', isAuthenticated: false, username: '', rolAdmin: false };
      }
      const parsed: AuthData = JSON.parse(session);
      // console.log("informacion de session cargada " + JSON.stringify(parsed));
      return {
        token: parsed.token || '',
        isAuthenticated: !!parsed.token,
        username: parsed.username || '',
        rolAdmin: !!parsed.rolAdmin
      };

    } catch {
      return { token: '', isAuthenticated: false, username: '', rolAdmin: false };
    }
  }
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static logout(): void {
    localStorage.removeItem('authToken');
    //useAuthStore.getState().clearAuth();
  }

  static getAuthHeader() {
    const token = this.getToken()?.replace(/"/g, '');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

