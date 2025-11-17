"use client"

import { Home, Building2, Users, LogOut, Heart } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Puskesmas", url: "/puskesmas", icon: Building2 },
  { title: "Pasien", url: "/pasien", icon: Users },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0 shadow-lg">
      <SidebarContent className="bg-gradient-to-b from-blue-50 to-purple-50">
        <SidebarGroup>
          <div className="px-4 py-6 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Maternal Status</h2>
            </div>
            <p className="text-xs text-gray-600 pl-11">Prediction System</p>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200">
                    <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gradient-to-b from-purple-50 to-pink-50 border-t">
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200">
              <Link href="/login" className="flex items-center gap-3 px-3 py-2">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
