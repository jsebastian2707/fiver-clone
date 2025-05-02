import { useForm } from "react-hook-form";
import { register } from "@/services/service";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shuffle } from "lucide-react";
import { useNavigate } from "react-router";
//import { useStore } from "@/store/store";

const registerSchema = z.object({
  nombre: z.string().min(1).min(1).max(10),
  apellido: z.string().min(1).min(1).max(10),
  email: z.string(),
  password: z.string().min(1).max(10),
  avatar: z.string().min(1),
  rol: z.string(),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  //const setUser = useStore((state) => state.setUser);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      avatar: "",
      rol: "",
    },
  });
  const avatarPreview = form.watch("avatar");

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await register(values)
        .then(() => {
          navigate("/");
          toast.success("ingreso exitoso!");
        });
    } catch (error) {
      console.error("Form submission error :", error);
      toast.error("" + error);
    }
  }

  return (
    <Card className="mx-auto mt-10 w-full max-w-sm bg-white shadow-md rounded-lg p-6">
      <CardHeader>
        <CardTitle className="text-2xl">Registrarse</CardTitle>
        <CardDescription>
          Ingresa tus datos para crear una cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className={"grid grid-cols-12 gap-4"}>
              <div className={"col-span-6"}>
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="nombre" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="apellido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>apellido </FormLabel>
                      <FormControl>
                        <Input placeholder="apellido" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {avatarPreview && (
              <div className="mt-4">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="h-20 w-20 rounded-md object-cover"
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>avatar</FormLabel>
                  <FormControl>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input placeholder="avatar" type="text" {...field} />
                      <Button
                        type="button"
                        onClick={() =>
                          form.setValue(
                            "avatar",
                            `https://picsum.photos/200?random=${Date.now()}`
                          )
                        }
                      >
                        <Shuffle />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Eres vendedor o cliente?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vendedor">vendedor</SelectItem>
                    <SelectItem value="cliente">cliente</SelectItem>
                  </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{"Registrarse"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
