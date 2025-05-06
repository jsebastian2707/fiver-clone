const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const getToken = () => localStorage.getItem("token")

//en los servicios van todas las interacciones con la API, no se debe mezclar con la logica

export function isLoggedIn() {
  const token = getToken()
  if (!token) return false
  const payload = JSON.parse(atob(token.split(".")[1]))
  const exp = payload.exp * 1000
  return exp > Date.now()
}

export const login = async ({nombre, password}:{nombre: string,password: string}) => {
  const res = await fetch(`${API_URL}/api/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, password }),
  })

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    return data;
  } else {
    throw new Error(data.message);
  }
}

export const getProfesional = async (idUsuario: string) => {
  const res = await fetch(`${API_URL}/api/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idUsuario),
  })

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    return data;
  } else {
    throw new Error(data.message);
  }
}

export const register = async ({nombre,apellido,email,password,avatar,rol}:{nombre: string,apellido: string,email: string, password: string, avatar: string,rol: string}) => {
  const res = await fetch(`${API_URL}/api/usuarios/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({nombre,apellido,email,password,avatar,rol}),
  })
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export const getUser = async () => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/usuarios/user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await res.json();
};

export const getServices = async () => {
  const res = await fetch(`${API_URL}/api/servicios/`);
  return await res.json();
};

export const logout = () => {
  localStorage.removeItem("token"); // Remove the token from local storage
};



export const createProfesional = async ({id_profesional,descripcion,experiencia,habilidades,calificacion_promedio,suscripcion_premium}:{id_profesional: string ,descripcion: string ,experiencia: number,habilidades: string ,calificacion_promedio:DoubleRange,suscripcion_premium:boolean}) => {
  const res = await fetch(`${API_URL}/api/usuarios/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id_profesional,descripcion,experiencia,habilidades,calificacion_promedio,suscripcion_premium}),
  })
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

// export const getPerfil = async () => {
//   const res = await fetch(`${API_URL}/usuarios/perfil`, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   })
//   if (!res.ok) throw new Error("Error al obtener perfil")
//   return await res.json()
// }

// export const updatePerfil = async (datos) => {
//   const res = await fetch(`${API_URL}/usuarios/perfil`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getToken()}`,
//     },
//     body: JSON.stringify(datos),
//   })
//   if (!res.ok) throw new Error("Error al actualizar perfil")
//   return await res.json()
// }
