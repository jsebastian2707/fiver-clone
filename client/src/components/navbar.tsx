"use client"
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect } from "react"
import { Bell, Heart, MessageSquare, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { isLoggedIn , getUser} from "@/services/service"
import { useStore } from "@/store/store"

export function NavBar() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const delUser = useStore((state) => state.delUser);

  const getUserInitials = () => {
    if (!user) return "U"
    const names = user.nombre.split(" ")
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0]
  }

  const categories = [
    "Gráficos y Diseño",
    "Marketing Digital",
    "Redacción y Traducción",
    "Video y Animación",
    "Música y Audio",
    "Programación y Tecnología",
    "Negocios",
    "Estilo de Vida",
  ]

  const fetchUser = async () => {
    if (isLoggedIn()) {
      const user = await getUser();
      setUser(user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto flex h-16 items-center px-4">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="text-xl font-bold text-green-500">River</span>
      </Link>
      <nav className="md:flex md:gap-6 lg:gap-10">
        {categories.map((category) => (
          <Link key={category} to={`/${category}`} className="text-sm font-medium transition-colors hover:text-primary">
            {category}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        {isLoggedIn() ? (
          <>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favorites</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                      alt={user?.nombre || "User"}
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.nombre || "My Account"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex items-center w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => delUser()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="secondary">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button>Registrarse</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
