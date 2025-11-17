"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function TambahPuskesmasDialog() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tambah Puskesmas</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Data Puskesmas</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Informasi Dasar Institusi</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Institusi *</Label>
                <Input id="nama" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenis">Jenis Institusi *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="puskesmas">Puskesmas</SelectItem>
                    <SelectItem value="klinik">Klinik</SelectItem>
                    <SelectItem value="rumah-bersalin">Rumah Bersalin</SelectItem>
                    <SelectItem value="rsia">RSIA</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kode">Kode Institusi</Label>
                <Input id="kode" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Informasi Lokasi</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="provinsi">Provinsi *</Label>
                <Input id="provinsi" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kabkota">Kabupaten/Kota *</Label>
                <Input id="kabkota" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kecamatan">Kecamatan</Label>
                <Input id="kecamatan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kodepos">Kode Pos</Label>
                <Input id="kodepos" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="alamat">Alamat Lengkap *</Label>
                <Textarea id="alamat" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lat">Koordinat Latitude</Label>
                <Input id="lat" type="number" step="any" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Koordinat Longitude</Label>
                <Input id="lng" type="number" step="any" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Informasi Kontak</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="penanggung-jawab">Nama Penanggung Jawab *</Label>
                <Input id="penanggung-jawab" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jabatan">Jabatan Penanggung Jawab *</Label>
                <Input id="jabatan" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telp-pj">Nomor Telepon PJ *</Label>
                <Input id="telp-pj" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-pj">Email PJ *</Label>
                <Input id="email-pj" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telp-institusi">Telepon Institusi *</Label>
                <Input id="telp-institusi" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-institusi">Email Institusi</Label>
                <Input id="email-institusi" type="email" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Informasi Operasional</h3>
            <div className="space-y-2">
              <Label htmlFor="jam-operasional">Jam Operasional</Label>
              <Input id="jam-operasional" placeholder="Senin-Jumat 07.00-15.00" />
            </div>
            <div className="space-y-2">
              <Label>Fasilitas yang Tersedia</Label>
              <div className="grid gap-2 md:grid-cols-2">
                {["Rawat Jalan", "Laboratorium", "IGD", "KIA / ANC", "Poli Umum", "Poli Kebidanan", "Lainnya"].map((f) => (
                  <div key={f} className="flex items-center space-x-2">
                    <Checkbox id={f} />
                    <label htmlFor={f} className="text-sm">{f}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
