"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation, MapPin, Clock, AlertTriangle, CheckCircle, Route } from "lucide-react"
import { useData } from "@/contexts/data-context"

interface RouteGuidanceProps {
  dict: {
    routeGuidance: {
      title: string
      subtitle: string
      mapTitle: string
      recommendations: string
      routes: {
        recommended: string
        avoid: string
        alternative: string
        blessing: string
      }
      legend: {
        low: string
        moderate: string
        high: string
      }
    }
  }
}

export function RouteGuidance({ dict }: RouteGuidanceProps) {
  const { recommendations, routePaths, ghatStatuses } = useData()

  // Create zones based on ghat statuses and route paths
  const zones = [
    { id: 1, name: "Hari Phatak Gate", status: "low", x: 1, y: 1 },
    { id: 2, name: "Shipra Pul Gate", status: "moderate", x: 2, y: 1 },
    { id: 3, name: "Nanakheda Gate", status: "low", x: 3, y: 1 },
    {
      id: 4,
      name: "Mangalnath Zone",
      status: ghatStatuses.find((g) => g.name === "Mangalnath Zone")?.status || "low",
      x: 1,
      y: 2,
    },
    {
      id: 5,
      name: "Sadawal Transit Zone",
      status: ghatStatuses.find((g) => g.name === "Sadawal Transit Zone")?.status || "moderate",
      x: 2,
      y: 2,
    },
    {
      id: 6,
      name: "Kal Bhairav Mandir",
      status: ghatStatuses.find((g) => g.name === "Kal Bhairav Mandir")?.status || "high",
      x: 3,
      y: 2,
    },
    {
      id: 7,
      name: "Triveni Ghat",
      status: ghatStatuses.find((g) => g.name === "Triveni Ghat")?.status || "high",
      x: 1,
      y: 3,
    },
    {
      id: 8,
      name: "Ram Ghat",
      status: ghatStatuses.find((g) => g.name === "Ram Ghat")?.status || "moderate",
      x: 2,
      y: 3,
    },
    {
      id: 9,
      name: "Dada Nagar Ghat",
      status: ghatStatuses.find((g) => g.name === "Dada Nagar Ghat")?.status || "low",
      x: 3,
      y: 3,
    },
  ]

  const getZoneColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-green-400 border-green-500 shadow-green-200"
      case "moderate":
        return "bg-yellow-400 border-yellow-500 shadow-yellow-200"
      case "high":
        return "bg-red-400 border-red-500 shadow-red-200"
      default:
        return "bg-gray-400 border-gray-500 shadow-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "low":
        return <CheckCircle className="w-3 h-3 text-green-700" />
      case "moderate":
        return <Clock className="w-3 h-3 text-yellow-700" />
      case "high":
        return <AlertTriangle className="w-3 h-3 text-red-700" />
      default:
        return null
    }
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "recommended":
        return <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
      case "alternative":
        return <Route className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
      case "avoid":
        return <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
    }
  }

  const getRecommendationBadge = (type: string) => {
    switch (type) {
      case "recommended":
        return <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">✅ Recommended</Badge>
      case "alternative":
        return <Badge className="mt-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠️ Alternative</Badge>
      case "avoid":
        return <Badge className="mt-2 bg-red-100 text-red-800 hover:bg-red-100">❌ Avoid</Badge>
      default:
        return <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-100">ℹ️ Info</Badge>
    }
  }

  const getRecommendationBgColor = (type: string) => {
    switch (type) {
      case "recommended":
        return "bg-green-50 border-green-200"
      case "alternative":
        return "bg-yellow-50 border-yellow-200"
      case "avoid":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="mb-12 ripple-background">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold divine-text mb-2">{dict.routeGuidance.title}</h2>
        <p className="deep-saffron-text text-lg font-medium">{dict.routeGuidance.subtitle}</p>
      </div>

      {/* Add mandala separator */}
      <div className="flex justify-center mb-8">
        <div className="mandala-separator">
          <svg width="60" height="20" viewBox="0 0 60 20" className="text-orange-400">
            <circle cx="8" cy="10" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="20" cy="10" r="1.5" fill="currentColor" opacity="0.8" />
            <circle cx="30" cy="10" r="3" fill="currentColor" />
            <circle cx="40" cy="10" r="1.5" fill="currentColor" opacity="0.8" />
            <circle cx="52" cy="10" r="2" fill="currentColor" opacity="0.6" />
            <path
              d="M3 10 L13 10 M15 10 L25 10 M25 10 L35 10 M35 10 L45 10 M47 10 L57 10"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sacred Route Map */}
        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="flex items-center deep-saffron-text">
              <Navigation className="w-6 h-6 mr-2 text-orange-600" />
              {dict.routeGuidance.mapTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Zone Grid */}
            <div className="relative bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-6 route-grid">
              <div className="grid grid-cols-3 gap-4 h-64">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`relative rounded-lg border-2 ${getZoneColor(zone.status)} flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg`}
                  >
                    <div className="flex items-center mb-1">
                      {getStatusIcon(zone.status)}
                      <MapPin className="w-3 h-3 ml-1 text-gray-700" />
                    </div>
                    <span className="text-xs font-semibold text-gray-800 text-center leading-tight">{zone.name}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Route Lines based on route paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                {routePaths
                  .filter((path) => path.isActive)
                  .map((path, index) => {
                    const strokeColor =
                      path.crowdLevel === "low" ? "#10b981" : path.crowdLevel === "moderate" ? "#f59e0b" : "#ef4444"
                    const strokeDasharray =
                      path.crowdLevel === "low" ? "5,5" : path.crowdLevel === "moderate" ? "3,3" : "2,2"

                    return (
                      <path
                        key={path.id}
                        d={index % 2 === 0 ? "M 85 15 Q 50 30 15 85" : "M 15 15 Q 50 50 85 85"}
                        stroke={strokeColor}
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={strokeDasharray}
                        className={path.crowdLevel === "low" ? "animate-pulse" : ""}
                      />
                    )
                  })}
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-400 rounded border border-green-500"></div>
                <span className="text-sm deep-saffron-text font-medium">{dict.routeGuidance.legend.low}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-400 rounded border border-yellow-500"></div>
                <span className="text-sm deep-saffron-text font-medium">{dict.routeGuidance.legend.moderate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-400 rounded border border-red-500"></div>
                <span className="text-sm deep-saffron-text font-medium">{dict.routeGuidance.legend.high}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Divine Recommendations - Dynamic from Admin */}
        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="flex items-center deep-saffron-text">
              <Route className="w-6 h-6 mr-2 text-orange-600" />
              {dict.routeGuidance.recommendations}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg border ${getRecommendationBgColor(rec.type)}`}
                >
                  {getRecommendationIcon(rec.type)}
                  <div>
                    <p
                      className={`font-medium ${rec.type === "recommended" ? "text-green-800" : rec.type === "alternative" ? "text-yellow-800" : "text-red-800"}`}
                    >
                      {rec.message}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Route: {rec.routeDetails}</p>
                    {getRecommendationBadge(rec.type)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Route className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No route recommendations available</p>
              </div>
            )}

            {/* Divine Timing - Static */}
            <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 mandala-pattern">
              <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium deep-saffron-text">{dict.routeGuidance.routes.blessing}</p>
                <Badge className="mt-2 bg-orange-100 text-orange-800 hover:bg-orange-100">🕐 Divine Timing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
