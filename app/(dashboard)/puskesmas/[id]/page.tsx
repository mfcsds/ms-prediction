"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TambahPasienDialog } from "@/components/tambah-pasien-dialog"
import { Users, Activity, TrendingUp, ArrowLeft, Search, Calendar, Baby, Phone, AlertTriangle, Filter, Heart, Stethoscope, CalendarClock, FileText, Printer } from "lucide-react"
import { useRef, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function PuskesmasDetailPage() {
  const params = useParams()
  
  const puskesmas = {
    id: params.id,
    nama: "Puskesmas Kecamatan A",
    totalPasien: 45,
    pasienAktif: 32,
    risikoTinggi: 5,
    risikoSedang: 12,
    risikoRendah: 15
  }

  const patients = [
    { 
      id: 1, 
      nama: "Siti Nurhaliza", 
      nik: "3201234567890001",
      usia: 28, 
      telp: "081234567890",
      alamat: "Jl. Merdeka No. 10, Menteng",
      usiaKehamilan: 24,
      trimester: 2,
      hpl: "2025-04-15",
      gravida: 2,
      para: 1,
      lastCheckup: "2024-01-15", 
      riskLevel: "low",
      riskFactors: []
    },
    { 
      id: 2, 
      nama: "Ani Wijaya", 
      nik: "3201234567890002",
      usia: 35, 
      telp: "081234567891",
      alamat: "Jl. Sudirman No. 25, Tanah Abang",
      usiaKehamilan: 32,
      trimester: 3,
      hpl: "2025-02-20",
      gravida: 3,
      para: 2,
      lastCheckup: "2024-01-14", 
      riskLevel: "medium",
      riskFactors: ["Usia > 35 tahun", "Riwayat Hipertensi"]
    },
    { 
      id: 3, 
      nama: "Dewi Lestari", 
      nik: "3201234567890003",
      usia: 42, 
      telp: "081234567892",
      alamat: "Jl. Gatot Subroto No. 5, Setiabudi",
      usiaKehamilan: 28,
      trimester: 3,
      hpl: "2025-03-10",
      gravida: 4,
      para: 3,
      lastCheckup: "2024-01-13", 
      riskLevel: "high",
      riskFactors: ["Usia > 40 tahun", "Preeklampsia", "Diabetes Gestasional"]
    },
    { 
      id: 4, 
      nama: "Ratna Sari", 
      nik: "3201234567890004",
      usia: 25, 
      telp: "081234567893",
      alamat: "Jl. Thamrin No. 15, Gambir",
      usiaKehamilan: 12,
      trimester: 1,
      hpl: "2025-07-05",
      gravida: 1,
      para: 0,
      lastCheckup: "2024-01-12", 
      riskLevel: "low",
      riskFactors: []
    },
    { 
      id: 5, 
      nama: "Maya Putri", 
      nik: "3201234567890005",
      usia: 38, 
      telp: "081234567894",
      alamat: "Jl. Rasuna Said No. 8, Kuningan",
      usiaKehamilan: 20,
      trimester: 2,
      hpl: "2025-05-25",
      gravida: 2,
      para: 1,
      lastCheckup: "2024-01-10", 
      riskLevel: "medium",
      riskFactors: ["Anemia"]
    },
  ]

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">🔴 Risiko Tinggi</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">🟡 Risiko Sedang</Badge>
      default:
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">🟢 Risiko Rendah</Badge>
    }
  }

  const getTrimesterBadge = (trimester: number) => {
    const colors = {
      1: "bg-blue-100 text-blue-700",
      2: "bg-purple-100 text-purple-700",
      3: "bg-pink-100 text-pink-700"
    }
    return <Badge className={`${colors[trimester as keyof typeof colors]} hover:${colors[trimester as keyof typeof colors]}`}>Trimester {trimester}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/puskesmas">
            <Button variant="outline" size="icon" className="rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{puskesmas.nama}</h1>
            <p className="text-slate-500 text-sm">Detail & Monitoring Pasien Ibu Hamil</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Pasien</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{puskesmas.totalPasien}</div>
            <p className="text-xs text-slate-500 mt-1">Ibu hamil terdaftar</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pasien Aktif</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{puskesmas.pasienAktif}</div>
            <p className="text-xs text-slate-500 mt-1">Sedang dalam monitoring</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Risiko Tinggi</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{puskesmas.risikoTinggi}</div>
            <p className="text-xs text-slate-500 mt-1">Perlu perhatian khusus</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Risiko Sedang</CardTitle>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{puskesmas.risikoSedang}</div>
            <p className="text-xs text-slate-500 mt-1">Monitoring rutin</p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Info Section */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Distribusi Trimester */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Baby className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-base">Distribusi Trimester</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Trimester 1</span>
                <span className="font-semibold">{patients.filter(p => p.trimester === 1).length} pasien</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${(patients.filter(p => p.trimester === 1).length / patients.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Trimester 2</span>
                <span className="font-semibold">{patients.filter(p => p.trimester === 2).length} pasien</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${(patients.filter(p => p.trimester === 2).length / patients.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Trimester 3</span>
                <span className="font-semibold">{patients.filter(p => p.trimester === 3).length} pasien</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-500 rounded-full transition-all"
                  style={{ width: `${(patients.filter(p => p.trimester === 3).length / patients.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HPL Terdekat */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-pink-600" />
              <CardTitle className="text-base">HPL Terdekat</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patients
                .sort((a, b) => new Date(a.hpl).getTime() - new Date(b.hpl).getTime())
                .slice(0, 4)
                .map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-pink-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <span className="text-xs font-semibold text-pink-600">
                          {patient.nama.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{patient.nama}</p>
                        <p className="text-xs text-slate-500">G{patient.gravida}P{patient.para} • {patient.usiaKehamilan} minggu</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-pink-600">{patient.hpl}</p>
                      <p className="text-xs text-slate-500">
                        {Math.ceil((new Date(patient.hpl).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari lagi
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Pasien Risiko Tinggi */}
        <Card className="hover:shadow-md transition-shadow border-red-100">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              <CardTitle className="text-base">Perlu Perhatian Khusus</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patients
                .filter(p => p.riskLevel === 'high' || p.riskLevel === 'medium')
                .slice(0, 4)
                .map((patient) => (
                  <div key={patient.id} className="p-2 rounded-lg bg-slate-50 hover:bg-red-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-800">{patient.nama}</p>
                      {patient.riskLevel === 'high' ? (
                        <Badge className="bg-red-100 text-red-700 text-[10px] px-1.5">Tinggi</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700 text-[10px] px-1.5">Sedang</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {patient.riskFactors.map((factor, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 text-slate-600 rounded">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              {patients.filter(p => p.riskLevel === 'high' || p.riskLevel === 'medium').length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">Tidak ada pasien berisiko tinggi</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ringkasan Faktor Risiko */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-base">Ringkasan Faktor Risiko</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {(() => {
              const allFactors = patients.flatMap(p => p.riskFactors)
              const factorCounts = allFactors.reduce((acc, factor) => {
                acc[factor] = (acc[factor] || 0) + 1
                return acc
              }, {} as Record<string, number>)
              
              return Object.entries(factorCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([factor, count]) => (
                  <div key={factor} className="p-3 rounded-lg bg-orange-50 border border-orange-100 text-center">
                    <p className="text-2xl font-bold text-orange-600">{count}</p>
                    <p className="text-xs text-slate-600 mt-1">{factor}</p>
                  </div>
                ))
            })()}
            {patients.flatMap(p => p.riskFactors).length === 0 && (
              <p className="text-sm text-slate-500 col-span-full text-center py-4">Tidak ada faktor risiko tercatat</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-slate-50/50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Baby className="h-5 w-5 text-pink-600" />
              <CardTitle className="text-lg">Daftar Pasien Ibu Hamil</CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Cari nama atau NIK..." 
                  className="pl-9 w-full sm:w-64 h-10 rounded-lg"
                />
              </div>
              {/* Filter Risiko */}
              <Select>
                <SelectTrigger className="w-full sm:w-40 h-10 rounded-lg">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Risiko" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="high">Risiko Tinggi</SelectItem>
                  <SelectItem value="medium">Risiko Sedang</SelectItem>
                  <SelectItem value="low">Risiko Rendah</SelectItem>
                </SelectContent>
              </Select>
              {/* Filter Trimester */}
              <Select>
                <SelectTrigger className="w-full sm:w-40 h-10 rounded-lg">
                  <SelectValue placeholder="Trimester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="1">Trimester 1</SelectItem>
                  <SelectItem value="2">Trimester 2</SelectItem>
                  <SelectItem value="3">Trimester 3</SelectItem>
                </SelectContent>
              </Select>
              <TambahPasienDialog puskesmasId={params.id as string} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="font-semibold">Pasien</TableHead>
                <TableHead className="font-semibold">Kontak</TableHead>
                <TableHead className="font-semibold">Kehamilan</TableHead>
                <TableHead className="font-semibold">HPL</TableHead>
                <TableHead className="font-semibold">Status Risiko</TableHead>
                <TableHead className="font-semibold">Pemeriksaan Terakhir</TableHead>
                <TableHead className="font-semibold text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-800">{patient.nama}</p>
                      <p className="text-xs text-slate-500">{patient.usia} tahun • NIK: {patient.nik.slice(-4)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Phone className="h-3.5 w-3.5" />
                      {patient.telp}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        {getTrimesterBadge(patient.trimester)}
                        <span className="text-sm text-slate-600">{patient.usiaKehamilan} minggu</span>
                      </div>
                      <p className="text-xs text-slate-500">G{patient.gravida}P{patient.para}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-slate-700">{patient.hpl}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      {getRiskBadge(patient.riskLevel)}
                      {patient.riskFactors.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {patient.riskFactors.slice(0, 2).map((factor, idx) => (
                            <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                              {factor}
                            </span>
                          ))}
                          {patient.riskFactors.length > 2 && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                              +{patient.riskFactors.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{patient.lastCheckup}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/puskesmas/${params.id}/pasien/${patient.id}`}>
                      <Button variant="outline" size="sm" className="rounded-lg hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200">
                        Lihat Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
