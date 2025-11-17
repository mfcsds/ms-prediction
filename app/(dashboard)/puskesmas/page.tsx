"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TambahPuskesmasDialog } from "@/components/tambah-puskesmas-dialog"
import { Building2, MapPin, Phone, Mail, Clock, CheckCircle2, Search, Users } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function PuskesmasPage() {
  const [search, setSearch] = useState("")
  
  const puskesmasList = [
    { 
      id: 1, 
      nama: "Puskesmas Kecamatan A", 
      jenis: "Puskesmas",
      alamat: "Jl. Contoh No. 1, Kecamatan A",
      kabkota: "Kota Jakarta Selatan",
      provinsi: "DKI Jakarta",
      penanggungJawab: "Dr. Ahmad Suryadi",
      jabatan: "Kepala Puskesmas",
      telp: "021-12345678",
      email: "puskesmas.a@example.com",
      jamOperasional: "Senin-Jumat 07.00-15.00",
      status: "Active",
      totalPasien: 45,
      highRisk: 5,
      midRisk: 15,
      lowRisk: 25
    },
    { 
      id: 2, 
      nama: "Puskesmas Kecamatan B", 
      jenis: "Puskesmas",
      alamat: "Jl. Contoh No. 2, Kecamatan B",
      kabkota: "Kota Jakarta Timur",
      provinsi: "DKI Jakarta",
      penanggungJawab: "Dr. Siti Nurhaliza",
      jabatan: "Kepala Puskesmas",
      telp: "021-87654321",
      email: "puskesmas.b@example.com",
      jamOperasional: "Senin-Sabtu 08.00-16.00",
      status: "Active",
      totalPasien: 32,
      highRisk: 3,
      midRisk: 10,
      lowRisk: 19
    },
    { 
      id: 3, 
      nama: "Klinik Bersalin Harapan", 
      jenis: "Rumah Bersalin",
      alamat: "Jl. Contoh No. 3, Kecamatan C",
      kabkota: "Kota Tangerang",
      provinsi: "Banten",
      penanggungJawab: "Bidan Dewi Lestari",
      jabatan: "Bidan Koordinator",
      telp: "021-55556666",
      email: "klinik.harapan@example.com",
      jamOperasional: "24 Jam",
      status: "Active",
      totalPasien: 18,
      highRisk: 2,
      midRisk: 6,
      lowRisk: 10
    },
  ]

  const filtered = puskesmasList.filter(p => 
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.alamat.toLowerCase().includes(search.toLowerCase()) ||
    p.kabkota.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Puskesmas</h1>
          <p className="text-gray-600 mt-1">Kelola data fasilitas kesehatan</p>
        </div>
        <TambahPuskesmasDialog />
      </div>
      
      <div className="relative">
        <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
        <Input 
          placeholder="Cari puskesmas, alamat, atau kota..." 
          className="pl-12 h-12 rounded-xl shadow-md border-0 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {filtered.map((puskesmas) => (
          <Link key={puskesmas.id} href={`/puskesmas/${puskesmas.id}`}>
            <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white hover:scale-[1.01]">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl h-fit shadow-md">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{puskesmas.nama}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{puskesmas.jenis}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">{puskesmas.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-700">{puskesmas.alamat}</p>
                    <p className="text-gray-500">{puskesmas.kabkota}, {puskesmas.provinsi}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{puskesmas.telp}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{puskesmas.email}</span>
                  </div>
                </div>
                <div className="flex gap-2 text-sm md:col-span-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{puskesmas.jamOperasional}</span>
                </div>
                <div className="text-sm md:col-span-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Penanggung Jawab:</span> {puskesmas.penanggungJawab} ({puskesmas.jabatan})
                  </p>
                </div>
                <div className="md:col-span-2 pt-3 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-2 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-blue-700">{puskesmas.totalPasien} Pasien Terdaftar</span>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full font-medium">● High: {puskesmas.highRisk}</span>
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full font-medium">● Mid: {puskesmas.midRisk}</span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">● Low: {puskesmas.lowRisk}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Tidak ada puskesmas ditemukan</p>
        </div>
      )}
    </div>
  )
}
