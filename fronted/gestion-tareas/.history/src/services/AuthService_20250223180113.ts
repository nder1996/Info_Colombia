import useAuthStore from 'src/store/auth/useAuthStore';
import { create } from 'zustand';
import { LocalStarogeService } from './LocalStorageService';



export interface AuthData {
  token: string | null;
  isAuthenticated: boolean | null;
  username: string | null;
}


 export class AuthService {
  
  static saveToken(auth: AuthData) {
    LocalStarogeService.save('authToken', JSON.stringify(auth));
  }

  static getToken(): string {
    const authData = JSON.parse(LocalStarogeService.get('authToken') || "") ;
    return authData.token || '';
  }

  static getInfoSession(): AuthData {
    try {
      const session = LocalStorageService.get('authToken'); 
      
      if (!session || typeof session !== 'string') {
        return { token: '', isAuthenticated: false, username: '' };
      }
      const parsed = JSON.parse(session) as AuthData;
      return parsed;
    } catch {
      return { token: '', isAuthenticated: false, username: '' };
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

