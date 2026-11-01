import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "@ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@ui/avatar"

export function AppsSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-2.5">
        <Avatar>
          <AvatarImage src="/icon.png" />
          <AvatarFallback>TD</AvatarFallback>
        </Avatar>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter className="border-t">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>O</AvatarFallback>
        </Avatar>
      </SidebarFooter>
    </Sidebar>
  )
}
