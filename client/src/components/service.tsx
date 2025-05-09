import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getServiceById } from "@/services/service"; // Debes tener esta función en tu capa de servicios

type Servicio = {
  id_servicio: string;
  id_profesional: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tiempo_entrega: number;
  destacado: boolean;
};

const ServiciePage = () => {
  const { id } = useParams<{ id: string }>();
  const [servicio, setServicio] = useState<Servicio | null>(null);

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const data = await getServiceById(id!); // Asegúrate de manejar errores en producción
        setServicio(data);
      } catch (error) {
        console.error("Error al obtener el servicio:", error);
      }
    };
    fetchServicio();
  }, [id]);

  if (!servicio) {
    return <p className="text-center mt-8">Cargando servicio...</p>;
  }

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{servicio.titulo}</CardTitle>
        {servicio.destacado && (
          <Badge variant="default" className="bg-green-600 text-white mt-2">
            Destacado
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{servicio.descripcion}</p>
        <p className="text-gray-800">
          <strong>Precio:</strong> ${servicio.precio}
        </p>
        <p className="text-gray-800">
          <strong>Tiempo de entrega:</strong> {servicio.tiempo_entrega} días
        </p>
        <Button className="w-full mt-4">Solicitar este servicio</Button>
      </CardContent>
    </Card>
  );
};

export default ServiciePage;
