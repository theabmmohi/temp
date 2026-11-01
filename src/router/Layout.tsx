import { SidebarProvider, SidebarInset, SidebarTrigger } from "@ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/avatar"
import { AppsSidebar } from "@/components/AppSidebar"
import { Outlet, Link } from "react-router"
import { buttonVariants } from "@ui/button"
import { useAuth } from "@util/auth"

export function Layout() {
  const { user } = useAuth.getState()

  return (
    <SidebarProvider>
      <AppsSidebar />
      <SidebarInset>
        <header className="flex items-center border-b sticky top-0 bg-background p-2 select-none">
          <SidebarTrigger />
          <Link to="/" className="font-mono">
            {import.meta.env.VITE_APP_NAME}
          </Link>
          <div className="flex justify-end flex-1">
            {user ? (
              <Avatar>
                <AvatarImage />
                <AvatarFallback>O</AvatarFallback>
              </Avatar>
            ) : (
              <>
                <Link to="/register" className={buttonVariants({ variant: "outline" })}>
                  Register
                </Link>
                <Link to="/login" className={buttonVariants()}>
                  Login
                </Link>
              </>
            )}
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
