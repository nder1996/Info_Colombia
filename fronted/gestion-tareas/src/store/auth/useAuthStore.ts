import { AuthService } from 'src/services/AuthService';
import { create } from 'zustand'

type AuthState = { 
  Auth: { 
    token: string | null; 
    isAuthenticated: boolean | null; 
    username: string | null;
    rolAdmin: boolean | null;
  } 
}

type AuthStateStoreActions = {
  setAuth: (nextAuth: AuthState['Auth']) => void
}

type AuthStore = AuthState & AuthStateStoreActions;

const useAuthStore = create<AuthStore>()((set) => ({
  Auth: AuthService.getInfoSession() || { 
    token: null, 
    isAuthenticated: false, 
    username: null ,
    rolAdmin:false
  },
  setAuth: (nextAuth) => set({ Auth: nextAuth })
}));

export default useAuthStore;