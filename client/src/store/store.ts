import { create } from 'zustand';

type Usuario = {
  id_usuario: string;
  nombre: string;
  apellido: string;
  avatar: string;
  email: string;
  rol: string;
  fecha_registro: string;
};

interface useStore {
  user: Usuario | null;
  setUser: (user: Usuario) => void;
  delUser: () => void;
}

export const useStore  = create<useStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  delUser: () => set({ user: null }),
}));