import { useForm } from "react-hook-form";
import { login , getUser} from "@/services/service";
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useStore } from "@/store/store"

const loginSchema = z.object({
  nombre: z.string().min(1).max(10),
  password: z.string().min(1).max(10),
})

export default function LoginPage() {
  //const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const form = useForm<z.infer<typeof loginSchema >>({
    resolver: zodResolver(loginSchema)
  });

  
  async function onSubmit(values: z.infer<typeof loginSchema >) {
    try {
      await login(values).then(async () => {
        const user = await getUser();
        setUser(user);
      }).then(() => {
        toast.success("Login successful!");
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Card className="mx-auto mt-10 w-full max-w-sm bg-white shadow-md rounded-lg p-6">
      <CardHeader>
        <CardTitle className="text-2xl">{"Entrar"}</CardTitle>
        <CardDescription>
          "Enter your name below to login to your account"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <div>
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
            </div>
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
            <Button type="submit">{ "Entrar" }</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
