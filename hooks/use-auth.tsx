// import { create } from "zustand";

// // Definir el tipo de la tienda
// interface AuthState {
//   isAuthenticated: boolean;
//   token: string | null;
//   isLoading: boolean;
//   setIsAuthenticated: (value: boolean) => void;
//   setToken: (value: string | null) => void;
//   setIsLoading: (value: boolean) => void;
// }

// // Crear la tienda
// export const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: false, // Estado inicial
//   token: null,
//   isLoading: true,
//   setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
//   setToken: (value: string | null) => set({ token: value }),
//   setIsLoading: (value: boolean) => set({ isLoading: value }),
// }));

import create from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;  // Agregar el campo userId
  setToken: (token: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setUserId: (id: string) => void;  // Función para establecer el userId
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  userId: null,  // Iniciar userId como null
  setToken: (token) => set({ token }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setUserId: (id) => set({ userId: id }),  // Función para actualizar el userId
}));

