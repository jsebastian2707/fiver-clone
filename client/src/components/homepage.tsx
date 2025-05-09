import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { getServices } from "@/services/service";
import { Link } from "react-router";

export function HomePage() {
  const user = useStore((state) => state.user);
  const servicios = useStore((state) => state.servicios);
  const setServicios = useStore((state) => state.setServicios);
  const [search, setSearch] = useState("");

  const fetchServices = async () => {
    const servicios = await getServices();
    setServicios(servicios);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const serviciosFiltrados =
    search == ""
      ? servicios
      : servicios?.filter((servicio) => {
          return servicio.titulo.toLowerCase().includes(search.toLowerCase());
        });

  return (
    <>
      {!user ? (
        <div className="relative h-140 overflow-hidden mb-6 flex flex-col justify-end px-16">
          <div
            className="absolute inset-0 bg-right -z-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          ></div>
          <h1 className="text-5xl text-white align-bottom font-bold mb-4">
            Hacemos realidad lo que imaginas.
          </h1>
          <p className="text-xl text-white align-bottom mb-6">
            Descubre todos los servicios que tenemos disponible.
          </p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 w-full p-2 border border-gray-300 rounded"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviciosFiltrados?.map((servicio) => (
              <Link to={`/service/${servicio.id_servicio}`} key={servicio.id_servicio} className={`rounded-lg p-4 border hover:shadow-lg transition ${
                    servicio.destacado
                      ? "bg-green-100 border-green-400"
                      : "bg-white shadow-md"
                  }`}>
                  <h2 className="text-xl font-semibold mb-2">
                    {servicio.titulo}
                  </h2>
                  <p className="text-gray-600 mb-2">{servicio.descripcion}</p>
                  <p className="text-sm text-gray-800">
                    <strong>Precio:</strong> ${servicio.precio}
                  </p>
                  <p className="text-sm text-gray-800">
                    <strong>Tiempo de entrega:</strong> {servicio.tiempo_entrega}{" "}
                    días
                  </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
