import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <AppSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  )
}
