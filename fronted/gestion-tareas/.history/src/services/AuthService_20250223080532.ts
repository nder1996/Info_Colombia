import useAuthStore from 'src/store/auth/useAuthStore';
import { create } from 'zustand';
import { LocalStarogeService } from './LocalStorageService';



export interface AuthData {
  token: string;
  isAuthenticated: boolean;
  username: string;
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
    const authData = JSON.parse(LocalStarogeService.get('authToken') || "");
    if (!authData) {
      return authData;
    }
    return authData;
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

