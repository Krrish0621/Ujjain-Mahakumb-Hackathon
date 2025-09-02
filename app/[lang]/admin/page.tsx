"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  Bell,
  FileText,
  CheckCircle,
  Eye,
  Trash2,
  AlertTriangle,
  AlertCircle,
  Info,
  Edit,
  Plus,
  Settings,
  MapPin,
  Route,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/toast"
import { useData } from "@/contexts/data-context"

/**
 * Demo data ­– in a real-world build this would come from a DB / API.
 */
const sampleBookings = [
  { id: "GH123456", name: "Rajesh Kumar", ghat: "Ram Ghat", time: "08:00 AM", status: "confirmed" },
  { id: "GH123457", name: "Priya Sharma", ghat: "Triveni Ghat", time: "10:00 AM", status: "confirmed" },
  { id: "GH123458", name: "Amit Singh", ghat: "Dada Nagar Ghat", time: "06:00 AM", status: "pending" },
  { id: "GH123459", name: "Sunita Devi", ghat: "Mangalnath Ghat", time: "12:00 PM", status: "confirmed" },
]

const sampleReports = [
  { id: 101, type: "lost", name: "Ramesh Kumar", status: "active" },
  { id: 102, type: "found", name: "Unknown Child", status: "active" },
  { id: 103, type: "lost", name: "Sunita Devi", status: "resolved" },
]

