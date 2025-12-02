"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Building2, MapPin, Phone, Clock, Plus, Loader2, Building, User, Mail, MapPinned, Navigation } from "lucide-react"

export function TambahPuskesmasDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationError, setLocationError] = useState("")

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Browser tidak mendukung geolokasi")
      return
    }

    setIsGettingLocation(true)
    setLocationError("")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6))
        setLongitude(position.coords.longitude.toFixed(6))
        setIsGettingLocation(false)
      },
      (error) => {
        setIsGettingLocation(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Izin lokasi ditolak")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Lokasi tidak tersedia")
            break
          case error.TIMEOUT:
            setLocationError("Waktu permintaan habis")
            break
          default:
            setLocationError("Gagal mendapatkan lokasi")
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setOpen(false)
  }

  const fasilitas = [
    { id: "rawat-jalan", label: "Rawat Jalan", icon: "🏥" },
    { id: "laboratorium", label: "Laboratorium", icon: "🔬" },
    { id: "igd", label: "IGD", icon: "🚑" },
    { id: "kia-anc", label: "KIA / ANC", icon: "👶" },
    { id: "poli-umum", label: "Poli Umum", icon: "🩺" },
    { id: "poli-kebidanan", label: "Poli Kebidanan", icon: "🤰" },
    { id: "lainnya", label: "Lainnya", icon: "➕" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 px-6 font-medium gap-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <Plus className="h-4 w-4" />
          Tambah Puskesmas
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[85vw] max-w-none sm:max-w-none max-h-[85vh] overflow-y-auto p-0">
        {/* Header dengan gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              Tambah Data Puskesmas
            </DialogTitle>
            <DialogDescription className="text-blue-100">
              Lengkapi informasi puskesmas atau fasilitas kesehatan baru
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Grid 2 kolom untuk sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section: Informasi Dasar */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 transition-all hover:border-blue-200 hover:bg-blue-50/30">
              <div className="flex items-center gap-2 text-blue-700">
                <Building className="h-5 w-5" />
                <h3 className="font-semibold text-base">Informasi Dasar Institusi</h3>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="nama" className="text-sm font-medium text-slate-700">
                    Nama Institusi <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="nama" 
                    placeholder="Contoh: Puskesmas Kecamatan Menteng"
                    className="h-10 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jenis" className="text-sm font-medium text-slate-700">
                    Jenis Institusi <span className="text-red-500">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-10 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Pilih jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="puskesmas">🏥 Puskesmas</SelectItem>
                      <SelectItem value="klinik">🏨 Klinik</SelectItem>
                      <SelectItem value="rumah-bersalin">👶 Rumah Bersalin</SelectItem>
                      <SelectItem value="rsia">🏩 RSIA</SelectItem>
                      <SelectItem value="lainnya">📋 Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kode" className="text-sm font-medium text-slate-700">
                    Kode Institusi
                  </Label>
                  <Input 
                    id="kode" 
                    placeholder="PKM-001"
                    className="h-10 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section: Informasi Lokasi */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 transition-all hover:border-green-200 hover:bg-green-50/30">
              <div className="flex items-center gap-2 text-green-700">
                <MapPin className="h-5 w-5" />
                <h3 className="font-semibold text-base">Informasi Lokasi</h3>
              </div>
              <div className="grid gap-4 grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="provinsi" className="text-sm font-medium text-slate-700">
                    Provinsi <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="provinsi" 
                    placeholder="DKI Jakarta"
                    className="h-10 rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kabkota" className="text-sm font-medium text-slate-700">
                    Kabupaten/Kota <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="kabkota" 
                    placeholder="Jakarta Pusat"
                    className="h-10 rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kecamatan" className="text-sm font-medium text-slate-700">
                    Kecamatan
                  </Label>
                  <Input 
                    id="kecamatan" 
                    placeholder="Menteng"
                    className="h-10 rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kodepos" className="text-sm font-medium text-slate-700">
                    Kode Pos
                  </Label>
                  <Input 
                    id="kodepos" 
                    placeholder="10310"
                    className="h-10 rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="alamat" className="text-sm font-medium text-slate-700">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="alamat" 
                    placeholder="Alamat lengkap institusi..."
                    className="min-h-[60px] rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500 transition-colors resize-none"
                    required 
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <MapPinned className="h-3.5 w-3.5" />
                      Koordinat GPS
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGetCurrentLocation}
                      disabled={isGettingLocation}
                      className="h-8 text-xs gap-1.5 text-green-700 border-green-300 hover:bg-green-50 hover:border-green-400"
                    >
                      {isGettingLocation ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Mencari...
                        </>
                      ) : (
                        <>
                          <Navigation className="h-3 w-3" />
                          Gunakan Lokasi Saat Ini
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      id="lat" 
                      type="number" 
                      step="any" 
                      placeholder="Latitude: -6.175110"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="h-10 rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                    />
                    <Input 
                      id="lng" 
                      type="number" 
                      step="any" 
                      placeholder="Longitude: 106.865039"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="h-10 rounded-lg border-slate-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                    />
                  </div>
                  {locationError && (
                    <p className="text-xs text-red-500">{locationError}</p>
                  )}
                  <p className="text-xs text-slate-500">Klik tombol di atas untuk otomatis mengisi koordinat dari lokasi Anda saat ini</p>
                </div>
              </div>
            </div>

            {/* Section: Informasi Kontak */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 transition-all hover:border-orange-200 hover:bg-orange-50/30">
              <div className="flex items-center gap-2 text-orange-700">
                <Phone className="h-5 w-5" />
                <h3 className="font-semibold text-base">Informasi Kontak</h3>
              </div>
              
              {/* Penanggung Jawab */}
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <div className="flex items-center gap-2 mb-3 text-slate-600">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Penanggung Jawab</span>
                </div>
                <div className="grid gap-3 grid-cols-4">
                  <div className="space-y-1">
                    <Label htmlFor="penanggung-jawab" className="text-xs font-medium text-slate-700">
                      Nama <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="penanggung-jawab" 
                      placeholder="dr. Ahmad"
                      className="h-9 rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="jabatan" className="text-xs font-medium text-slate-700">
                      Jabatan <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="jabatan" 
                      placeholder="Kepala Puskesmas"
                      className="h-9 rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="telp-pj" className="text-xs font-medium text-slate-700">
                      Telepon <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="telp-pj" 
                      type="tel" 
                      placeholder="08123456789"
                      className="h-9 rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email-pj" className="text-xs font-medium text-slate-700 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="email-pj" 
                      type="email" 
                      placeholder="pj@email.go.id"
                      className="h-9 rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Kontak Institusi */}
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <div className="flex items-center gap-2 mb-3 text-slate-600">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">Kontak Institusi</span>
                </div>
                <div className="grid gap-3 grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="telp-institusi" className="text-xs font-medium text-slate-700">
                      Telepon <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="telp-institusi" 
                      type="tel" 
                      placeholder="(021) 3456789"
                      className="h-9 rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email-institusi" className="text-xs font-medium text-slate-700 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email
                    </Label>
                    <Input 
                      id="email-institusi" 
                      type="email" 
                      placeholder="info@puskesmas.go.id"
                      className="h-9 rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Informasi Operasional */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 transition-all hover:border-purple-200 hover:bg-purple-50/30">
              <div className="flex items-center gap-2 text-purple-700">
                <Clock className="h-5 w-5" />
                <h3 className="font-semibold text-base">Informasi Operasional</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jam-operasional" className="text-sm font-medium text-slate-700">
                    Jam Operasional
                  </Label>
                  <Input 
                    id="jam-operasional" 
                    placeholder="Senin-Jumat 07.00-15.00, Sabtu 07.00-12.00"
                    className="h-10 rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500 transition-colors"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Fasilitas yang Tersedia</Label>
                  <div className="grid gap-2 grid-cols-4">
                    {fasilitas.map((f) => (
                      <div 
                        key={f.id} 
                        className="flex items-center space-x-2 p-2 rounded-lg border border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer group"
                      >
                        <Checkbox 
                          id={f.id} 
                          className="border-slate-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <label 
                          htmlFor={f.id} 
                          className="text-xs font-medium text-slate-700 cursor-pointer flex items-center gap-1 group-hover:text-purple-700 transition-colors"
                        >
                          <span>{f.icon}</span>
                          {f.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="h-11 px-6 rounded-lg border-slate-300 hover:bg-slate-100 transition-colors"
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button 
              type="submit"
              className="h-11 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Data"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
