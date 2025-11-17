"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TambahMonitoringDialog } from "@/components/tambah-monitoring-dialog"
import { ArrowLeft, User, Calendar, Activity, ChevronDown, ChevronUp, FileDown } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

// Generate dummy data for 3 months (100 records)
const generateMonitoringData = () => {
  const data = []
  const today = new Date()
  const riskLevels = ["low risk", "mid risk", "high risk"]
  
  for (let i = 0; i < 100; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const riskIndex = i < 70 ? 0 : i < 90 ? 1 : 2
    const risk = riskLevels[riskIndex]
    
    data.push({
      id: i + 1,
      date: date.toISOString().split('T')[0],
      age: 28,
      systolicBP: risk === "high risk" ? 140 + Math.random() * 20 : risk === "mid risk" ? 130 + Math.random() * 10 : 110 + Math.random() * 15,
      diastolicBP: risk === "high risk" ? 90 + Math.random() * 10 : risk === "mid risk" ? 85 + Math.random() * 5 : 70 + Math.random() * 10,
      bs: risk === "high risk" ? 9 + Math.random() * 2 : risk === "mid risk" ? 8 + Math.random() * 1 : 6.5 + Math.random() * 1.5,
      bodyTemp: risk === "high risk" ? 99.5 + Math.random() * 1.5 : risk === "mid risk" ? 98.8 + Math.random() * 0.8 : 97.5 + Math.random() * 1.5,
      heartRate: risk === "high risk" ? 90 + Math.random() * 15 : risk === "mid risk" ? 80 + Math.random() * 10 : 65 + Math.random() * 15,
      riskLevel: risk,
      aiPrediction: risk,
      confidence: 0.80 + Math.random() * 0.15
    })
  }
  
  return data.reverse()
}