export default function AdminPage() {
  /* ---------------- LOGIN STATE ---------------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  /* ---------------- DATA FROM CONTEXT ---------------- */
  const {
    alerts,
    recommendations,
    ghatStatuses,
    routePaths,
    addAlert,
    deleteAlert,
    addRecommendation,
    deleteRecommendation,
    updateGhatStatus,
    updateRoutePath,
  } = useData()

  /* ---------------- EDITING STATE ---------------- */
  const [newRecommendation, setNewRecommendation] = useState({
    message: "",
    type: "recommended" as const,
    routeDetails: "",
  })

  const { showToast, ToastContainer } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === "admin" && credentials.password === "admin123") {
      setIsLoggedIn(true)
      showToast("Welcome to Admin Dashboard!", "success")
    } else {
      showToast("Invalid credentials (hint: admin / admin123)", "error")
    }
  }

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = formData.get("message") as string
    const priority = formData.get("priority") as "high" | "medium" | "low"

    if (message.trim()) {
      const newAlert = {
        id: Date.now(),
        message: message.trim(),
        priority,
        timestamp: new Date().toLocaleString(),
      }
      addAlert(newAlert)
      showToast("Alert posted successfully! Updates will appear across the site.", "success")
      e.currentTarget.reset()
    } else {
      showToast("Please enter an alert message", "error")
    }
  }

  const handleDeleteAlert = (id: number) => {
    deleteAlert(id)
    showToast("Alert deleted successfully", "success")
  }

  const handleAddRecommendation = () => {
    if (newRecommendation.message.trim() && newRecommendation.routeDetails.trim()) {
      const recommendation = {
        id: Date.now(),
        ...newRecommendation,
      }
      addRecommendation(recommendation)
      setNewRecommendation({ message: "", type: "recommended", routeDetails: "" })
      showToast("Recommendation added successfully! Check the homepage for updates.", "success")
    } else {
      showToast("Please fill in all fields", "error")
    }
  }

  const handleDeleteRecommendation = (id: number) => {
    deleteRecommendation(id)
    showToast("Recommendation deleted successfully", "success")
  }

  const handleUpdateGhatStatus = (id: number, status: "low" | "moderate" | "high", remarks?: string) => {
    updateGhatStatus(id, status, remarks)
    showToast("Ghat status updated successfully! Live status will reflect changes.", "success")
  }

  const handleUpdateRoutePath = (id: number, crowdLevel: "low" | "moderate" | "high", notes?: string) => {
    updateRoutePath(id, crowdLevel, notes, true)
    showToast("Route path updated successfully! Map will show new congestion levels.", "success")
  }

  const handleToggleRoutePath = (id: number, isActive: boolean) => {
    const path = routePaths.find((p) => p.id === id)
    if (path) {
      updateRoutePath(id, path.crowdLevel, path.notes, isActive)
      showToast(`Route ${isActive ? "enabled" : "disabled"} successfully!`, "success")
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "recommended":
        return "✅"
      case "alternative":
        return "⚠️"
      case "avoid":
        return "❌"
      default:
        return "ℹ️"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "🟢"
      case "moderate":
        return "🟡"
      case "high":
        return "🔴"
      default:
        return "⚪"
    }
  }

  if (!isLoggedIn) {
    return (
      <>
        <ToastContainer />
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold divine-text">Admin Login</h1>
              <p className="deep-saffron-text">Access the admin dashboard</p>
            </div>

            <Card className="sacred-card">
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full sacred-button">
                    Login
                  </Button>
                </form>

                <p className="text-center text-sm text-gray-500">
                  Demo creds: <code>admin / admin123</code>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
  }

  /* ---------------- DASHBOARD ---------------- */
  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold divine-text">Admin Dashboard</h1>
            <p className="deep-saffron-text">Manage ShipraSetu system - Changes reflect in real-time</p>
          </div>

          {/* Real-time Status Indicator */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-800 font-medium">
                Live System Connected • Changes sync automatically across all pages
              </span>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            {/* ---------------- TAB LIST ---------------- */}
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview" className="deep-saffron-text">
                Overview
              </TabsTrigger>
              <TabsTrigger value="bookings" className="deep-saffron-text">
                Bookings
              </TabsTrigger>
              <TabsTrigger value="alerts" className="deep-saffron-text">
                Alerts
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="deep-saffron-text">
                Recommendations
              </TabsTrigger>
              <TabsTrigger value="ghats" className="deep-saffron-text">
                Ghat Status
              </TabsTrigger>
              <TabsTrigger value="routes" className="deep-saffron-text">
                Route Map
              </TabsTrigger>
            </TabsList>

            {/* ---------------- OVERVIEW ---------------- */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card className="sacred-card">
                  <CardContent className="p-6 text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 text-blue-500" />
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm deep-saffron-text">Total Bookings</p>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardContent className="p-6 text-center">
                    <Bell className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
                    <div className="text-2xl font-bold">{alerts.length}</div>
                    <p className="text-sm deep-saffron-text">Active Alerts</p>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardContent className="p-6 text-center">
                    <FileText className="mx-auto mb-2 h-8 w-8 text-green-500" />
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-sm deep-saffron-text">Lost / Found</p>
                  </CardContent>
                </Card>

                <Card className="sacred-card">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="mx-auto mb-2 h-8 w-8 text-purple-500" />
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm deep-saffron-text">Resolved Cases</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ---------------- BOOKINGS ---------------- */}
            <TabsContent value="bookings" className="space-y-6">
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="deep-saffron-text">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sampleBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-sm text-gray-600">
                          {booking.id} • {booking.ghat} • {booking.time}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                        <Button size="icon" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------- ALERTS ---------------- */}
            <TabsContent value="alerts" className="space-y-6">
              {/* Add Alert Form */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="flex items-center deep-saffron-text">
                    <Bell className="w-5 h-5 mr-2 text-orange-500" />
                    Add New Alert
                  </CardTitle>
                  <p className="text-sm text-gray-600">Alerts will appear immediately on the Alerts page</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddAlert} className="space-y-4">
                    <div>
                      <Label htmlFor="alertMessage">Alert Message</Label>
                      <Textarea
                        id="alertMessage"
                        name="message"
                        placeholder="Enter alert message..."
                        required
                        className="min-h-[80px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="alertPriority">Priority Level</Label>
                      <Select name="priority" defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">
                            <div className="flex items-center">
                              <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                              High Priority
                            </div>
                          </SelectItem>
                          <SelectItem value="medium">
                            <div className="flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                              Medium Priority
                            </div>
                          </SelectItem>
                          <SelectItem value="low">
                            <div className="flex items-center">
                              <Info className="w-4 h-4 mr-2 text-blue-500" />
                              Low Priority
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="sacred-button">
                      <Bell className="w-4 h-4 mr-2" />
                      Post Alert
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Alerts Management */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="deep-saffron-text">Manage Existing Alerts</CardTitle>
                  <p className="text-sm text-gray-600">Currently {alerts.length} active alerts</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between rounded-lg bg-gray-50 p-4 border">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{alert.message}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs capitalize text-gray-500">Priority:</span>
                          <Badge
                            variant={
                              alert.priority === "high"
                                ? "destructive"
                                : alert.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {alert.priority}
                          </Badge>
                          <span className="text-xs text-gray-400">• {alert.timestamp}</span>
                        </div>
                      </div>

                      <Button
                        size="icon"
                        variant="outline"
                        className="ml-4 hover:bg-red-50 hover:border-red-200 bg-transparent"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------- RECOMMENDATIONS ---------------- */}
            <TabsContent value="recommendations" className="space-y-6">
              {/* Add Recommendation Form */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="flex items-center deep-saffron-text">
                    <Plus className="w-5 h-5 mr-2 text-orange-500" />
                    Add Divine Recommendation
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Recommendations will appear on the homepage Route Guidance section
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Message</Label>
                    <Input
                      value={newRecommendation.message}
                      onChange={(e) => setNewRecommendation({ ...newRecommendation, message: e.target.value })}
                      placeholder="Enter recommendation message..."
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={newRecommendation.type}
                      onValueChange={(value: "recommended" | "alternative" | "avoid") =>
                        setNewRecommendation({ ...newRecommendation, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">✅ Recommended</SelectItem>
                        <SelectItem value="alternative">⚠️ Alternative</SelectItem>
                        <SelectItem value="avoid">❌ Avoid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Route Details</Label>
                    <Input
                      value={newRecommendation.routeDetails}
                      onChange={(e) => setNewRecommendation({ ...newRecommendation, routeDetails: e.target.value })}
                      placeholder="e.g., via Nanakheda Gate"
                    />
                  </div>
                  <Button onClick={handleAddRecommendation} className="sacred-button">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Recommendation
                  </Button>
                </CardContent>
              </Card>

              {/* Manage Recommendations */}
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="deep-saffron-text">Manage Divine Recommendations</CardTitle>
                  <p className="text-sm text-gray-600">Currently {recommendations.length} active recommendations</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4 border">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getTypeIcon(rec.type)}</span>
                          <Badge variant="outline" className="capitalize">
                            {rec.type}
                          </Badge>
                        </div>
                        <p className="font-medium text-gray-800">{rec.message}</p>
                        <p className="text-sm text-gray-600 mt-1">Route: {rec.routeDetails}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDeleteRecommendation(rec.id)}
                          className="hover:bg-red-50 hover:border-red-200"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------- GHAT STATUS ---------------- */}
            <TabsContent value="ghats" className="space-y-6">
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="flex items-center deep-saffron-text">
                    <MapPin className="w-5 h-5 mr-2 text-orange-500" />
                    Live Ghat Status Editor
                  </CardTitle>
                  <p className="text-sm text-gray-600">Changes will update the Live Status section on homepage</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ghatStatuses.map((ghat) => (
                    <div key={ghat.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4 border">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getStatusColor(ghat.status)}</span>
                          <h3 className="font-medium text-gray-800">{ghat.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {ghat.currentCapacity}/{ghat.maxCapacity} • {ghat.waitTime}
                          </Badge>
                        </div>
                        {ghat.remarks && <p className="text-sm text-gray-600">{ghat.remarks}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={ghat.status}
                          onValueChange={(value: "low" | "moderate" | "high") =>
                            handleUpdateGhatStatus(ghat.id, value, ghat.remarks)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">🟢 Low</SelectItem>
                            <SelectItem value="moderate">🟡 Moderate</SelectItem>
                            <SelectItem value="high">🔴 High</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="icon" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------- ROUTE MAP ---------------- */}
            <TabsContent value="routes" className="space-y-6">
              <Card className="sacred-card">
                <CardHeader>
                  <CardTitle className="flex items-center deep-saffron-text">
                    <Route className="w-5 h-5 mr-2 text-orange-500" />
                    Sacred Route Map Editor
                  </CardTitle>
                  <p className="text-sm text-gray-600">Route changes will update the visual map on homepage</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {routePaths.map((path) => (
                    <div key={path.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4 border">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getStatusColor(path.crowdLevel)}</span>
                          <h3 className="font-medium text-gray-800">
                            {path.from} → {path.to}
                          </h3>
                          <Badge variant={path.isActive ? "default" : "secondary"} className="text-xs">
                            {path.isActive ? "Active" : "Disabled"}
                          </Badge>
                        </div>
                        {path.notes && <p className="text-sm text-gray-600">{path.notes}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={path.crowdLevel}
                          onValueChange={(value: "low" | "moderate" | "high") =>
                            handleUpdateRoutePath(path.id, value, path.notes)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">🟢 Low</SelectItem>
                            <SelectItem value="moderate">🟡 Moderate</SelectItem>
                            <SelectItem value="high">🔴 High</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant={path.isActive ? "destructive" : "default"}
                          onClick={() => handleToggleRoutePath(path.id, !path.isActive)}
                        >
                          {path.isActive ? "Disable" : "Enable"}
                        </Button>
                        <Button size="icon" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
