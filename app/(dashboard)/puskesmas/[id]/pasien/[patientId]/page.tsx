"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TambahMonitoringDialog } from "@/components/tambah-monitoring-dialog"
import { ArrowLeft, User, Calendar, Activity } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function PatientDetailPage() {
  const params = useParams()
  
  const patient = {
    id: params.patientId,
    nama: "Ibu Siti",
    usia: 28,
    alamat: "Jl. Contoh No. 123",
    telp: "081234567890"
  }

  const monitoringData = [
    {
      id: 1,
      date: "2024-01-15",
      age: 28,
      systolicBP: 120,
      diastolicBP: 80,
      bs: 7.5,
      bodyTemp: 98.6,
      heartRate: 75,
      riskLevel: "low risk",
      aiPrediction: "low risk",
      confidence: 0.92
    },
    {
      id: 2,
      date: "2024-01-10",
      age: 28,
      systolicBP: 135,
      diastolicBP: 88,
      bs: 8.2,
      bodyTemp: 99.1,
      heartRate: 82,
      riskLevel: "mid risk",
      aiPrediction: "mid risk",
      confidence: 0.85
    },
    {
      id: 3,
      date: "2024-01-05",
      age: 28,
      systolicBP: 145,
      diastolicBP: 95,
      bs: 9.5,
      bodyTemp: 100.2,
      heartRate: 95,
      riskLevel: "high risk",
      aiPrediction: "high risk",
      confidence: 0.88
    },
  ]

  const getRiskColor = (risk: string) => {
    if (risk === "high risk") return "destructive"
    if (risk === "mid risk") return "default"
    return "secondary"
  }

  const latestRisk = monitoringData[0]?.riskLevel || "low risk"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/puskesmas/${params.id}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{patient.nama}</h1>
          <p className="text-gray-500">Data Monitoring Kesehatan</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Informasi Pasien</CardTitle>
            <User className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-sm"><span className="font-medium">Usia:</span> {patient.usia} tahun</p>
              <p className="text-sm"><span className="font-medium">Alamat:</span> {patient.alamat}</p>
              <p className="text-sm"><span className="font-medium">Telp:</span> {patient.telp}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status Terkini</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <Badge variant={getRiskColor(latestRisk)} className="text-base">
              {latestRisk}
            </Badge>
            <p className="text-xs text-gray-500 mt-2">Berdasarkan pemeriksaan terakhir</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pemeriksaan</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monitoringData.length}</div>
            <p className="text-xs text-gray-500">Riwayat monitoring</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grafik Monitoring Kesehatan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium mb-4">Blood Pressure (mmHg)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monitoringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="systolicBP" stroke="#ef4444" name="Systolic" />
                  <Line type="monotone" dataKey="diastolicBP" stroke="#3b82f6" name="Diastolic" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Blood Sugar (mmol/L)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monitoringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bs" stroke="#8b5cf6" name="BS" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Body Temperature (F)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monitoringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bodyTemp" stroke="#f59e0b" name="Temp" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4">Heart Rate (bpm)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monitoringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="heartRate" stroke="#10b981" name="Heart Rate" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Riwayat Monitoring Kesehatan</CardTitle>
            <TambahMonitoringDialog patientId={params.patientId as string} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>SystolicBP</TableHead>
                <TableHead>DiastolicBP</TableHead>
                <TableHead>BS (mmol/L)</TableHead>
                <TableHead>BodyTemp (F)</TableHead>
                <TableHead>HeartRate (bpm)</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>AI Prediction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monitoringData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.date}</TableCell>
                  <TableCell>{data.age}</TableCell>
                  <TableCell>{data.systolicBP}</TableCell>
                  <TableCell>{data.diastolicBP}</TableCell>
                  <TableCell>{data.bs}</TableCell>
                  <TableCell>{data.bodyTemp}</TableCell>
                  <TableCell>{data.heartRate}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskColor(data.riskLevel)}>
                      {data.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge variant={getRiskColor(data.aiPrediction)}>
                        {data.aiPrediction}
                      </Badge>
                      <span className="text-xs text-gray-500">{(data.confidence * 100).toFixed(0)}% confidence</span>
                    </div>
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
