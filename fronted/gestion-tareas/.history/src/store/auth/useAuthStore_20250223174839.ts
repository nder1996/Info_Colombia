import { create } from 'zustand'

type AuthState = { Auth: { token: string | null ; isAuthenticated: boolean ; username:string | null } }

type AuthStateStoreActions = {
  setAuth: (nextAuth: AuthState['Auth']) => void
}

type AuthStore = AuthState & AuthStateStoreActions;

const useAuthStore = create<AuthStore>()((set) => ({
  Auth: AuthService.getInfoSession() || { 
    token: null, 
    isAuthenticated: false, 
    username: null 
  },
  setAuth: (nextAuth) => set({ Auth: nextAuth })
}));

export default useAuthStore;




//export default useAuthStore;