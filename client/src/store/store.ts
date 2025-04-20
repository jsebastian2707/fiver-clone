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

type Servicio = {
  id_servicio: string;
  nombre: string;
  descripcion: string;
}

interface useStore {
  user: Usuario | null;
  servicios: Servicio[] | null;
  setServicios: (servicios: Servicio[]) => void;
  setUser: (user: Usuario) => void;
  delUser: () => void;
}

export const useStore  = create<useStore>((set) => ({
  user: null,
  servicios: null,
  setServicios: (servicios) => set({ servicios }),
  setUser: (user) => set({ user }),
  delUser: () => set({ user: null }),
}));