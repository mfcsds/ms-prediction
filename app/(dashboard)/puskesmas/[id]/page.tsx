"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TambahPasienDialog } from "@/components/tambah-pasien-dialog"
import { Building2, Users, Activity, TrendingUp, ArrowLeft } from "lucide-react"
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
    { id: 1, nama: "Ibu Siti", usia: 28, lastCheckup: "2024-01-15", riskLevel: "low risk" },
    { id: 2, nama: "Ibu Ani", usia: 35, lastCheckup: "2024-01-14", riskLevel: "mid risk" },
    { id: 3, nama: "Ibu Dewi", usia: 42, lastCheckup: "2024-01-13", riskLevel: "high risk" },
  ]

  const getRiskColor = (risk: string) => {
    if (risk === "high risk") return "destructive"
    if (risk === "mid risk") return "default"
    return "secondary"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/puskesmas">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{puskesmas.nama}</h1>
          <p className="text-gray-500">Detail & Statistik Puskesmas</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pasien</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puskesmas.totalPasien}</div>
            <p className="text-xs text-gray-500">Pasien terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pasien Aktif</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puskesmas.pasienAktif}</div>
            <p className="text-xs text-gray-500">Sedang hamil</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risiko Tinggi</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{puskesmas.risikoTinggi}</div>
            <p className="text-xs text-gray-500">Perlu perhatian khusus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Risiko Sedang</CardTitle>
            <Building2 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{puskesmas.risikoSedang}</div>
            <p className="text-xs text-gray-500">Monitoring rutin</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Daftar Pasien</CardTitle>
            <TambahPasienDialog puskesmasId={params.id as string} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Pasien</TableHead>
                <TableHead>Usia</TableHead>
                <TableHead>Pemeriksaan Terakhir</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.nama}</TableCell>
                  <TableCell>{patient.usia} tahun</TableCell>
                  <TableCell>{patient.lastCheckup}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskColor(patient.riskLevel)}>
                      {patient.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/puskesmas/${params.id}/pasien/${patient.id}`}>
                      <Button variant="outline" size="sm">Detail</Button>
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
