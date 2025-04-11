"use client"
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//import { useState } from "react"
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
//import { useAuth } from "@/hooks/use-auth" // Import the auth hook

export function NavBar() {

  // Use the auth hook to get authentication state and functions
  //const { user, logout } = useAuth()
  //const isLoggedIn = !!user

 

  // Get user initials for avatar fallback
  // const getUserInitials = () => {
  //   if (!user || !user.name) return "U"
  //   return user.name
  //     .split(" ")
  //     .map((part) => part[0])
  //     .join("")
  //     .toUpperCase()
  //     .substring(0, 2)
  // }


  const categories = [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
    "Business",
    "Lifestyle",
  ]

  return (
    <div className="container mx-auto flex h-16 items-center px-4">
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="flex flex-col gap-4">
            {categories.map((category) => (
              <Link key={category} href="#" className="text-sm font-medium transition-colors hover:text-primary">
                {category}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet> */}
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="text-xl font-bold text-green-500">FiverClone</span>
      </Link>
      <nav className="hidden md:flex md:gap-6 lg:gap-10">
        {categories.map((category) => (
          <Link key={category} to={`/${category}`} className="text-sm font-medium transition-colors hover:text-primary">
            {category}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        {isLoggedIn ? (
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
              <Button variant="ghost">Sign In</Button>
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
