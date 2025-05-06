
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
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { createProfesional } from "@/services/service";
import { useStore } from "@/store/store";
const profesionalSchema = z.object({
  descripcion: z.string().min(1, "Descripción requerida"),
  experiencia: z.number().min(1, "Experiencia requerida"),
  habilidades: z.string().min(1, "Habilidades requeridas"),
  suscripcion_premium: z.boolean().optional(),
});

export default function BecomeSellerPage() {
  const user = useStore((state) => state.user);
  const form = useForm<z.infer<typeof profesionalSchema>>({
    resolver: zodResolver(profesionalSchema),
    defaultValues: {
      descripcion: "",
      experiencia: 5,
      habilidades: "",
      suscripcion_premium: false,
    },
  });

  async function onSubmit(values: z.infer<typeof profesionalSchema>) {
    try {
      const data = {
        ...values,
        id_profesional: user?.id_usuario ?? "0",
        calificacion_promedio: 0.0 as DoubleRange,
        suscripcion_premium: !!values.suscripcion_premium,
      };
      await createProfesional(data);
      toast.success("¡Ahora eres vendedor!");
    } catch (error) {
      toast.error("Error al registrarte como vendedor"+error);
    }
  }

  return (
    <Card className="mx-auto mt-10 w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <CardHeader>
        <CardTitle>Conviértete en vendedor</CardTitle>
        <CardDescription>Completa tu perfil profesional</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Experto en producción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experiencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Años de experiencia</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. 5" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="habilidades"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilidades</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. producción comercial, edición" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="suscripcion_premium"
              render={({ field }) => (
                <FormItem>
                  <div
                    className={`flex justify-between items-center border p-4 rounded-xl transition-all ${
                      field.value ? "bg-yellow-100 border-yellow-500" : "bg-gray-50"
                    }`}
                  >
                    <div>
                      <FormLabel className="text-lg font-medium">
                        Activar cuenta Premium
                      </FormLabel>
                      <p className="text-sm text-gray-500">
                        Obtén visibilidad destacada, más herramientas y beneficios exclusivos.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Crear perfil profesional</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
