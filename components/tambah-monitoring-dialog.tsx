"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function TambahMonitoringDialog({ patientId }: { patientId: string }) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tambah Data Monitoring</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Data Monitoring Kesehatan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years) *</Label>
              <Input id="age" type="number" required placeholder="Usia saat hamil" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systolic">SystolicBP (mmHg) *</Label>
              <Input id="systolic" type="number" required placeholder="Tekanan darah sistolik" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diastolic">DiastolicBP (mmHg) *</Label>
              <Input id="diastolic" type="number" required placeholder="Tekanan darah diastolik" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bs">BS (mmol/L) *</Label>
              <Input id="bs" type="number" step="0.1" required placeholder="Kadar gula darah" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temp">BodyTemp (F) *</Label>
              <Input id="temp" type="number" step="0.1" required placeholder="Suhu tubuh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hr">HeartRate (bpm) *</Label>
              <Input id="hr" type="number" required placeholder="Detak jantung" />
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Catatan:</strong> Risk Level akan diprediksi otomatis berdasarkan data yang diinput.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit">Simpan & Prediksi</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
