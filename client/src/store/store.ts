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
  usuario: Usuario | null;
  setUser: (user: Usuario) => void;
  delUser: () => void;
}

export const useStore  = create<useStore>((set) => ({
  usuario: null,
  setUser: (usuario) => set({ usuario }),
  delUser: () => set({ usuario: null }),
}));