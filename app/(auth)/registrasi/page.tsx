"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"

export default function RegistrasiPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-3">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl text-center font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Registrasi Akun
          </CardTitle>
          <p className="text-center text-sm text-gray-600">Buat akun baru Anda</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama" className="text-sm font-medium">Nama Lengkap</Label>
              <Input id="nama" type="text" required className="h-11 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" required className="h-11 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input id="password" type="password" required className="h-11 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm font-medium">Konfirmasi Password</Label>
              <Input id="confirm" type="password" required className="h-11 rounded-lg" />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg font-medium"
            >
              Daftar
            </Button>
            <p className="text-center text-sm">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Masuk Sekarang
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
