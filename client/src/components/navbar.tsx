"use client"
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect } from "react"
import { Bell, Heart, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { isLoggedIn } from "@/service/service"

export function NavBar() {

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
  

  useEffect(() => {
    if(isLoggedIn()){
    //   const user = JSON.parse(localStorage.getItem("user") || "{}")
    //   if(user){
    //     setUser(user)
    //   }
     }
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
        {!isLoggedIn() ? (
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
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name || "My Account"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard" className="flex items-center w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button variant="secondary">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Join</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
