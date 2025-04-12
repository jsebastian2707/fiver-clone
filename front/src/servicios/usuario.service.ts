const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const getToken = () => localStorage.getItem("token")

interface loginParams {
  nombre: string,
  password: string
} 

export const login = async ({nombre, password}:loginParams) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, password }),
  })
  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    return await res.json()
  } else {
    throw new Error(data.message);
  }
}

const getAvatar = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/usuarios/avatar`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await res.json();
};

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
