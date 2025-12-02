"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { User, Heart, Baby, Calendar, Phone, MapPin, Plus, Loader2, AlertTriangle, Stethoscope, FileText } from "lucide-react"

export function TambahPasienDialog({ puskesmasId }: { puskesmasId: string }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setOpen(false)
  }

  const riwayatKomplikasi = [
    { id: "preeklampsia", label: "Preeklampsia" },
    { id: "diabetes-gestasional", label: "Diabetes Gestasional" },
    { id: "anemia", label: "Anemia" },
    { id: "hipertensi", label: "Hipertensi" },
    { id: "perdarahan", label: "Perdarahan" },
    { id: "keguguran", label: "Riwayat Keguguran" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl shadow-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 h-11 px-6 font-medium gap-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <Plus className="h-4 w-4" />
          Tambah Pasien
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[85vw] max-w-none sm:max-w-none max-h-[85vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Baby className="h-6 w-6" />
              Tambah Data Pasien Ibu Hamil
            </DialogTitle>
            <DialogDescription className="text-pink-100">
              Lengkapi data pasien untuk monitoring maternal status
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section: Data Pribadi */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 transition-all hover:border-pink-200 hover:bg-pink-50/30">
              <div className="flex items-center gap-2 text-pink-700">
                <User className="h-5 w-5" />
                <h3 className="font-semibold text-base">Data Pribadi</h3>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="nama" className="text-sm font-medium text-slate-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="nama" 
                    placeholder="Nama lengkap pasien"
                    className="h-10 rounded-lg border-slate-200 focus:border-pink-500 focus:ring-pink-500"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nik" className="text-sm font-medium text-slate-700">
                    NIK <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="nik" 
                    placeholder="16 digit NIK"
                    maxLength={16}
                    className="h-10 rounded-lg border-slate-200 focus:border-pink-500 focus:ring-pink-500"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tgl-lahir" className="text-sm font-medium text-slate-700">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="tgl-lahir" 
                    type="date"
                    className="h-10 rounded-lg border-slate-200 focus:border-pink-500 focus:ring-pink-500"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goldar" className="text-sm font-medium text-slate-700">
                    Golongan Darah
                  </Label>
                  <Select>
                    <SelectTrigger className="h-10 rounded-lg border-slate-200">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">A</SelectItem>
                      <SelectItem value="b">B</SelectItem>
                      <SelectItem value="ab">AB</SelectItem>
                      <SelectItem value="o">O</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rhesus" className="text-sm font-medium text-slate-700">
                    Rhesus
                  </Label>
                  <Select>
                    <SelectTrigger className="h-10 rounded-lg border-slate-200">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positif">Positif (+)</SelectItem>
                      <SelectItem value="negatif">Negatif (-)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section: Kontak & Alamat */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 transition-all hover:border-blue-200 hover:bg-blue-50/30">
              <div className="flex items-center gap-2 text-blue-700">
                <Phone className="h-5 w-5" />
                <h3 className="font-semibold text-base">Kontak & Alamat</h3>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telp" className="text-sm font-medium text-slate-700">
                    No. Telepon <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="telp" 
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    className="h-10 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telp-darurat" className="text-sm font-medium text-slate-700">
                    No. Telepon Darurat
                  </Label>
                  <Input 
                    id="telp-darurat" 
                    type="tel"
                    placeholder="Keluarga/suami"
                    className="h-10 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="alamat" className="text-sm font-medium text-slate-700">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="alamat" 
                    placeholder="Alamat tempat tinggal saat ini"
                    className="min-h-[60px] rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kecamatan" className="text-sm font-medium text-slate-700">
                    Kecamatan
                  </Label>
                  <Input 
                    id="kecamatan" 
                    placeholder="Kecamatan"
                    className="h-10 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kelurahan" className="text-sm font-medium text-slate-700">
                    Kelurahan/Desa
                  </Label>
                  <Input 
                    id="kelurahan" 
                    placeholder="Kelurahan/Desa"
                    className="h-10 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section: Data Kehamilan */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 transition-all hover:border-purple-200 hover:bg-purple-50/30">
              <div className="flex items-center gap-2 text-purple-700">
                <Calendar className="h-5 w-5" />
                <h3 className="font-semibold text-base">Data Kehamilan</h3>
              </div>
              <div className="grid gap-4 grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="hpht" className="text-sm font-medium text-slate-700">
                    HPHT <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="hpht" 
                    type="date"
                    className="h-10 rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                    required 
                  />
                  <p className="text-xs text-slate-500">Hari Pertama Haid Terakhir</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hpl" className="text-sm font-medium text-slate-700">
                    HPL
                  </Label>
                  <Input 
                    id="hpl" 
                    type="date"
                    className="h-10 rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                  <p className="text-xs text-slate-500">Hari Perkiraan Lahir</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usia-kehamilan" className="text-sm font-medium text-slate-700">
                    Usia Kehamilan
                  </Label>
                  <Input 
                    id="usia-kehamilan" 
                    type="number"
                    placeholder="Minggu"
                    className="h-10 rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trimester" className="text-sm font-medium text-slate-700">
                    Trimester
                  </Label>
                  <Select>
                    <SelectTrigger className="h-10 rounded-lg border-slate-200">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Trimester 1</SelectItem>
                      <SelectItem value="2">Trimester 2</SelectItem>
                      <SelectItem value="3">Trimester 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gravida" className="text-sm font-medium text-slate-700">
                    Gravida (G)
                  </Label>
                  <Input 
                    id="gravida" 
                    type="number"
                    placeholder="Kehamilan ke-"
                    min={1}
                    className="h-10 rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="para" className="text-sm font-medium text-slate-700">
                    Para (P)
                  </Label>
                  <Input 
                    id="para" 
                    type="number"
                    placeholder="Persalinan"
                    min={0}
                    className="h-10 rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="abortus" className="text-sm font-medium text-slate-700">
                    Abortus (A)
                  </Label>
                  <Input 
                    id="abortus" 
                    type="number"
                    placeholder="Keguguran"
                    min={0}
                    className="h-10 rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="anak-hidup" className="text-sm font-medium text-slate-700">
                    Anak Hidup
                  </Label>
                  <Input 
                    id="anak-hidup" 
                    type="number"
                    placeholder="Jumlah"
                    min={0}
                    className="h-10 rounded-lg border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Section: Riwayat & Faktor Risiko */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 transition-all hover:border-orange-200 hover:bg-orange-50/30">
              <div className="flex items-center gap-2 text-orange-700">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-semibold text-base">Riwayat & Faktor Risiko</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Riwayat Komplikasi Kehamilan</Label>
                  <div className="grid gap-2 grid-cols-3">
                    {riwayatKomplikasi.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center space-x-2 p-2 rounded-lg border border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer group"
                      >
                        <Checkbox 
                          id={item.id} 
                          className="border-slate-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <label 
                          htmlFor={item.id} 
                          className="text-xs font-medium text-slate-700 cursor-pointer group-hover:text-orange-700"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tinggi-badan" className="text-sm font-medium text-slate-700">
                      Tinggi Badan (cm)
                    </Label>
                    <Input 
                      id="tinggi-badan" 
                      type="number"
                      placeholder="cm"
                      className="h-10 rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bb-sebelum" className="text-sm font-medium text-slate-700">
                      BB Sebelum Hamil (kg)
                    </Label>
                    <Input 
                      id="bb-sebelum" 
                      type="number"
                      placeholder="kg"
                      className="h-10 rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="catatan-risiko" className="text-sm font-medium text-slate-700">
                    Catatan Risiko Lainnya
                  </Label>
                  <Textarea 
                    id="catatan-risiko" 
                    placeholder="Riwayat penyakit, alergi, atau kondisi khusus lainnya..."
                    className="min-h-[60px] rounded-lg border-slate-200 focus:border-orange-500 focus:ring-orange-500 resize-none"
                  />
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
              className="h-11 px-6 rounded-lg border-slate-300 hover:bg-slate-100"
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button 
              type="submit"
              className="h-11 px-8 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Data Pasien"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
