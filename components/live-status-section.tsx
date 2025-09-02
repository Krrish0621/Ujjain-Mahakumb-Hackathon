"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, X, Navigation } from "lucide-react"
import { useData } from "@/contexts/data-context"

export function LiveStatusSection() {
  const { ghatStatuses } = useData()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Convert ghat statuses to the format expected by the component
  const ghatData = ghatStatuses.map((ghat) => ({
    id: ghat.id,
    name: ghat.name,
    crowdLevel: ghat.status === "low" ? "available" : ghat.status === "moderate" ? "moderate" : "high",
    currentCapacity: ghat.currentCapacity,
    maxCapacity: ghat.maxCapacity,
    waitTime: ghat.waitTime,
  }))

  const availableGhats = ghatData.filter((g) => g.crowdLevel === "available")
  const moderateGhats = ghatData.filter((g) => g.crowdLevel === "moderate")
  const highGhats = ghatData.filter((g) => g.crowdLevel === "high")

  const getTooltipGhats = (category: string) => {
    switch (category) {
      case "available":
        return (
          availableGhats
            .slice(0, 3)
            .map((g) => g.name)
            .join(", ") + (availableGhats.length > 3 ? "..." : "")
        )
      case "moderate":
        return (
          moderateGhats
            .slice(0, 3)
            .map((g) => g.name)
            .join(", ") + (moderateGhats.length > 3 ? "..." : "")
        )
      case "high":
        return (
          highGhats
            .slice(0, 3)
            .map((g) => g.name)
            .join(", ") + (highGhats.length > 3 ? "..." : "")
        )
      default:
        return ""
    }
  }

  const getGhatsByCategory = (category: string) => {
    switch (category) {
      case "available":
        return availableGhats
      case "moderate":
        return moderateGhats
      case "high":
        return highGhats
      default:
        return []
    }
  }

  const getCrowdColor = (level: string) => {
    switch (level) {
      case "available":
        return "text-green-600"
      case "moderate":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
      case "moderate":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Moderate</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Crowd</Badge>
      default:
        return null
    }
  }

  return (
    <>
      {/* Add mandala separator before the section */}
      <div className="flex justify-center mb-8">
        <div className="mandala-separator">
          <svg width="80" height="20" viewBox="0 0 80 20" className="text-orange-400">
            <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="25" cy="10" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="40" cy="10" r="4" fill="currentColor" />
            <circle cx="55" cy="10" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="70" cy="10" r="3" fill="currentColor" opacity="0.6" />
            <path
              d="M5 10 L15 10 M20 10 L30 10 M35 10 L45 10 M50 10 L60 10 M65 10 L75 10"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      <Card className="ghat-card mb-12 lotus-pattern">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-6 h-6 mr-2 text-orange-500" />
            Live Ghat Status
            <span className="ml-auto text-sm text-gray-500 font-normal">
              Updated: {new Date().toLocaleTimeString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Available Ghats Card */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredCard("available")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedCategory("available")}
            >
              <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className={`text-3xl md:text-4xl font-bold ${getCrowdColor("available")} mb-2`}>
                  {availableGhats.length}
                </div>
                <div className="text-sm font-medium text-green-700">Available Ghats</div>
                <div className="text-xs text-green-600 mt-1">Ready for pilgrims</div>
              </div>

              {/* Tooltip */}
              {hoveredCard === "available" && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  {getTooltipGhats("available")}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                </div>
              )}
            </div>

            {/* Moderate Crowd Card */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredCard("moderate")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedCategory("moderate")}
            >
              <div className="text-center p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className={`text-3xl md:text-4xl font-bold ${getCrowdColor("moderate")} mb-2`}>
                  {moderateGhats.length}
                </div>
                <div className="text-sm font-medium text-yellow-700">Moderate Crowd</div>
                <div className="text-xs text-yellow-600 mt-1">Some waiting expected</div>
              </div>

              {/* Tooltip */}
              {hoveredCard === "moderate" && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  {getTooltipGhats("moderate")}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                </div>
              )}
            </div>

            {/* High Crowd Card */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredCard("high")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedCategory("high")}
            >
              <div className="text-center p-6 bg-red-50 rounded-lg border-2 border-red-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className={`text-3xl md:text-4xl font-bold ${getCrowdColor("high")} mb-2`}>{highGhats.length}</div>
                <div className="text-sm font-medium text-red-700">High Crowd</div>
                <div className="text-xs text-red-600 mt-1">Long wait times</div>
              </div>

              {/* Tooltip */}
              {hoveredCard === "high" && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                  {getTooltipGhats("high")}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal/Side Panel */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === "available" && "Available Ghats"}
                {selectedCategory === "moderate" && "Moderate Crowd Ghats"}
                {selectedCategory === "high" && "High Crowd Ghats"}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {getGhatsByCategory(selectedCategory).map((ghat) => (
                  <Card key={ghat.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-orange-500" />
                          <h3 className="font-semibold text-lg">{ghat.name}</h3>
                        </div>
                        {getCrowdBadge(ghat.crowdLevel)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Capacity:</span>
                          <div className="font-medium">
                            {ghat.currentCapacity}/{ghat.maxCapacity}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Wait Time:</span>
                          <div className="font-medium">{ghat.waitTime}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Users className="w-4 h-4 mr-1" />
                            View Slots
                          </Button>
                          <Button size="sm" variant="outline">
                            <Navigation className="w-4 h-4 mr-1" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
