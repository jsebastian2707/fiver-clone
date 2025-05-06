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

type Profesional = {
  id_profesional: string;
  descripcion: string;
  experiencia: string;
  habilidades: string;
  calificacion_promedio: string;
  suscripcion_premium: string;
};

type Servicio = {
  id_servicio: string;
  nombre: string;
  descripcion: string;
}

interface useStore {
  user: Usuario | null;
  profesional: Profesional | null;
  servicios: Servicio[] | null;
  setUser: (user: Usuario) => void;
  delUser: () => void;
  setProfesional: (profesional: Profesional) => void;
  delProfesional: () => void;
  setServicios: (servicios: Servicio[]) => void;
}

export const useStore  = create<useStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  delUser: () => set({ user: null }),
  servicios: null,
  setServicios: (servicios) => set({ servicios }),
  profesional: null,
  setProfesional: (profesional) => set({ profesional }),
  delProfesional: () => set({ profesional: null }),
}));