export default function PatientDetailPage() {
  const params = useParams()
  const [showChart, setShowChart] = useState(true)
  const [showRealtime, setShowRealtime] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterRisk, setFilterRisk] = useState("all")
  const [filterAI, setFilterAI] = useState("all")
  const itemsPerPage = 50
  
  // Real-time data state
  const [realtimeData, setRealtimeData] = useState({
    systolicBP: 120,
    diastolicBP: 80,
    bs: 7.5,
    bodyTemp: 98.6,
    heartRate: 75
  })
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        systolicBP: Math.max(100, Math.min(160, prev.systolicBP + (Math.random() - 0.5) * 5)),
        diastolicBP: Math.max(60, Math.min(100, prev.diastolicBP + (Math.random() - 0.5) * 3)),
        bs: Math.max(5, Math.min(12, prev.bs + (Math.random() - 0.5) * 0.5)),
        bodyTemp: Math.max(97, Math.min(101, prev.bodyTemp + (Math.random() - 0.5) * 0.3)),
        heartRate: Math.max(60, Math.min(120, prev.heartRate + (Math.random() - 0.5) * 5))
      }))
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  const patient = {
    id: params.patientId,
    nama: "Ibu Siti",
    usia: 28,
    alamat: "Jl. Contoh No. 123",
    telp: "081234567890"
  }

  const allData = generateMonitoringData()
  
  const filteredData = allData.filter(d => {
    const riskMatch = filterRisk === "all" || d.riskLevel === filterRisk
    const aiMatch = filterAI === "all" || d.aiPrediction === filterAI
    return riskMatch && aiMatch
  })
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const monitoringData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const generatePDFReport = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(18)
    doc.text("Laporan Monitoring Kesehatan Maternal", 14, 20)
    
    // Patient Info
    doc.setFontSize(12)
    doc.text(`Nama: ${patient.nama}`, 14, 35)
    doc.text(`Usia: ${patient.usia} tahun`, 14, 42)
    doc.text(`Alamat: ${patient.alamat}`, 14, 49)
    doc.text(`Telepon: ${patient.telp}`, 14, 56)
    doc.text(`Tanggal Laporan: ${new Date().toLocaleDateString('id-ID')}`, 14, 63)
    
    // Summary Stats
    const latestData = monitoringData[0]
    doc.setFontSize(11)
    doc.text("Status Terkini:", 14, 75)
    doc.text(`Risk Level: ${latestData.riskLevel.toUpperCase()}`, 14, 82)
    doc.text(`AI Prediction: ${latestData.aiPrediction} (${(latestData.confidence * 100).toFixed(0)}% confidence)`, 14, 89)
    doc.text(`Total Pemeriksaan: ${monitoringData.length} kali`, 14, 96)
    
    // Table
    const tableData = monitoringData.slice(0, 20).map(d => [
      d.date,
      d.systolicBP.toFixed(0),
      d.diastolicBP.toFixed(0),
      d.bs.toFixed(1),
      d.bodyTemp.toFixed(1),
      d.heartRate.toFixed(0),
      d.riskLevel
    ])
    
    autoTable(doc, {
      startY: 105,
      head: [['Tanggal', 'Systolic', 'Diastolic', 'BS', 'Temp', 'HR', 'Risk']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 8 }
    })
    
    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.text(`Halaman ${i} dari ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' })
    }
    
    doc.save(`Laporan_${patient.nama.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const getRiskColor = (risk: string) => {
    if (risk === "high risk") return "destructive"
    if (risk === "mid risk") return "default"
    return "secondary"
  }

  const latestRisk = allData[0]?.riskLevel || "low risk"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/puskesmas/${params.id}`}>
            <Button variant="outline" size="icon" className="rounded-xl shadow-md hover:shadow-lg">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{patient.nama}</h1>
            <p className="text-gray-600 mt-1">Data Monitoring Kesehatan Maternal</p>
          </div>
        </div>
        <Button onClick={generatePDFReport} className="rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 px-6 font-medium">
          <FileDown className="h-5 w-5 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Informasi Pasien</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <User className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-blue-800"><span className="font-bold">Usia:</span> {patient.usia} tahun</p>
              <p className="text-sm text-blue-800"><span className="font-bold">Alamat:</span> {patient.alamat}</p>
              <p className="text-sm text-blue-800"><span className="font-bold">Telp:</span> {patient.telp}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Status Terkini</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <Badge variant={getRiskColor(latestRisk)} className="text-base px-4 py-1 rounded-full">
              {latestRisk}
            </Badge>
            <p className="text-xs text-purple-700 mt-2 font-medium">Berdasarkan pemeriksaan terakhir</p>
            <div className="mt-3 p-3 bg-white rounded-lg shadow-sm">
              <p className="font-bold text-purple-900 text-xs">💡 Konklusi AI:</p>
              <p className="text-purple-800 mt-1 text-xs leading-relaxed">
                {latestRisk === "high risk" 
                  ? "Kondisi vital menunjukkan peningkatan risiko, perlu pemantauan intensif dan konsultasi dokter segera."
                  : latestRisk === "mid risk"
                  ? "Beberapa parameter kesehatan memerlukan perhatian, lanjutkan monitoring rutin dan jaga pola hidup sehat."
                  : "Semua parameter kesehatan dalam batas normal, kondisi kehamilan stabil dan terkendali dengan baik."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-pink-900">Total Pemeriksaan</CardTitle>
            <div className="p-2 bg-pink-500 rounded-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-pink-600">{allData.length}</div>
            <p className="text-xs text-pink-700 mt-1 font-medium">Riwayat monitoring lengkap</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Activity className="h-6 w-6 text-green-600" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              <CardTitle className="text-xl font-bold">⚡ Real-Time Dashboard</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowRealtime(!showRealtime)} className="rounded-lg shadow-md hover:shadow-lg">
              {showRealtime ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              {showRealtime ? "Sembunyikan" : "Tampilkan"}
            </Button>
          </div>
        </CardHeader>
        {showRealtime && <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-red-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-600">SYSTOLIC BP</p>
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>
              <p className="text-3xl font-bold text-red-600 animate-pulse">{realtimeData.systolicBP.toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-1">mmHg</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500"
                  style={{ width: `${(realtimeData.systolicBP / 160) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-600">DIASTOLIC BP</p>
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
              <p className="text-3xl font-bold text-blue-600 animate-pulse">{realtimeData.diastolicBP.toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-1">mmHg</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                  style={{ width: `${(realtimeData.diastolicBP / 100) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-600">BLOOD SUGAR</p>
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
              </div>
              <p className="text-3xl font-bold text-purple-600 animate-pulse">{realtimeData.bs.toFixed(1)}</p>
              <p className="text-xs text-gray-500 mt-1">mmol/L</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500"
                  style={{ width: `${(realtimeData.bs / 12) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-600">BODY TEMP</p>
                <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></div>
              </div>
              <p className="text-3xl font-bold text-orange-600 animate-pulse">{realtimeData.bodyTemp.toFixed(1)}</p>
              <p className="text-xs text-gray-500 mt-1">°F</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
                  style={{ width: `${((realtimeData.bodyTemp - 95) / 6) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-600">HEART RATE</p>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <p className="text-3xl font-bold text-green-600 animate-pulse">{realtimeData.heartRate.toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-1">bpm</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                  style={{ width: `${(realtimeData.heartRate / 120) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-sm font-bold text-gray-700">Status: Monitoring Aktif</p>
            </div>
            <p className="text-xs text-gray-600">Data diperbarui setiap 2 detik secara otomatis. Semua parameter vital sedang dipantau secara real-time.</p>
          </div>
        </CardContent>}
      </Card>

      <Card className="rounded-xl shadow-lg border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">📈 Grafik Monitoring Kesehatan</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowChart(!showChart)} className="rounded-lg shadow-md hover:shadow-lg">
              {showChart ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              {showChart ? "Sembunyikan" : "Tampilkan"}
            </Button>
          </div>
        </CardHeader>
        {showChart && <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 bg-gradient-to-br from-red-50 to-blue-50 rounded-xl">
              <h4 className="text-sm font-bold mb-4 text-gray-800">🩺 Blood Pressure (mmHg)</h4>
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
              <p className="text-xs text-gray-700 mt-3 p-2 bg-white rounded-lg italic">📊 AI Analysis: Tekanan darah menunjukkan tren stabil dalam rentang normal. Systolic rata-rata 118 mmHg dan diastolic 78 mmHg. Tidak ada lonjakan signifikan yang mengkhawatirkan.</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <h4 className="text-sm font-bold mb-4 text-gray-800">🩸 Blood Sugar (mmol/L)</h4>
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
              <p className="text-xs text-gray-700 mt-3 p-2 bg-white rounded-lg italic">📊 AI Analysis: Kadar gula darah berada dalam batas normal (6.5-7.5 mmol/L). Terdapat sedikit fluktuasi namun masih terkontrol dengan baik. Lanjutkan pola makan sehat.</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <h4 className="text-sm font-bold mb-4 text-gray-800">🌡️ Body Temperature (F)</h4>
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
              <p className="text-xs text-gray-700 mt-3 p-2 bg-white rounded-lg italic">📊 AI Analysis: Suhu tubuh konsisten dalam rentang normal (97.5-99°F). Tidak terdeteksi demam atau hipotermia. Kondisi termoregulasi baik selama kehamilan.</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <h4 className="text-sm font-bold mb-4 text-gray-800">❤️ Heart Rate (bpm)</h4>
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
              <p className="text-xs text-gray-700 mt-3 p-2 bg-white rounded-lg italic">📊 AI Analysis: Detak jantung stabil dengan rata-rata 72 bpm, sesuai untuk ibu hamil. Variasi normal mengikuti aktivitas harian. Tidak ada tanda takikardia atau bradikardia.</p>
            </div>
          </div>
        </CardContent>}
      </Card>

      <Card className="rounded-xl shadow-lg border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">📋 Riwayat Monitoring Kesehatan</CardTitle>
            <TambahMonitoringDialog patientId={params.patientId as string} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-700">Risk Level:</label>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-[150px] rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="low risk">Low Risk</SelectItem>
                  <SelectItem value="mid risk">Mid Risk</SelectItem>
                  <SelectItem value="high risk">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-700">AI Prediction:</label>
              <Select value={filterAI} onValueChange={setFilterAI}>
                <SelectTrigger className="w-[150px] rounded-lg shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="low risk">Low Risk</SelectItem>
                  <SelectItem value="mid risk">Mid Risk</SelectItem>
                  <SelectItem value="high risk">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="ml-auto text-sm text-gray-600">
              Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} dari {filteredData.length} data
            </div>
          </div>
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto border-0 rounded-xl shadow-inner bg-gray-50">
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
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg shadow-md hover:shadow-lg"
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    size="sm"
                    className={currentPage === pageNum ? "rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600" : "rounded-lg shadow-md"}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg shadow-md hover:shadow-lg"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
