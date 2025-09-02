"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Alert {
  id: number
  message: string
  priority: "high" | "medium" | "low"
  timestamp: string
}

export interface Recommendation {
  id: number
  message: string
  type: "recommended" | "alternative" | "avoid"
  routeDetails: string
}

export interface GhatStatus {
  id: number
  name: string
  status: "low" | "moderate" | "high"
  remarks?: string
  currentCapacity: number
  maxCapacity: number
  waitTime: string
}

export interface RoutePath {
  id: number
  from: string
  to: string
  crowdLevel: "low" | "moderate" | "high"
  notes?: string
  isActive: boolean
}

interface DataContextType {
  alerts: Alert[]
  recommendations: Recommendation[]
  ghatStatuses: GhatStatus[]
  routePaths: RoutePath[]
  updateAlerts: (alerts: Alert[]) => void
  updateRecommendations: (recommendations: Recommendation[]) => void
  updateGhatStatuses: (ghatStatuses: GhatStatus[]) => void
  updateRoutePaths: (routePaths: RoutePath[]) => void
  addAlert: (alert: Alert) => void
  deleteAlert: (id: number) => void
  addRecommendation: (recommendation: Recommendation) => void
  deleteRecommendation: (id: number) => void
  updateGhatStatus: (id: number, status: "low" | "moderate" | "high", remarks?: string) => void
  updateRoutePath: (id: number, crowdLevel: "low" | "moderate" | "high", notes?: string, isActive?: boolean) => void
  refreshData: () => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Initial data
const initialAlerts: Alert[] = [
  {
    id: 1,
    message: "Triveni Ghat overcrowded – please use alternative routes",
    priority: "high",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    message: "Route from Mangalnath Zone blocked due to maintenance",
    priority: "medium",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toLocaleString(),
  },
  {
    id: 3,
    message: "Emergency exit at Kal Bhairav Mandir is now open",
    priority: "low",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toLocaleString(),
  },
]

const initialRecommendations: Recommendation[] = [
  {
    id: 1,
    message: "Recommended Path: Route A via Nanakheda Gate",
    type: "recommended",
    routeDetails: "via Nanakheda Gate",
  },
  {
    id: 2,
    message: "Alternative: Take Route B through Dada Nagar Ghat",
    type: "alternative",
    routeDetails: "through Dada Nagar Ghat",
  },
  { id: 3, message: "Avoid Triveni Ghat – overcrowded", type: "avoid", routeDetails: "Triveni Ghat area" },
]

const initialGhatStatuses: GhatStatus[] = [
  {
    id: 1,
    name: "Ram Ghat",
    status: "moderate",
    remarks: "Steady flow of pilgrims",
    currentCapacity: 45,
    maxCapacity: 100,
    waitTime: "No wait",
  },
  {
    id: 2,
    name: "Triveni Ghat",
    status: "high",
    remarks: "Very crowded, long wait times",
    currentCapacity: 78,
    maxCapacity: 100,
    waitTime: "15 min",
  },
  {
    id: 3,
    name: "Mangalnath Zone",
    status: "low",
    remarks: "Peaceful atmosphere",
    currentCapacity: 95,
    maxCapacity: 100,
    waitTime: "45 min",
  },
  {
    id: 4,
    name: "Kal Bhairav Mandir",
    status: "moderate",
    currentCapacity: 32,
    maxCapacity: 80,
    waitTime: "No wait",
  },
  {
    id: 5,
    name: "Dada Nagar Ghat",
    status: "low",
    currentCapacity: 67,
    maxCapacity: 90,
    waitTime: "20 min",
  },
  {
    id: 6,
    name: "Sadawal Transit Zone",
    status: "moderate",
    remarks: "Transit area, moderate flow",
    currentCapacity: 25,
    maxCapacity: 70,
    waitTime: "No wait",
  },
]

const initialRoutePaths: RoutePath[] = [
  {
    id: 1,
    from: "Hari Phatak Gate",
    to: "Sadawal Transit Zone",
    crowdLevel: "low",
    notes: "Clear path, recommended",
    isActive: true,
  },
  {
    id: 2,
    from: "Shipra Pul Gate",
    to: "Ram Ghat",
    crowdLevel: "moderate",
    notes: "Some congestion expected",
    isActive: true,
  },
  {
    id: 3,
    from: "Triveni Ghat",
    to: "Ram Ghat",
    crowdLevel: "high",
    notes: "Heavy traffic, avoid if possible",
    isActive: false,
  },
  { id: 4, from: "Dada Nagar Ghat", to: "Triveni Ghat", crowdLevel: "low", isActive: true },
  {
    id: 5,
    from: "Nanakheda Gate",
    to: "Mangalnath Zone",
    crowdLevel: "low",
    notes: "Scenic route via temple",
    isActive: true,
  },
  { id: 6, from: "Kal Bhairav Mandir", to: "Ram Ghat", crowdLevel: "moderate", isActive: true },
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [ghatStatuses, setGhatStatuses] = useState<GhatStatus[]>([])
  const [routePaths, setRoutePaths] = useState<RoutePath[]>([])

  const safeJsonParse = <T,>(jsonString: string | null, fallback: T): T => {
    if (!jsonString) return fallback
    try {
      return JSON.parse(jsonString) as T
    } catch (error) {
      console.error("[v0] Failed to parse JSON from localStorage:", (error as Error).message)
      return fallback
    }
  }

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedAlerts = localStorage.getItem("shiprasetu_alerts")
        const savedRecommendations = localStorage.getItem("shiprasetu_recommendations")
        const savedGhatStatuses = localStorage.getItem("shiprasetu_ghat_statuses")
        const savedRoutePaths = localStorage.getItem("shiprasetu_route_paths")

        setAlerts(safeJsonParse<Alert[]>(savedAlerts, initialAlerts))
        setRecommendations(safeJsonParse<Recommendation[]>(savedRecommendations, initialRecommendations))
        setGhatStatuses(safeJsonParse<GhatStatus[]>(savedGhatStatuses, initialGhatStatuses))
        setRoutePaths(safeJsonParse<RoutePath[]>(savedRoutePaths, initialRoutePaths))
      } catch (error) {
        console.error("Error loading data from localStorage:", error)
        // Fallback to initial data
        setAlerts(initialAlerts)
        setRecommendations(initialRecommendations)
        setGhatStatuses(initialGhatStatuses)
        setRoutePaths(initialRoutePaths)
      }
    }

    loadData()

    // Set up periodic refresh every 10 seconds
    const interval = setInterval(loadData, 10000)

    return () => clearInterval(interval)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("shiprasetu_alerts", JSON.stringify(alerts))
  }, [alerts])

  useEffect(() => {
    localStorage.setItem("shiprasetu_recommendations", JSON.stringify(recommendations))
  }, [recommendations])

  useEffect(() => {
    localStorage.setItem("shiprasetu_ghat_statuses", JSON.stringify(ghatStatuses))
  }, [ghatStatuses])

  useEffect(() => {
    localStorage.setItem("shiprasetu_route_paths", JSON.stringify(routePaths))
  }, [routePaths])

  const updateAlerts = (newAlerts: Alert[]) => {
    setAlerts(newAlerts)
  }

  const updateRecommendations = (newRecommendations: Recommendation[]) => {
    setRecommendations(newRecommendations)
  }

  const updateGhatStatuses = (newGhatStatuses: GhatStatus[]) => {
    setGhatStatuses(newGhatStatuses)
  }

  const updateRoutePaths = (newRoutePaths: RoutePath[]) => {
    setRoutePaths(newRoutePaths)
  }

  const addAlert = (alert: Alert) => {
    const newAlerts = [alert, ...alerts]
    setAlerts(newAlerts)
  }

  const deleteAlert = (id: number) => {
    const newAlerts = alerts.filter((alert) => alert.id !== id)
    setAlerts(newAlerts)
  }

  const addRecommendation = (recommendation: Recommendation) => {
    const newRecommendations = [...recommendations, recommendation]
    setRecommendations(newRecommendations)
  }

  const deleteRecommendation = (id: number) => {
    const newRecommendations = recommendations.filter((rec) => rec.id !== id)
    setRecommendations(newRecommendations)
  }

  const updateGhatStatus = (id: number, status: "low" | "moderate" | "high", remarks?: string) => {
    const newGhatStatuses = ghatStatuses.map((ghat) => {
      if (ghat.id === id) {
        // Update capacity and wait time based on status
        let currentCapacity = ghat.currentCapacity
        let waitTime = ghat.waitTime

        switch (status) {
          case "low":
            currentCapacity = Math.min(ghat.maxCapacity * 0.3, ghat.maxCapacity)
            waitTime = "No wait"
            break
          case "moderate":
            currentCapacity = Math.min(ghat.maxCapacity * 0.7, ghat.maxCapacity)
            waitTime = "10-20 min"
            break
          case "high":
            currentCapacity = Math.min(ghat.maxCapacity * 0.95, ghat.maxCapacity)
            waitTime = "30-45 min"
            break
        }

        return { ...ghat, status, remarks, currentCapacity: Math.round(currentCapacity), waitTime }
      }
      return ghat
    })
    setGhatStatuses(newGhatStatuses)
  }

  const updateRoutePath = (id: number, crowdLevel: "low" | "moderate" | "high", notes?: string, isActive = true) => {
    const newRoutePaths = routePaths.map((path) => (path.id === id ? { ...path, crowdLevel, notes, isActive } : path))
    setRoutePaths(newRoutePaths)
  }

  const refreshData = () => {
    const savedAlerts = localStorage.getItem("shiprasetu_alerts")
    const savedRecommendations = localStorage.getItem("shiprasetu_recommendations")
    const savedGhatStatuses = localStorage.getItem("shiprasetu_ghat_statuses")
    const savedRoutePaths = localStorage.getItem("shiprasetu_route_paths")

    setAlerts(safeJsonParse<Alert[]>(savedAlerts, alerts))
    setRecommendations(safeJsonParse<Recommendation[]>(savedRecommendations, recommendations))
    setGhatStatuses(safeJsonParse<GhatStatus[]>(savedGhatStatuses, ghatStatuses))
    setRoutePaths(safeJsonParse<RoutePath[]>(savedRoutePaths, routePaths))
  }

  const value: DataContextType = {
    alerts,
    recommendations,
    ghatStatuses,
    routePaths,
    updateAlerts,
    updateRecommendations,
    updateGhatStatuses,
    updateRoutePaths,
    addAlert,
    deleteAlert,
    addRecommendation,
    deleteRecommendation,
    updateGhatStatus,
    updateRoutePath,
    refreshData,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
