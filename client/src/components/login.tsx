import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { login } from "@/services/service";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const loginSchema = z.object({
  nombre: z.string().min(1).max(10),
  contraseña: z.string().min(1).max(10),
})

const registerSchema = z.object({
  nombre: z.string().min(1).min(1).max(10),
  apellido: z.string().min(1).min(1).max(10),
  email: z.string(),
  contraseña: z.string().min(1).max(10),
  avatar: z.string().min(1),
  profesional: z.boolean(),
  experiencia: z.string(),
});

export default function AuthePage() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const form = useForm<z.infer<typeof loginSchema | typeof registerSchema>>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema)
  });

  useEffect(() => {
    form.reset({
      profesional: false,
    });
  }, [location, form]);

  function onSubmit(values: z.infer<typeof loginSchema | typeof registerSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Card className="mx-auto mt-10 w-full max-w-sm bg-white shadow-md rounded-lg p-6">
      <CardHeader>
        <CardTitle className="text-2xl">{isLogin ? "Entrar" : "Registrarse"}</CardTitle>
        <CardDescription>
          {isLogin ? "Enter your name below to login to your account" : "Enter your email below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className={!isLogin ? "grid grid-cols-12 gap-4" : ""}>
              <div className={!isLogin ? "col-span-6" : ""}>
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
              {!isLogin && (
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="apellido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>apellido </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="apellido"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            {!isLogin && (
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
            )}
            <FormField
              control={form.control}
              name="contraseña"
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
            {!isLogin && (
              <>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>avatar</FormLabel>
                      <FormControl>
                        <Input placeholder="avatar" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profesional"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>profesional</FormLabel>
                        <FormDescription>
                          es usted un profesional o quiere vender sus servicios
                          en la plataforma
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {form.watch("profesional") && (
              <FormField
                control={form.control}
                name="experiencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>experiencia</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="experiencia"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>experiencia</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit">{isLogin ? "Entrar" : "Registrarse"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
