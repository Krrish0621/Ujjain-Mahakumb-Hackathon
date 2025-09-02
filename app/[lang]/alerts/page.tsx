"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, AlertTriangle, Info, AlertCircle, Search, Filter, RefreshCw } from "lucide-react"
import { useData } from "@/contexts/data-context"
import { Button } from "@/components/ui/button"

export default function AlertsPage() {
  const { alerts, refreshData } = useData()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all")

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "low":
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      case "low":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "all" || alert.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Simhastha Live Alerts</h1>
          <p className="text-gray-600">Stay updated with real-time information</p>
        </div>

        {/* Search and Filter */}
        <Card className="ghat-card mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select onValueChange={(value: "all" | "high" | "medium" | "low") => setFilterPriority(value)}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={refreshData} variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Update Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live updates • {alerts.length} active alerts</span>
          </div>
          <span className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${getPriorityColor(alert.priority)} hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  {getPriorityIcon(alert.priority)}
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{alert.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-gray-500">{alert.timestamp}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          alert.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : alert.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {alert.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <Card className="ghat-card">
            <CardContent className="text-center py-8">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No alerts found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
