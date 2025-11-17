import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PasienPage() {
  const pasienList = [
    { id: 1, nama: "Ibu A", usia: 28, puskesmas: "Puskesmas Kecamatan A" },
    { id: 2, nama: "Ibu B", usia: 32, puskesmas: "Puskesmas Kecamatan B" },
    { id: 3, nama: "Ibu C", usia: 25, puskesmas: "Puskesmas Kecamatan A" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pasien</h1>
        <Button>Tambah Pasien</Button>
      </div>
      <div className="grid gap-4">
        {pasienList.map((pasien) => (
          <Card key={pasien.id}>
            <CardHeader>
              <CardTitle>{pasien.nama}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Usia: {pasien.usia} tahun</p>
              <p className="text-sm text-gray-600">{pasien.puskesmas}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
