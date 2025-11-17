import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Activity, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-gray-600 mt-1">Ringkasan sistem monitoring kesehatan maternal</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Puskesmas</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">12</p>
            <p className="text-xs text-blue-700 mt-1">Fasilitas kesehatan terdaftar</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Total Pasien</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">248</p>
            <p className="text-xs text-purple-700 mt-1">Ibu hamil dalam monitoring</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-pink-900">Prediksi Hari Ini</CardTitle>
            <div className="p-2 bg-pink-500 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-pink-600">15</p>
            <p className="text-xs text-pink-700 mt-1">Analisis AI dilakukan</p>
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-xl shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Statistik Risiko</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-green-50 border-l-4 border-green-500">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-900">Low Risk</p>
              </div>
              <p className="text-3xl font-bold text-green-600 mt-2">180</p>
              <p className="text-xs text-green-700">72.6% dari total pasien</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-500">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-900">Mid Risk</p>
              </div>
              <p className="text-3xl font-bold text-yellow-600 mt-2">53</p>
              <p className="text-xs text-yellow-700">21.4% dari total pasien</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50 border-l-4 border-red-500">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-600" />
                <p className="text-sm font-medium text-red-900">High Risk</p>
              </div>
              <p className="text-3xl font-bold text-red-600 mt-2">15</p>
              <p className="text-xs text-red-700">6.0% dari total pasien</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
