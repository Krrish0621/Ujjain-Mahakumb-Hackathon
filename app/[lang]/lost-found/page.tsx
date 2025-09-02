"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, User, MapPin, Camera, Filter } from "lucide-react"

interface Report {
  id: number
  type: "lost" | "found"
  name: string
  age: string
  gender: string
  location: string
  description: string
  timestamp: string
  status: "active" | "resolved"
}

const initialReports: Report[] = [
  {
    id: 1,
    type: "lost",
    name: "Ramesh Kumar",
    age: "65",
    gender: "male",
    location: "Near Ram Ghat",
    description: "Elderly man wearing white kurta, has walking stick",
    timestamp: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    type: "found",
    name: "Unknown Child",
    age: "8",
    gender: "female",
    location: "Triveni Ghat",
    description: "Young girl in red dress, speaks Hindi",
    timestamp: "1 hour ago",
    status: "active",
  },
  {
    id: 3,
    type: "lost",
    name: "Sunita Devi",
    age: "45",
    gender: "female",
    location: "Mangalnath Zone",
    description: "Woman in blue saree, carrying yellow bag",
    timestamp: "30 minutes ago",
    status: "resolved",
  },
]

export default function LostFoundPage() {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "lost" | "found">("all")
  const [newReport, setNewReport] = useState({
    type: "lost" as "lost" | "found",
    name: "",
    age: "",
    gender: "",
    location: "",
    description: "",
  })

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    const report: Report = {
      id: Date.now(),
      ...newReport,
      timestamp: "Just now",
      status: "active",
    }
    setReports([report, ...reports])
    setNewReport({
      type: "lost",
      name: "",
      age: "",
      gender: "",
      location: "",
      description: "",
    })
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || report.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Lost & Found</h1>
          <p className="text-gray-600">Help reunite families and find lost belongings</p>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reports">View Reports</TabsTrigger>
            <TabsTrigger value="submit">Submit Report</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            {/* Search and Filter */}
            <Card className="ghat-card">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select onValueChange={(value: "all" | "lost" | "found") => setFilterType(value)}>
                      <SelectTrigger>
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reports</SelectItem>
                        <SelectItem value="lost">Lost Only</SelectItem>
                        <SelectItem value="found">Found Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReports.map((report) => (
                <Card
                  key={report.id}
                  className={`ghat-card ${report.type === "lost" ? "border-l-4 border-l-red-400" : "border-l-4 border-l-green-400"}`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          report.type === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {report.type === "lost" ? "LOST" : "FOUND"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          report.status === "active" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {report.status.toUpperCase()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{report.name}</span>
                      <span className="text-gray-500">
                        ({report.age} years, {report.gender})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{report.location}</span>
                    </div>
                    <p className="text-gray-700">{report.description}</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-500">{report.timestamp}</span>
                      <Button size="sm" variant="outline">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <Card className="ghat-card">
                <CardContent className="text-center py-8">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No reports found matching your criteria</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submit">
            <Card className="ghat-card">
              <CardHeader>
                <CardTitle>Submit New Report</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReport} className="space-y-6">
                  <div>
                    <Label>Report Type</Label>
                    <Select onValueChange={(value: "lost" | "found") => setNewReport({ ...newReport, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lost">Report Lost</SelectItem>
                        <SelectItem value="found">Report Found</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newReport.name}
                        onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        value={newReport.age}
                        onChange={(e) => setNewReport({ ...newReport, age: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => setNewReport({ ...newReport, gender: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Last Seen Location</Label>
                    <Select onValueChange={(value) => setNewReport({ ...newReport, location: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ram Ghat">Ram Ghat</SelectItem>
                        <SelectItem value="Triveni Ghat">Triveni Ghat</SelectItem>
                        <SelectItem value="Mangalnath Zone">Mangalnath Zone</SelectItem>
                        <SelectItem value="Kal Bhairav Mandir">Kal Bhairav Mandir</SelectItem>
                        <SelectItem value="Dada Nagar Ghat">Dada Nagar Ghat</SelectItem>
                        <SelectItem value="Sadawal Transit Zone">Sadawal Transit Zone</SelectItem>
                        <SelectItem value="Hari Phatak Gate">Hari Phatak Gate</SelectItem>
                        <SelectItem value="Shipra Pul Gate">Shipra Pul Gate</SelectItem>
                        <SelectItem value="Nanakheda Gate">Nanakheda Gate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newReport.description}
                      onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                      placeholder="Detailed description including clothing, distinctive features, etc."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="photo">Upload Photo (Optional)</Label>
                    <div className="mt-2 flex items-center space-x-2">
                      <Button type="button" variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Choose Photo
                      </Button>
                      <span className="text-sm text-gray-500">No file selected</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
