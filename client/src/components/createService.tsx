import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createService } from "@/services/service";
import { useStore } from "@/store/store";

const serviceSchema = z.object({
  titulo: z.string().min(1, "Título requerido"),
  descripcion: z.string().min(1, "Descripción requerida"),
  precio: z.number().min(1, "Precio requerido"),
  tiempo_entrega: z.number().min(1, "Tiempo de entrega requerido"),
});

export default function CreateServicePage() {
  const profesional = useStore((state) => state.profesional);

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      precio: 50,
      tiempo_entrega: 3,
    },
  });

  async function onSubmit(values: z.infer<typeof serviceSchema>) {
    if (!profesional) {
      toast.error("Debes ser profesional para crear un servicio");
      return;
    }

    try {
      const data = {
        ...values,
        id_profesional: parseInt(profesional.id_profesional),
        estado: "activo",
        destacado: profesional.suscripcion_premium,
      };
      await createService(data);
      toast.success("Servicio creado exitosamente");
      form.reset();
    } catch (error) {
      toast.error("Error al crear servicio: " + error);
      console.error(error);
    }
  }

  return (
    <Card className="mx-auto mt-10 w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <CardHeader>
        <CardTitle>Crear nuevo servicio</CardTitle>
        <CardDescription>
          Completa los campos para publicar tu servicio
        </CardDescription>
        {profesional?.suscripcion_premium && (
          <Badge variant="default" className="bg-green-600 text-white mt-2">
            Destacado
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Desarrollo web moderno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe el servicio ofrecido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="precio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio (USD)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiempo_entrega"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiempo de entrega (días)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Crear servicio
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
